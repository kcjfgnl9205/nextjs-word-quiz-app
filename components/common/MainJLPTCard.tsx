
export default function MainJLPTCard() {
  return (
    <div>
      <p>N2</p>
      <p>どなる <span>[怒鳴る·呶鳴る]</span></p>
      <p>1. 큰소리로 부르다;고함치다 2. 호통치다;야단치다</p>


      <style jsx>{`
        div {
          margin: 12px auto;
          font-size: 16px;
          text-align: left;
          width: 100%;
        }

        div > p:first-child {
          font-size: 14px;
          font-weight: bold;
          color: #616161;
        }

        div > p:nth-child(2) {
          font-size: 18px;
          font-weight: bold;
          color: #1a237e;
        }

        div > p:nth-child(2) > span {
          font-size: 18px;
          font-weight: bold;
          color: #212121;
        }

        div > p:last-child {
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}
