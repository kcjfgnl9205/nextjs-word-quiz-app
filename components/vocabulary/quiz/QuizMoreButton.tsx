import { ArrowDownCircleIcon, ArrowUpIcon } from "@heroicons/react/20/solid";


export default function QuizMoreButton() {
  return (
    <article>
      <div>
        <ArrowDownCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        퀴즈 더보기 30 / 184
      </div>
      <div onClick={() => window.scrollTo({ top: 0 })}>
        <ArrowUpIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        맨위로
      </div>


      <style jsx>{`
        article {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          font-weight: bold;
          color: #212121;
          padding: 4px 8px;
          margin-bottom: 0.5px;
          border: 0.5px solid #e0e0e0;
          border-radius: 5px;
        }

        div {
          display: flex;
          padding: 6px 0;
          font-size: 13px;
          align-items: center;
          cursor: pointer;
        }      
    `}</style>
    </article>
  );
}
