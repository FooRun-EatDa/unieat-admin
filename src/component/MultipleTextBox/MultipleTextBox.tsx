import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, TextBox } from "@component";
import { ColorType } from "@enums";
import { ClipLoader } from "react-spinners";

interface Props {
  defaultItems: Array<string>
  isEdit: boolean
  isLoading?: boolean
  description?: string
  onClickSave?: (items: Array<string>) => void
  enableSave?: boolean
  onChange?: (items: Array<string>) =>void
}

const MultipleTextBox = ({ defaultItems, isEdit, onClickSave, description, isLoading = false, enableSave = false, onChange }: Props) => {
  const [ items, setItems ] = useState<Array<string>>(defaultItems)

  useEffect(() => {
    if (items) {
      onChange && onChange(items)
    }
  }, [ items ])

  useEffect(() => {
    setItems(defaultItems)
  }, [ defaultItems ])

  const handleClickAddIcon = () => {
    setItems(items => [ ...items, '' ])
  }

  const handleClickRemove = (index: number) => {
    setItems(items => items.filter((item, key) => key !== index))
  }

  const handleClickSaveButton = () => {
    onClickSave && onClickSave(items)
  }

  const handleChangeTextBox = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    items[index] = e.target.value
  }

  return (
    <div className={"multipleTextBox"}>
      {
        isLoading ? (
          <div className={"loader"}>
            <ClipLoader loading={true} size={50} color={"#FBB734"} />
          </div>
        ) : <></>
      }
      <div className={"wrapper"}>
        {
          items.map((item: string, index) => {
            return (
              <div className={"item"} key={`${item}${index}`}>
                <TextBox key={item} value={item} enable={isEdit} onChange={handleChangeTextBox(index)} description={description} />
                <Button
                  classNames={["removeButton"]}
                  show={isEdit}
                  icon={"remove_circle_outline"}
                  color={ColorType.DANGER}
                  onClick={() => handleClickRemove(index)}
                />
              </div>
            )
          })
        }
        <Button
          color={ColorType.WHITE}
          text={"추가하기"}
          borderDashed={true}
          icon={"add_circle_outline"}
          iconWithText={true}
          onClick={handleClickAddIcon}
          show={isEdit}
          classNames={["addButton"]}
        />
        {
          enableSave ? (
            <Button
              color={ColorType.PRIMARY}
              text={`영업시간 저장하기`}
              icon={"save"}
              iconWithText={true}
              onClick={handleClickSaveButton}
              show={isEdit}
              classNames={["saveButton"]}
              width={"100%"}
            />
          ) : <></>
        }
      </div>
    </div>
  )
}

export default MultipleTextBox
