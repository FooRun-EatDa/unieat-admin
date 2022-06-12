import React from "react";

interface Props {
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  values: Array<{
    width: string
    value: any
  }>
}

const ListGroupItem = ({ onMouseEnter, onMouseLeave, onClick, values }: Props) => {
  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter()
  }

  const handleMouseLeave = () => {
    onMouseLeave && onMouseLeave()
  }

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <div className={"listGroupItem"} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
