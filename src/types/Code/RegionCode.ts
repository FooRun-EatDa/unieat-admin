export interface RegionCode {
  id: number
  name: string
  sido: number
  sigungu: number
  umd: number
  fullName: string
  coordinate: {
    latitude: number,
    longitude: number
  }
}
