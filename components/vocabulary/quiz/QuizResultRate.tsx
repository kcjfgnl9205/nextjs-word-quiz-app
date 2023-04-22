import { QuizResultRateGraph } from "@/components/vocabulary";


export default function QuizResultRate() {

  return (
    <div>
      <p>현재 10,000명 참여중</p>
      <QuizResultRateGraph isAnswer={true} />
      <QuizResultRateGraph isAnswer={false} />
      <QuizResultRateGraph isAnswer={false} />


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
