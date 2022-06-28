import React, { useState } from "react";
import { Button, Modal } from "@component";
import { ColorType } from "@enums";
import { HashTag } from "@component/HashTagListGroup/HashTag";

interface Props {
  isOpen: boolean
  onSubmit: (selectedItems: Array<string>) => void
}

export const restaurantHashTagModalKey = "restaurantHashTagModal"

const RestaurantHashTagModalPresenter = ({ isOpen, onSubmit }: Props) => {
  const [ selectedItems, setSelectedItems ] = useState<Array<string>>([])
  const items = [
    "flex", "혼밥", "점심", "저녁", "데이트", "이자카야", "2차", "N차", "맥주", "조용한", "칵테일", "해장", "감성", "갓성비", "10분컷", "단체회식"
  ]

  const handleSubmit = () => {
    onSubmit && onSubmit(selectedItems)
  }

  const handleSelectTag = (item: string) => {
    if (contains(item)) {
      setSelectedItems(items => items.filter(i => item !== i))
    } else {
      setSelectedItems(items => [ ...items, item ])
    }
  }

  const contains = (item: string) => {
    return selectedItems.indexOf(item) !== -1
  }

  return (
    <Modal modalKey={restaurantHashTagModalKey} title={"해시태그 추가하기"} description={"임의로 정해진 태그 중 선택하여 해시태그를 추가할 수 있습니다."} buttons={{
      right: [
        <Button color={ColorType.PRIMARY}
                text={"추가하기"}
                iconWithText={true}
                onClick={handleSubmit}
                icon={"add_circle_outline"} />,
      ]
    }}>
      <div style={{ padding: '10px' }}>
        {
          items.map((item) => (
            <HashTag onClick={() => handleSelectTag(item)} item={item} clickable={true} selected={contains(item)} />
          ))
        }
      </div>
    </Modal>
  )
}

export default RestaurantHashTagModalPresenter
