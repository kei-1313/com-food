"use client"
import Image from 'next/image'

interface ShopProps {
  shuffledShop: google.maps.places.PlaceResult;
  shuffledShopImage:string
}

const RecommendShopCard:React.FC<ShopProps> = ({shuffledShop, shuffledShopImage}) => {
  
	return (
    <>
      {shuffledShop && 
        <div className="flex justify-between gap-3 mb-4 max-sm:block items-center">
          <div className="w-[30%] relative max-sm:w-full">
            {shuffledShopImage !== null ? (
              <div className="w-full">
                <img src={shuffledShopImage} alt=""/>
              </div>
            ): (
              <Image src="/icon_person.svg" alt="avatar" width={200} height={200}/>
            )}
          </div>
          <div className="w-[70%] px-5 py-4 max-sm:w-full">
            <div className="mb-5 flex justify-between">
              <div className="flex gap-2 items-center">
                <img className="w-[20px] h-[20px]" src={shuffledShop.icon} alt=""/>
                <h3 className="text-lg font-bold">{shuffledShop.name}</h3>
              </div>
              <div>
                <span className="bg-[#3EB36D] block px-4 py-3 font-bold">営業中</span>
              </div>
            </div>
            <div className="mb-5">
              <p className="font-bold mb-2">住所</p>
              <p>{shuffledShop.formatted_address}</p>
            </div>
            <div className="mb-5 flex gap-7">
              <div>
                <p className="font-bold">評価 : <span className="font-normal">{shuffledShop.rating}</span></p>
              </div>
              <div>
                <p className="font-bold">口コミ : <span className="font-normal">{shuffledShop.user_ratings_total}件</span></p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
	)
}

export default RecommendShopCard

