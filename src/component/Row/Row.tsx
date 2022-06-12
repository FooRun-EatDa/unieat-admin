import React from "react";

interface Props {
  height?: string
  maxHeight?: string
  minHeight?: string
  classNames?: Array<string>
  children?: JSX.Element | Array<JSX.Element>
  align?: 'flex-start' | 'center' | 'flex-end'
}

const Row = ({ height, align = 'center', maxHeight, minHeight, classNames, children }: Props) => {
  return (
    <div className={["row", classNames].join(" ")} style={{ height, maxHeight, minHeight, alignItems: align }}>
      { children }
    </div>
  )
}

export default Row
