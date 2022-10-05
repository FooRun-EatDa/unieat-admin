import { FileDetail } from "~/types/FileDetail";
import { CategoryCode } from "~/types";

export interface Restaurant {
  id: number
  name: string
  address: string
  content: string
  district: string
  category: CategoryCode
  explanation: string
  latitude: number
  longitude: number
  operationTime: string
  phoneNumber: string
  districtCode: string
  price: number
  status: string
  foods: Array<RestaurantFood>
  reviews?: Array<any>
  feelings?: Array<any>
  hashTags?: Array<string>
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

export interface RestaurantBusinessHour {
  restaurantId: number
  content: string
  sequence: number
}

export interface RestaurantHashTag {
  restaurantId: number
  hashTagId: number
  content: string
}
