<script setup lang="ts">
import { ref, watch } from 'vue'
import Story from './Story.vue'
defineProps<{
  storyType: string
  stories: number[]
}>()

const pageSize = 20
const currentPage = ref(0)

const board = ref<any>(null)

watch(currentPage, () => {
  board.value?.scrollIntoView({ behavior: 'smooth' })
  // window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div ref="board" v-auto-animate class="flex-1 overflow-hidden rounded-md p-1 shadow-md flex flex-col h-fit">
    <span class="font-bold text-center">
      {{ storyType }}
    </span>
    <div class="flex justify-between">
      <span class="cursor-pointer border-b-2 border-sky-600 ml-1" @click="currentPage > 0 && currentPage--">
        Pre
      </span>
      <span class="cursor-pointer border-b-2 border-sky-600 mr-1" @click="currentPage++">
        Next
      </span>
    </div>
    <Story
      v-for="storyId in stories.slice(currentPage * pageSize, (currentPage + 1) * pageSize)"
      :key="storyId" :story-id="storyId"
    />
    <div class="flex justify-around mt-1">
      <span class="cursor-pointer border-b-2 border-sky-600" @click="currentPage > 0 && currentPage--">
        Pre
      </span>
      <span>
        Page: {{ currentPage + 1 }}
      </span>
      <span class="cursor-pointer border-b-2 border-sky-600" @click="currentPage++">
        Next
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
