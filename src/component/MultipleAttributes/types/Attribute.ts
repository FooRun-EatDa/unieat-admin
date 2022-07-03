import { AttributeType } from "@component/MultipleAttributes/types/AttributeType";

export interface Attribute {
  key: string
  name: string
  type: AttributeType
  description?: string
}
