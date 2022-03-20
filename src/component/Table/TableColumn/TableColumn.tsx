import React from "react";

interface Props {
  align?: "left" | "center" | "right"
  children?: any
}

const TableColumn = ({ align = "left", children }: Props) => {
  return (
    <td className={"tableColumn"} align={align}>
      { children }
    </td>
  )
}

export default TableColumn
