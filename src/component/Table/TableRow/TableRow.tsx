import React, { useState } from "react";
import { Button, TableColumn } from "@component";
import { ColorType } from "@enums/ColorType";

interface Props {
  children: React.ReactElement<typeof TableColumn>[] | React.ReactElement<typeof TableColumn>
}

const TableRow = ({ children }: Props) => {
  const [ isShowAdditional, setShowAdditional ] = useState(false)

  const handleMouseOver = () => {
    setShowAdditional(true)
  }

  const handleMouseOut = () => {
    setShowAdditional(false)
  }

  return (
    <>
      <tr className={"tableRow"} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <td className={"tableRowAdditional"} style={{ opacity: isShowAdditional ? 1 : 0 }}>
          <Button color={ColorType.PRIMARY} icon={"edit"} text={"수정하기"} iconWithText={true} />
        </td>
        { children }
      </tr>
    </>
  )
}

export default TableRow
