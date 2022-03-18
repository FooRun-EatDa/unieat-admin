import React from "react"

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

const PageTemplate = ({ children }: Props) => {
  return (
    <section className={"pageTemplate jumbotron"}>
      {children}
    </section>
  )
}

export default PageTemplate
