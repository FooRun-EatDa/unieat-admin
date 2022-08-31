import { Restaurant } from "~/types";

export interface Event {
  id: number
  name: string
  couponCount: number
  desc: string
  expiredDate: string
  status: string
  notice: Array<string>
  restaurant?: Restaurant
}
