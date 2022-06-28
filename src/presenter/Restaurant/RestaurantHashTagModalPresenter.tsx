import React, { useEffect, useState } from "react";
import { Button, Modal } from "@component";
import { ColorType } from "@enums";
import { HashTag } from "@component/HashTagListGroup/HashTag";
import { HashTagType } from "~/types";

interface Props {
  isOpen: boolean
  onSubmit: (selectedItems: Array<HashTagType>) => void
  tags?: Array<HashTagType>
}

export const restaurantHashTagModalKey = "restaurantHashTagModal"

const RestaurantHashTagModalPresenter = ({ isOpen, onSubmit, tags = [] }: Props) => {
  const [ selectedItems, setSelectedItems ] = useState<Array<HashTagType>>([])

  const handleSubmit = () => {
    onSubmit && onSubmit(selectedItems)
  }

  const handleSelectTag = (tag: HashTagType) => {
    if (contains(tag)) {
      setSelectedItems(items => items.filter(item => tag !== item))
    } else {
      setSelectedItems(items => [ ...items, tag ])
    }
  }

  const contains = (tag: HashTagType) => {
    return selectedItems.indexOf(tag) !== -1
  }

  useEffect(() => {
    setSelectedItems([])
  }, [ isOpen ])

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
          tags.map((item) => (
            <HashTag onClick={() => handleSelectTag(item)} item={item} clickable={true} selected={contains(item)} />
          ))
        }
      </div>
    </Modal>
  )
}

export default RestaurantHashTagModalPresenter
