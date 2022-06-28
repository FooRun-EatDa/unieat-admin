import React, { useState } from "react";
import { FileDetail } from "~/types";
import { TextBox } from "~/component";

interface Props {
  width?: string
  height?: string
  onClickThumbnail?: (item: FileDetail, selected: boolean) => void
  onRemove?: (item: FileDetail) => void
  useThumbnail?: boolean
  thumbnail?: boolean
  viewOnly?: boolean
  edit?: boolean
  item?: FileDetail
  onClick?: Function
}

const Image = ({ item, width, onClickThumbnail, thumbnail = false, useThumbnail = false, viewOnly = true, edit = false, onRemove, height, onClick }: Props) => {
  const [ hoverThumbnailLabel, setHoverThumbnailLabel ] = useState<boolean>(false)
  const [ hoverRemoveIcon, setHoverRemoveIcon ] = useState<boolean>(false)

  const handleClick = () => {
    console.log(hoverRemoveIcon, hoverThumbnailLabel)
    if (hoverRemoveIcon || hoverThumbnailLabel) {
      return
    }
    if (onClick) {
      onClick()
    }
  }

  const handleMouseOverThumbnailLabel = () => {
    setHoverThumbnailLabel(true)
  }

  const handleMouseLeaveThumbnailLabel = () => {
    setHoverThumbnailLabel(false)
  }

  const handleClickThumbnailLabel = () => {
    if (!edit) {
      return
    }
    onClickThumbnail && onClickThumbnail(item!!, !thumbnail)
  }

  const handleClickRemoveIcon = () => {
    onRemove && onRemove(item!!)
  }

  const handleMouseOverRemoveIcon = () => {
    setHoverRemoveIcon(true)
  }

  const handleMouseLeaveRemoveIcon = () => {
    setHoverRemoveIcon(false)
  }

  return (
    <div className={"imageContainer"}>
      <div
        className={["imageWrapper", useThumbnail && thumbnail ? "thumbnail" : null].filter(name => name !== null).join(' ')}
        style={{ width, height }}
        onClick={handleClick}>
        {
          useThumbnail && (
            <span
              className={["thumbnailLabel", thumbnail ? null : "virtual", edit ? "editable" : null].filter(name => name !== null).join(' ')}
              onMouseOver={handleMouseOverThumbnailLabel}
              onMouseLeave={handleMouseLeaveThumbnailLabel}
              onClick={handleClickThumbnailLabel}>
              <i className={"material-icons thumbnailLabelIcon"}>stars</i>
              대표
            </span>
          )
        }
        <img className={"image"} src={item ? item.url : '/images/logo.png'} alt={item?.alt} />
        {
          edit && (
            <span
              onMouseOver={handleMouseOverRemoveIcon}
              onMouseLeave={handleMouseLeaveRemoveIcon}
              onClick={handleClickRemoveIcon}>
              <i className={"material-icons removeIcon"}>delete</i>
            </span>
          )
        }
      </div>
      {
        !viewOnly && <TextBox width={"100%"} label={"이미지 출처"} enable={edit} />
      }
    </div>
  )
}

export default Image
