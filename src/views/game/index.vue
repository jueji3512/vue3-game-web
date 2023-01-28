<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getGameDetail } from '@/services/index'
import type { GameDetailType } from '@/types/game'
import { onMounted, ref, computed } from 'vue'

const route = useRoute()
// 数据
const gameDetail = ref<GameDetailType>({
  // 游戏名
  game_name: '',
  // 游戏界面图片
  game_t_img: '',
  // 游戏展示视频
  game_video: '',
  // 游戏描述
  game_dis: '',
  // 下载链接
  game_url: '',
  // 游戏标签
  game_title: '',
  // 激活码
  game_jhm: '',
  // 游戏展示图片
  game_imgs: '',
  // 日期
  date: ''
})
const gameId = Number(route.params.id)
// 计算属性
const gameLink = computed(() => gameDetail.value.game_url.split(';'))
const gameImgs = computed(() =>
  gameDetail.value.game_imgs.split(';').filter((item) => item)
)
const gameTags = computed(() =>
  gameDetail.value.game_title.split(';').filter((item) => item)
)
const gameDescription = computed(() =>
  gameDetail.value.game_dis.replace(/\n/g, '<br/>')
)
// 方法
const getGameDetailInfo = async () => {
  const res = await getGameDetail(gameId)
  gameDetail.value = res.data
  console.log(gameDetail.value.game_title)
}
// 转到夸克/百度网盘
const toQuark = () => {
  window.open(gameLink.value[0])
}
const toBaidu = () => {
  window.open(gameLink.value[1])
}
// 钩子函数
onMounted(() => {
  getGameDetailInfo()
})
</script>

<template>
  <div class="gameTitle">{{ gameDetail?.game_name }}</div>
  <div class="game-container">
    <div class="left-content">
      <t-swiper
        class="tdesign-demo-block--swiper game-swiper"
        :duration="300"
        :interval="2000"
      >
        <t-swiper-item v-for="item in gameImgs" :key="item">
          <div
            class="left-img"
            :style="{ backgroundImage: `url(${item})` }"
          ></div>
        </t-swiper-item>
      </t-swiper>
      <video
        controls
        autoplay
        class="game-video"
        v-if="gameDetail.game_video"
        :src="gameDetail.game_video"
      ></video>
      <div class="left-video" v-else>
        <div class="no-video">
          <t-tag theme="primary" variant="light-outline" size="large"
            >无视频资源</t-tag
          >
        </div>
      </div>
    </div>
    <div class="right-content">
      <p>
        <t-tag size="large" theme="primary">游戏名称</t-tag
        >{{ gameDetail?.game_name }}
      </p>
      <p><t-tag size="large" theme="primary">游戏编号</t-tag>{{ gameId }}</p>
      <p>
        <t-tag size="large" theme="primary">游戏标签</t-tag>
        <template v-for="item in gameTags" :key="item">
          <t-tag class="small-tag" theme="success" variant="light">{{
            item
          }}</t-tag>
        </template>
      </p>
      <p>
        <t-tag size="large" theme="primary">下载链接</t-tag>
        <t-Button theme="warning" style="margin-right: 10px" @click="toQuark"
          >夸克网盘</t-Button
        >
        <t-Button theme="warning" @click="toBaidu">百度网盘</t-Button>
      </p>
      <p>
        <t-tag class="jhm-tag" size="medium" theme="primary" variant="light"
          >激活码</t-tag
        ><t-tag class="jhm-font" size="small">{{ gameDetail.game_jhm }}</t-tag>
      </p>
      <p>
        <t-tag size="large" theme="primary">游戏描述</t-tag><br /><span
          v-html="gameDescription || '无'"
        ></span>
      </p>

      <p class="update-date">
        更新时间：
        {{ gameDetail.date }}
      </p>
      <p></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gameTitle {
  margin: 0 auto;
  margin-bottom: 40px;
  height: 40px;
  width: 800px;
  background-color: #c0c0c0;
  color: #141414;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  box-shadow: 5px 5px;
}
.game-container {
  display: flex;
  justify-content: space-between;
  .left-content {
    width: 640px;
    .game-swiper {
      height: 360px;
      .left-img {
        height: 360px;
        background-size: 100% 100%;
      }
    }
    .left-video {
      position: relative;
      box-sizing: border-box;
      height: 360px;
      margin-top: 20px;
      background-color: #000;
      .no-video {
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
      }
    }
    .game-video {
      width: 640px;
      height: 360px;
      margin-top: 20px;
    }
  }
  .right-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
    width: 540px;
    background-color: #eeeeee;
    color: #000;
    vertical-align: top;
    font-size: 14px;
    p {
      width: 85%;
      margin-top: 10px;
      margin-bottom: 0;
      .t-button {
        vertical-align: top;
      }
    }
    p:nth-child(5) {
      margin-top: 5px;
      height: 30px;
    }
    .update-date {
      position: absolute;
      bottom: 5px;
      height: 14px;
      border-top: 1px solid #c0c0c0;
      font-size: 10px;
      color: #545454;
    }
  }
  .t-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .small-tag {
    margin-right: 5px;
    margin-bottom: 0;
    border: 1px solid;
  }
  .jhm-tag {
    margin-right: 5px;
    margin-bottom: 0;
    background-color: #d8d8bf;
    color: #141414;
  }
  .jhm-font {
    background-color: #c0c0c0;
    color: #141414;
    font-size: 10px;
  }
}
</style>
