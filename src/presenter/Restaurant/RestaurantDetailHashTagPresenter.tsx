import React from "react";
import { HashTagListGroup } from "@component";
import { RestaurantHashTag } from "~/types";

interface Props {
  data?: Array<RestaurantHashTag>
  isLoading: boolean
}

const RestaurantDetailHashTagPresenter = ({ data, isLoading }: Props) => {
  return (
    <>
      {
        !isLoading && data ? (
          <HashTagListGroup defaultItems={data?.map(value => value.tag)}/>
        ) : <></>
      }
    </>
  )
}

export default RestaurantDetailHashTagPresenter
