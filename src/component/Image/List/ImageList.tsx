import React, { FormEvent, useState } from "react";
import { Button, Image, ImageView } from "@component";
import { ColorType } from "@enums/ColorType";
import { ApiResponse, FileDetail } from "~/types";
import frontApiClient from "~/libs/FrontApiClient";

interface Props {
  imageWidth?: string
  imageHeight?: string
  defaultItems?: Array<FileDetail>
  onChange?: (files: Array<FileDetail>) => void
  enableUpload?: boolean
}

const ImageList = ({ defaultItems = [], onChange, enableUpload = false, imageWidth, imageHeight }: Props) => {
  const [ items, setItems ] = useState<Array<FileDetail>>(defaultItems)
  const [ isOpen, setOpen ] = useState<boolean>(false)
  const [ selectedIndex, setSelectedIndex ] = useState<number>()

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget
    if (!files || files?.length === 0) {
      return
    }
    upload(files[0]).then(item => {
      const newItems = [...items].concat(item)
      setItems(() => newItems)
      if (onChange) {
        onChange(newItems)
      }
    })
  }

  const upload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const request = await frontApiClient.post(`/upload`, formData)
    const response: ApiResponse<FileDetail> = await request.data
    return response.data
  }

  const handleClickImage = (index: number) => () => {
    setOpen(() => true)
    setSelectedIndex(index)
  }

  return (
    <div className={"imageListWrapper"}>
      {
        isOpen ? <ImageView
          items={items}
          defaultIndex={selectedIndex}
          onClose={() => setOpen(false)}
        /> : <></>
      }
      {
        (() => {
          const domId = Math.random().toString()
          return (
            <div className={"imageUploader"} style={{ height: imageHeight, width: imageWidth }}>
              {
                enableUpload ? <label htmlFor={domId} /> : <></>
              }
              <Button color={ColorType.WHITE} borderDashed={true} icon={"add"} enable={enableUpload} />
              <input type={"file"} id={domId} onInput={handleInput} />
            </div>
          )
        })()
      }
      {
        items.map((item, index) => {
          return (
            <Image
              item={item}
              key={index}
              width={imageWidth}
              height={imageHeight}
              onClick={handleClickImage(index)}
            />
          )
        })
      }
    </div>
  )
}

export default ImageList
