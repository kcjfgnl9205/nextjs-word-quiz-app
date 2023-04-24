import { MainTodayIsCard, MainQuizCard, MainJLPTCard } from "@/components/common";
import { SearchBar } from "@/components/vocabulary";


export default function Home() {
  return (
    <div >
      <div className="search__container">
        <h4>일본어 단어검색</h4>
        <SearchBar />
      </div>


      <div className="container">
        <article>
          <h4>오늘의 회화&gt;&gt;</h4>
          <MainTodayIsCard />
        </article>
        <article>
          <h4>오늘의 단어&gt;&gt;</h4>
          <MainTodayIsCard />
        </article>
      </div>


      <h4>단어퀴즈</h4>
      <div className="container2">
        <article>
          <MainQuizCard />
        </article>
        <article>
          <MainQuizCard />
        </article>
        <article>
          <MainQuizCard />
        </article>
      </div>


      <h4>JLPT단어</h4>
      <div className="container2">
        <article>
          <MainJLPTCard />
        </article>
        <article>
          <MainJLPTCard />
        </article>
        <article>
          <MainJLPTCard />
        </article>
      </div>


      <style jsx>{`
      .search__container {
        margin: 2rem 0;
      }

      .container,
      .container2 {
        display: grid;
        grid-template-columns: repeat(1);
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      @media (min-width: 640px) {
        .container {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        
        .container2 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    
      article {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    
      h4 {
        font-weight: bold;
      }
      `}</style>
    </div>
  )
}
