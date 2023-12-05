export type PageParams = {
  page?: number
  pageSize?: number
}

export type PageData<T = any> = PageParams & {
  list: T[]
  total: number
}
