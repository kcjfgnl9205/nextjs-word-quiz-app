// 단어레벨타입
export type Level = {
  level_id: number;
  level_name: string;
  cnt: number;
}

// 단어
export type VocabularyType = {
  id: number;
  vocabulary_kanji: string;
  vocabulary_hira: string;
  vocabulary_mean: string;
  vocabulary_level_id: number;
  vocabulary_level_name: string;
  vocabulary_options?: Array<VocabularyOptionType>;
  totalCnt?: number;
  cnt?: number;
}

// 단어 보기
export type VocabularyOptionType = {
  id: number;
  vocabulary_id: number;
  vocabulary_kanji: string;
  vocabulary_hira: string;
  vocabulary_mean: string;
  is_answer: boolean;
  cnt: number;
}
