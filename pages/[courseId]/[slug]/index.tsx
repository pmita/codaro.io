import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
// FIREBASE
import firebase from "firebase";
import { firestore } from "@/app/firebase/config";

interface Params extends ParsedUrlQuery {
  courseId: string;
  slug: string;
}

type ChapterPageProps = {
  chapterDetails: firebase.firestore.DocumentData;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { courseId, slug } = params as Params;

  const chapterDetails = await firestore.collection("courses").doc(courseId)
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
          courseId,
          slug
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