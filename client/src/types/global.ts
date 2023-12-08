export type PageParams = {
  current?: number
  pageSize?: number
  [key: string]: any
}

export type PageData<T = any> = {
  list: T[]
  total: number
  current: number
  pageSize: number
}
