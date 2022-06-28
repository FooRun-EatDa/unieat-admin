import React, { useEffect, useState } from "react";
import { Button, KakaoMap, Modal, Row, TextBox } from "@component";
import { ColorType } from "@enums";
import { Coordinate } from "~/types";

interface Props {
  fetchCoords: (address: string) => void
  fetchedCoords?: Coordinate
  isLoading?: boolean
  isOpen: boolean
  onSubmit: (isRedirect: boolean | undefined, data: Data) => void
}

interface Data {
  title: string
  address: string
  coordinate: Coordinate
}

export const restaurantInputModalKey = "restaurantInputModal"

const RestaurantInputModalPresenter = ({ fetchedCoords, fetchCoords, isLoading, isOpen, onSubmit }: Props) => {
  const [ title, setTitle ] = useState<string | undefined>()
  const [ address, setAddress ] = useState<string | undefined>()
  const [ coordinate, setCoordinate ] = useState<Coordinate | undefined>(fetchedCoords)

  useEffect(() => {
    setCoordinate(fetchedCoords)
  }, [ fetchedCoords ])

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
    <Modal modalKey={restaurantInputModalKey} title={"음식점 추가하기"} description={"새로운 음식점 정보를 추가하기 위해 필요한 최소한의 정보만을 먼저 입력합니다."} buttons={{
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
        <TextBox label={"주소"} value={address} onChange={e => setAddress(e.target.value)} description={"입력 예시 : 서울시 중구 세종대로 110, 경기도 수원시 팔달구 효원로 1"} />
        <div style={{ padding: "0 5px" }}>
          <Button enable={!!address}
                  onClick={() => fetchCoords(address!!)}
                  color={ColorType.PRIMARY}
                  isLoading={isLoading}
                  text={"주소로 좌표 조회"}
                  width={"100%"} />
        </div>
        <Row align={"flex-end"}>
          <TextBox label={"위도"}
                   enable={false}
                   value={coordinate?.longitude}
                   onChange={e => setCoordinate({ latitude: coordinate!.latitude, longitude: Number.parseFloat(e.target.value) })} />
          <TextBox label={"경도"}
                   enable={false}
                   value={coordinate?.latitude}
                   onChange={e => setCoordinate({ latitude: Number.parseFloat(e.target.value), longitude: coordinate!.longitude})} />
        </Row>
        {
          coordinate && (
            <KakaoMap
              level={5}
              width={"100%"}
              height={"200px"}
              center={coordinate}
              markers={[{
                coordinate,
                title: address
              }]}
            />
          )
        }
      </div>
    </Modal>
  )
}

export default RestaurantInputModalPresenter