
export default function MainTodayIsCard() {
  return (
    <div>
      <p>趣旨にそぐわない</p>
      <p>취지에 안 맞다</p>


      <style jsx>{`
        div {
          border: 1px solid #bdbdbd;
          border-radius: 14px;
          padding: 24px 12px;
          margin: 4px auto 12px 0;
          text-align: center;
          width: 100%;
          cursor: pointer;
        }

        div:hover {
          background-color: #eeeeee;
        }

        div > p {
          font-size: 18px;
        }

        div > p:first-child {
          font-weight: bold;
        }

        div > p:last-child {
          font-size: 14px;
          color: #9e9e9e;
        }
      `}</style>
    </div>
  )
}
