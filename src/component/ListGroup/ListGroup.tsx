import React, { useState } from "react";
import { Button } from "~/component";
import { ColorType } from "@enums";
import { ListGroupContext } from "~/hooks";

interface Props {
  title?: string
  onClickAdd?: () => void
  children: JSX.Element | Array<JSX.Element>
  addable?: boolean
  scrollable?: boolean
  selectable?: boolean
}

const ListGroup = ({ title, onClickAdd, addable = true, scrollable = true, children, selectable = true }: Props) => {
  const [ selectedItems, setSelectedItems ] = useState<Array<number>>([])

  const addSelectedItems = (index: number) => {
    setSelectedItems(items => {
      if (items.indexOf(index) === -1) {
        return [ ...items, index ].sort()
      }
      return items
    })
  }

  const removeSelectedItems = (index: number) => {
    setSelectedItems(items => {
      if (items.indexOf(index) !== -1) {
        return [
          ...items.filter(item => item !== index)
        ]
      }
      return items
    })
  }

  const containsSelectedItem = (index: number) => {
    return selectedItems.indexOf(index) !== -1
  }

  const handleClickAdd = () => {
    onClickAdd && onClickAdd()
  }

  const handleClickRemove = () => {
    onClickAdd && onClickAdd()
  }

  return (
    <ListGroupContext.Provider value={{
      items: children instanceof Array ? children : [children],
      add: addSelectedItems,
      remove: removeSelectedItems,
      isSelected: containsSelectedItem,
      selectedItems, }}>
      <div className={"listGroupWrapper"}>
        <div className={"listGroupHeader"}>
          <h4 className={"listGroupTitle"}>{ title ? title : "목록" }</h4>
          <div className={"buttons"}>
            {
              selectable && selectedItems.length !== 0 && (
                <>
                  <span className={"selectedCount"}>{selectedItems.length}개 선택됨</span>
                  <Button
                    icon={"remove_circle_outline"}
                    text={"삭제하기"}
                    iconWithText={true}
                    color={ColorType.DANGER}
                    onClick={handleClickAdd} />
                </>
              )
            }
            {
              addable && <Button
                icon={"add_circle_outline"}
                text={"추가하기"}
                iconWithText={true}
                color={ColorType.PRIMARY}
                onClick={handleClickAdd} />
            }
          </div>
        </div>
        <div className={["listGroup", scrollable ? "scrollable" : undefined].filter(name => !!name).join(" ")}>
          { children }
        </div>
      </div>
    </ListGroupContext.Provider>
  )
}

export default ListGroup
