import React, { useState } from "react";
import { HashTag } from "@component/HashTagListGroup/HashTag";
import { useModalContext } from "~/hooks";

interface Props {
  defaultItems: Array<Property | string>
}

interface Property {
  text: string
  value: any
}

const HashTagListGroup = ({ defaultItems }: Props) => {
  const [ items, setItems ] = useState(defaultItems)
  const { restaurantHashTagModal: { open } } = useModalContext()

  const handleRemoveItem = (index: number) => (item: Property | string) => {
    console.log(index)
  }

  const handleClickAdd = () => {
    open()
  }

  return (
    <div
      className={["hashTagListGroup"].filter(c => c !== null).join(" ")}>
      <label className={"label"}>해시태그 목록</label>
      <div className={"wrapper"}>
        {
          defaultItems.map((item, index) => {
            return (
              <HashTag key={item.toString()} item={item} onRemove={handleRemoveItem(index)} />
            )
          })
        }
        <div className={"hashTag virtual"} onClick={handleClickAdd}>
          <i className={"material-icons addIcon"} onClick={handleClickAdd}>add</i>
          <span className={"text"}>태그 추가하기</span>
        </div>
      </div>
    </div>
  )
}

export default HashTagListGroup
