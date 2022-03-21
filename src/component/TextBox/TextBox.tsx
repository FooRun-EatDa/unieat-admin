import React, { ChangeEventHandler, KeyboardEvent, useEffect, useState } from "react";

interface Props {
  label?: string
  width?: string
  value?: any
  enable?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyUpEnter?: Function
  isPassword?: boolean | false
}

const TextBox = ({ label, width, onChange, onKeyUpEnter, value, enable = true, isPassword }: Props) => {
  const domId = Math.random().toString()
  const initialClasses = ["inputText"]
  const [ classes, setClasses ] = useState<Array<string>>(initialClasses)

  useEffect(() => {
    setClasses(() => initialClasses.concat(enable ? "enable" : "disable"))
  }, [ enable ])

  const handleInputFocus = () => {
    setClasses(classes => classes.concat("focus"))
  }

  const handleInputBlur = () => {
    setClasses(initialClasses)
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
            defaultValue={value}
            disabled={!enable}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </div>
    </>
  )
}

export default TextBox
