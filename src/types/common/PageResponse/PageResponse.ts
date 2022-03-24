export interface PageResponse<T> {
  content: Array<T>
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  totalElements: number
  totalPages: number
}
