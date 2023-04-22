import Link from "next/link";
import { LevelSelector, QuizCard, QuizMoreButton } from "@/components/vocabulary";


export default function Quiz() {
  return (
    <div>
      <LevelSelector />
      {
        new Array(20).fill("").map((_, index: number) => {
          return (
            <Link key={index} href={`/vocabulary/quiz/${index}`} >
              <QuizCard />
            </Link>
            )
          })
        }
      <QuizMoreButton />
    </div>
  )
}
