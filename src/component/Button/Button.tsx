import React, { MouseEventHandler, useState } from "react";
import { ColorType } from "@enums/ColorType";

interface Props {
  text?: string
  color: ColorType
  width?: string
  icon?: string
  classNames?: Array<string>
  onClick?: MouseEventHandler<HTMLButtonElement>
  show?: boolean
  enable?: boolean
  iconWithText?: boolean
}

const Button = ({ text, color, width, icon, classNames, show = true, onClick, enable = true, iconWithText = false }: Props) => {
  const backgroundColor = `bg-${color}`
  const initialClasses = ["button", backgroundColor, enable ? "enable" : "disable"]
  const [ classes, setClasses ] = useState<Array<string>>(initialClasses)

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
        className={classNames ? classes.concat(...classNames).join(" ") : classes.join(" ")}
        onClick={onClick}
        style={{ width, display: show ? 'block' : 'none' }}
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
