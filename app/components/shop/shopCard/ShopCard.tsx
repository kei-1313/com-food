"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ShopProps {
  shop: google.maps.places.PlaceResult
}

const ShopCard:React.FC<ShopProps> = ({shop}) => {
  // const [shopItem, setShopItem] = useState({})

  // useEffect(() => {
  //   setShopItem(shop)
  // }, [])

  // console.log(shopItem);

  console.log(shop);
  
  
  
	return (
    <>
      {shop && 
        <div className="flex justify-between gap-3 mb-4 max-sm:block">
          <div className="w-[30%] relative max-sm:w-full">
            <Image src="/icon_person.svg" alt="avatar" width={200} height={200}/>
          </div>
          <div className="w-[70%] bg-slate-500 px-5 py-4 max-sm:w-full">
            <div className="mb-5">
              <h3 className="text-lg font-bold">{shop.name}</h3>
            </div>
            <div className="mb-5"> 
              <p>店舗住所店舗住所店舗住所店舗住所</p>
            </div>
            <div className="mb-5">
              <p>営業時間</p>
            </div>
            <div>
              <p>店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細店舗詳細</p>
            </div>
          </div>
        </div>
      }
    </>
	)
}

export default ShopCard

