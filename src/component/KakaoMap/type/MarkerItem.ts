import { Coordinate } from "~/types";

export interface MarkerItem {
  title?: string
  content?: string
  url?: string
  coordinate: Coordinate
}
