import { useState } from "react";
import { useRouter } from "next/router";
import { VocabularyOptionType } from "@/types/vocabulary";


type Props = {
  vocabularyId: number;
  option: VocabularyOptionType;
  path: string;
}

export default function QuizOptionButton({ vocabularyId, option, path }: Props) {
  const router = useRouter();
  const [ isClick, setIsClick ] = useState<boolean>(false);

  const handleOnClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsClick(true);

    // DB에 데이터 저장
    const postData = { 
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        //TODD: 유저 아이디(IP??) 받아오는거 생각해보기..
        user_id: 1,
        vocabulary_id: vocabularyId,
        option_id: option.id
      })
    };
    const response = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/quiz/${vocabularyId}`, postData)).json();
    if (response.response.message !== "success") {
      console.log("error")
      return;
    }
    
    // 0.3초뒤 페이지 이동
    setTimeout(() => {
      router.push({
        pathname: path,
      });
    }, 300); 
  }

  return (
    <div onClick={(e) => handleOnClick(e)}>
      <p>
        {
          !isClick
          ? option.vocabulary_hira
          : option.is_answer ? "정답입니다." : "틀렸습니다."
        }
      </p>


      <style jsx>{`
        div {
          font-size: 15px;
          font-weight: bold;
          text-align: center;
          padding: 4px 8px;
          margin: 4px 8px;
          margin-bottom: 0.5px;
          border-radius: 14px;
          cursor: pointer;
          border: ${!isClick ? "1px" : "2px"} solid ${!isClick ? "#ccc" : option.is_answer ? "#6200ea" : "#ef9a9a"};
          color: ${!isClick ? "#212121" : option.is_answer ? "#6200ea" : "#f44336"};
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
