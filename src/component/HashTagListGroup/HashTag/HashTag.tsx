import React from "react";

interface Props {
  item: Property | string
  clickable?: boolean
  selected?: boolean
  onClick?: () => void
  onRemove?: (item: Property | string) => void
}

interface Property {
  text: string
  value: any
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
      {
        typeof item === "string" ? (
          <span key={item} className={"text"}>{ item }</span>
        ) : (
          <span key={item.value} className={"text"}>{ item.text }</span>
        )
      }
      {
        onRemove && <i className={"material-icons removeIcon"} onClick={handleClickDelete}>delete</i>
      }
    </div>
  )
}

export default HashTag
