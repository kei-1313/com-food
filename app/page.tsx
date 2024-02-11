"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"

import {APIProvider} from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from "react"
import SelectBranch from "./components/home/SelectBranch/SelectBranch";
import RecommendShop from "./components/home/RecommendShop/RecommendShop";

import { getCookies, setCookie, hasCookie, deleteCookie, getCookie } from 'cookies-next';
import SearchFreeWord from "./components/home/SearchFreeWord/SearchFreeWord";

//タグリストの型
interface TagsContents {
  name: string,
  isActive: boolean
}

const Home = () => {
  // const position = {lat: 35.72295079725532, lng: 139.71215183258244};
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const [nearStores, setNearStores] = useState<google.maps.places.PlaceResult[]>([])
  const [tags, setTags] = useState<String[]>([])
  const [tagQuery, setTagQuery] = useState('')
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

  //本社か支店でどれが選択されているかの状態
  const [selectedOffice, setSelectedOffice] = useState(
    {
      officeName: "東京本社",
      position: {
        lat: 35.72295079725532,
        lng: 139.71215183258244
      }
    }
  )

  //選択されたvalueを取得するためにRefを定義
  const officeRef = useRef<HTMLSelectElement>(null)

  //選択されたvalueを取得し、選択された状態を保持するstateに入れることでその支店の1キロ圏内の店舗を出力している
  const handleChangeOfficeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selecedOfficeName = e.currentTarget.value
    for (let i = 0; i < offices.length; i++) {
      const officeName = offices[i].officeName
      if(selecedOfficeName === officeName) {
        setSelectedOffice({...offices[i]})
      }
    }
  }
  

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

  const initMap = async (query:string = '', position:any) => {
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

  //今週のおすすめ機能
  let shuffledShop = {}
  let shuffledShopImage = ''
  //シャッフルした値を1つ取り出す
  const shuffleRecommendShop = () => {
    const shuffleNum = Math.floor(Math.random() * (nearStores.length + 1));
    // console.log(nearStores[shuffleNum], );
    return nearStores[shuffleNum]
  }

  //初回時にcookieに保存、2回目からはcookieからデータを取得する
  const handleCookie = () => {
    const shuffleRecommendShopData = shuffleRecommendShop()

    //parseしたものは関数を保持しないため画像は別で保存
    if(shuffleRecommendShopData?.photos !== undefined) {
      shuffledShopImage = shuffleRecommendShopData.photos[0].getUrl({'maxWidth':300, 'maxHeight':300})
    }

    //テキストデータしか扱えないので、JSONに変更
    const shuffledShopJson = JSON.stringify(shuffleRecommendShopData)

    if(!hasCookie('shuffedShop')) {
      setCookie('shuffedShop', shuffledShopJson);
    }

    const shuffledShopfromCookie = getCookie('shuffedShop')
    if(shuffledShopfromCookie) {
      try {
        const parsedData = JSON.parse(shuffledShopfromCookie);
        shuffledShop = parsedData
        // setShuffedShop({...parsedData})
      } catch(error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    //タグがひとつでもはいっていれば実行
    if(tags.length > 0) {
      setTagQuery(tags.join())
    }
    
    
      // ウィンドウオブジェクトが利用可能な場合のみマップを初期化
      initMap(tagQuery, selectedOffice.position)

      //cookieの処理
      // handleCookie()
    
  }, [tags, tagQuery, selectedOffice]);

  



  return (
    <div>
      <Header/>
      <div>
        <APIProvider apiKey={API_KEY!}>
            <div id="map" className="h-[600px]">

            </div>
        </APIProvider>
        
        <SelectBranch offices={offices} officeRef={officeRef} onChange={handleChangeOfficeValue}/>
        <RecommendShop shuffledShop={shuffledShop} shuffledShopImage={shuffledShopImage}/>
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
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-2xl font-bold mb-6 pl-5 max-sm:pl-0 max-sm:mb-4">店舗一覧</h2>
          <div className="flex justify-between">
            <div className="flex gap-4 mb-5 max-sm:mb-4 max-sm:gap-3">
              <button className="px-6 py-4 max-sm:px-3 max-sm:py-3 bg-[#3EB36D] font-bold">本日営業中の店舗</button>
              <button className="px-6 py-4 max-sm:px-3 max-sm:py-3 bg-sky-500">本日定休日の店舗</button>
            </div>
            <SearchFreeWord/>
          </div>
          <ShopCardList shops={nearStores} />
        </div>
      </div>
    </div>
  )
}

export default Home