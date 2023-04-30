import { QuizResultRateGraph } from "@/components/vocabulary";
import { VocabularyOptionType } from "@/types/vocabulary";
import { acalculatePercentage, toCommaSeparatedString } from "@/utils/common";


type Props = {
  item_options: Array<VocabularyOptionType>;
}

export default function QuizResultRate({ item_options }: Props) {
  const totalCnt = item_options.reduce((acc, cur) => { return acc + cur.cnt }, 0);

  return (
    <div>
      <p>현재 {toCommaSeparatedString(totalCnt)}명 참여중</p>
      {
        item_options.map((option: VocabularyOptionType, index: number) => {
          return (
            <QuizResultRateGraph
              key={index}
              option={option}
              percentage={acalculatePercentage(option.cnt, totalCnt)}
            />
          )
        })
      }


      <style jsx>{`
        div {
          font-size: 26px;
          font-weight: normal;
          background-color: #eeeeee;
          word-wrap: break-word;
          padding: 12px 12px;
          position: relative;
        }

        div > p {
          font-size: 18px;
          margin: 4px 0;
          font-size: 12px;
          color: #9e9e9e;
        }
      `}</style>
    </div>
  )
}
