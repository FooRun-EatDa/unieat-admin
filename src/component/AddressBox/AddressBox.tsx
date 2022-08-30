import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, KakaoMap, Row, TextBox } from "~/component";
import { Address, Coordinate, PostCodeResult } from "~/types";
import { ColorType } from "@enums";
import { useAddressCoordinateQuery } from "~/hooks";

interface Props {
  isEdit?: boolean
  initialValue?: Address
  onChange?: (address: Address) => void
}

const AddressBox = ({ isEdit = false, initialValue, onChange }: Props) => {
  const [ address, setAddress ] = useState<Address | undefined>(initialValue)
  const [ enableQuery, setEnableQuery ] = useState<boolean>(false)

  useEffect(() => {
    if (initialValue) {
      setAddress({ ...initialValue })
    }
  }, [ initialValue ])

  const { data, isLoading } = useAddressCoordinateQuery(address?.address!!, enableQuery && isEdit && !!address?.address, _ => {
    alert("좌표를 찾을 수 없습니다.")
    setEnableQuery(false)
  })

  const addressSearchPopUp = new window.daum.Postcode({
    oncomplete: (data: PostCodeResult) => {
      const { address, bcode } = data
      setAddress(prevState => {
        return {
          ...prevState,
          address,
          districtCode: bcode
        }
      })
      setEnableQuery(true)
    }
  })

  useEffect(() => {
    const coordinate = data
    setAddress(address => {
      const newAddress = {
        ...address,
        coordinate
      }
      onChange && onChange(newAddress)
      return newAddress
    })
  }, [ data ])

  const handleClickAddressSearch = () => {
    addressSearchPopUp.open()
  }

  const handleChangeCoords = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    let coordinate: Coordinate = type === 'latitude' ? {
      latitude: Number.parseFloat(e.target.value),
      longitude: address!!.coordinate!!.longitude
    } : {
      latitude: address!!.coordinate!!.latitude,
      longitude: Number.parseFloat(e.target.value)
    }
    setAddress(address => {
      const newAddress = {
        ...address,
        coordinate
      }
      onChange && onChange(newAddress)
      return newAddress
    })
  }

  return (
    <Row classNames={["addressBox"]}>
      <Row align={"flex-end"}>
        <TextBox label={"주소"} value={address?.address} enable={false} />
        <div style={{ paddingBottom: "7.5px" }}>
          <Button color={ColorType.PRIMARY}
                  icon={"search"}
                  enable={isEdit}
                  isLoading={isLoading}
                  onClick={handleClickAddressSearch} />
        </div>
      </Row>
      <Row>
        {/*<Button show={isEdit}*/}
        {/*        onClick={() => setEnableQuery(true)}*/}
        {/*        color={ColorType.PRIMARY}*/}
        {/*        isLoading={isLoading}*/}
        {/*        text={"주소로 좌표 조회"}*/}
        {/*        width={"100%"} />*/}
      </Row>
      <Row>
        <TextBox label={"위도"} value={address?.coordinate?.latitude} enable={isEdit} onChange={handleChangeCoords('latitude')} />
        <TextBox label={"경도"} value={address?.coordinate?.longitude} enable={isEdit} onChange={handleChangeCoords('longitude')} />
      </Row>
      <Row>
        {
          address?.coordinate && address?.coordinate.latitude && address?.coordinate.longitude ? (
            <KakaoMap
              level={4}
              width={"100%"}
              height={"200px"}
              center={address.coordinate}
              markers={[{
                coordinate: address.coordinate,
                title: address.address
              }]}
            />
          ) : <></>
        }
      </Row>
    </Row>
  )
}

export default AddressBox
