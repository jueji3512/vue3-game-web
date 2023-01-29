<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Page, GameList } from '@/types/home'
import { getGameList } from '@/services/index'

const router = useRouter()
const emits = defineEmits(['changeMenu'])
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
  emits('changeMenu', 'item1')
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
          <div class="swiper-img img1" @click="router.push(`/game/584`)"></div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="swiper-img img2" @click="router.push(`/game/133`)"></div>
        </t-swiper-item>
        <t-swiper-item>
          <div class="swiper-img img3" @click="router.push(`/game/28`)"></div>
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
  <t-pagination
    v-model="currentPage"
    v-model:pageSize="pageSize"
    :total="list?.total"
    @current-change="pageChange"
    :pageSizeOptions="[]"
    show-jumper
  />
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
.home-swiper {
  margin-bottom: 50px;
}
.swiper-img {
  height: 100%;
  background-size: 100% 100%;
  cursor: pointer;
}
.img1 {
  background-image: url('https://cdn.cloudflare.steamstatic.com/steam/apps/374320/ss_5efd318b85a3917d1c6e717f4cb813b47547cd6f.1920x1080.jpg?t=1644436409');
}
.img2 {
  background-image: url('https://media.st.dl.eccdnx.com/steam/apps/1687950/ss_a3258aba84ae2f2ff13a02a160f7495bfc152adb.1920x1080.jpg?t=1666095400');
}
.img3 {
  background-image: url('https://media.st.dl.eccdnx.com/steam/apps/1817190/ss_02bb2ac97c3ce854344a537d9ed89c70ba45c3d3.1920x1080.jpg?t=1668787110');
}
.home-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.home-card {
  cursor: pointer;
}
.t-card:last-child:nth-child(3n-1) {
  margin-right: 34%;
}
</style>
