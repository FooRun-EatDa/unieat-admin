import React, { useEffect, useState } from "react";
import { Coordinate } from "~/types";
import { CustomOverlayMap, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { MarkerItem } from "@component";

interface Props {
  center?: Coordinate
  width?: string
  height?: string
  level?: number
  markers?: Array<MarkerItem>
  activeMarkerIndex?: number
  enableRoute?: boolean
}

const KakaoMap = ({ center, width = "100%", height = "500px", level = 10, enableRoute = false, activeMarkerIndex = -1, markers }: Props) => {
  const defaultCenter = { latitude: 37.248473, longitude: 127.070199 }
  const [ innerCenter, setInnerCenter ] = useState<Coordinate>(center ? center : defaultCenter)
  const [ hoveredOverlayIndex, setHoveredOverlayIndex ] = useState<number>()
  const [ activeMarker, setActiveMarker ] = useState<number>()

  useEffect(() => {
    if (center) {
      setInnerCenter(center)
    }
  }, [ center ])

  useEffect(() => {
    setActiveMarker(() => activeMarkerIndex)
    if (markers && activeMarkerIndex !== -1) {
      setInnerCenter(markers[activeMarkerIndex].coordinate)
    }
  }, [ activeMarkerIndex ])

  const handleMouseOverOverlay = (index: number) => () => {
    setHoveredOverlayIndex(() => index)
  }

  const handleMouseLeaveOverlay = () => {
    setHoveredOverlayIndex(() => 0)
  }

  const handleMouseOverMarker = (index: number) => () => {
    setActiveMarker(() => index)
  }

  const handleMouseOutMarker = () => {
    setActiveMarker(() => -1)
  }

  return (
    <Map
      className={"kakaoMapWrapper"}
      center={{ lat: innerCenter.latitude, lng: innerCenter.longitude }}
      isPanto={true}
      level={level}
      style={{ width: width, height: height }}>
      {
        markers?.map(({ title, coordinate: { latitude, longitude } }, index) => (
          <MapMarker
            key={index}
            position={{ lat: latitude, lng: longitude }}
            onMouseOver={handleMouseOverMarker(index)}
            onMouseOut={handleMouseOutMarker}
          />
        ))
      }
      {
        markers?.map(({ content, url, title, coordinate: { latitude, longitude } }, index) => {
          return activeMarker === index && (
            <CustomOverlayMap
              key={index}
              zIndex={hoveredOverlayIndex === index ? 10000 : 1000}
              position={{ lat: latitude, lng: longitude }}
              yAnchor={2}>
              <div className="markerOverlayWrapper" onMouseOver={handleMouseOverOverlay(index)} onMouseLeave={handleMouseLeaveOverlay}>
                <a className="markerOverlayLink"
                   href={url}
                   target="_blank"
                   rel="noreferrer">
                  <span className="title">
                    { title }
                    {
                      content && <div className={"content"}>{ content }</div>
                    }
                  </span>
                </a>
              </div>
            </CustomOverlayMap>
          )
        })
      }
      {
        markers && enableRoute && (
          <Polyline
            path={[
              [
                ...markers.map(({ coordinate: { latitude, longitude } }) => ({
                  lat: latitude,
                  lng: longitude
                }))
              ],
            ]}
            endArrow={true}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={"red"} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
          />
        )
      }
    </Map>
  )
}

export default KakaoMap
