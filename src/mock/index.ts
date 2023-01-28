import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import type { GameList, Page } from '@/types/home'

const rules: MockMethod[] = [
  {
    url: '/game/gameDetail',
    method: 'get',
    timeout: 1000,
    response: ({ query }: { query: any }) => {
      const { id } = query
      const data = Mock.mock({
        imgSrc: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
        videoSrc: '视频地址',
        id: `${id}`,
        name: '@ctitle(3, 6)',
        description: '@ctitle(10,40)',
        download: 'http://www.baidu.com'
      })
      return {
        code: 10000,
        message: '获取数据成功',
        data
      }
    }
  },
  {
    url: '/game/gameList',
    method: 'get',
    timeout: 1000,
    response: ({ query }: { query: Page }) => {
      const { currentPage, pageSize } = query
      const data: GameList = { total: 46, rows: [] }
      for (
        let i = (currentPage - 1) * pageSize;
        i <
        (currentPage * pageSize <= data.total
          ? currentPage * pageSize
          : data.total);
        i++
      ) {
        data.rows.push(
          Mock.mock({
            id: `${i + 1}`,
            name: '@cname(3,6)',
            imgSrc: '@image("400x225")'
          })
        )
      }
      return {
        code: 10000,
        message: '获取数据成功',
        data
      }
    }
  }
]

export default rules
