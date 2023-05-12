import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";


export default function SearchBar() {
  return (
    <div>
      <div>
        <input type="text" placeholder="Search" />
        <MagnifyingGlassIcon className="h-5 w-5 mx-4 absolute right-px" aria-hidden="true" />
      </div>
      
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          width: 100%;
          margin: 0 auto 12px;
        }
        
        div > div {
          display: flex;
          align-items: center;
          position: relative;
          border: 1px solid #bdbdbd;
          border-radius: 24px;
        }
        
        div > div > input {
          border: none;
          padding: 12px;
          width: 100%;
          font-size: 14px;
          border-radius: 24px;
        }
      `}</style>
    </div>
  );
};
