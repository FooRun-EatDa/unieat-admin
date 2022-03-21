import React from "react";

interface Props {
  height?: string
  maxHeight?: string
  minHeight?: string
  classNames?: Array<string>
  children?: JSX.Element | Array<JSX.Element>
}

const Row = ({ height, maxHeight, minHeight, classNames, children }: Props) => {
  return (
    <div className={["row", classNames].join(" ")} style={{ height, maxHeight, minHeight }}>
      { children }
    </div>
  )
}

export default Row
