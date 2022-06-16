import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, TableRow, TextBox } from "@component";
import { ColorType } from "@enums/ColorType";
import { ClipLoader } from "react-spinners";

interface Props {
  page: number
  title: string
  headers: string[]
  onSearch?: Function
  onChangePage?: Function
  totalCount?: number
  isLoading?: boolean
  lastPage?: number
  children: React.ReactElement<typeof TableRow> | React.ReactElement<typeof TableRow>[]
}

enum PagingType {
  FIRST = "first",
  PREVIOUS = "previous",
  NEXT = "next",
  LAST = "last"
}

const store = {
  totalCount: 0,
  lastPage: 0
}

const Table = ({ page, title, headers, children, totalCount = store.totalCount, lastPage = store.lastPage, isLoading, onSearch, onChangePage }: Props) => {
  const DEFAULT_SEARCH_BOX_WIDTH = 300
  const [ isEnabledSearch, setEnableSearch ] = useState<boolean>(false)
  const [ isShowSearchBoxCloseIcon, setShowSearchBoxCloseIcon ] = useState<boolean>(false)
  const [ searchBoxWidth, setSearchBoxWidth ] = useState<number>(0)
  const [ keyword, setKeyword ] = useState<string>('');

  useEffect(() => {
    store.totalCount = totalCount
    store.lastPage = lastPage
  }, [ totalCount, lastPage ])

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
    const nextPage = (() => {
      switch (type) {
        case PagingType.FIRST:
          return 0
        case PagingType.PREVIOUS:
          return page - 1
        case PagingType.NEXT:
          return page + 1
        case PagingType.LAST:
          return lastPage - 1
      }
      return page
    })()
    if (onChangePage) {
      onChangePage(nextPage)
    }
  }

  const search = () => {
    onChangePage && onChangePage(0)
    if (onSearch) {
      onSearch({ page: 0, keyword })
    }
  }

  const handleKeyUpEnterSearchText = () => {
    search()
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
            <TextBox onChange={handleChangeSearchInput} onKeyUpEnter={handleKeyUpEnterSearchText} />
          </div>
          <Button icon={"search"} color={isEnabledSearch ? ColorType.PRIMARY : ColorType.WHITE} onClick={handleClickSearchIcon} />
        </div>
      </div>
      {
        isLoading ? (
          <div className={"loader"}>
            <ClipLoader loading={true} size={50} color={"#FBB734"} />
          </div>
        ) : (
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
          <strong>{page + 1} / {lastPage}</strong>
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
            enable={page !== (lastPage - 1)}
          />
          <Button
            icon={"last_page"}
            color={ColorType.WHITE}
            onClick={() => handlePaging(PagingType.LAST)}
            show={lastPage !== 0}
            enable={page !== (lastPage - 1)}
          />
        </div>
      </div>
    </div>
  )
}

export default Table
