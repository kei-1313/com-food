"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"
import RecommendPost from "./components/home/RecommendPost/RecommendPost"
import GoogleMapArea from "./components/home/googleMap/GoogleMapArea"

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const Home = () => {
  const position = {lat: 35.72295079725532, lng: 139.71215183258244};
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  
  return (
    <div>
      <Header/>
      <div>
        <APIProvider apiKey={API_KEY!}>
          <div className="h-[600px]">
            <Map center={position} zoom={15}>
              <Marker position={position} />
            </Map>
          </div>
        </APIProvider>
        <RecommendPost />
        <ShopCardList />
      </div>
    </div>
  )
}

export default Home