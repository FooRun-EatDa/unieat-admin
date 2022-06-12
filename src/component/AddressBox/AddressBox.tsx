import React, { useState } from "react";
import { Row, Select } from "~/component";
import { Address } from "~/types";
import { useQuery, UseQueryResult } from "react-query";
import { fetchRegionCode } from "~/api/code";
import { RegionCode } from "~/types/Code";

interface Props {
  isEdit?: boolean
  initialValue?: Address
  onChange?: (address: Address) => void
}

const AddressBox = ({ isEdit = false, initialValue = {}, onChange }: Props) => {
  const [ address, setAddress ] = useState<Address>(initialValue)
  const { data: sidoList }: UseQueryResult<Array<RegionCode>> = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: isEdit,
    queryKey: [ 'fetch-region-code-sido', { } ],
    queryFn: fetchRegionCode({})
  })

  const { data: sggList }: UseQueryResult<Array<RegionCode>> = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: isEdit,
    queryKey: [ 'fetch-region-code-sgg', { address } ],
    queryFn: fetchRegionCode({ sido: address.sido })
  })

  const { data: umdList }: UseQueryResult<Array<RegionCode>> = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: isEdit,
    queryKey: [ 'fetch-region-code-umd', { address } ],
    queryFn: fetchRegionCode({ sido: address.sido, sgg: address.sgg })
  })

  const handleChange = ({ sido, sgg, umd }: Address) => {
    setAddress(() => {
      if (sido) {
        return {
          sido
        }
      }
      if (sgg) {
        return { ...address, sgg }
      }
      if (umd) {
        return { ...address, umd }
      }
      return { ...address }
    })
    onChange && onChange(address)
  }

  return (
    <Row classNames={["addressBox"]}>
      <Select
        enable={isEdit}
        width={"100%"}
        label={"광역시/도"}
        defaultValue={2}
        onChange={(item) => handleChange({ sido: item.value })}
        items={sidoList?.map((item) => ({
          text: item.name,
          value: item.sido
        }))}
      />
      <Select
        enable={isEdit}
        width={"100%"}
        label={"시/군/구"}
        defaultValue={2}
        onChange={(item) => handleChange({ sgg: item.value })}
        items={sggList?.map((item) => ({
          text: item.name,
          value: item.sigungu
        }))}
      />
      <Select
        enable={isEdit}
        width={"100%"}
        label={"읍/면/동"}
        defaultValue={2}
        onChange={(item) => handleChange({ umd: item.value })}
        items={umdList?.map((item) => ({
          text: item.name,
          value: item.umd
        }))}
      />
    </Row>
  )
}

export default AddressBox
