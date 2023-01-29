import { request } from '@/utils/request'
import type { GameList, Page } from '@/types/home'
import type { GameDetailType } from '@/types/game'
import type { KeywordSearchList, SearchResultList } from '@/types/search'

// 获取某页数据信息
export const getLibraryGameList = (page: Page) => {
  return request<GameList>('/api/game_list', 'get', page)
}
// 由某游戏id获取该游戏详细信息
export const getGameDetail = (id: number) => {
  return request<GameDetailType>('/api/id_info', 'get', { game_id: id })
}
// 由搜索关键词获取符合关键词的游戏名
export const getSearchName = (keyword: string) => {
  return request<KeywordSearchList>('/api/search/searchKeyword', 'get', {
    keyword
  })
}
// 由搜索值获取带有关键词的游戏信息
export const getSearchInfo = (keyword: string) => {
  return request<SearchResultList>('/api/search/result', 'get', { keyword })
}
// 无搜索结果，推荐游戏列表
export const getUpdateGameList = () => {
  return request<SearchResultList>('/api/update_list', 'get')
}
