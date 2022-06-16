import React from "react";
import { Button, Modal, Tag } from "@component";
import { ColorType } from "@enums";
import { useRestaurantBestContext } from "~/hooks";
import { Restaurant } from "~/types";

interface Props {
  isOpen: boolean
  submitLoading: boolean
  onSubmit: (data: Array<Restaurant>) => void
}

export const restaurantBestRemoveConfirmModalKey = "restaurantBestRemoveConfirmModal"

const RestaurantBestRemoveConfirmModalPresenter = ({ isOpen, submitLoading, onSubmit }: Props) => {
  const { selectedItems } = useRestaurantBestContext()

  const handleSubmit = () => {
    onSubmit && onSubmit(selectedItems)
  }

  return (
    <Modal
      modalKey={restaurantBestRemoveConfirmModalKey}
      description={"삭제할 BEST 음식점 목록을 확인해주세요."}
      title={"Top 50 음식점 삭제하기"} buttons={{
      right: [
        <Button color={ColorType.DANGER}
                text={"삭제하기"}
                iconWithText={true}
                onClick={handleSubmit}
                isLoading={submitLoading}
                icon={"remove_circle_outline"} />
      ]
    }}>
      <div style={{ padding: '10px', display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {
          selectedItems.map((item) => {
            return (
              <Tag key={item.name} text={item.name} width={"66%"} margin={"5px"} />
            )
          })
        }
      </div>
    </Modal>
  )
}

export default RestaurantBestRemoveConfirmModalPresenter
