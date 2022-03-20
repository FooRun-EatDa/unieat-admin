import React, { ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, useState } from "react";

interface Props {
  label?: string
  width?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyUpEnter?: Function
  isPassword?: boolean | false
}

const TextBox = ({ label, width, onChange, onKeyUpEnter, isPassword }: Props) => {
  const domId = Math.random().toString()
  const [ classes, setClasses ] = useState<Array<string>>(["inputText"])

  const handleInputFocus = () => {
    setClasses(classes => classes.concat("focus"))
  }

  const handleInputBlur = () => {
    setClasses(["inputText"])
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onKeyUpEnter) {
      onKeyUpEnter()
    }
  }

  return (
    <>
      <div className={"inputWrapper"} style={{ width: width || '100%' }}>
        {
          label ? <label className={"inputLabel"} htmlFor={domId}>{label}</label> : <></>
        }
        <div className={classes.join(" ")}>
          <input
            type={isPassword ? "password" : "text"}
            onChange={onChange}
            onKeyUp={handleKeyUp}
            id={domId}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </div>
    </>
  )
}

export default TextBox
