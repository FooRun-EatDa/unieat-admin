import React, { FormEvent, useEffect, useState } from "react";
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

const ImageList = ({ defaultItems, onChange, enableUpload = false, imageWidth, imageHeight }: Props) => {
  const [ items, setItems ] = useState<Array<FileDetail>>(defaultItems || [])
  const [ isOpen, setOpen ] = useState<boolean>(false)
  const [ selectedIndex, setSelectedIndex ] = useState<number>()

  useEffect(() => {
    if (defaultItems) {
      setItems(() => [...defaultItems])
    }
  }, [ defaultItems ])

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget
    if (!files || files?.length === 0) {
      return
    }
    upload(files).then(uploadFiles => {
      uploadFiles.forEach(item => {
        item.newly = true
      })
      const newItems = [...items].concat(uploadFiles)
      setItems(() => newItems)
      if (onChange) {
        onChange(newItems)
      }
    })
  }

  const upload = async (files: FileList) => {
    const uploadFiles: Array<FileDetail> = []
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      formData.append('file', files[i])

      const request = await frontApiClient.post(`/upload`, formData)
      const response: ApiResponse<FileDetail> = await request.data
      uploadFiles.push(response.data)
    }
    return uploadFiles
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
              <input type={"file"} id={domId} multiple={true} onInput={handleInput} />
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