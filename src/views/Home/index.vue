<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUpdateGameList } from '@/services/index'
import type { SearchResultList } from '@/types/search'

const router = useRouter()
const emits = defineEmits(['changeMenu'])

const updateGameList = ref<SearchResultList>()
const loading = ref(false)

const clickto = (id: number) => {
  router.push({ name: 'game', params: { id } })
}
const getHomeList = async () => {
  loading.value = true
  const res = await getUpdateGameList()
  updateGameList.value = res.data
  loading.value = false
}
onMounted(() => {
  emits('changeMenu', 'item1')
  getHomeList()
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
    <div class="update-list">
      <template v-for="item in updateGameList" :key="item.id">
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
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
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
.update-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 80px;
}
</style>
