import { ArrowDownCircleIcon, ArrowUpIcon } from "@heroicons/react/20/solid";


type Props = {
  showCount: number;
  totalCount: number;
  addVocabulariesHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function QuizMoreButton({ showCount, totalCount, addVocabulariesHandler }: Props) {

  return (
    <article id="section-1">
      <div onClick={(e) => {  addVocabulariesHandler(e); } }>
        <ArrowDownCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        퀴즈 더보기 {showCount} / {totalCount}
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
