import { request } from '@/utils/request'
import type { GameList, Page } from '@/types/home'
import type { GameDetailType } from '@/types/game'

// 获取某页数据信息
export const getGameList = (page: Page) => {
  return request<GameList>('/game/gamelist', 'get', page)
}
// 由某游戏id获取该游戏详细信息
export const getGameDetail = (id: number) => {
  return request<GameDetailType>('/id_info', 'get', { game_id: id })
}
