<script setup lang="ts">
import { ref } from 'vue'
import type { HackItem } from '@/util/api'
import axios from '@/util/api'
import Glasses from '~icons/akar-icons/glasses'
import { current } from '@/util/store'

const props = defineProps<{
  storyId: number
}>()

const storyContent = ref<HackItem>({ id: props.storyId })

axios.get(`item/${props.storyId}.json`).then((res) => {
  storyContent.value = res.data
})

function checkDetail() {
  current.value = storyContent.value
}
</script>

<template>
  <div v-if="storyContent.title" class="story flex flex-col rounded-md mt-1 p-2 shadow-sm">
    <a class="no-underline cursor-pointer title rounded-md" :href="storyContent?.url" target="_blank">
      {{ storyContent?.title }}
    </a>
    <div class="text-sm font-extralight break-words first-letter:text-lg" v-html="storyContent?.text" />
    <div class="footer text-xs flex flex-row justify-between">
      <div>
        {{ storyContent?.score }} points by {{ storyContent?.by }},
        {{ storyContent.time ? new Date(storyContent.time * 1000).toLocaleDateString() : '' }}
        <Glasses class="inline-block ml-2 cursor-pointer" @click="checkDetail" />
      </div>

      <div class="comment cursor-pointer" @click="checkDetail">
        {{ storyContent.kids ? `${storyContent.kids.length}comments` : "" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.story {
    background-color: var(--nord4);
}
.title {
    transition: all .2s ease-in-out;
}
.title:hover {
    background-color: var(--nord9);
    padding: 4px;
    transition: all .2s ease-in-out;
}
.footer {
    color: var(--nord9);
}
.comment {
    color: var(--nord10);
}
</style>
