import React, { useEffect, useState } from "react";
import { AddressBox, Button, Modal, TextBox } from "@component";
import { ColorType } from "@enums";
import { Address } from "~/types";

interface Props {
  isLoading?: boolean
  isOpen: boolean
  onSubmit: (isRedirect: boolean | undefined, data: Data) => void
}

interface Data {
  title: string
  address: Address
}

declare global {
  interface Window {
    daum: any;
  }
}

export const restaurantInputModalKey = "restaurantInputModal"

const RestaurantInputModalPresenter = ({ isOpen, onSubmit }: Props) => {
  const [ title, setTitle ] = useState<string | undefined>()
  const [ address, setAddress ] = useState<Address>()

  useEffect(() => {
    setTitle(undefined)
    setAddress({})
  }, [ isOpen ])

  const handleSubmit = (isRedirect: boolean) => () => {
    if (title && address) {
      const data = {
        title,
        address
      }
      onSubmit(isRedirect, data)
    } else {
      alert("입력되지 않은 값이 존재합니다.")
    }
  }

  const handleChangeAddress = (address: Address) => {
    setAddress(address)
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
        <AddressBox isEdit={isOpen}
                    onChange={handleChangeAddress} />
      </div>
    </Modal>
  )
}

export default RestaurantInputModalPresenter
