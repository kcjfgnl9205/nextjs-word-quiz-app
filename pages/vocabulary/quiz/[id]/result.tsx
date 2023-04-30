import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { QuizResult, QuizResultRate } from "@/components/vocabulary";
import { VocabularyType, VocabularyOptionType } from "@/types/vocabulary";


type Props = {
  item: VocabularyType;
  item_options: Array<VocabularyOptionType>;
  vocabulary_ids: Array<any>;
}

export default function QuizResultPage({ item, item_options, vocabulary_ids }: Props) {
  const router = useRouter();
  const onClickNextQuizPage = () => {
    const random = Math.floor(Math.random() * vocabulary_ids.length) + 1;
    router.push(`/vocabulary/quiz/${vocabulary_ids[random].id}`);
  }

  return (
    <div>
      <QuizResult item={item} onClickNextQuizPage={onClickNextQuizPage} />
      <QuizResultRate item_options={item_options} />
    </div>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const id: string = context.params?.id as string;
  const postData = { method: "GET", headers: { "Content-Type": "application/json", } };
  const [ response, responseIds ] = await Promise.all([
    (await (fetch(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz/${id}/result`, postData))).json(),
    (await (fetch(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz-paths`, postData))).json()
  ]);

  return {
    props: {
      item: response.data[0],
      item_options: response.data_options,
      vocabulary_ids: responseIds.vocabularyId
    },
    revalidate: 60 * 60 * 24 //하루에 한번 페이지 생성
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postData = { method: "GET", headers: { "Content-Type": "application/json", } };
  const response = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz-paths`, postData)).json();
  const pathList = response.vocabularyId;
  const paths = pathList.map((data: any) => { return { params: { id: data.id.toString() } } })

  return {
    paths,
    fallback: 'blocking',
  };
};
