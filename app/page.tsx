"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"
import RecommendPost from "./components/home/RecommendPost/RecommendPost"

import {APIProvider} from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from "react"

const Home = () => {
  const position = {lat: 35.72295079725532, lng: 139.71215183258244};
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const [nearStores, setNearStores] = useState<google.maps.places.PlaceResult[]>([])
  const [tags, setTags] = useState([])
  const ref = useRef(null)

  const tagsContents = [
    {
      name: "ラーメン"
    },
    {
      name: "中華"
    },
    {
      name: "和食"
    },
    {
      name: "洋食"
    },
    {
      name: "カフェ"
    },
    {
      name: "定食"
    }
  ]

  const handleTags = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e)
  }

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

      service.textSearch({
        query: 'ラーメン',  // 店舗を検索
        location: position,
        radius: 1000,  // 検索範囲（メートル）
        type: "restaurant"
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

  return (
    <div>
      <Header/>
      <div>
        <APIProvider apiKey={API_KEY!}>
            <div id="map" className="h-[600px]">

            </div>
        </APIProvider>
        
        
        <RecommendPost />
        <div className="px-5 mb-10">
          <h3 className="text-2xl font-bold mb-6 pl-5 max-sm:pl-0 max-sm:mb-4">タグ</h3>
          <ul className="grid grid-cols-6 gap-2">
            {tagsContents?.map((item, index) => (
              <li className="w-full">
                <input type="text" value={item.name} className="cursor-pointer py-3 w-full bg-red-500 rounded-full text-center" onClick={(e) => handleTags(e)}/>
              </li>
            ))}
          </ul>
        </div>
        <ShopCardList shops={nearStores} />
      </div>
    </div>
  )
}

export default Home