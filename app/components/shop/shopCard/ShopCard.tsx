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

  // console.log(shop);
  let shopImage
  if(shop?.photos !== undefined) {
    shopImage = shop.photos[0].getUrl({'maxWidth':300, 'maxHeight':300})
  } else {
    shopImage = null
  }

  
  
  
	return (
    <>
      {shop && 
        <div className="flex justify-between gap-3 mb-4 max-sm:block">
          <div className="w-[30%] relative max-sm:w-full">
            {shopImage !== null ? (
              <div className="w-full">
                <img src={shopImage} alt=""/>
              </div>
            ): (
              <Image src="/icon_person.svg" alt="avatar" width={200} height={200}/>
            )}
          </div>
          <div className="w-[70%] bg-slate-500 px-5 py-4 max-sm:w-full">
            <div className="mb-5 flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{shop.name}</h3>
              </div>
              <div>
                <span>評価 : {shop.rating}</span>
              </div>
            </div>
            <div className="mb-5"> 
              <p>{shop.vicinity}</p>
            </div>
            <div className="mb-5 flex gap-4">
              <div>
                <p>営業時間</p>
              </div>
              <div>
                <p>口コミ : {shop.user_ratings_total}件</p>
              </div>
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

