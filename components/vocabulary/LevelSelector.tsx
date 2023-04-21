

export default function LevelSelector() {
  return (
    <article>
      <div>
        <input type="radio" name="option" id="N0" value="0" />
        <label htmlFor="N0">전체보기</label>
      </div>
      <div>
        <input type="radio" name="option" id="N1" value="1" />
        <label htmlFor="N1">N1</label>
      </div>
      <div>
        <input type="radio" name="option" id="N2" value="2" />
        <label htmlFor="N2">N2</label>
      </div>
      <div>
        <input type="radio" name="option" id="N3" value="3" />
        <label htmlFor="N3">N3</label>
      </div>
      <div>
        <input type="radio" name="option" id="N4" value="4" />
        <label htmlFor="N4">N4</label>
      </div>
      <div>
        <input type="radio" name="option" id="N5" value="5" />
        <label htmlFor="N5">N5</label>
      </div>

      <style jsx>{`
        article {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: bold;
          padding: 4px 8px;
          border: 0.5px solid #e0e0e0;
          margin-bottom: 0.5px;
          border-radius: 5px;
          color: #bdbdbd;
          background-color:#e0e0e0;
        }

        div {
          padding:6px 0;
        }

        div > input[type="radio"] {
          display: none;
        }
        
        div > label {
          cursor: pointer;
        }
        
        div > input[type="radio"]:checked + label {
          color: #1a237e;
        }
    `}</style>
    </article>
  );
}
