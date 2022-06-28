import React, { useState } from "react";
import { HashTag } from "@component/HashTagListGroup/HashTag";
import { useModalContext } from "~/hooks";
import { HashTagType } from "~/types";

interface Props {
  defaultItems: Array<HashTagType>
  onRemove?: (item: HashTagType) => void
}

const HashTagListGroup = ({ defaultItems, onRemove }: Props) => {
  const [ items, setItems ] = useState(defaultItems)
  const { restaurantHashTagModal: { open } } = useModalContext()

  const handleRemoveItem = (index: number) => (item: HashTagType) => {
    onRemove && onRemove(item)
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
