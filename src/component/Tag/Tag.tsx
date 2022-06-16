import React, { useState } from "react";

interface Props {
  text: string
  clickable?: boolean
  enableOverlay?: boolean
  width?: string
  margin?: string
  onClickEdit?: () => void
  onClickRemove?: () => void
}

const Tag = ({ onClickEdit, onClickRemove, text, enableOverlay = false, width = "100%", margin, clickable = false }: Props) => {
  const [ showOverlay, setShowOverlay ] = useState<boolean>(false)

  const handleMouseOver = () => {
    setShowOverlay(true)
  }

  const handleMouseLeave = () => {
    setShowOverlay(false)
  }

  const handleClickEdit = () => {
    onClickEdit && onClickEdit()
  }

  const handleClickRemove = () => {
    onClickRemove && onClickRemove()
  }

  return (
    <div
      className={["tagWrapper", clickable ? "clickable" : null].filter(c => c !== null).join(" ")}
      style={{ width: width, margin }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <span className={"tag"}>{ text }</span>
      {
        enableOverlay && (
          <div className={["tagOverlay", showOverlay ? "show" : "hide"].join(" ")}>
            <i className={"material-icons editIcon"} onClick={handleClickEdit}>edit</i>
            <i className={"material-icons removeIcon"} onClick={handleClickRemove}>close</i>
          </div>
        )
      }
    </div>
  )
}

export default Tag
