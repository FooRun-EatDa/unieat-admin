import React, { useEffect, useState } from "react";
import { Button, Modal, Row, TextBox } from "@component";
import { ColorType } from "@enums";
import { Coordinate } from "~/types";

interface Props {
  fetchCoords: (address: string) => void
  fetchedCoords?: Coordinate
  isOpen: boolean
  onSubmit: (isRedirect: boolean | undefined, data: Data) => void
}

interface Data {
  title: string
  address: string
  coordinate: Coordinate
}

const RestaurantInputModalPresenter = ({ fetchedCoords, fetchCoords, isOpen, onSubmit }: Props) => {
  const [ title, setTitle ] = useState<string | undefined>()
  const [ address, setAddress ] = useState<string | undefined>()
  const [ coordinate, setCoordinate ] = useState<Coordinate | undefined>(fetchedCoords)

  useEffect(() => {
    setTitle(undefined)
    setAddress(undefined)
    setCoordinate(undefined)
  }, [ isOpen ])

  const handleSubmit = (isRedirect: boolean) => () => {
    if (title && address && coordinate) {
      const data = {
        title,
        address,
        coordinate
      }
      onSubmit(isRedirect, data)
    } else {
      alert("입력되지 않은 값이 존재합니다.")
    }
  }

  return (
    <Modal title={"음식점 추가하기"} buttons={{
      right: [
        <Button color={ColorType.PRIMARY}
                text={"생성하기"}
                iconWithText={true}
                onClick={handleSubmit(false)}
                icon={"add_circle_outline"} />,
        <Button color={ColorType.PRIMARY}
                text={"생성 후 상세로 이동"}
                iconWithText={true}
                onClick={handleSubmit(true)}
                icon={"assignment_returned"} />,
      ]
    }}>
      <div style={{ padding: '10px' }}>
        <TextBox label={"식당명"} value={title} onChange={e => setTitle(e.target.value)} />
        <TextBox label={"주소"} value={address} onChange={e => setAddress(e.target.value)} />
        <div style={{ padding: "0 5px" }}>
          <Button enable={!!address}
                  onClick={() => fetchCoords(address!!)}
                  color={ColorType.PRIMARY}
                  text={"주소로 좌표 조회"}
                  width={"100%"} />
        </div>
        <Row align={"flex-end"}>
          <TextBox label={"위도"}
                   value={coordinate?.longitude}
                   onChange={e => {}} />
          <TextBox label={"경도"}
                   value={coordinate?.latitude}
                   onChange={e => {}} />
        </Row>
      </div>
    </Modal>
  )
}

export default RestaurantInputModalPresenter
