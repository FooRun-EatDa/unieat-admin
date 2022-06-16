import React, { useRef } from "react";
import { useModalContext } from "~/hooks/context";
import { Button } from "~/component";
import { ColorType } from "@enums";
import { useClickOutsideOfRef } from "~/hooks";

interface Props {
  modalKey: string
  title?: string
  onClose?: () => void
  description?: string
  children: JSX.Element | Array<JSX.Element>
  width?: string
  buttons?: {
    left?: Array<JSX.Element>
    right?: Array<JSX.Element>
  }
}

const Modal = ({ modalKey, title, onClose, description, children, width, buttons }: Props) => {
  const { [modalKey]: { isOpen, close } } = useModalContext()
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
      <div className={["content", isOpen ? "open" : "close"].join(" ")} ref={contentRef} style={{ width }}>
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
