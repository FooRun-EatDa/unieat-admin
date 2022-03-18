import React, { ChangeEventHandler, useState } from "react";

interface Props {
  label?: string
  width?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  isPassword?: boolean | false
}

const TextBox = ({ label, width, onChange, isPassword }: Props) => {
  const domId = Math.random().toString()
  const [ classes, setClasses ] = useState<Array<string>>(["inputText"])

  const handleInputFocus = () => {
    setClasses(classes => classes.concat("focus"))
  }

  const handleInputBlur = () => {
    setClasses(["inputText"])
  }

  return (
    <>
      <div className={"inputWrapper"} style={{ width: width || '100%' }}>
        {
          label ? <label className={"inputLabel"} htmlFor={domId}>{label}</label> : <></>
        }
        <div className={classes.join(" ")}>
          <input type={isPassword ? "password" : "text"} onChange={onChange} id={domId} onFocus={handleInputFocus} onBlur={handleInputBlur} />
        </div>
      </div>
    </>
  )
}

export default TextBox
