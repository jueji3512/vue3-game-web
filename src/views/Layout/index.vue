<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
const menuValue = ref('item1')
const overDistance = ref(false)
const returnTop = () => {
  window.scrollTo(0, 0)
}
const route = useRoute()
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUpdated(() => {
  if (route.path !== '/home') {
    menuValue.value = ''
  }
})
const handleScroll = () => {
  const winHeight = document.documentElement.scrollTop
  overDistance.value = winHeight >= 400 ? true : false
}
</script>

<template>
  <div class="my-game">
    <t-layout>
      <t-header>
        <t-head-menu
          theme="dark"
          value="item1"
          height="120px"
          v-model="menuValue"
        >
          <template #logo>
            <h1 style="margin-left: 30px">何安阳Game</h1>
          </template>
          <t-menu-item value="item1" to="/home"> 首页 </t-menu-item>
          <!-- <t-menu-item value="item2" to="/recommend"> 推荐 </t-menu-item>
          <t-menu-item value="item3"> 动作冒险 </t-menu-item>
          <t-menu-item value="item4"> 动作冒险 </t-menu-item>
          <t-menu-item value="item5"> 动作冒险 </t-menu-item> -->
          <template #operations>
            <a href="/search"
              ><t-icon class="t-menu__operations-icon" name="search"
            /></a>
            <!-- <a href="javascript:;"
              ><t-icon
                class="t-menu__operations-icon"
                name="notification-filled"
            /></a> -->
            <a href="/home"
              ><t-icon class="t-menu__operations-icon" name="home"
            /></a>
          </template>
        </t-head-menu>
      </t-header>
    </t-layout>
    <div class="wrapper">
      <RouterView></RouterView>
    </div>
    <div v-show="overDistance" class="affix" @click="returnTop">
      <t-icon name="chevron-up"></t-icon>返回顶部
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 1200px;
  margin: 30px auto;
}
.affix {
  position: fixed;
  top: 490px;
  right: 20px;
  padding-top: 5px;
  padding-bottom: 10px;
  width: 30px;
  height: 120px;
  text-align: center;
  box-sizing: border-box;
  line-height: 20px;
  cursor: pointer;
  color: #fff;
  background-color: #0052d9;
  border: 1px solid #606060;
}
</style>
