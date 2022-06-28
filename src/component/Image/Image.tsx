import React, { ChangeEvent, useState } from "react";
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
  onChangeCopyright?: (value: string) => void
}

const Image = ({ item, width, onClickThumbnail, thumbnail = false, useThumbnail = false, viewOnly = true, edit = false, onRemove, height, onClick, onChangeCopyright }: Props) => {
  const [ hoverThumbnailLabel, setHoverThumbnailLabel ] = useState<boolean>(false)
  const [ hoverRemoveIcon, setHoverRemoveIcon ] = useState<boolean>(false)

  const handleClick = () => {
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

  const handleChangeCopyright = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeCopyright && onChangeCopyright(e.target.value)
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
        !viewOnly && <TextBox width={"100%"} value={item?.copyright} label={"이미지 출처"} enable={edit} onChange={handleChangeCopyright} />
      }
    </div>
  )
}

export default Image
