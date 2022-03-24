import React, { useState } from "react";
import { Button, Image } from "@component";
import { ColorType } from "@enums";
import { FileDetail } from "~/types";

interface Props {
  items: Array<FileDetail>
  defaultIndex?: number
  onClose: () => void
}

const ImageView = ({ items, defaultIndex = 0, onClose }: Props) => {
  const [ isFirst, setFirst ] = useState<boolean>(true)
  const [ isLast, setLast ] = useState<boolean>(false)
  const [ activeIndex, setActiveIndex ] = useState<number>(defaultIndex)
  const size = items.length
  const limit = size - 1

  const handleChangeIndex = (move: number) => {
    let next = activeIndex + move
    if (next < 0 || next >= size) {
      return
    }
    activeChange(next)
  }

  const handleClickPreview = (index: number) => () => {
    activeChange(index)
  }

  const activeChange = (index: number) => {
    setActiveIndex(index);
    setLast(index === limit)
    setFirst(index === 0)
  }

  const handleClickClose = () => {
    onClose()
  }

  return (
    <div className={"imageViewWrapper"}>
      <div className={"imageViewTopRow"}>
        <Button color={ColorType.WHITE} icon={"close"} onClick={handleClickClose} />
      </div>
      <div className={"imageViewRow"}>
        <Button
          color={ColorType.PRIMARY}
          icon={"arrow_back"}
          enable={!isFirst}
          onClick={() => handleChangeIndex(-1)}
        />
        <div className={"imageView multiple"}>
          <Image
            item={items[activeIndex]}
            width={"600px"}
            height={"400px"}
          />
        </div>
        <Button
          color={ColorType.PRIMARY}
          icon={"arrow_forward"}
          enable={!isLast}
          onClick={() => handleChangeIndex(1)}
        />
      </div>
      <div className={"imagePreviewRow"}>
        <div className={"imagePreview"} style={{ left: `calc(50vw - ${105 + (155 * activeIndex)}px)` }}>
          {
            items.map((item, index) => {
              return (
                <Image
                  item={item}
                  key={index}
                  width={index === activeIndex ? "210px" : "150px"}
                  height={index === activeIndex ? "140px" : "100px"}
                  onClick={handleClickPreview(index)}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ImageView
