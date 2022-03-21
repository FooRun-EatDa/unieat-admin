import React from "react";
import { Button } from "~/component";
import { ColorType } from "@enums/ColorType";

interface Props {
  url?: string
  alt?: string
  isUploader?: boolean
  readonly?: boolean
}

const Image = ({ url, alt, isUploader = false, readonly = true }: Props) => {
  return (
    <div className={isUploader ? "imageUploader" : "imageWrapper"}>
      {
        isUploader ? (
          <>
            <input type={"file"} />
            <Button color={ColorType.TRANSPARENCY} icon={"add"} />
          </>
        ) : (
          <img className={"image"} src={url || '/images/logo.png'} alt={alt} />
        )
      }
    </div>
  )
}

export default Image
