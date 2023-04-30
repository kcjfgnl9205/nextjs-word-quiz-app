import { VocabularyType } from "@/types/vocabulary";


type Props = {
  item: VocabularyType;
  onClickNextQuizPage: () => void;
}

export default function QuizResult({ item, onClickNextQuizPage }: Props) {

  return (
    <div>
      <p>정답</p>
      <h4>{item.vocabulary_kanji} ({item.vocabulary_hira})</h4>
      <p>{item.vocabulary_mean}</p>
    
      <button onClick={onClickNextQuizPage}>&gt;</button>


      <style jsx>{`
        div {
          font-size: 16px;
          font-weight: normal;
          color: #757575;
          text-align: center;
          padding: 28px 12px;
          position: relative;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
        }

        div > h4 {
          font-size: 20px;
          color: #1a237e;
          margin-bottom: 16px;
        }

        button {
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          color: #333;
          line-height: 0;
          margin-right: 12px;
        }
      `}</style>
    </div>
  )
}
