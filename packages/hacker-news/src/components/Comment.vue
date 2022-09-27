<script setup lang="ts">
import type { HackComment } from '@/util/api'

defineProps<{
  comment: HackComment
}>()
</script>

<template>
  <div v-if="comment && comment.text && comment.by" class="mt-2 p-2 border-2 shadow-md rounded-md">
    <div v-html="comment.text" />
    <div class="flex justify-end">
      By {{ comment.by }}, at {{ comment.time
        ? new Date(comment.time * 1000).toLocaleDateString() : '' }}
    </div>
    <div v-if="comment.kids">
      <Comment v-for="kid in comment.kids" :key="kid?.id" :comment="kid" />
    </div>
  </div>
</template>

<style scoped>

</style>
