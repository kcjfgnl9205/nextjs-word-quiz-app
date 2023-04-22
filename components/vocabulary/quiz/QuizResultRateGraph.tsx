
type Props = {
  isAnswer: boolean;
}

export default function QuizResultRateGraph({ isAnswer }: Props) {

  return (
    <section>
      <div>
        <span>단어1</span>
        <span>70%</span>
      </div>
      <input type="range" name="rating" min="0" max="100" step="1" value="0" disabled />


      <style jsx>{`
        section {
          font-size: 18px;
          padding: 22px 0 12px 0;
          color: ${isAnswer ? "#1a237e" : "#9e9e9e" };
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
          background: linear-gradient(to right, ${isAnswer ? "#311b92" : "#9e9e9e"} 70%, #fff 70%);
          border-radius: 5px;
          border: none;
          outline: none;
        }
      `}</style>
    </section>
  )
}
