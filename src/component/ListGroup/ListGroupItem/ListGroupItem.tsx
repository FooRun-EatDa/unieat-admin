import React from "react";

interface Props {
  onClick?: () => void
  values: Array<{
    width: string
    value: any
  }>
}

const ListGroupItem = ({ onClick, values }: Props) => {
  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <div className={"listGroupItem"} onClick={handleClick}>
      {
        values.map((value, index) => {
          return (
            <span className={"listGroupItemText"} key={index} style={{ width: value.width }}>{ value.value }</span>
          )
        })
      }
    </div>
  )
}

export default ListGroupItem
