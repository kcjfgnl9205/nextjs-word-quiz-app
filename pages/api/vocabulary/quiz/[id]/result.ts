import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db/mysql";

import { VocabularyOptionType, VocabularyType } from "@/types/vocabulary";


type ApiResponse = {
  data: VocabularyType;
  data_options: Array<VocabularyOptionType>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;
  // 단어퀴즈 해당하는 데이터 가져오기
  if (req.method === "GET") {
    // 단어퀴즈 데이터 가져오기.
    const getVocabulary = `
          SELECT
                 VOCABULARY_MST.vocabulary_id AS id
               , VOCABULARY_MST.vocabulary_kanji
               , VOCABULARY_MST.vocabulary_hira
               , VOCABULARY_MST.vocabulary_mean
               , LEVEL_MST.level_id AS vocabulary_level_id
               , LEVEL_MST.level_name AS vocabulary_level_name
            FROM VOCABULARY_MST
      INNER JOIN LEVEL_MST
              ON VOCABULARY_MST.level_id = LEVEL_MST.level_id
           WHERE VOCABULARY_MST.vocabulary_id = ?
        ORDER BY VOCABULARY_MST.vocabulary_id
    `;

    // 해당단어에 해당하는 보기 리스트
     const getVocabularyOptions = `
           SELECT VOCABULARY_OPTION_MST.option_id AS id
                , VOCABULARY_MST.vocabulary_id
                , VOCABULARY_MST_SUB.vocabulary_kanji
                , VOCABULARY_MST_SUB.vocabulary_hira
                , VOCABULARY_MST_SUB.vocabulary_mean
                , VOCABULARY_OPTION_MST.is_answer
                , COUNT(QUIZ_RESULT.quiz_id) AS cnt
             FROM VOCABULARY_MST
       INNER JOIN VOCABULARY_OPTION_MST
               ON VOCABULARY_MST.vocabulary_id = VOCABULARY_OPTION_MST.vocabulary_id
       INNER JOIN VOCABULARY_MST AS VOCABULARY_MST_SUB
               ON VOCABULARY_OPTION_MST.vocabulary_option_id = VOCABULARY_MST_SUB.vocabulary_id
        LEFT JOIN QUIZ_RESULT
               ON VOCABULARY_MST.vocabulary_id = QUIZ_RESULT.vocabulary_id
              AND VOCABULARY_OPTION_MST.option_id = QUIZ_RESULT.option_id
            WHERE VOCABULARY_MST.vocabulary_id = ?
         GROUP BY VOCABULARY_OPTION_MST.option_id
                , VOCABULARY_MST.vocabulary_id
                , VOCABULARY_MST_SUB.vocabulary_kanji
                , VOCABULARY_MST_SUB.vocabulary_hira
                , VOCABULARY_MST_SUB.vocabulary_mean
                , VOCABULARY_OPTION_MST.is_answer
         ORDER BY VOCABULARY_OPTION_MST.option_id
    `;

    const [ vocabulary, data_options ] = await Promise.all([
      query({ query: getVocabulary, values: [id] }),
      query({ query: getVocabularyOptions, values: [id] }),
    ]);
    res.status(200).json({ data: vocabulary, data_options: data_options });
  }
}
