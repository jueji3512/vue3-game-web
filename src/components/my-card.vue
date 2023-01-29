<script setup lang="ts">
import { ref, defineProps } from 'vue'

const loading = ref(false)
const isShow = ref(false)
const props = defineProps({cardGameList, })
</script>

<template>
  <div v-if="!isShow" class="card-list">
    <template v-for="item in props.cardGameList" :key="item.id">
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
</template>

<style lang="scss" scoped></style>
