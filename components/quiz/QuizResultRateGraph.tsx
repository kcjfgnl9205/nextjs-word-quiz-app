import { VocabularyOptionType } from "@/types/vocabulary";


type Props = {
  option: VocabularyOptionType;
  percentage: number;
}

export default function QuizResultRateGraph({ option, percentage }: Props) {

  return (
    <section>
      <div>
        <span>{option.vocabulary_hira}</span>
        <span>{percentage}%</span>
      </div>
      <input type="range" name="rating" min="0" max="100" step="1" value="0" disabled />


      <style jsx>{`
        section {
          font-size: 18px;
          padding: 22px 0 12px 0;
          color: ${option.is_answer ? "#1a237e" : "#9e9e9e" };
        }

        div {
          display: flex;
          justify-content: space-between;
          line-height: 0px;
        }

        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          background-color: #fff;
          outline: none;
          border-radius: 5px;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 0px;
          height: 0px;
          border: none;
          border-radius: 0px;
          background: none;
          position: relative;
          margin-top: -5px;
        }

        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 5px;
          background: linear-gradient(to right, ${option.is_answer ? "#311b92" : "#9e9e9e"} ${percentage}%, #fff ${percentage}%);
          border-radius: 5px;
          border: none;
          outline: none;
        }
      `}</style>
    </section>
  )
}
