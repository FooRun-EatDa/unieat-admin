import React from "react";
import { MultipleAttributesColumn } from "@component/MultipleAttributes";
import { Button } from "~/component";
import { ColorType } from "@enums";

interface Props {
  index: number
  isFirst: boolean
  isLast: boolean
  isEdit: boolean
  onRemove: Function
  onChangeOrder: (type: 'up' | 'down', index: number) => void
  children: Array<React.ReactElement<typeof MultipleAttributesColumn>>
}

const MultipleAttributesRow = ({ index, onChangeOrder, isFirst, isLast, onRemove, children, isEdit }: Props) => {
  const handleClickRemove = () => {
    const confirm = window.confirm("삭제 하시겠습니까?")
    if (confirm && onRemove) {
      onRemove()
    }
  }

  const handleClickOrderUp = () => {
    onChangeOrder('up', index)
  }

  const handleClickOrderDown = () => {
    onChangeOrder('down', index)
  }

  return (
    <div className={"attributesRow"}>
      <div className={"columns"}>
        { children }
      </div>
      <div className={"buttons"}>
        <Button
          classNames={["orderUpButton"]}
          color={ColorType.PRIMARY}
          icon={"arrow_upward"}
          onClick={handleClickOrderUp}
          show={isEdit && !isFirst}
        />
        <Button
          classNames={["orderUpButton"]}
          color={ColorType.PRIMARY}
          icon={"arrow_downward"}
          onClick={handleClickOrderDown}
          show={isEdit && !isLast}
        />
        <Button
          classNames={["removeButton"]}
          color={ColorType.DANGER}
          text={"삭제하기"}
          icon={"remove_circle_outline"}
          iconWithText={true}
          onClick={handleClickRemove}
          show={isEdit}
        />
      </div>
    </div>
  )
}

export default MultipleAttributesRow
