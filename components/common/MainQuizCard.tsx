
export default function MainQuizCard() {
  return (
    <div>
      <p>よる와 히라가나 다른 단어</p>
      <button>퀴즈풀기</button>


      <style jsx>{`
        div {
          border: 1px solid #bdbdbd;
          border-radius: 14px;
          padding: 24px 24px;
          margin: 12px auto;
          text-align: center;
          width: 100%;
        }

        p {
          font-weight: bold;
          margin-bottom: 8px;
        }

        button {
          font-size: 14px;
          padding: 8px 12px;
          border: 1px solid #7986cb;
          border-radius: 12px;
        }
        
        button:hover {
          background-color: #7986cb;
          color: white;
        }
      `}</style>
    </div>
  )
}
