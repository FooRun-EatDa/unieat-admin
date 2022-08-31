import React, { useEffect, useState } from "react";
import { Event } from "~/types";
import { Button, InputDateTime, Row, TextBox } from "@component";
import { ColorType } from "@enums";
import { useNavigate } from "react-router-dom";
import { DefaultSelect } from "@component/Select";
import MultipleTextBox from "../../component/MultipleTextBox/MultipleTextBox";
import moment, { Moment } from "moment";
import { useEventDetailContext, useModalContext } from "~/hooks";

interface Props {
  isLoading: boolean
  data?: Event
  onSubmit: (event: Event) => void
  mode?: 'modify' | 'create'
}

const EventDetailPresenter = ({ isLoading, data, onSubmit, mode = 'modify' }: Props) => {
  const { restaurantSearchModal } = useModalContext()
  const [ eventOriginal, setEventOriginal ] = useState<Event | undefined>(data)
  const [ isEdit, setEdit ] = useState<boolean>(mode === 'create')
  const [ expiredDate, setExpiredDate ] = useState<Moment | undefined>()
  const { restaurant } = useEventDetailContext()
  const [ event, setEvent ] = useState<Event>({
    id: 0,
    name: '',
    restaurantName: '',
    couponCount: 0,
    desc: '',
    expiredDate: '',
    status: '',
    notice: [],
  } as Event)
  const navigate = useNavigate()

  const handleClickRestaurantSearch = () => {
    restaurantSearchModal.open()
  }

  useEffect(() => {
    if (data) {
      setEvent(data)
      setEventOriginal(data)
      setExpiredDate(moment(data?.expiredDate, "YY/MM/DD HH:mm"))
    }
  }, [ data ])

  useEffect(() => {
    if (restaurant) {
      setEvent(event => ({
        ...event,
        restaurant: restaurant
      } as Event))
    }
  }, [ restaurant ])

  const handleClickBack = () => {
    navigate(-1)
  }

  const handleClickDelete = () => {
    if (window.confirm("이벤트를 삭제하시겠습니까?")) {
      if (window.confirm("한번 더 확인")) {
        window.alert('삭제 기능 미구현')
      }
    }
  }

  const handleClickReset = () => {
    setEvent(Object.assign(eventOriginal, {}))
  }

  const handleClickSave = () => {
    onSubmit(event!!)
  }

  const handleClickEdit = () => {
    setEdit(true)
  }

  const handleChange = (key: string, value: string) => {
    setEvent(event => ({
      ...event,
      [key]: value
    } as Event))
  }

  const handleChangeNotices = (notices: Array<string>) => {
    setEvent(event => ({
      ...event,
      notice: notices
    } as Event))
  }

  return event ? (
    <>
      <div className={"header"}>
        <Button color={ColorType.WHITE} icon={"arrow_back"} onClick={handleClickBack} />
        <h4 className={"title"}>{event.name}</h4>
        <div className={"headerIcons"}>
          <Button color={ColorType.DANGER} icon={"delete"} text={"이벤트 삭제하기"} iconWithText={true} onClick={handleClickDelete} show={mode !== 'create'} />
          <Button color={ColorType.WHITE} icon={"refresh"} text={"기존 값으로 초기화"} iconWithText={true} onClick={handleClickReset} show={mode !== 'create' && isEdit} />
          <Button color={ColorType.PRIMARY} classNames={["save"]} icon={"save"} text={"저장하기"} iconWithText={true} onClick={handleClickSave} show={isEdit} />
          <Button color={ColorType.PRIMARY} icon={"edit"} text={"수정하기"} iconWithText={true} onClick={handleClickEdit} show={!isEdit} />
        </div>
      </div>
      <section className={"section"}>
        <TextBox label={"고유 ID"} value={event.id} enable={false} />
        <TextBox label={"이벤트명"} value={event.name} enable={isEdit}
                 onChange={e => handleChange('name', e.currentTarget.value)} />
        <Row align={"flex-end"}>
          <TextBox label={"이벤트 진행 식당"} value={restaurant?.name} enable={false} />
          <div style={{ paddingBottom: "7.5px" }}>
            <Button color={ColorType.PRIMARY}
                    icon={"search"}
                    enable={isEdit}
                    isLoading={isLoading}
                    onClick={handleClickRestaurantSearch} />
          </div>
        </Row>
        <TextBox label={"쿠폰수량"} value={event.couponCount} enable={isEdit} isNumber={true}
                 onChange={e => handleChange('couponCount', e.currentTarget.value)} />
        <InputDateTime label={"이벤트 종료일시"} defaultValue={expiredDate} enable={isEdit}
                 onChange={value => handleChange('expiredDate', value.format("YY/MM/DD HH:mm"))} />
        <Row>
          <DefaultSelect
            defaultValue={event.status}
            onChange={(item) => handleChange('status', item.value)}
            label={"이벤트 상태"}
            enable={isEdit}
            items={[
              {
                text: "진행중",
                value: 'VALID'
              },
              {
                text: "종료",
                value: 'EXPIRED'
              },
            ]}
          />
        </Row>
        <TextBox label={"설명"} value={event.desc} enable={isEdit} isTextArea={true}
                 onValueChange={value => handleChange('desc', value)} />
        <Row classNames={["eventNoticeRow"]}>
          <h3>공지사항</h3>
            <MultipleTextBox
              defaultItems={event.notice}
              isEdit={isEdit}
              description={"입력 예시 : 해당 이벤트는 선착순 100명 제한으로 진행되는 이벤트이며 100명이 넘어갈 경우 이벤트가 조기종료될 수 있습니다."}
              isLoading={isLoading}
              enableSave={false}
              onChange={handleChangeNotices}
            />
        </Row>
      </section>
    </>
  ) : <></>
}

export default EventDetailPresenter;
