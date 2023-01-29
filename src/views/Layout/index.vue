<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const menuValue = ref('')
const overDistance = ref(false)
const returnTop = () => {
  window.scrollTo(0, 0)
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
const handleScroll = () => {
  const winHeight = document.documentElement.scrollTop
  overDistance.value = winHeight >= 400 ? true : false
}
const changeMenu = (value: string) => {
  menuValue.value = value
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
            <h1 style="margin-left: 30px">HLGame</h1>
          </template>
          <t-menu-item value="item1" to="/home"> 首页 </t-menu-item>
          <t-menu-item value="item2" to="/library"> 游戏库 </t-menu-item>
          <t-menu-item value="item3" to="/search"
            ><t-icon class="icon" name="search"
          /></t-menu-item>
        </t-head-menu>
      </t-header>
    </t-layout>
    <div class="wrapper">
      <RouterView @changeMenu="changeMenu"></RouterView>
    </div>
    <div v-show="overDistance" class="affix" @click="returnTop">
      <t-icon name="chevron-up"></t-icon>返回顶部
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  svg {
    vertical-align: text-top;
  }
}
.wrapper {
  width: 1200px;
  margin: 30px auto;
}

.icon {
  font-size: 20px;
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
