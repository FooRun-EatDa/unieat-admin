export interface Filter {
  text: string
  key: string
  items: Array<FilterItem>
}

export interface FilterItem {
  text: string
  value: any
  checked?: boolean
}
