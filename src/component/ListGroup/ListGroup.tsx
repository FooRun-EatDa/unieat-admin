import React from "react";
import { Button } from "~/component";
import { ColorType } from "@enums";

interface Props {
  title?: string
  children: JSX.Element | Array<JSX.Element> | undefined
  addable?: boolean
}

const ListGroup = ({ title, addable = true, children }: Props) => {
  const handleClickAdd = () => {

  }
  return (
    <div className={"listGroupWrapper"}>
      <div className={"listGroupHeader"}>
        <h4 className={"listGroupTitle"}>{ title ? title : "목록" }</h4>
        {
          addable && <Button
            icon={"add_circle_outline"}
            text={"추가하기"}
            iconWithText={true}
            color={ColorType.PRIMARY}
            onClick={handleClickAdd} />
        }
      </div>
      <div className={"listGroup"}>
        { children }
      </div>
    </div>
  )
}

export default ListGroup
