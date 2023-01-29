<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
  getSearchName,
  getSearchInfo,
  getRecommendGameList
} from '@/services/index'
import { useRouter } from 'vue-router'
import type {
  KeywordSearchList,
  SearchResultList,
  SearchValue
} from '@/types/search'
import { MessagePlugin } from 'tdesign-vue-next'

const router = useRouter()

const emits = defineEmits(['changeMenu'])

const inputBox = ref<HTMLInputElement>()
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

const input = (value: string) => {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    keyword.value = value
    getSearchKeyWordResult(keyword.value)
    clearTimeout(timer.value)
  }, 200)
}
const getSearchKeyWordResult = async (key: string) => {
  const res = await getSearchName(key)
  searchList.value = res.data
  options.value = searchList.value.map((item) => item.game_name)
}
const selectGame = (value: string) => {
  if (value === '') return
  gameId.value = searchList.value?.find(
    (item) => item.game_name === value
  )?.game_id
  router.push(`/game/${gameId.value}`)
}
const enterSearch = async (context: SearchValue) => {
  if (context.value === '') {
    MessagePlugin.error({ content: '搜索值不能为空' })
    return
  }
  const res = await getSearchInfo(context.value)
  if (res.data.length !== 0) {
    isShow.value = false
    searchGameList.value = res.data
  } else {
    isShow.value = true
  }
}
const clickto = (id: number) => {
  router.push({ name: 'game', params: { id } })
}
const shrink = () => {
  shrinkFlag.value = true
}
watch(isShow, async () => {
  const res = await getRecommendGameList()
  recommendGameList.value = res.data
})
onMounted(() => {
  emits('changeMenu', 'item2')
})
</script>

<template>
  <div class="search-container">
    <div :class="['search-title', shrinkFlag ? 'search-title-shrink' : null]">
      搜索
    </div>
    <t-auto-complete
      ref="inputBox"
      class="search"
      v-model="value"
      :options="options"
      highlight-keyword
      :filterable="false"
      placeholder="请输入搜索关键词"
      clearable
      size="large"
      @change="input"
      @select="selectGame"
      @enter="enterSearch"
      @focus="shrink"
    />
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
:deep {
  .t-input {
    border-radius: 20px;
  }
  .t-input__inner,
  .t-input__inner:placeholder-shown {
    text-align: center;
    font-size: 20px;
  }
  .t-card {
    position: relative;
    height: 242.725px;
    overflow: hidden;
  }
  .t-card__cover {
    overflow: hidden;
  }
  .t-card__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 334.4px;
    background-color: #fff;
    border-radius: 0 0 6px 6px;
  }
}
.search-container {
  .search-title {
    height: 40px;
    margin: 240px auto;
    margin-bottom: 10px;
    line-height: 40px;
    color: #141414;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    transition: all 0.5s;
  }
  .search-title-shrink {
    margin: 10px auto;
  }
  .search {
    margin: 0 auto;
    width: 800px;
    transition: all 0.5s;
  }

  .search-result,
  .no-result-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
    .home-card {
      cursor: pointer;
    }
  }
  .t-card:last-child:nth-child(3n-1) {
    margin-right: 34%;
  }
  .no-result-title {
    margin: 20px auto;
    width: 40%;
    text-align: center;
    color: #c0c0c0;
  }
  .no-result-list {
    margin-top: 10px;
  }
}
</style>
