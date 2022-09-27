import axios from 'axios'

const baseURL = 'https://hacker-news.firebaseio.com/v0/'
const instance = axios.create({ baseURL })

export interface HackItem {
  id: number
  deleted?: boolean
  type?: string
  by?: string
  time?: number
  text?: string
  dead?: boolean
  parent?: number
  poll?: number
  kids?: number[]
  url?: string
  score?: number
  title?: string
  parts?: number[]
  descendants?: number
}

export interface HackComment {
  id?: number
  by?: string
  time?: number
  text?: string
  kids?: HackComment[] | null
}

export const AXIOS_MAX_LIMIT = 32
export default instance
