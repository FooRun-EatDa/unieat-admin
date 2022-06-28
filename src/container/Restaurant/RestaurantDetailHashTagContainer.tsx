import React from "react";
import {
  RestaurantDetailHashTagPresenter,
  restaurantHashTagModalKey,
  RestaurantHashTagModalPresenter
} from "~/presenter";
import { ModalContext, useModal, useRestaurantHashTagQuery } from "~/hooks";
import { useMutation, useQueryClient } from "react-query";
import { deleteRestaurantHashTag, saveRestaurantHashTag } from "~/api";
import useHashTagQuery from "~/hooks/query/hash-tag/useHashTagQuery";
import { HashTagType } from "~/types";

interface Props {
  restaurantId?: string
}

interface SaveHashTagPayload {
  restaurantId: number
  hashTagIds: Array<number>
}

interface DeleteHashTagPayload {
  restaurantId: number
  hashTagId: number
}

const RestaurantDetailHashTagContainer = ({ restaurantId }: Props) => {
  const { isOpen, open, close } = useModal()
  const { data, isLoading } = useRestaurantHashTagQuery(restaurantId)
  const hashTagListQuery = useHashTagQuery(isOpen)
  const queryClient = useQueryClient()

  const mutateSaveRestaurantHashTag = useMutation(({ restaurantId, hashTagIds }: SaveHashTagPayload) => saveRestaurantHashTag(restaurantId, hashTagIds), {
    onSuccess: response => {
      alert("해시태그 저장이 성공적으로 처리되었습니다..")
      queryClient.invalidateQueries(['fetch-restaurant-hash-tag'])
      close()
    },
    onError: error => {
      alert("처리 중 오류가 발생했습니다.")
    }
  })

  const mutateDeleteRestaurantHashTag = useMutation(({ restaurantId, hashTagId }: DeleteHashTagPayload) => deleteRestaurantHashTag(restaurantId, hashTagId), {
    onSuccess: response => {
      alert("해시태그 삭제가 성공적으로 처리되었습니다..")
      queryClient.invalidateQueries(['fetch-restaurant-hash-tag'])
    },
    onError: error => {
      alert("처리 중 오류가 발생했습니다.")
    }
  })

  const handleSubmit = (selectedItems: Array<HashTagType>) => {
    mutateSaveRestaurantHashTag.mutate({
      restaurantId: Number.parseInt(restaurantId!),
      hashTagIds: [ ...selectedItems.map(item => item.id), ...data!.map(item => item.hashTagId) ]
    })
  }

  const handleRemoveTag = (item: HashTagType) => {
    mutateDeleteRestaurantHashTag.mutate({
      restaurantId: Number.parseInt(restaurantId!),
      hashTagId: item.id
    })
  }

  return (
    <>
      <ModalContext.Provider value={{
        [restaurantHashTagModalKey]: {
          isOpen, open, close
        }
      }}>
        <RestaurantDetailHashTagPresenter
          data={data}
          isLoading={isLoading}
          onRemove={handleRemoveTag}
        />
        <RestaurantHashTagModalPresenter isOpen={isOpen} onSubmit={handleSubmit} tags={hashTagListQuery.data} />
      </ModalContext.Provider>
    </>
  )
}

export default RestaurantDetailHashTagContainer
