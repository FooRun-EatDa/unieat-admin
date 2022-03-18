import React from "react"
import "./SideBar.scss"
import Timer from "../Timer/TImer";

const SideBar = () => {
  return (
    <nav className={"sideBar"}>
      <header className={"header"}>
        <img src={"brand.png"} alt={"브랜드 이미지"} />
      </header>
      <section className={"section"}>
        <ul className={"menuList"}>
          <li className={"menuItem"}>
            <i className={"material-icons menuIcon"}>assignment</i>
            <span className={"menuText"}>음식점 정보 관리</span>
            {
              // <i className={"material-icons menuExpandIcon"}>arrow_drop_down</i>
            }
          </li>
        </ul>
      </section>
      <footer className={"footer"}>
        <div className={"userInfo"}>
          <span className={"userName"}>관리자<span className={"userNameNim"}>님</span></span>
          <i className={"material-icons userMoreIcon"}>keyboard_arrow_right</i>
        </div>
        <Timer classNames={["activeTime"]} />
      </footer>
    </nav>
  )
}

export default SideBar
