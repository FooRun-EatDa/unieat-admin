import React, { useState } from "react";
import MultipleTextBox from "../../../component/MultipleTextBox/MultipleTextBox";
import { Button } from "@component";
import { ColorType } from "@enums";
import { RestaurantBusinessHour } from "~/types";

interface Props {
  data?: Array<RestaurantBusinessHour>
  isLoading: boolean
}

const RestaurantDetailBusinessHourPresenter = ({ data, isLoading }: Props) => {
  const [ isEditBusinessHours, setEditBusinessHours ] = useState<boolean>(false)

  const handleClickBusinessHoursEditButton = () => {
    setEditBusinessHours(true)
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
