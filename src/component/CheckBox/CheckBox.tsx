import React, { useEffect, useState } from "react";

interface Props {
  text?: string
  defaultChecked?: boolean
  onChange?: (value: boolean) => void
}

const CheckBox = ({ defaultChecked = false, text, onChange }: Props) => {
  const [ checked, setChecked ] = useState<boolean>(defaultChecked)

  const handleClick = () => {
    setChecked(checked => {
      if (onChange) {
        onChange(!checked)
      }
      return !checked
    })
  }

  useEffect(() => {
    setChecked(defaultChecked)
  }, [ defaultChecked ])

  const domId = Math.random().toString()
  return (
    <div className={"checkBox"}>
      <input type="checkbox" id={domId} onChange={handleClick} checked={checked} />
      <label htmlFor={domId}>
        <i className={"material-icons checkBoxIcon"}>check</i>
      </label>
      {
        text && <label htmlFor={domId} className={"checkBoxText"}>{ text }</label>
      }
    </div>
  )
}

export default CheckBox
