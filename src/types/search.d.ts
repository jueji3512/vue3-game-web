export interface KeywordSearchType {
  // 游戏名
  game_name: string
  // 游戏id
  game_id: number
}
export type KeywordSearchList = KeywordSearchType[]
export interface SearchResultType extends KeywordSearchType {
  // 游戏封面
  game_t_img: string
}
export type SearchResultList = SearchResultType[]
export type SearchValue = { e: CompositionEvent; value: string }
