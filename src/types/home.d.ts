export type Page = {
  currentPage: number
  pageSize: number
}
export type GameList = {
  total: number
  rows: { game_name: string; game_id: string; game_t_img: string }[]
}
