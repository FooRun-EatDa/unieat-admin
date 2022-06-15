import React, { useRef } from "react";
import { useModalContext } from "~/hooks/context";
import { Button } from "~/component";
import { ColorType } from "@enums";
import { useClickOutsideOfRef } from "~/hooks";

interface Props {
  title?: string
  onClose?: () => void
  description?: string
  children: JSX.Element | Array<JSX.Element>
  buttons?: {
    left?: Array<typeof Button>
    right?: Array<JSX.Element>
  }
}

const Modal = ({ title, onClose, description, children, buttons }: Props) => {
  const { isOpen, close } = useModalContext()
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClickClose = () => {
    close()
    onClose && onClose()
  }

  useClickOutsideOfRef({
    ref: contentRef,
    onClick: handleClickClose
  })

  return (
    <div className={["modal", isOpen ? "open" : "close"].join(" ")}>
      <div className={"underlay"} />
      <div className={["content", isOpen ? "open" : "close"].join(" ")} ref={contentRef}>
        <header className={"header"}>
          <h4 className={"title"}>{ title }</h4>
          <div className={"icons"}>
            <Button color={ColorType.WHITE} icon={"close"} onClick={handleClickClose} />
          </div>
        </header>
        {
          description && <div className={"description"}>{ description }</div>
        }
        <section className={"section"}>
          { children }
        </section>
        <footer className={"footer"}>
          <div className={"left"}>
            {
              buttons?.left && buttons.left
            }
          </div>
          <div className={"right"}>
            {
              buttons?.right && buttons.right
            }
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Modal
