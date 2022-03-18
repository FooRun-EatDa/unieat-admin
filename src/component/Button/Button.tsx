import React, { MouseEventHandler, useState } from "react";
import { ColorType } from "../../enums/ColorType";

interface Props {
  text: string
  color: ColorType
  width?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ text, color, width, onClick }: Props) => {
  const backgroundColor = `bg-${color}`
  const initialClasses = ["button", backgroundColor]
  const [ classes, setClasses ] = useState<Array<string>>(initialClasses)

  const handleMouseOver = () => {
    setClasses(classes => classes.concat(`${backgroundColor}-hover`))
  }

  const handleMouseOut = () => {
    setClasses(initialClasses)
  }

  return (
    <>
      <button
        className={classes.join(" ")}
        onClick={onClick}
        style={{ width }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        {text}
      </button>
    </>
  )
}

export default Button
