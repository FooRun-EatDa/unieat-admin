import React from "react"
import { Timer } from "../../component";
import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <nav className={"sideBar"}>
      <header className={"header"}>
        <img src={"/images/brand.png"} alt={"브랜드 이미지"} />
      </header>
      <section className={"section"}>
        <ul className={"menuList"}>
          <Link to={"/restaurant"}>
            <li className={"menuItem"}>
              <i className={"material-icons menuIcon"}>assignment</i>
              <span className={"menuText"}>음식점 정보 관리</span>
              {
                // <i className={"material-icons menuExpandIcon"}>arrow_drop_down</i>
              }
            </li>
          </Link>
          <Link to={"/lookup/restaurant/best"}>
            <li className={"menuItem"}>
              <i className={"material-icons menuIcon"}>stars</i>
              <span className={"menuText"}>BEST 음식점 관리</span>
            </li>
          </Link>
          <Link to={"/event"}>
            <li className={"menuItem"}>
              <i className={"material-icons menuIcon"}>event</i>
              <span className={"menuText"}>이벤트 관리</span>
            </li>
          </Link>
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
