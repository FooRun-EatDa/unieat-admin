import React from "react";
import { Button } from "~/component";
import { ColorType } from "@enums";

interface Props {
  title?: string
  children: JSX.Element | Array<JSX.Element> | undefined
  addable?: boolean
  scrollable?: boolean
}

const ListGroup = ({ title, addable = true, scrollable = true, children }: Props) => {
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
      <div className={["listGroup", scrollable ? "scrollable" : undefined].filter(name => !!name).join(" ")}>
        { children }
      </div>
    </div>
  )
}

export default ListGroup
