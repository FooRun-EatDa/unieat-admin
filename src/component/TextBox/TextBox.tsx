import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
  label?: string
  width?: string
  value?: any
  enable?: boolean
  description?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  onKeyUpEnter?: Function
  isPassword?: boolean | false
  isTextArea?: boolean
  isNumber?: boolean
}

const TextBox = ({ label, width, onChange, description, onKeyUpEnter, value = '', enable = true, isPassword, isTextArea = false, isNumber = false, onValueChange }: Props) => {
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

  const input = useRef<HTMLInputElement>(null)
  const textarea = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (input && input.current) {
      // @ts-ignore
      input.current.value = value
    }
    if (textarea && textarea.current) {
      // @ts-ignore
      textarea.current.value = value
    }
  }, [ value ])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    onValueChange && onValueChange(e.currentTarget.value)
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange && onValueChange(e.currentTarget.value)
  }

  return (
    <>
      <div className={"inputWrapper"} style={{ width: width || '100%' }}>
        {
          label ? <label className={"inputLabel"} htmlFor={domId}>{label}</label> : <></>
        }
        <div className={classes.join(" ")}>
          {
            isTextArea ? (
              <textarea
                ref={textarea}
                className={"inputTextArea"}
                disabled={!enable}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleTextAreaChange}
              />
            ) : (
              <input
                ref={input}
                type={isPassword ? "password" : isNumber ? "number" : "text"}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
                id={domId}
                // value={value}
                disabled={!enable}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            )
          }
        </div>
        {
          description && (
            <div className={"description"}>
              <span className={"square"}>✔ </span>
              { description }
            </div>
          )
        }
      </div>
    </>
  )
}

export default TextBox
