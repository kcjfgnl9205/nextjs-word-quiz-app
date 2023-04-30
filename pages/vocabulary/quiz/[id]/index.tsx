import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import { QuizOptionButton } from "@/components/vocabulary";
import { VocabularyOptionType, VocabularyType } from "@/types/vocabulary";


type Props = {
  item: VocabularyType;
  item_options: Array<VocabularyOptionType>;
}

export default function QuizDetailPage({ item, item_options }: Props) {
  return (
    <section>
      <div>
      <h6>{item.vocabulary_kanji}와 히라가나 다른 단어는??</h6>
      {
        item_options.map((option: VocabularyOptionType, index: number) => {
          return (
            <Link key={index} href={`/vocabulary/quiz/${index}/result`} >
              <QuizOptionButton option={option} />
            </Link>
          )
        })
      }
      </div>


      <style jsx>{`
        section {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 70vh;
        }
        
        div {
          margin: auto 0px;
          width: 100%;
        }

        h6 {
          text-align: center;
          padding: 24px 0 24px 0;
        }

        h6::after {
          display: block;
          width: 15px;
          height: 1px;
          margin: 19px auto 25px;
          background: #0a1e57;
          content: "";
        }
      `}</style>
    </section>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const id: string = context.params?.id as string;
  const postData = { method: "GET", headers: { "Content-Type": "application/json", } };
  const vocabulary = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz/${id}`, postData)).json();

  return {
    props: {
      item: vocabulary.data[0],
      item_options: vocabulary.data_options
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
