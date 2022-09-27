<script setup lang="ts">
import { shallowRef, watch } from 'vue'
// @ts-expect-error async has no type define
import { mapLimit } from 'async-es'
import Comment from './Comment.vue'
import type { HackComment, HackItem } from '@/util/api'
import axios, { AXIOS_MAX_LIMIT } from '@/util/api'

const props = defineProps<{
  ids: number[]
}>()

const comments = shallowRef<HackComment[]>([])
let allHackItems: HackItem[] = []

watch(() => props.ids, (ids) => {
  comments.value = []
  allHackItems = []
  if (!ids || ids.length === 0)
    return

  mapLimit(ids, AXIOS_MAX_LIMIT, async (id: number) => {
    const hackItem = await getComment(id)
    allHackItems.push(hackItem)
    if (hackItem.kids) {
      for (const kidId of hackItem.kids)
        await getAllKids(kidId)
    }
  }, (error: Error, _: HackItem[]) => {
    if (error)
      throw error
    buildCommentTree()
  })
}, { immediate: true })

async function getComment(id: number): Promise<HackItem> {
  return (await axios.get(`item/${id}.json`)).data
}

async function getAllKids(id: number) {
  const current = await getComment(id)
  allHackItems.push(current)
  if (current.kids) {
    for (const kidId of current.kids)
      getAllKids(kidId)
  }
}

function buildCommentTree() {
  // Build from top ids
  const topIds = props.ids
  const finalComments = []
  for (const topId of topIds) {
    const hackItem = allHackItems.filter(item => item.id === topId)[0]
    const comment = convertToComment(hackItem)
    const kids = allHackItems.filter(item => item.parent === topId)
    for (const kid of kids)
      buildChildrenComment(kid, comment)
    finalComments.push(comment)
  }
  comments.value = finalComments
}

function buildChildrenComment(kid: HackItem, comment: HackComment) {
  const kidComment = convertToComment(kid)
  comment.kids?.push(kidComment)
  const grandSons = allHackItems.filter(item => item.parent === kidComment.id)
  for (const grandSon of grandSons)
    buildChildrenComment(grandSon, kidComment)
}

function convertToComment(hackItem: HackItem): HackComment {
  return {
    id: hackItem.id,
    by: hackItem.by,
    time: hackItem.time,
    text: hackItem.text,
    kids: [],
  }
}
</script>

<template>
  <h2 class="mt-2 font-bold">
    Comments:
  </h2>
  <div v-if="comments">
    <Comment v-for="comment in comments" :key="comment?.id" :comment="comment" />
  </div>
  <div v-if="ids && comments.length === 0">
    Loding comments...
  </div>
</template>

<style scoped>

</style>
