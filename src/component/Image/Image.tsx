import React from "react";
import { FileDetail } from "~/types";

interface Props {
  width?: string
  height?: string
  item?: FileDetail
  onClick?: Function
}

const Image = ({ item, width, height, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className={"imageWrapper"} style={{ width, height }} onClick={handleClick}>
      <img className={"image"} src={item ? item.url : '/images/logo.png'} alt={item?.alt} />
    </div>
  )
}

export default Image
