import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { QuizResult, QuizResultRate } from "@/components/quiz";
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
    router.push(`/quiz/${vocabulary_ids[random].id}`);
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
  const [ response, responseIds ] = await axios.all([
    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/quiz/${id}/result`, { headers: { 'Content-Type': 'application/json' } }).then(res => res.data),
    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/quiz-paths`, { headers: { 'Content-Type': 'application/json' } }).then(res => res.data)
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
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/quiz-paths`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const pathList = response.data.vocabularyId;
    const paths = pathList.map((data: any) => { return { params: { id: data.id.toString() } } })

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};
