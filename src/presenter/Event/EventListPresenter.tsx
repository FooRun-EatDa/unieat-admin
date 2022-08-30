import React from "react";
import { Event } from "~/types";
import { ListGroup, ListGroupItem } from "@component";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean
  data?: Array<Event>
}

const EventListPresenter = ({ isLoading, data }: Props) => {
  const navigate = useNavigate()

  const handleClickItem = (id: number) => () => {
    navigate(`/event/${id}`)
  }

  return (
    <>
      <ListGroup
        title={"전체 이벤트 목록"}
        onClickRemove={() => window.alert('삭제 기능 미구현')}
        isLoading={isLoading}>
        {
          !isLoading && data ? data.map((item, index) => {
            const { id, name, restaurantName, couponCount, desc, expiredDate, status, notice } = item
            return (
              <ListGroupItem
                key={index}
                values={[
                  {
                    width: "30%",
                    value: name
                  },
                  {
                    width: "20%",
                    value: restaurantName
                  },
                  {
                    width: "15%",
                    value: expiredDate
                  },
                  {
                    width: "10%",
                    value: (() => {
                      if (status === 'VALID') {
                        return '진행중'
                      } else if (status === 'EXPIRED') {
                        return '종료'
                      } else if (status === 'NOT_APPLICABLE') {
                        return '-'
                      }
                    })()
                  },
                  {
                    width: "15%",
                    value: `쿠폰 ${couponCount}개`
                  },
                  {
                    width: "5%",
                    icon: 'description',
                    align: 'center',
                    onClick: handleClickItem(id)
                  }
                ]}
              />
            )
          }) : <></>
        }
      </ListGroup>
    </>
  )
}

export default EventListPresenter;
