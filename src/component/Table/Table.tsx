import React, { ChangeEvent, useState } from "react";
import { Button, TableRow, TextBox } from "@component";
import { ColorType } from "@enums/ColorType";

interface Props {
  title: string
  headers: string[]
  onSearch?: Function
  totalCount?: number
  isLoading?: boolean
  children: React.ReactElement<typeof TableRow> | React.ReactElement<typeof TableRow>[]
}

enum PagingType {
  FIRST = "first",
  PREVIOUS = "previous",
  NEXT = "next",
  LAST = "last"
}

const Table = ({ title, headers, children, totalCount, isLoading, onSearch }: Props) => {
  const DEFAULT_SEARCH_BOX_WIDTH = 300
  const [ isEnabledSearch, setEnableSearch ] = useState<boolean>(false)
  const [ isShowSearchBoxCloseIcon, setShowSearchBoxCloseIcon ] = useState<boolean>(false)
  const [ searchBoxWidth, setSearchBoxWidth ] = useState<number>(0)
  const [ page, setPage ] = useState<number>(0)
  const [ keyword, setKeyword ] = useState<string>('');

  const handleClickSearchIcon = () => {
    if (isEnabledSearch) {
      search()
    } else {
      setSearchBoxWidth(DEFAULT_SEARCH_BOX_WIDTH)
      setShowSearchBoxCloseIcon(true)
      setEnableSearch(true)
    }
  }

  const handleClickSearchBoxCloseIcon = () => {
    setSearchBoxWidth(0)
    setShowSearchBoxCloseIcon(false)
    setEnableSearch(false)
  }

  const handlePaging = (type: PagingType) => {
    switch (type) {
      case PagingType.FIRST:
        setPage(0)
        break
      case PagingType.PREVIOUS:
        setPage(page => page - 1)
        break
      case PagingType.NEXT:
        setPage(page => page + 1)
        break
    }
    search()
  }

  const search = () => {
    if (onSearch) {
      onSearch({ page, keyword })
    }
  }

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div className={"tableWrapper"}>
      <div className={"tableTopRow"}>
        <h4 className={"tableTitle"}>{ title }</h4>
        <div className={"tableIcons"}>
          <div className={"searchBox"} style={{ width: searchBoxWidth }}>
            <Button
              classNames={["searchBoxCloseIcon"]}
              icon={"close"}
              color={ColorType.WHITE}
              onClick={handleClickSearchBoxCloseIcon}
              show={isShowSearchBoxCloseIcon}
            />
            <TextBox onChange={handleChangeSearchInput} />
          </div>
          <Button icon={"search"} color={ColorType.WHITE} onClick={handleClickSearchIcon} />
        </div>
      </div>
      {
        isLoading ? <></> : (
          <table className={"table"}>
            <thead className={"tableHeaderRow"}>
            <tr>
              <th className={"tableRowHeaderAdditional"} />
              {
                headers.map((header, index) => {
                  return (
                    <th className={"tableHeaderColumn"} key={index}>{header}</th>
                  )
                })
              }
            </tr>
            </thead>
            <tbody>
            { children }
            </tbody>
          </table>
        )
      }
      <div className={"tableBottomRow"}>
        {
          totalCount ? (
            <div className={"totalCount"}>
              <label>전체 </label>
              <strong>{totalCount.toLocaleString()}건</strong>
            </div>
          ) : <></>
        }
        <div className={"pageCount"}>
          <strong>{page + 1}</strong>
          <label> 페이지</label>
        </div>
        <div className={"tableIcons"}>
          <Button
            icon={"first_page"}
            color={ColorType.WHITE}
            onClick={() => handlePaging(PagingType.FIRST)}
            enable={page !== 0}
          />
          <Button
            icon={"keyboard_arrow_left"}
            color={ColorType.WHITE}
            onClick={() => handlePaging(PagingType.PREVIOUS)}
            enable={page !== 0}
          />
          <Button
            icon={"keyboard_arrow_right"}
            color={ColorType.WHITE}
            onClick={() => handlePaging(PagingType.NEXT)}
          />
          <Button
            icon={"last_page"}
            color={ColorType.WHITE}
            onClick={() => handlePaging(PagingType.LAST)}
          />
        </div>
      </div>
    </div>
  )
}

export default Table
