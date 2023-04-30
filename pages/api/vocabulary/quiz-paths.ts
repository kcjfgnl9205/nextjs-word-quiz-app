import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db/mysql";


type ApiResponse = {
  vocabularyId: Array<string>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    const getVocabularyId = `
          SELECT DISTINCT 
                 VOCABULARY_MST.vocabulary_id AS id
            FROM VOCABULARY_MST
      INNER JOIN VOCABULARY_OPTION_MST
              ON VOCABULARY_MST.vocabulary_id = VOCABULARY_OPTION_MST.vocabulary_id
    `;

    const [ vocabularyId ] = await Promise.all([
      query({ query: getVocabularyId, values: [] }),
    ]);
    res.status(200).json({ vocabularyId: vocabularyId });
  }
}
