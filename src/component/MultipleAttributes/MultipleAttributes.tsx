import React, { useEffect, useState } from "react";
import { Button, MultipleAttributesColumn } from "~/component";
import { ColorType } from "@enums/ColorType";
import { MultipleAttributesRow } from "@component";
import { Attribute } from "@component/MultipleAttributes/types";

interface Props<T> {
  isEdit: boolean
  label: string
  empty: T
  defaultItems?: Array<T>
  attributes: Array<Attribute>
  onClickEdit?: Function
  onClickSave?: (items: Array<T>) => void
}

const MultipleAttributes = <T extends object>({ isEdit, empty, label, attributes, defaultItems = [], onClickEdit, onClickSave }: Props<T>) => {
  const [ items, setItems ] = useState<Array<T>>(defaultItems)

  useEffect(() => {
    setItems(defaultItems)
  }, [ defaultItems ])

  const handleClickAddIcon = () => {
    const newItem = Object.assign({}, empty, { newly: true })
    const newItems = [...items].concat(newItem)
    setItems(() => newItems)
  }

  const handleChangeAttribute = (item: any, attribute: Attribute) => (value: any) => {
    if (item[attribute.key] instanceof Array) {
      item[attribute.key] = item[attribute.key].concat(value instanceof Array ? [...value] : value)
    } else {
      item[attribute.key] = value
    }
  }

  const handleClickEditIcon = () => {
    if (onClickEdit) {
      onClickEdit()
    }
  }

  const handleClickSaveIcon = () => {
    if (onClickSave) {
      onClickSave(items)
    }
  }

  const handleRemoveRow = (item: any, index: number) => () => {
    const { newly } = item
    const newItems = [...items] as any
    if (!newly) {
      newItems[index].delete = true
    }
    setItems(() => newItems)
  }

  const handleChangeOrder = (type: string, index: number) => {
    const newItems  = [...items] as Array<T>
    if (type === 'down') {
      [ newItems[index], newItems[index + 1] ] = [ newItems[index + 1], newItems[index] ]
    } else {
      [ newItems[index], newItems[index - 1] ] = [ newItems[index - 1], newItems[index] ]
    }
    setItems(() => newItems)
  }

  return (
    <div className={"multipleAttributes"}>
      <h3 className={"title"}>{ label }</h3>
      <div className={"attributesContainer"}>
        {
          items ? items
            .filter((item: any) => !item.delete)
            .map((item, i) => {
            return (
              <MultipleAttributesRow
                key={i}
                index={i}
                isFirst={i === 0}
                onChangeOrder={handleChangeOrder}
                isLast={i === items.length - 1}
                onRemove={handleRemoveRow(item, i)}
                isEdit={isEdit}>
                {
                  attributes.map((attribute, j) => {
                    return (
                      <MultipleAttributesColumn
                        key={j}
                        item={item}
                        onChange={handleChangeAttribute(item, attribute)}
                        attribute={attribute}
                        isEdit={isEdit}
                      />
                    )
                  })
                }
              </MultipleAttributesRow>
            )
          }) : <></>
        }
        <div className={"bottomRow"}>
          <Button
            color={ColorType.WHITE}
            text={"추가하기"}
            borderDashed={true}
            icon={"add_circle_outline"}
            iconWithText={true}
            onClick={handleClickAddIcon}
            show={isEdit}
          />
          <Button
            color={ColorType.PRIMARY}
            text={`${label} 수정하기`}
            icon={"add_circle_outline"}
            iconWithText={true}
            onClick={handleClickEditIcon}
            show={!isEdit}
            classNames={["editButton"]}
          />
          <Button
            color={ColorType.PRIMARY}
            text={`${label} 저장하기`}
            icon={"save"}
            iconWithText={true}
            onClick={handleClickSaveIcon}
            show={isEdit}
            classNames={["saveButton"]}
          />
        </div>
      </div>
    </div>
  )
}

export default MultipleAttributes
