import React from "react";
import { HashTagType } from "~/types";

interface Props {
  item: HashTagType
  clickable?: boolean
  selected?: boolean
  onClick?: () => void
  onRemove?: (item: HashTagType) => void
}

const HashTag = ({ item, onClick, onRemove, clickable = false, selected = false }: Props) => {
  const handleClick = () => {
    onClick && onClick()
  }

  const handleClickDelete = () => {
    if (onRemove) {
      if (window.confirm(`태그를 삭제하시겠습니까?`)) {
        onRemove(item)
      }
    }
  }

  return (
    <div className={["hashTag", clickable ? "clickable" : undefined, selected ? "selected" : undefined].filter(name => name !== undefined).join(" ")} onClick={handleClick}>
      <span key={`${item.content}${item.id}`} className={"text"}>{ item.content }</span>
      {
        onRemove && <i className={"material-icons removeIcon"} onClick={handleClickDelete}>delete</i>
      }
    </div>
  )
}

export default HashTag
