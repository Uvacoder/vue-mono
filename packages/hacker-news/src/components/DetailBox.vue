<script setup lang="ts">
import CommentBoard from './CommentBoard.vue'
import { current } from '@/util/store'

function clearCurrent() {
  current.value = { id: -1 }
}
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="current.id !== -1"
        class="fixed
      top-0 bottom-0 left-0 right-0
      bg-gray-500/50"
        @click="clearCurrent"
      >
        <div
          class="fixed box
      top-12 left-2 right-2 bottom-12 overflow-y-auto overflow-x-hidden md:left-10 md:right-10
      p-4 rounded-lg shadow-md"
          @click="$event.stopPropagation()"
        >
          <a class=" text-2xl no-underline cursor-pointer rounded-md" :href="current?.url" target="_blank">
            {{ current?.title }}
          </a>
          <div class="text-sm font-extralight break-words first-letter:text-lg border-b-2" v-html="current?.text" />
          <CommentBoard v-if="current.kids" :ids="current.kids" />
          <div class="footer text-xs flex flex-row justify-between mt-2">
            <div>
              {{ current?.score }} points by {{ current?.by }},
              {{ current.time ? new Date(current.time * 1000).toLocaleDateString() : '' }}
            </div>
            <div class="cursor-pointer" @click="clearCurrent">
              close
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.box {
    background-color: var(--nord4);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
