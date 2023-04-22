import Link from "next/link";
import { QuizOptionButton } from "@/components/vocabulary";


export default function QuiDetailPage() {
  return (
    <section>
      <div>
      <h6>문제 - 이것은 무엇인가?</h6>
      {
        new Array(4).fill("").map((_, index: number) => {
          return (
            <Link key={index} href={`/vocabulary/quiz/${index}/result`} >
              <QuizOptionButton />
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
