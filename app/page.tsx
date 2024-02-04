"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"
import RecommendPost from "./components/home/RecommendPost/RecommendPost"
import GoogleMapArea from "./components/home/googleMap/GoogleMapArea"

import {APIProvider, Map, Marker, useMapsLibrary} from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react"

const Home = () => {
  const position = {lat: 35.72295079725532, lng: 139.71215183258244};
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    const initMap = async () => {
      const position = {lat: 35.72295079725532, lng: 139.71215183258244};
      const mapElement = document.getElementById("map")
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const { PlacesService, PlacesServiceStatus } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const map = new Map(mapElement!, {
        zoom: 15,
        center: position,
        mapId: 'DEMO_MAP_ID', // ここにあなたのマップIDを設定
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: 'Commude',
      });

      const service = new PlacesService(map)

      service.nearbySearch({
        location: position,
        radius: 1000,  // 検索範囲（メートル）
        type: 'store'  // 店舗を検索
      }, (results, status) => {
          if (status === PlacesServiceStatus.OK) {
            console.log(results);
          }
      });
      
    }
    
    if (typeof window !== 'undefined') {
      // ウィンドウオブジェクトが利用可能な場合のみマップを初期化
      initMap();
    }
  }, []);

  
  return (
    <div>
      <Header/>
      <div>
        <APIProvider apiKey={API_KEY!}>
          <div className="h-[600px]">
            {/* <Map center={position} zoom={15}>
              <Marker position={position} />
            </Map> */}

            <div id="map" className="h-[600px]">

            </div>
          </div>
          
        </APIProvider>
        
        
        <RecommendPost />
        <ShopCardList />
      </div>
    </div>
  )
}

export default Home