import { Level } from "@/types/vocabulary";


type Props = {
  items: Array<Level>;
  selectedLevelId: string | undefined;
  changeSelectedLevelIdHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LevelSelector({ items, selectedLevelId, changeSelectedLevelIdHandler }: Props) {
  
  return (
    <article>
      <div>
        <input type="radio" name="option" id="N0" value="undefined" onChange={(e) => changeSelectedLevelIdHandler(e)} checked={selectedLevelId === undefined} />
        <label htmlFor="N0">전체보기</label>
      </div>
      {
        items?.map((item: Level) => {
          return (
            <div key={item.level_id}>
              <input type="radio" name="option" id={item.level_name} value={item.level_id} onChange={(e) => changeSelectedLevelIdHandler(e)} checked={selectedLevelId === item.level_id.toString()}/>
              <label htmlFor={item.level_name}>{item.level_name}</label>
            </div>
          )
        })
      }


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
