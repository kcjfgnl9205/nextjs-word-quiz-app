import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db/mysql";

import { Level, VocabularyType } from "@/types/vocabulary";


type ApiResponse = {
  levelData: Array<Level>
  data: Array<VocabularyType>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { level_id, showCnt } = req.query;
  
  // 단어퀴즈 모든 데이터 다져오기(20개씩)
  if (req.method === "GET") {
    // 레벨 데이터 가져오기
    const getLevelSql = `
              WITH VOCABULARY_TABLE AS (
                      SELECT DISTINCT
                             VOCABULARY_MST.level_id
                           , VOCABULARY_MST.vocabulary_id
                       FROM  VOCABULARY_MST
                  INNER JOIN VOCABULARY_OPTION_MST
                          ON VOCABULARY_MST.vocabulary_id = VOCABULARY_OPTION_MST.vocabulary_id
              )
              SELECT LEVEL_MST.level_id
                   , LEVEL_MST.level_name
                   , COUNT(VOCABULARY_TABLE.level_id) AS cnt
                FROM LEVEL_MST
           LEFT JOIN VOCABULARY_TABLE 
                  ON LEVEL_MST.level_id  = VOCABULARY_TABLE.level_id
            GROUP BY LEVEL_MST.level_id, LEVEL_MST.level_name
    `;

    // 레벨별 단어시험 모든 데이터 가져오기.
    const getVocabulariesSql = `
                SELECT  
                      VOCABULARY_MST.vocabulary_id AS id
                    , VOCABULARY_MST.vocabulary_kanji
                    , VOCABULARY_MST.vocabulary_hira
                    , VOCABULARY_MST.vocabulary_mean
                    , LEVEL_MST.level_id AS vocabulary_level_id
                    , LEVEL_MST.level_name AS vocabulary_level_name
                    , COUNT(QUIZ_RESULT.quiz_id) as totalCnt
                    , CONVERT(SUM(CASE WHEN VOCABULARY_OPTION_MST.is_answer AND QUIZ_RESULT.quiz_id IS NOT NULL THEN 1 ELSE 0 END), UNSIGNED INTEGER) cnt
                  FROM VOCABULARY_MST
            INNER JOIN LEVEL_MST
                    ON VOCABULARY_MST.level_id = LEVEL_MST.level_id
            INNER JOIN VOCABULARY_OPTION_MST
                    ON VOCABULARY_MST.vocabulary_id = VOCABULARY_OPTION_MST.vocabulary_id
             LEFT JOIN QUIZ_RESULT
                    ON VOCABULARY_MST.vocabulary_id = QUIZ_RESULT.vocabulary_id
                   AND VOCABULARY_OPTION_MST.option_id = QUIZ_RESULT.option_id
   ${level_id !== "undefined" ? `WHERE VOCABULARY_MST.level_id = ${level_id}` : ""}
              GROUP BY VOCABULARY_MST.vocabulary_id
                     , VOCABULARY_MST.vocabulary_kanji
                     , VOCABULARY_MST.vocabulary_hira
                     , VOCABULARY_MST.vocabulary_mean
                     , LEVEL_MST.level_id
                     , LEVEL_MST.level_name
              ORDER BY VOCABULARY_MST.vocabulary_id
   ${showCnt === undefined ? "LIMIT 3" : `LIMIT ${showCnt}` }
    `;

    const [ vocabularies, levels ] = await Promise.all([
      query({ query: getVocabulariesSql, values: [] }),
      query({ query: getLevelSql, values: [] })
    ]);
    res.status(200).json({ levelData: levels, data: vocabularies });
  }
}
