"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"
import RecommendPost from "./components/home/RecommendPost/RecommendPost"

import {APIProvider} from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react"

const Home = () => {
  const position = {lat: 35.72295079725532, lng: 139.71215183258244};
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const [nearStores, setNearStores] = useState<google.maps.places.PlaceResult[]>([])

  useEffect(() => {
    const initMap = async () => {
      const mapElement = document.getElementById("map")
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const { PlacesService, PlacesServiceStatus } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const map = new Map(mapElement!, {
        zoom: 15,
        center: position,
        mapId: 'MAP_ID', // ここにあなたのマップIDを設定
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
        type: 'restaurant'  // 店舗を検索
      }, (results, status) => {
          if (status === PlacesServiceStatus.OK && results) {
            setNearStores(results)
          }
      });
    }
    
    if (typeof window !== 'undefined') {
      // ウィンドウオブジェクトが利用可能な場合のみマップを初期化
      initMap();
    }
  }, []);

  // console.log(nearStores);
  

  
  return (
    <div>
      <Header/>
      <div>
        <APIProvider apiKey={API_KEY!}>
            <div id="map" className="h-[600px]">

            </div>
        </APIProvider>
        
        
        <RecommendPost />
        <ShopCardList shops={nearStores} />
      </div>
    </div>
  )
}

export default Home