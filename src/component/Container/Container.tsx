import React from "react";

interface Props {
  width?: string | '100%'
  children?: JSX.Element | Array<JSX.Element>
}

const Container = ({ width, children }: Props) => {
  return (
    <div className={"container"} style={{ width: width }}>
      { children }
    </div>
  )
}

export default Container
