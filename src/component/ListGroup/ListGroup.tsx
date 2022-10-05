import React, { ChangeEvent, useState } from "react";
import { Button, TextBox } from "~/component";
import { ColorType } from "@enums";
import { ListGroupContext } from "~/hooks";
import { ClipLoader } from "react-spinners";

interface Props {
  title?: string
  isLoading?: boolean
  onChangeSelectedItems?: (items: Array<number>) => void
  onClickRemove?: () => void
  onClickAdd?: () => void
  onFilterText?: (text: string) => void
  children: JSX.Element | Array<JSX.Element>
  addable?: boolean
  scrollable?: boolean
  selectable?: boolean
}

const ListGroup = ({ title, isLoading, onClickAdd, onClickRemove, addable = true, scrollable = true, children, onChangeSelectedItems, selectable = true, onFilterText }: Props) => {
  const [ selectedItems, setSelectedItems ] = useState<Array<number>>([])

  const addSelectedItems = (index: number) => {
    setSelectedItems(items => {
      if (items.indexOf(index) === -1) {
        const newItems = [ ...items, index ].sort()
        onChangeSelectedItems && onChangeSelectedItems(newItems)
        return newItems
      }
      return items
    })
  }

  const removeSelectedItems = (index: number) => {
    setSelectedItems(items => {
      if (items.indexOf(index) !== -1) {
        const newItems = [
          ...items.filter(item => item !== index)
        ]
        onChangeSelectedItems && onChangeSelectedItems(newItems)
        return newItems
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
    onClickRemove && onClickRemove()
  }

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterText && onFilterText(e.target.value)
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
          <div className={"searchBox"}>
            <TextBox
              onChange={handleChangeSearchInput}
            />
          </div>
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
                    onClick={handleClickRemove} />
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
        {
          isLoading ? (
            <div className={"loader"}>
              <ClipLoader loading={true} size={50} color={"#FBB734"} />
            </div>
          ) : (
            <div className={["listGroup", scrollable ? "scrollable" : undefined].filter(name => !!name).join(" ")}>
              { children }
            </div>
          )
        }
      </div>
    </ListGroupContext.Provider>
  )
}

export default ListGroup
