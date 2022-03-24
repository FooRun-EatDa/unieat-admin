import { FileDetail } from "~/types/FileDetail";

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
  foods: Array<RestaurantFood>
}

export interface RestaurantFood {
  name: string
  price: number
  files: Array<FileDetail>
}
