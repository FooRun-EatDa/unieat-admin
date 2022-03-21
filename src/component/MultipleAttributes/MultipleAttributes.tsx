import React from "react";
import { Button, Image, TextBox } from "~/component";
import { ColorType } from "@enums/ColorType";

interface Props {
  label: string
  items: Array<any>
  attributes: Array<Attribute>
  onClickAdd?: Function
}

interface Attribute {
  key: string
  name: string
  type: 'text' | 'image-single' | 'select' | 'radio' | 'image-multi'
}

const MultipleAttributes = ({ label, attributes, items, onClickAdd }: Props) => {
  const handleClickAddIcon = () => {
    if (onClickAdd) {
      onClickAdd()
    }
  }

  return (
    <div className={"multipleAttributes"}>
      <h3 className={"title"}>{ label }</h3>
      <div className={"attributesContainer"}>
        {
          items ? items.map((item, i) => {
            return (
              <div className={"attributesRow"} key={i}>
                {
                  attributes.map((attribute, j) => {
                    return (
                      <div className={"attributesColumn"} key={j}>
                        {
                          (() => {
                            switch (attribute.type) {
                              case 'text':
                                return <TextBox value={item[attribute.key]} label={attribute.name} />
                              case 'image-single':
                                return <Image />
                              case 'image-multi':
                                return (
                                  <div className={"attributesImagesContainer"}>
                                    <h5>{attribute.name}</h5>
                                    <div className={"attributesImages"}>
                                      <Image />
                                      <Image />
                                      <Image isUploader={true} />
                                    </div>
                                  </div>
                                )
                              default:
                                return <></>
                            }
                          })()
                        }
                      </div>
                    )
                  })
                }
              </div>
            )
          }) : <></>
        }
        <div className={"bottomRow"}>
          <Button color={ColorType.PRIMARY} text={"추가하기"} icon={"add"} iconWithText={true} onClick={handleClickAddIcon} />
        </div>
      </div>
    </div>
  )
}

export default MultipleAttributes
