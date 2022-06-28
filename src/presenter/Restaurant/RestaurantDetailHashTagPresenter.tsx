import React from "react";
import { HashTagListGroup } from "@component";
import { HashTagType, RestaurantHashTag } from "~/types";

interface Props {
  data?: Array<RestaurantHashTag>
  isLoading: boolean
  onRemove: (item: HashTagType) => void
}

const RestaurantDetailHashTagPresenter = ({ data, isLoading, onRemove }: Props) => {
  return (
    <>
      {
        !isLoading && data ? (
          <HashTagListGroup
            onRemove={onRemove}
            defaultItems={data.map(({ hashTagId, content }) => {
              return {
                id: hashTagId,
                content: content
              }
            })}
          />
        ) : <></>
      }
    </>
  )
}

export default RestaurantDetailHashTagPresenter
