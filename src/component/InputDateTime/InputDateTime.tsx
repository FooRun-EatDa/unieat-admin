import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import moment, { Moment } from "moment";

interface Props {
  label: string
  defaultValue?: Moment
  enable?: boolean
  onChange?: (value: Moment) => void
}

const InputDateTime = ({ label, defaultValue, onChange, enable = true }: Props) => {
  const domId = Math.random().toString()
  const input = useRef<HTMLInputElement>(null)
  const initialClasses = ["inputDateTime"]
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(moment(e.target.value))
    }
  }

  return (
    <div className={"inputDateTimeWrapper"}>
      {
        label ? <label className={"inputLabel"} htmlFor={domId}>{label}</label> : <></>
      }
      <div className={classes.join(" ")}>
        <input
          ref={input}
          type="datetime-local"
          disabled={!enable}
          defaultValue={defaultValue?.format("yyyy-MM-DDTHH:mm")}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>
    </div>
  )
}

export default InputDateTime
