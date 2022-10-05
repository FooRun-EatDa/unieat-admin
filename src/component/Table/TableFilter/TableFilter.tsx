import React, { useEffect, useRef, useState } from "react";
import { Button, CheckBox, Filter, FilterItem, } from "component";
import { ColorType } from "enums";
import { useClickOutsideOfRef, usePopUpContext } from "hooks";

interface Props {
  filters: Array<Filter>
  onApply?: (filters: Array<Filter>) => void
}

const TableFilter = ({ filters, onApply }: Props) => {
  const { isOpen, close } = usePopUpContext()
  const [ filtersState, setFiltersState ] = useState(filters)
  const container = useRef<HTMLDivElement>(null)

  useClickOutsideOfRef({
    ref: container,
    onClick: close
  })

  const handleClickApply = () => {
    onApply && onApply(filtersState)
    close()
  }

  const handleClickClose = () => close()
  const handleCheckItem = (filterItem: FilterItem) => (isChecked: boolean) => {
    if (isChecked) {
      filterItem.checked = true
    } else {
      delete filterItem.checked
    }
    setFiltersState(() => filtersState)
  }

  const handleClickAll = (filter: Filter, type: 'check' | 'uncheck') => () => {
    filter.items.forEach(item => {
      if (type === "check") {
        item.checked = true
      } else {
        delete item.checked
      }
    })
    setFiltersState(() => [...filtersState])
  }

  useEffect(() => {
    setFiltersState(filters)
  }, [ filters ])

  return (
    <div ref={container} className={["tableFilterWrapper", isOpen ? "show" : "hide"].join(" ")}>
      <div className={"tableFilterHeader"}>
        <h5 className={"title"}>검색 필터</h5>
        <Button color={ColorType.WHITE} icon={"close"} onClick={handleClickClose} />
      </div>
      <div className={"tableFilterContent"}>
        {
          filtersState.map((filter, i) => {
            return (
              <div className={"tableFilter"} key={i}>
                <div className={"tableFilterListTitle"}>
                  <h5 className={"tableFilterTitle"}>{ filter.text }</h5>
                  <span className={"tableFilterAll"} onClick={handleClickAll(filter, 'check')}>전체선택</span>
                  <span className={"tableFilterAll"} onClick={handleClickAll(filter, 'uncheck')}>전체해제</span>
                </div>
                <ul className={"tableFilterList"}>
                  {
                    filter.items.map((item, j) => {
                      return (
                        <li className={"tableFilterListItem"} key={j}>
                          <CheckBox
                            defaultChecked={item.checked}
                            text={item.text}
                            onChange={handleCheckItem(item)}
                          />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
      <div className={"tableFilterButtons"}>
        <Button color={ColorType.PRIMARY} text={"필터링 적용"} onClick={handleClickApply} />
      </div>
    </div>
  )
}

export default TableFilter
