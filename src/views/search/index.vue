<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
  getSearchName,
  getSearchInfo,
  getUpdateGameList
} from '@/services/index'
import { useRouter } from 'vue-router'
import type { KeywordSearchList, SearchResultList } from '@/types/search'
import { MessagePlugin } from 'tdesign-vue-next'

const router = useRouter()

const emits = defineEmits(['changeMenu'])

const value = ref('')
const options = ref<string[]>()
const timer = ref()
const keyword = ref('')
const gameId = ref<number>()
const isShow = ref(false)
const searchList = ref<KeywordSearchList>()
const searchGameList = ref<SearchResultList>()
const loading = ref(false)
const recommendGameList = ref<SearchResultList>()
const shrinkFlag = ref(false)

const getSearchKeyWordResult = async (key: string) => {
  const res = await getSearchName(key)
  searchList.value = res.data
  options.value = searchList.value.map((item) => item.game_name)
}
const selectGame = (game: string) => {
  console.log(game)
  if (game === '') return
  gameId.value = searchList.value?.find(
    (item) => item.game_name === game
  )?.game_id
  router.push(`/game/${gameId.value}`)
}
const enterSearch = async () => {
  if (value.value === '') {
    MessagePlugin.error({ content: '搜索值不能为空' })
    return
  }
  const res = await getSearchInfo(value.value)
  if (res.data.length !== 0) {
    isShow.value = false
    searchGameList.value = res.data
    value.value = ''
  } else {
    value.value = ''
    isShow.value = true
  }
}
const clickto = (id: number) => {
  router.push({ name: 'game', params: { id } })
}
const shrink = () => {
  shrinkFlag.value = true
}
const returnOrigin = () => {
  shrinkFlag.value = false
}
const clear = () => {
  value.value = ''
  shrinkFlag.value = false
}
watch(isShow, async () => {
  const res = await getUpdateGameList()
  recommendGameList.value = res.data
})
watch(value, () => {
  if (value.value) searchGameList.value = []
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    keyword.value = value.value
    getSearchKeyWordResult(keyword.value)
    clearTimeout(timer.value)
  }, 200)
})
onMounted(() => {
  emits('changeMenu', 'item3')
})
</script>

<template>
  <div class="search-container">
    <div :class="['search-title', shrinkFlag ? 'search-title-shrink' : null]">
      搜索
    </div>
    <div
      class="input-content"
      :class="['search', shrinkFlag ? 'search-shrink' : null]"
    >
      <input
        class="input-box"
        type="text"
        placeholder="请输入搜索关键词"
        v-model.trim="value"
        spellcheck="false"
        @focus="shrink"
        @blur="returnOrigin"
        @keydown.enter="enterSearch"
        @keydown.esc="clear"
      />
      <div class="input-result-list" v-show="value?.length && options?.length">
        <div class="result-list" v-for="(item, id) in options" :key="id">
          <div class="result" @click="selectGame(item)">{{ item }}</div>
        </div>
      </div>
    </div>
    <div v-if="!isShow" class="search-result">
      <template v-for="item in searchGameList" :key="item.id">
        <t-card
          class="home-card"
          :cover="item.game_t_img"
          theme="poster2"
          :style="{ width: '384px', marginBottom: '20px' }"
          @click="clickto(item.game_id)"
          :loading="loading"
        >
          <template #footer>
            <t-comment :author="item.game_name" />
          </template>
        </t-card>
      </template>
    </div>
    <div v-else class="no-result">
      <div class="no-result-title">无搜索结果，但是推荐新更新游戏</div>
      <div class="close" @click=";(recommendGameList = []), (isShow = false)">
        关闭
      </div>
      <div class="no-result-list">
        <template v-for="item in recommendGameList" :key="item.id">
          <t-card
            class="home-card"
            :cover="item.game_t_img"
            theme="poster2"
            :style="{ width: '384px', marginBottom: '20px' }"
            @click="clickto(item.game_id)"
            :loading="loading"
          >
            <template #footer>
              <t-comment :author="item.game_name" />
            </template>
          </t-card>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.search-container {
  position: relative;
  .search-title {
    height: 40px;
    margin: 240px auto;
    margin-bottom: 10px;
    line-height: 40px;
    color: #141414;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    transition: all 1s;
  }
  .search-title-shrink {
    margin: 10px auto;
  }
  .input-content {
    width: 800px;
    position: absolute;
    top: 50px;
    left: 200px;
    z-index: 9999999;
    .input-box {
      width: 100%;
      height: 40px;
      border-radius: 30px;
      text-align: center;
      font-size: 20px;
      color: rgba(0, 0, 0, 90%);
      border: 0.8px solid #ddd;
      box-shadow: 0px 1px 40px 0px rgba(0, 0, 0, 0.2);
    }
    .input-box:focus {
      outline: none;
    }
    .input-result-list {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      margin: 10px auto;
      padding: 15px 15px 15px 15px;
      width: 760px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
      .result-list {
        width: 100%;
        .result {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
        }
      }
      .result:hover {
        background-color: #c0c0c0;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .search-result,
  .no-result-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 80px;
  }
  .no-result-title {
    margin: 60px auto 0;
    width: 40%;
    text-align: center;
    color: #c0c0c0;
  }
  .close {
    margin: 0 0 0 1140px;
    width: 60px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #141414;
    background-color: #ddd;
    border-radius: 3px;
    cursor: pointer;
  }
  .no-result-list {
    margin-top: 10px;
  }
}
</style>
