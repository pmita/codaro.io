import { GetServerSideProps } from "next";
import { firestore } from "../../app/firebase/config";
import { ParsedUrlQuery } from "querystring";
import firebase from "firebase"

interface Params extends ParsedUrlQuery {
  course: string;
}

type PageProps = {
  courseDetails: firebase.firestore.DocumentData;
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { course } = context.params as Params;

  const courseDetails = await firestore.collection('courses').doc(course).get().then((doc) => {
    if (doc.exists) {
      return { ...doc.data() }
    } else {
      return null
    }
  })

  return {
    props: {
      courseDetails
    }
  }
}


const CoursePage: React.FC<PageProps> = ({ courseDetails }) => {

  console.log(courseDetails)
  return(
    <div className="random">
      <h1>CoursePage.tsx CoursePage</h1>
      {courseDetails && <h1>{courseDetails?.content}</h1>}
      {/* <Test content={courseDetails?.content} /> */}
    </div>
  );
}

export default CoursePage;