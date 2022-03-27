import React, { MouseEventHandler, useEffect, useState } from "react";
import { ColorType } from "@enums/ColorType";

interface Props {
  text?: string
  color: ColorType
  width?: string
  icon?: string
  classNames?: Array<string>
  borderDashed?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  show?: boolean
  enable?: boolean
  iconWithText?: boolean
}

const Button = ({ text, color, width, icon, classNames, borderDashed = false, show = true, onClick, enable = true, iconWithText = false }: Props) => {
  const backgroundColor = `bg-${color}`
  const initialClasses = ["button", backgroundColor]
  if (borderDashed) {
    initialClasses.push("dashed")
  }
  const [ classes, setClasses ] = useState<Array<string>>(initialClasses)

  useEffect(() => {
    setClasses(initialClasses)
  }, [ color ])

  const handleMouseOver = () => {
    if (enable) {
      setClasses(classes => classes.concat(`${backgroundColor}-hover`))
    }
  }

  const handleMouseOut = () => {
    if (enable) {
      setClasses(initialClasses)
    }
  }

  return (
    <>
      <button
        className={classNames ? classes.concat(...classNames, enable ? " enable" : " disable").join(" ") : classes.join(" ").concat(enable ? " enable" : " disable")}
        onClick={onClick}
        style={{ width, display: show ? 'flex' : 'none' }}
        disabled={!enable}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        {
          (() => {
            if (iconWithText) {
              return (
                <>
                  <i className={"material-icons"}>{ icon }</i>
                  <label>{ text }</label>
                </>
              )
            } else {
              return icon ? <i className={"material-icons"}>{ icon }</i> : text
            }
          })()
        }
      </button>
    </>
  )
}

export default Button
