export default function QuizOptionButton() {
  return (
    <div>
      <p>
        옵션 1
      </p>


      <style jsx>{`
        div {
          font-size: 15px;
          font-weight: bold;
          text-align: center;
          color: #212121;
          padding: 4px 8px;
          margin: 4px 8px;
          margin-bottom: 0.5px;
          border: 1px solid #e0e0e0;
          border-radius: 14px;
          cursor: pointer;
        }

        div:hover {
          background-color: #f5f5f5;
        }

        p {
          padding: 6px 2px;
          font-size: 13px;  
        }
    `}</style>
    </div>
  );
}
