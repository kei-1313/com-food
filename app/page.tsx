"use client"

import Header from "@/app/components/layouts/Header"
import ShopCardList from "./components/shop/shopCardList/ShopCardList"

import {APIProvider} from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from "react"
import SelectBranch from "./components/home/SelectBranch/SelectBranch";
import RecommendShop from "./components/home/RecommendShop/RecommendShop";

import { getCookies, setCookie, hasCookie, deleteCookie, getCookie } from 'cookies-next';
import SearchFreeWord from "./components/home/SearchFreeWord/SearchFreeWord";

import {
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import SelectSort from "./components/home/SelectSort/SelectSort";

// const Home = () => {
//   const ref = useRef(null)
  

//   const initMap = async (query:string = '', position:any) => {
//     const mapElement = document.getElementById("map")
//     //@ts-ignore
//     const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
//     const { PlacesService, PlacesServiceStatus } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
//     const map = new Map(mapElement!, {
//       zoom: 15,
//       center: position,
//       mapId: 'MAP_ID', // ここにあなたのマップIDを設定
//     });

//     const marker = new AdvancedMarkerElement({
//       map: map,
//       position: position,
//       title: 'Commude',
//     });

//     const service = new PlacesService(map)

//     service.textSearch({
//       query: query,  // 店舗を検索
//       location: position,
//       radius: 1000,  // 検索範囲（メートル）
//       type: "restaurant"
//     }, (results, status) => {
//         if (status === PlacesServiceStatus.OK && results) {
//           setNearStores(results)
//         }
//     });
//   }

//   //今週のおすすめ機能
//   const [shuffledShop, setShuffledShop] = useState<google.maps.places.PlaceResult>({})
//   const [shuffledShopImage, setShuffledShopImage] = useState('')
//   //シャッフルした値を1つ取り出す
//   const shuffleRecommendShop = () => {
//     const shuffleNum = Math.floor(Math.random() * (nearStores.length + 1));
//     // console.log(nearStores[shuffleNum], );
//     return nearStores[shuffleNum]
//   }

//   //初回時にcookieに保存、2回目からはcookieからデータを取得する
//   const handleCookie = () => {
//     const shuffleRecommendShopData = shuffleRecommendShop()
//     if(!shuffleRecommendShopData) return
//     if(!shuffleRecommendShopData.photos) return

//     // setShuffledShop({...shuffleRecommendShopData})
//     // if(shuffleRecommendShopData.photos && shuffleRecommendShopData.photos.length > 0) {
//     //   console.log("ddd");
//     //   console.log();
//     //   // console.log(shuffledShop.photos[0].getUrl({'maxWidth':300, 'maxHeight':300}));
//     //   setShuffledShopImage(shuffleRecommendShopData.photos[0].getUrl({'maxWidth':300, 'maxHeight':300}))
//     // }

//     //cookieがセットされていない場合
//     if(!hasCookie('shuffedShop') && !hasCookie('shuffedShopImage')) {
//       const shuffledShopJson = JSON.stringify(shuffleRecommendShopData)
//       const shuffledShopImageJson = JSON.stringify(shuffleRecommendShopData.photos[0].getUrl({'maxWidth':300, 'maxHeight':300}))

//       setCookie('shuffedShop', shuffledShopJson);
//       setCookie('shuffedShopImage', shuffledShopImageJson);
//     } else {
//       const shuffledShopfromCookie = getCookie('shuffedShop')
//       const shuffledShopImagefromCookie = getCookie('shuffedShopImage')
//         try {
//           if(shuffledShopfromCookie && shuffledShopImagefromCookie) {
//             const shuffledShopParsedData = JSON.parse(shuffledShopfromCookie)
//             const shuffledShopImageParsedData = JSON.parse(shuffledShopImagefromCookie)
//             setShuffledShop({...shuffledShopParsedData})
//             setShuffledShopImage(shuffledShopImageParsedData)
//           } else {
//             throw new Error("値が正しく取得できませんでした")
//           }
//         } catch(error) {
//           console.error(error);
//         }
//     }
//   }

//   useEffect(() => {
//     handleCookie()
//   },[nearStores])

//   useEffect(() => {
//     //タグがひとつでもはいっていれば実行
//     if(tags.length > 0) {
//       setTagQuery(tags.join())
//     }
    
//     // ウィンドウオブジェクトが利用可能な場合のみマップを初期化
//     initMap(tagQuery, selectedOffice.position)

      
    
//   }, [tags, tagQuery, selectedOffice]);

//   ////フリーワード検索の処理
//   const searchFreeBoxRef = useRef<HTMLInputElement>(null)

//   const handleSearchFreeWord = (value: string) => {
//     console.log("search");
//     initMap(value, selectedOffice.position)
//   }

//   //フリーワード検索でエンターが押された場合の処理
//   const handleInputKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
//     if(e.key !== 'Enter') return
//     e.preventDefault();
//     if(e.currentTarget.value) {
//       handleSearchFreeWord(e.currentTarget.value)
//     }
//   }

//   const handleSearchFreeWordClickButton = () => {
//     if(searchFreeBoxRef.current?.value) {
//       handleSearchFreeWord(searchFreeBoxRef.current.value)
//     }
//   }

 
//   return (
//     <div>
//       <Header/>
//       <div>
//         <APIProvider apiKey={API_KEY!}>
//             <div id="map" className="h-[600px]">

//             </div>
//         </APIProvider>
        
//         <SelectBranch offices={offices} officeRef={officeRef} onChange={handleChangeOfficeValue}/>
//         <RecommendShop shuffledShop={shuffledShop} shuffledShopImage={shuffledShopImage} />
//         <div className="max-w-[1200px] mx-auto px-5 mb-10">
//           <ul className="grid grid-cols-6 gap-2 max-sm:grid-cols-2">
//             {tagsContents?.map((item, index) => (
//               <li className="w-full" key={index}>
//                 {item.isActive}
//                 <input 
//                   type="text" 
//                   value={item.name}
//                   className={"w-full text-black/70 text-center px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-[30px] outline-none " + (item.isActive? "bg-blue-600/50":"bg-white")} 
//                   onClick={(e) => handleTags(e)}
//                   readOnly
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="max-w-[1200px] mx-auto px-5">
//           <h2 className="text-2xl font-bold mb-6 pl-5 max-sm:pl-0 max-sm:mb-4">店舗一覧</h2>
//           <div className="flex justify-between max-sm:block max-sm:mb-7">
//             <div className="flex gap-4 mb-5 max-sm:mb-4 max-sm:gap-3">
//               <button className="px-6 py-4 max-sm:px-3 max-sm:py-3 bg-[#3EB36D] font-bold">本日営業中の店舗</button>
//               <button className="px-6 py-4 max-sm:px-3 max-sm:py-3 bg-sky-500">本日定休日の店舗</button>
//             </div>
//             <SearchFreeWord searchFreeBoxRef={searchFreeBoxRef} onKeyDown={handleInputKeyDown} onClick={handleSearchFreeWordClickButton}/>
//           </div>
//           <ShopCardList shops={nearStores} />
//         </div>
//       </div>
//     </div>
//   )
// }


interface OfficePostion {
  lat: string;
  lng: string;
}

interface TagsContents {
  name: string,
  isActive: boolean
}


const Home = () => {
  const [nearShops, setNearShops] = useState<google.maps.places.PlaceResult[]>([])

  // 本社、支店の情報
  const [offices, setOffices] = useState([
    {
      officeName: "東京本社",
      place: "tokyo",
      position: {
        lat: "35.72295079725532",
        lng: "139.71215183258244"
      }
    },
    {
      officeName: "名古屋支店",
      place: "nagoya",
      position: {
        lat: "35.17365440275725",
        lng: "136.89874981534123"
      }
    },
    {
      officeName: "札幌支店",
      place: "sapporo",
      position: {
        lat: "43.072372229883534",
        lng: "141.3494175181069"
      }
    },
  ])

  //本社か支店でどれが選択されているかの状態
  const [selectedOffice, setSelectedOffice] = useState(
    {
      officeName: "東京本社",
      place: "tokyo",
      position: {
        lat: "35.72295079725532",
        lng: "139.71215183258244"
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

  //タグ
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
  const [tags, setTags] = useState<String[]>([])
  
  //1キロ圏内の20店舗を取得する
  const getNearShops = async (
    query:string = "",
    position:OfficePostion = {
      lat: "35.72295079725532",
      lng: "139.71215183258244"
    }
  ) => {
    const location = position.lat + "%2C" + position.lng
    const params = {query : query, location : location };
    const queryPamrams = new URLSearchParams(params);
    const res = await fetch(`/api/shop?${queryPamrams}`)
    const shops = await res.json()
    setNearShops([...shops.results])
    return shops.results
  }

  const handleTags = (e: React.MouseEvent<HTMLInputElement>) => {
    const tagValue = e.currentTarget.value
    if(tagValue !== '') {
      if(tags.includes(tagValue)) {
        setTags(prev => prev.filter(item => item !== tagValue))
        setTagsContent(prev => {
          return prev.map(item => {
            if(item.name === tagValue) {
              item.isActive = false
            }
            return item
          })
        })
      } else {
        setTags([...tags, e.currentTarget.value])
        setTagsContent(prev => {
          return prev.map(item => {
            if(item.name === tagValue) {
              item.isActive = true
            }
            return item
          })
        })
      }
    }
  }

  const handleSearchFreeWord = (value: string) => {
    getNearShops(value, selectedOffice.position)
  }

   ////フリーワード検索の処理
  const searchFreeBoxRef = useRef<HTMLInputElement>(null)

  //エンターが押された場合の処理
  const handleInputKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key !== 'Enter') return
    e.preventDefault();
    if(e.currentTarget.value) {
      handleSearchFreeWord(e.currentTarget.value)
    }
  }

  //クリックされたとき
  const handleSearchFreeWordClickButton = () => {
    if(searchFreeBoxRef.current?.value) {
      handleSearchFreeWord(searchFreeBoxRef.current.value)
    }
  }

  //今週のおすすめ機能
  const [shuffledShop, setShuffledShop] = useState<google.maps.places.PlaceResult>({})
  const [isFirst, setIsFirst] = useState(false)

//   //初回時にcookieに保存、2回目からはcookieからデータを取得する
  const handleCookie = (nearShopsData: google.maps.places.PlaceResult[], place: string) => {
    // deleteCookie("shuffedShoptokyo")
    // deleteCookie("shuffedShopnagoya")
    // deleteCookie("shuffedShopsapporo")
    const shuffleNum = Math.floor(Math.random() * (nearShopsData.length + 1));
    
    const shuffleRecommendShopData = nearShopsData[shuffleNum]
    
    if(!shuffleRecommendShopData) return
    //cookieがセットされていない場合
    if(!hasCookie('shuffedShop' + place)) {
      const shuffledShopJson = JSON.stringify(shuffleRecommendShopData)
      setShuffledShop({...shuffleRecommendShopData})
      setCookie('shuffedShop'+ place, shuffledShopJson);
    } else {
      const shuffledShopfromCookie = getCookie('shuffedShop'+ place)
        try {
          if(shuffledShopfromCookie) {
            const shuffledShopParsedData = JSON.parse(shuffledShopfromCookie)
            setShuffledShop({...shuffledShopParsedData})
          } else {
            throw new Error("値が正しく取得できませんでした")
          }
        } catch(error) {
          console.error(error);
        }
    }
  }

  //評価、口コミ、価格のソート
  const [isSort, setIsSort] = useState(false)
  const [beforeSortNearShops, setBeforeSortNearShops] = useState<google.maps.places.PlaceResult[]>([])
  const sortRef = useRef<HTMLSelectElement>(null)
  const handleChangeSortValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selecedSortName = e.currentTarget.value
    console.log(selecedSortName);
    const newNearShops = [...nearShops]
    setIsSort(true)
    switch (selecedSortName) {
      case "評価":
      const newSortRatingNearShops = newNearShops.sort((a: google.maps.places.PlaceResult, b: google.maps.places.PlaceResult): number => {
        if(b.rating && a.rating) {
          return b.rating - a.rating
        }
        return 0;
      })
      setBeforeSortNearShops([...nearShops])
      setNearShops([...newSortRatingNearShops])
        break;
      case "口コミ":
      const newSortReviewNearShops = newNearShops.sort((a: google.maps.places.PlaceResult, b: google.maps.places.PlaceResult): number => {
        if(b.user_ratings_total && a.user_ratings_total) {
          return b.user_ratings_total - a.user_ratings_total
        }
        return 0;
      })
      setBeforeSortNearShops([...nearShops])
      setNearShops([...newSortReviewNearShops])
        break;
      case "価格が安い":
      const newSortLowPriceNearShops = newNearShops.sort((a: google.maps.places.PlaceResult, b: google.maps.places.PlaceResult): number => {
        if(b.price_level && a.price_level) {
          return a.price_level - b.price_level
        }
        return 0;
      })
      console.log(newSortLowPriceNearShops);
      setBeforeSortNearShops([...nearShops])
      setNearShops([...newSortLowPriceNearShops])
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    const tagQuery = tags.join(",")
    getNearShops(tagQuery, selectedOffice.position)
    setIsSort(false)
  },[tags,tagsContents])

  useEffect(() => {
    const initRecommend = async () => {
      const tagQuery = tags.join(",")
      switch (selectedOffice.place) {
        case "tokyo":
          const nearShopsData = await getNearShops(tagQuery, selectedOffice.position)
          handleCookie(nearShopsData, selectedOffice.place)
          // console.log(shuffledShop);
          console.log("東京");
          break;
        case "nagoya":
          const nearNagoyaShopsData = await getNearShops(tagQuery, selectedOffice.position)
          handleCookie(nearNagoyaShopsData, selectedOffice.place)
          console.log("名古屋");
          break;
        case "sapporo":
          const nearSapporoShopsData = await getNearShops(tagQuery, selectedOffice.position)
          handleCookie(nearSapporoShopsData, selectedOffice.place)
          console.log("札幌");
          break;
        default:
          break;
      }
    };
    
    initRecommend()
  },[selectedOffice])


  return (
      <div>
        <Header/>
        <div>

          <SelectBranch offices={offices} officeRef={officeRef} onChange={handleChangeOfficeValue}/>
          <RecommendShop shuffledShop={shuffledShop} />
          <div className="max-w-[1200px] mx-auto px-5 mb-10 mt-10">
            
          </div>
          <div className="max-w-[1200px] mx-auto px-5">
            <h2 className="text-2xl font-bold mb-8 pl-5 max-sm:pl-0 max-sm:mb-4">店舗一覧</h2>
            <ul className="grid grid-cols-6 gap-2 max-sm:grid-cols-2">
              {tagsContents?.map((item, index) => (
                <li className="w-full" key={index}>
                  {item.isActive}
                  <input 
                    type="text" 
                    value={item.name}
                    className={"w-full text-[#1B72E8] text-center px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-[30px] outline-none " + (item.isActive? "bg-blue-600/30":"bg-white")} 
                    onClick={(e) => handleTags(e)}
                    readOnly
                  />
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between my-10 max-sm:block max-sm:mb-7">
              <div>
                <SelectSort sortRef={sortRef} onChange={handleChangeSortValue}/>
              </div>

              <SearchFreeWord searchFreeBoxRef={searchFreeBoxRef} onKeyDown={handleInputKeyDown} onClick={handleSearchFreeWordClickButton}/>
            </div>
            {nearShops.length > 0 ? (
              <ShopCardList shops={nearShops}/>
            ):(
              <div>
                なにもないです
              </div>
            )}
            
          </div>
        </div>
      </div>
    )
}
export default Home