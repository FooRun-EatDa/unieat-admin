import React from "react";
import { MultipleAttributesColumn } from "@component/MultipleAttributes";
import { Button } from "~/component";
import { ColorType } from "@enums";

interface Props {
  isEdit: boolean
  onRemove: Function
  children: Array<React.ReactElement<typeof MultipleAttributesColumn>>
}

const MultipleAttributesRow = ({ onRemove, children, isEdit }: Props) => {
  const handleClickRemove = () =>{
    const confirm = window.confirm("삭제 하시겠습니까?")
    if (confirm && onRemove) {
      onRemove()
    }
  }

  return (
    <div className={"attributesRow"}>
      { children }
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
  )
}

export default MultipleAttributesRow
