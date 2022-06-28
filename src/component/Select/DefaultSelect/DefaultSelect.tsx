import React, { ChangeEvent, useState } from "react";

interface Props {
  items: Array<Property>
  onChange?: (item: Property) => void
  defaultValue?: any
  label?: string
  enable?: boolean
}

interface Property {
  text: string
  value: any
}

const DefaultSelect = ({ items, onChange, label, enable = true, defaultValue }: Props) => {
  const [ selectedItem, setSelectedItem ] = useState<Property>()

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target
    setSelectedItem(() => items[selectedIndex])
    onChange && onChange(items[selectedIndex])
  }

  const domId = Math.random().toString()

  return (
    <div className={"defaultSelect"}>
      {
        label ? <label className={"label"} htmlFor={domId}>{ label }</label> : <></>
      }
      <div className={["wrapper", enable ? "enable" : "disable"].join(" ")}>
        <select className={"select"} onChange={handleChangeSelect} defaultValue={defaultValue} disabled={!enable}>
          {
            items.map(item => {
              return (
                <option value={item.value} selected={defaultValue === item.value}>{ item.text }</option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

export default DefaultSelect
