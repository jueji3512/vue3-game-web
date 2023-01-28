<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Page, GameList } from '@/types/home'
import { getGameList } from '@/services/index'

const router = useRouter()
const loading = ref(false)
const pageSize = ref(12)
const currentPage = ref(1)
const list = ref<GameList>()
const page: Page = {
  currentPage: 1,
  pageSize: 12
}

const clickto = (id: string) => {
  router.push({ name: 'game', params: { id } })
}
const getGameInfoList = async () => {
  loading.value = true
  const res = await getGameList(page)
  list.value = res.data
  loading.value = false
}
const pageChange = () => {
  page.currentPage = currentPage.value
  getGameInfoList()
}
onMounted(() => {
  getGameInfoList()
})
</script>

<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <div class="home-swiper" :style="{ width: '100%' }">
      <t-swiper
        type="card"
        :duration="300"
        :height="280"
        :interval="2000"
        :navigation="{ size: 'large' }"
        loop
      >
        <t-swiper-item class="swiper-item">
          <div class="swiper-img img1" @click="router.push(`/game/1`)"></div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="swiper-img img2" @click="router.push(`/game/2`)"></div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="swiper-img img3" @click="router.push(`/game/3`)"></div>
        </t-swiper-item>
      </t-swiper>
    </div>
    <div class="home-content">
      <template v-for="item in list?.rows" :key="item.id">
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
  <!-- <t-pagination
    v-model="currentPage"
    v-model:pageSize="pageSize"
    @current-change="pageChange"
    :pageSizeOptions="[]"
  /> -->
  <t-pagination
    v-model="currentPage"
    v-model:pageSize="pageSize"
    :total="list?.total"
    @current-change="pageChange"
    :pageSizeOptions="[]"
  />
</template>

<style lang="scss" scoped>
.home-swiper {
  margin-bottom: 50px;
}
.swiper-img {
  height: 100%;
  background-size: 100% 100%;
  cursor: pointer;
}
.img1 {
  background-image: url('@/assets/a.jpg');
}
.img2 {
  background-image: url('@/assets/b.jpg');
}
.img3 {
  background-image: url('@/assets/c.jpg');
}
.home-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.home-card {
  cursor: pointer;
}
</style>
