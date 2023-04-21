import { HeartIcon } from "@heroicons/react/20/solid";


export default function QuizCard() {
  return (
    <article>
      <p>문제1</p>
      <div>
        <div>
          <HeartIcon className="h-5 w-5" aria-hidden="true" />
          <span>10</span>
        </div>
        <div>정답률 50% (현재 10,000명 참여중)</div>
      </div>


      <style jsx>{`
        article {
          font-size: 15px;
          font-weight: bold;
          padding: 4px 8px;
          margin-bottom: 0.5px;
          border: 0.5px solid #e0e0e0;
          border-radius: 5px;
          cursor: pointer;
        }

        p {
          padding: 4px 0;
        }

        article:hover {
          background-color: #f5f5f5;
        }

        div {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 13px;
          color: #b0bec5;
          align-items: center;
        }
    `}</style>
    </article>
  );
}
