import React, { useState } from "react";
import { Button, TableColumn } from "@component";
import { ColorType } from "@enums/ColorType";

interface Props {
  onClickDetailButton?: Function
  enableDetailButton?: boolean
  children: React.ReactElement<typeof TableColumn>[] | React.ReactElement<typeof TableColumn>
}

const TableRow = ({ onClickDetailButton, enableDetailButton = false, children }: Props) => {
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
          {
            enableDetailButton ?
              <Button
                color={ColorType.PRIMARY}
                icon={"description"}
                text={"상세보기"}
                iconWithText={true}
                onClick={() => onClickDetailButton ? onClickDetailButton() : {}}
              /> : <></>
          }
        </td>
        { children }
      </tr>
    </>
  )
}

export default TableRow
