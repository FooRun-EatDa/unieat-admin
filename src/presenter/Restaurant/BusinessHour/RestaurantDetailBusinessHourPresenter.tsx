import React, { useState } from "react";
import MultipleTextBox from "../../../component/MultipleTextBox/MultipleTextBox";
import { Button } from "@component";
import { ColorType } from "@enums";
import { RestaurantBusinessHour } from "~/types";

interface Props {
  data?: Array<RestaurantBusinessHour>
  isLoading: boolean
  onSubmit: (businessHours: Array<string>) => void
}

const RestaurantDetailBusinessHourPresenter = ({ data, isLoading, onSubmit }: Props) => {
  const [ isEditBusinessHours, setEditBusinessHours ] = useState<boolean>(false)

  const handleClickBusinessHoursEditButton = () => {
    setEditBusinessHours(true)
  }

  const handleClickBusinessHoursSaveButton = (items: Array<string>) => {
    if (window.confirm("변경사항을 저장하시겠습니까?")) {
      onSubmit && onSubmit(items)
    }
  }

  return (
    <>
      <h3>영업시간</h3>
      {
        !isLoading && data ? (
          <MultipleTextBox
            defaultItems={data.map(value => value.content)}
            isEdit={isEditBusinessHours}
            isLoading={isLoading}
            onClickSave={handleClickBusinessHoursSaveButton}
          />
        ) : <></>
      }
      <Button
        color={ColorType.PRIMARY}
        text={"영업시간 수정하기"}
        icon={"add_circle_outline"}
        iconWithText={true}
        onClick={handleClickBusinessHoursEditButton}
        show={!isEditBusinessHours}
        classNames={["editButton"]}
        width={"100%"}
      />
    </>
  )
}

export default RestaurantDetailBusinessHourPresenter
