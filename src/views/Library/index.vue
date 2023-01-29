<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getLibraryGameList } from '@/services/index'
import type { Page, GameList } from '@/types/home'
import { ref, onMounted } from 'vue'

const router = useRouter()
const emits = defineEmits(['changeMenu'])

const list = ref<GameList>()
const pageSize = ref(12)
const currentPage = ref(1)
const page: Page = {
  currentPage: 1,
  pageSize: 12
}
const loading = ref(false)

const getGameInfoList = async () => {
  loading.value = true
  const res = await getLibraryGameList(page)
  list.value = res.data
  loading.value = false
}
const clickto = (id: string) => {
  router.push({ name: 'game', params: { id } })
}
const pageChange = () => {
  page.currentPage = currentPage.value
  getGameInfoList()
}
onMounted(() => {
  emits('changeMenu', 'item2')
  getGameInfoList()
})
</script>

<template>
  <div class="library-container">
    <div class="library-title">游戏库</div>
    <div class="library-content">
      <template v-for="item in list?.rows" :key="item.id">
        <t-card
          class="library-card"
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
    <t-pagination
      v-model="currentPage"
      v-model:pageSize="pageSize"
      :total="list?.total"
      @current-change="pageChange"
      :pageSizeOptions="[]"
      show-jumper
    />
  </div>
</template>

<style lang="scss" scoped>
:deep {
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
.library-container {
  .library-title {
    margin: 0 auto;
    margin-bottom: 30px;
    height: 40px;
    width: 800px;
    background-color: #c0c0c0;
    color: #141414;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    box-shadow: 5px 5px;
  }
  .library-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .library-card {
    cursor: pointer;
  }
  .t-card:last-child:nth-child(3n-1) {
    margin-right: 34%;
  }
}
</style>
