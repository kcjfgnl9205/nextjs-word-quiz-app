import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

import { LevelSelector, QuizCard, QuizMoreButton } from "@/components/vocabulary";
import { Level, VocabularyType } from "@/types/vocabulary";


type Props = {
  parameters: Record<string, string | number>;
  levelsProps: Array<Level>;
  vocabulariesProps: Array<VocabularyType>;
}

export default function Quiz({ parameters, levelsProps, vocabulariesProps }: Props) {
  const router = useRouter();

  // 레벨별 단어 개수 확인
  const getTotalCount = useCallback((id: string | undefined): number => {
    let cnt = 0;
    cnt = levelsProps.reduce((acc, cur) => { 
      if (id === undefined || id === "undefined") {
        return acc + cur.cnt;
      } else {
        return (cur.level_id === parseInt(id)) ? acc + cur.cnt : acc;
      }
    }, 0);
    return cnt;
  }, []);

  
  const cnt = 3;
  const totalCnt = getTotalCount(parameters.level_id as string);
  const [ showCount, setShowCount ] = useState<number>(totalCnt < cnt ? totalCnt : cnt);
  const [ totalCount, setTotalCount ] = useState<number>(totalCnt);
  const [ selectedLevelId, setSelectedLevelId ] = useState<string | undefined>(parameters.level_id as string);
  const [ vocabularies, setVocabularies ] = useState<Array<VocabularyType>>(vocabulariesProps);
  const [ isFlag, setIsFlag ] = useState<boolean>(false);

  // 단어 데이터 가져오기
  const getVocabularies = useCallback(async (id: string | undefined) => {
    const postData = { method: "GET", headers: { "Content-Type": "application/json", }};
    const response = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz?level_id=${id}&showCnt=${showCount}`, postData)).json();
    return response;
  }, [showCount])


  // 레벨이 변경될떄마다 실행
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(router.asPath.split('?')[1]);
    const existingParam = urlSearchParams.get('level_id');
    if(!isFlag){
      setIsFlag(true);
      
      if (selectedLevelId) {
        if (existingParam) {
          urlSearchParams.set('level_id', selectedLevelId.toString());
        } else {
          urlSearchParams.append('level_id', selectedLevelId.toString());
        }
      } else {
        urlSearchParams.delete('level_id');
      }

      router.push({
        pathname: router.pathname,
        query: urlSearchParams.toString(),
      });
    }
  }, [selectedLevelId, isFlag, router]);

  useEffect(() => {
    const getData = async () => {
      const response = await getVocabularies(selectedLevelId);
      setVocabularies(response.data);
    }
    getData();  
  }, [selectedLevelId, getVocabularies]);
  
  // 레벨 선택 이벤트
  const changeSelectedLevelIdHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLevelId(e.target.value === 'undefined' ? undefined : e.target.value);
    setIsFlag(false);
    const totalCnt = getTotalCount(e.target.value);
    setTotalCount(totalCnt);
    setShowCount(totalCnt === 0 ? 0 : totalCnt < cnt ? totalCnt : cnt);
  }, []);

  // 보기단어 추가 이벤트
  const addVocabulariesHandler = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    if (showCount >= totalCnt) {
      return;
    }

    setShowCount((prev: number) => prev + cnt > totalCnt ? totalCnt : prev + cnt);
  }, [showCount, totalCnt]);

  return (
    <div>
      <LevelSelector items={levelsProps} selectedLevelId={selectedLevelId} changeSelectedLevelIdHandler={changeSelectedLevelIdHandler} />
      {
        vocabularies.map((vocabulary: VocabularyType, index: number) => {
          return (
            <Link key={index} href={`/vocabulary/quiz/${vocabulary.id}`} >
              <QuizCard item={vocabulary} />
            </Link>
          )
        })
      }
      <QuizMoreButton 
        showCount={showCount}
        totalCount={totalCount}
        addVocabulariesHandler={addVocabulariesHandler}
      />
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // 레벨ID
  const { level_id } = context.query;

  const postData = { method: "GET", headers: { "Content-Type": "application/json", } };
  const vocabulariesProps = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/vocabulary/quiz?level_id=${level_id}&showCnt=3`, postData)).json();
  const parameters = { "level_id": level_id }
  if (typeof parameters.level_id === 'undefined') {
    delete parameters.level_id;
  }
  
  return {
    props: {
      parameters: parameters,
      levelsProps: vocabulariesProps.levelData,
      vocabulariesProps: vocabulariesProps.data
    },
  }
}
