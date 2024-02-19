"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ShopProps {
  shop: google.maps.places.PlaceResult
}

const ShopCard:React.FC<ShopProps> = ({shop}) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  //@ts-ignore
  const photo_reference = shop.photos[0].photo_reference
  
	return (
    <>
      {shop && 
        <div className="flex justify-between gap-3 mb-4 max-sm:block items-center">
          <div className="w-[30%] relative max-sm:w-full">
              <div className="w-full h-[200px] object-cover">
                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${API_KEY}`} alt="" className="w-full h-full object-cover rounded-[20px]"/>
              </div>
            {/* ): (
              <Image src="/icon_person.svg" className="w-full h-full object-cover rounded-[20px]" alt="avatar" width={200} height={200}/>
            )} */}
          </div>
          <div className="w-[70%] px-5 py-4 max-sm:w-full">
            <div className="mb-5 flex justify-between max-sm:block max-sm:mb-3">
              <div className="flex gap-2 items-center">
                <img className="w-[20px] h-[20px] max-sm:w-[16px] max-sm:h-[16px]" src={shop.icon} alt=""/>
                <h3 className="text-lg font-bold">{shop.name}</h3>
              </div>
              <div>
                {/*  (
                  <span className="text-[#2E8849] block px-3 py-2 max-sm:px-0 font-bold">営業中</span>
                ):(
                  <span className="text-[#D93025] block px-3 py-2 max-sm:px-0 font-bold">営業時間外</span>
                )} */}
                <span className="text-[#2E8849] block px-3 py-2 max-sm:px-0 font-bold">営業中</span>
              </div>
            </div>
            <div className="mb-5">
              <p className="font-bold mb-2 text-black/70">住所</p>
              <p className="text-black/70">{shop.formatted_address}</p>
            </div>
            <div className="mb-5 flex gap-7">
              <div>
                <p className="font-bold text-black/70">評価 {shop.rating}
                  <span className="font-normal text-gray-200 relative w-[84px] ml-2">
                    ★★★★★
                    <span 
                      className="text-yellow-500 absolute top-0 left-0 overflow-hidden"
                      style={{ width: `${Math.floor(84 * (Number(shop.rating) / 5))}px`}}
                    >
                      ★★★★★
                    </span>
                  </span>
                </p>
              </div>
              <div>
                <p className="font-bold text-black/70">口コミ<span className="font-normal ml-1">{shop.user_ratings_total}件</span></p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
	)
}

export default ShopCard

