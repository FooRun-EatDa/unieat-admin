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
  sequence?: number
  content?: string
  status?: string
  createdAt?: string
  updatedAt?: string
  delete?: boolean
  files: Array<FileDetail>
}
