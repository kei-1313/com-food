"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"
import RecommendPost from "./components/home/RecommendPost/RecommendPost"

import {APIProvider} from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from "react"
import SelectBranch from "./components/home/SelectBranch/SelectBranch";

interface TagsContents {
  name: string,
  isActive: boolean
}

//本社、支店の情報型
interface Office {
  officeName: string;
  position: {
    lat: number;
    lng: number;
  };
}


const Home = () => {
  const position = {lat: 35.72295079725532, lng: 139.71215183258244};
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const [nearStores, setNearStores] = useState<google.maps.places.PlaceResult[]>([])
  const [tags, setTags] = useState<String[]>([])
  const ref = useRef(null)

  //本社、支店の情報
  const [offices, setOffices] = useState([
    {
      officeName: "東京本社",
      position: {
        lat: 35.72295079725532,
        lng: 139.71215183258244
      }
    },
    {
      officeName: "名古屋支店",
      position: {
        lat: 35.17365440275725,
        lng: 136.89874981534123
      }
    },
    {
      officeName: "札幌支店",
      position: {
        lat: 43.072372229883534,
        lng: 141.3494175181069
      }
    },
  ])
  

  const [tagsContents, setTagsContent] = useState<TagsContents[]>([
    {
      name: "ラーメン",
      isActive: false
    },
    {
      name: "中華",
      isActive: false
    },
    {
      name: "和食",
      isActive: false
    },
    {
      name: "洋食",
      isActive: false
    },
    {
      name: "カフェ",
      isActive: false
    },
    {
      name: "定食",
      isActive: false
    }
  ])

  const initMap = async (query:string = '') => {
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
      query: query,  // 店舗を検索
      location: position,
      radius: 1000,  // 検索範囲（メートル）
      type: "restaurant"
    }, (results, status) => {
        if (status === PlacesServiceStatus.OK && results) {
          setNearStores(results)
        }
    });
  }

  useEffect(() => {
    console.log(tags);
    
    const tagQuery = tags.join()
    
    if (typeof window !== 'undefined') {
      // ウィンドウオブジェクトが利用可能な場合のみマップを初期化
      initMap(tagQuery);
    }
  }, [tags]);

  const handleTags = (e: React.MouseEvent<HTMLInputElement>) => {
    const tagValue = e.currentTarget.value
    if(tagValue !== '') {
      if(tags.includes(tagValue)) {
        setTags(prev => prev.filter(item => item !== tagValue))
        setTagsContent(prev => {
          prev.map(item => {
            if(item.name === tagValue) {
              item.isActive = false
            }
            return item
          })

          return prev
        })
      } else {
        setTags([...tags, e.currentTarget.value])
        setTagsContent(prev => {
          prev.map(item => {
            if(item.name === tagValue) {
              item.isActive = true
            }
            return item
          })

          return prev
        })
      }
    }
  }

  return (
    <div>
      <Header/>
      <div>
        <APIProvider apiKey={API_KEY!}>
            <div id="map" className="h-[600px]">

            </div>
        </APIProvider>
        
        <SelectBranch offices={offices}/>
        <RecommendPost />
        <div className="max-w-[1200px] mx-auto px-5 mb-10">
          <h3 className="text-2xl font-bold mb-6 pl-5 max-sm:pl-0 max-sm:mb-4">タグ</h3>
          <ul className="grid grid-cols-6 gap-2">
            {tagsContents?.map((item, index) => (
              <li className="w-full">
                {item.isActive}
                <input type="text" value={item.name} className={"cursor-pointer outline-none py-3 w-full border-[2px] border-red-500 rounded-full text-center " + (item.isActive? "bg-white":"bg-red-500")} onClick={(e) => handleTags(e)}/>
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