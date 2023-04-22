import Link from "next/link";


export default function QuizResult() {

  return (
    <div>
      <p>정답</p>
      <h4>단어</h4>
      <p>뜻1, 뜻2, 뜻3</p>
    
      <Link href={`/vocabulary/quiz/1`} legacyBehavior>
        <a>&gt;</a>
      </Link>


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

        div > a {
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
