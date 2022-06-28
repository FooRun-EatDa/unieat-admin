import React, { ChangeEvent } from "react";
import { Image, ImageList, TextBox } from "~/component";
import { Attribute } from "@component/MultipleAttributes/types";
import { FileDetail } from "~/types";

interface Props {
  item: any
  isEdit: boolean
  attribute: Attribute
  onChange?: Function
}

const MultipleAttributesColumn = ({ onChange, item, isEdit, attribute }: Props) => {
  const handleInputImage = (files: Array<FileDetail>) => {
    if (onChange) {
      onChange(files)
    }
  }

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={"attributesColumn"}>
      {
        (() => {
          const { type, name, key } = attribute
          switch (type) {
            case 'text':
              return <TextBox
                value={item[key]}
                label={name}
                onChange={handleChangeText}
                enable={isEdit}
              />
            case 'image-single':
              return <Image />
            case 'image-multi':
              return (
                <div className={"attributesImagesContainer"}>
                  <h5>{name}</h5>
                  <ImageList
                    edit={isEdit}
                    defaultItems={item[key]}
                    onChange={handleInputImage}
                    enableUpload={isEdit}
                    useThumbnail={true}
                    viewOnly={false}
                  />
                </div>
              )
            default:
              return <></>
          }
        })()
      }
    </div>
  )
}

export default MultipleAttributesColumn
