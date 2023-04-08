import { firestore } from "@/app/firebase/config";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  chapterId: string;
}

type ChapterPageProps = {
  chapterId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { chapterId } = params as Params;

  // const chapterDetails = await firestore.collection("courses").doc()

  return {
    props: {
      chapterId,
    },
  };
}

const ChapterPage: React.FC<ChapterPageProps> = ({ chapterId }) => {
  console.log(chapterId);
  
  return(
    <div>
      <h1>ChapterPage.tsx ChapterPage</h1>
    </div>
  );
}

export default ChapterPage;