export interface Event {
  id: number
  name: string
  restaurantName: string
  couponCount: number
  desc: string
  expiredDate: string
  status: string
  notice: Array<string>
}
