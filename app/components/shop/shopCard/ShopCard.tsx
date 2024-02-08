"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ShopProps {
  shop: google.maps.places.PlaceResult
}

const ShopCard:React.FC<ShopProps> = ({shop}) => {
  let shopImage
  if(shop?.photos !== undefined) {
    shopImage = shop.photos[0].getUrl({'maxWidth':300, 'maxHeight':300})
  } else {
    shopImage = null
  }
    // console.log(shop);
  
	return (
    <>
      {shop && 
        <div className="flex justify-between gap-3 mb-4 max-sm:block items-center">
          <div className="w-[30%] relative max-sm:w-full">
            {shopImage !== null ? (
              <div className="w-full">
                <img src={shopImage} alt=""/>
              </div>
            ): (
              <Image src="/icon_person.svg" alt="avatar" width={200} height={200}/>
            )}
          </div>
          <div className="w-[70%] px-5 py-4 max-sm:w-full">
            <div className="mb-5 flex justify-between">
              <div className="flex gap-2 items-center">
                <img className="w-[20px] h-[20px]" src={shop.icon} alt=""/>
                <h3 className="text-lg font-bold">{shop.name}</h3>
              </div>
              <div>
                <span className="bg-[#3EB36D] block px-4 py-3 font-bold">営業中</span>
              </div>
            </div>
            <div className="mb-5">
              <p className="font-bold mb-2">住所</p>
              <p>{shop.formatted_address}</p>
            </div>
            <div className="mb-5 flex gap-7">
              <div>
                <p className="font-bold">評価 : <span className="font-normal">{shop.rating}</span></p>
              </div>
              <div>
                <p className="font-bold">口コミ : <span className="font-normal">{shop.user_ratings_total}件</span></p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
	)
}

export default ShopCard

