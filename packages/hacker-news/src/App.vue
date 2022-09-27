<script setup lang="ts">
import { ref } from 'vue'
import StoryBoard from './components/StoryBoard.vue'
import DetailBox from './components/DetailBox.vue'
import axios from '@/util/api'
import changeTheme from '@/util/theme'

const top500 = ref<number[]>([])
const best500 = ref<number[]>([])
const new500 = ref<number[]>([])

axios.get('topstories.json').then((res) => {
  top500.value = res.data
})
axios.get('beststories.json').then((res) => {
  best500.value = res.data
})
axios.get('newstories.json').then((res) => {
  new500.value = res.data
})
</script>

<template>
  <header class="w-full p-4 border-b-2 flex items-center justify-between">
    <span class="text-2xl">⭐Hacker News⭐</span>
    <div class="text-2xl cursor-pointer" @click="changeTheme">
      ☀
    </div>
  </header>
  <div id="main" class="md:flex w-full min-h-screen mt-1 p-4 gap-2">
    <StoryBoard story-type="Top" :stories="top500" />
    <StoryBoard story-type="New" :stories="new500" />
    <StoryBoard story-type="Best" :stories="best500" />
  </div>
  <DetailBox />
</template>

<style scoped>
#main > div {
  background-color: var(--nord5);
}
</style>
