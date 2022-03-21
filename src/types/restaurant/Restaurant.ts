import { File } from "~/types/file";

export interface Restaurant {
  id: number
  name: string
  address: string
  content: string
  district: string
  explanation: string
  latitude: number
  longitude: number
  operationTime: string
  phoneNumber: string
  price: number
  status: string
  menus: Array<RestaurantMenu>
}

export interface RestaurantMenu {
  name: string
  price: number
  files: Array<File>
}
