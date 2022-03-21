import React from "react"
import { SideBar } from "~/component";

interface Props {
  disableSideBar?: boolean
  children?: JSX.Element | Array<JSX.Element>
}

const PageTemplate = ({ disableSideBar = false, children }: Props) => {
  return (
    <>
      {
        disableSideBar ? <></> : <SideBar />
      }
      <section className={"pageTemplate jumbotron"}>
        {children}
      </section>
    </>
  )
}

export default PageTemplate
