import React from "react";
import { useListGroupContext } from "~/hooks";

interface Props {
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  boldIndices?: Array<number>
  values: Array<{
    width: string
    value?: any
    icon?: string
    align?: 'left' | 'center' | 'right'
    onClick?: () => void
  }>
}

const ListGroupItem = ({ onMouseEnter, onMouseLeave, onClick, values, boldIndices = [ 0 ] }: Props) => {
  const { add, remove, isSelected, items } = useListGroupContext()

  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter()
  }

  const handleMouseLeave = () => {
    onMouseLeave && onMouseLeave()
  }

  const findIndex = () => {
    for (let item of items) {
      if (JSON.stringify(item.props.values) === JSON.stringify(values)) {
        return items.indexOf(item)
      }
    }
    return -1
  }

  const handleClick = () => {
    const index = findIndex()
    if (index > -1) {
      isSelected(index) ? remove(index) : add(index)
    }
  }

  return (
    <div className={["listGroupItem", isSelected(findIndex()) ? "selected" : undefined].filter(name => name!!).join(" ")}
         onClick={handleClick}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>
      {
        values.map((value, index) => {
          const handleClickValue = () => {
            value.onClick && value.onClick()
          }
          return (
            <span
              className={["listGroupItemText", boldIndices?.indexOf(index) !== -1 ? "bold" : undefined].filter(c => c !== undefined).join(" ")}
              key={index}
              style={{ width: value.width, textAlign: value.align }}
              onClick={handleClickValue}>
              {
                value.icon ? <i className={"material-icons"}>{ value.icon }</i> : value.value
              }
            </span>
          )
        })
      }
    </div>
  )
}

export default ListGroupItem
