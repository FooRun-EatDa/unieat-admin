import React, { useEffect, useState } from "react";

interface Coordinate {
  latitude: number
  longitude: number
}

interface Props {
  center?: Coordinate
  zoom?: number
  markerCoords?: Array<Coordinate>
}

const NaverMap = ({ center, zoom = 10, markerCoords }: Props) => {
  const [ map, setMap ] = useState<naver.maps.Map>()

  useEffect(() => {
    // const { latitude, longitude } = center
    const mapOptions = {
      // center: new naver.maps.LatLng(latitude, longitude),
      zoom: zoom
    };
    const newMap = new naver.maps.Map('map', mapOptions);
    setMap(newMap)
  }, [ ])

  useEffect(() => {
    console.dir(markerCoords)
    markerCoords?.forEach(coords => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(coords.latitude, coords.longitude),
        map: map!!
      });
    })
  }, [ markerCoords ])

  return (
    <div className={"naverMapWrapper"}>
      <div id="map" className={"naverMap"} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default NaverMap
