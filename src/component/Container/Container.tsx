import React from "react";

interface Props {
  width?: string
  height?: string
  maxHeight?: string
  minHeight?: string
  classNames?: Array<string>
  children?: JSX.Element | Array<JSX.Element>
}

const Container = ({ width, height, maxHeight, minHeight, classNames, children }: Props) => {
  return (
    <div className={["container", classNames].join(" ")} style={{ width: width || '100%', height, maxHeight, minHeight }}>
      { children }
    </div>
  )
}

export default Container
