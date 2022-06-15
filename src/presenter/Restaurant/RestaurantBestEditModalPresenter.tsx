import React from "react";
import { Button, Modal } from "@component";
import { ColorType } from "@enums";

interface Props {
  isLoading?: boolean
  isOpen: boolean
  onSubmit: (isRedirect: boolean | undefined, data: Data) => void
}

interface Data {

}

const RestaurantBestEditModalPresenter = ({ isLoading, isOpen, onSubmit }: Props) => {
  return (
    <Modal title={"Top 50 음식점 추가하기"} buttons={{
      right: [
        <Button color={ColorType.PRIMARY}
                text={"추가하기"}
                iconWithText={true}
                // onClick={handleSubmit(false)}
                icon={"add_circle_outline"} />
      ]
    }}>
      <div>

      </div>
    </Modal>
  )
}

export default RestaurantBestEditModalPresenter
