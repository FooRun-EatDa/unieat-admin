import React, { useRef, useState } from "react";

interface Props {
  width?: string
  label: string
  items?: Array<Property>
  defaultValue?: any
  enable?: boolean
  onChange?: (item: Property) => void
}

interface Property {
  text: string
  value: any
}

const Select = ({ width, label, defaultValue, items = [], enable = true, onChange }: Props) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const defaultItem = items.filter(item => item.value === defaultValue)
  const [ isOpen, setOpen ] = useState<boolean>(false)
  const [ selected, setSelected ] = useState<Property>(defaultItem[0])

  const handleSelect = (item: Property) => () => {
    if (onChange) {
      onChange(item)
    }
    setSelected(item)
    setOpen(isOpen => !isOpen)
  }

  const handleClickSelectedText = () => {
    if (enable) {
      setOpen(isOpen => !isOpen)
    }
  }

  return (
    <div className={"selectBoxWrapper"} ref={wrapper} style={{ width }}>
      <label className={"selectBoxLabel"}>{label}</label>
      <label
        onClick={handleClickSelectedText}
        className={[
          "selectedText",
          isOpen ? "open" : "close",
          enable ? "enable" : "disable",
          selected ? "selected" : ""
        ].join(" ")}>
        { selected ? selected.text : '선택' }
      </label>
      <div className={["selectBoxOpenIcon", isOpen ? "open" : "close", enable ? "enable" : "disable"].join(" ")}>
        <i className={"material-icons"}
          onClick={handleClickSelectedText}>arrow_drop_down</i>
      </div>
      <div className={"selectBoxInnerWrapper"}>
        <ul className={["selectBox", isOpen ? "open" : "close"].join(" ")}>
          {
            items.map((item, index) => {
              const { text } = item
              return (
                <li className={"selectBoxItem"} key={index} onClick={handleSelect(item)}>
                  { text }
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Select
