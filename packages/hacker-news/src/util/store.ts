import { ref } from 'vue'
import type { HackItem } from './api'

export const current = ref<HackItem>({ id: -1 })

