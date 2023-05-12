import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";

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
            <QuizOptionButton
              key={index}
              vocabularyId={item.id}
              option={option}
              path={`/vocabulary/quiz/${item.id}/result`}
            />
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
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      props: {
        item: response.data.data[0],
        item_options: response.data.data_options
      },
      revalidate: 60 * 60 * 24 //하루에 한번 페이지 생성
    };
  } catch (error) {
    return {
      props: {
        item: [],
        item_options: []
      },
      revalidate: 60 * 60 * 24 //하루에 한번 페이지 생성
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz-paths`, {
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
