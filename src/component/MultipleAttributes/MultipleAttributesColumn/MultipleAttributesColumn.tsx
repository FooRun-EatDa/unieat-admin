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
          switch (attribute.type) {
            case 'text':
              return <TextBox
                value={item[attribute.key]}
                label={attribute.name}
                onChange={handleChangeText}
                enable={isEdit}
              />
            case 'image-single':
              return <Image />
            case 'image-multi':
              return (
                <div className={"attributesImagesContainer"}>
                  <h5>{attribute.name}</h5>
                  <ImageList
                    defaultItems={item[attribute.key]}
                    onChange={handleInputImage}
                    enableUpload={isEdit}
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
