import firebase from "firebase";
import { firestore } from "@/app/firebase/config";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  course: string;
  slug: string;
}

type ChapterPageProps = {
  chapterDetails: firebase.firestore.DocumentData;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { course, slug } = params as Params;

  console.log(params);

  // const chapterDetails = await firestore.collection("courses").doc()
  const chapterDetails = await firestore.collection("courses").doc(course)
    .collection("chapter").doc(slug).get().then((doc) => {
      if (doc.exists) {
        return { ...doc.data() }
      } else {
        return null
      }
    })

  return {
    props: {
      chapterDetails
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await firestore.collectionGroup('chapter').get().then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const { courseId, slug } = doc.data();
      return { 
        params: {
          course: courseId,
          slug: slug
        }
      }
    })
  })

  return {
    paths,
    fallback: false
  }
}

const ChapterPage: React.FC<ChapterPageProps> = ({ chapterDetails }) => {
  
  return(
    <div>
      <h1>ChapterPage.tsx ChapterPage</h1>
      {chapterDetails && <h1>{chapterDetails?.content}</h1>}
    </div>
  );
}

export default ChapterPage;