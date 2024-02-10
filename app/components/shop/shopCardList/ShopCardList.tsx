"use client"

import ShopCard from "../shopCard/ShopCard"

interface ShopsProps {
  shops: google.maps.places.PlaceResult[]
}

const ShopCardList:React.FC<ShopsProps> = ({shops}) => {
	return (
		<div className="max-w-[1200px] mx-auto px-5">
      <h2 className="text-2xl font-bold mb-6 pl-5 max-sm:pl-0 max-sm:mb-4">店舗一覧</h2>
      <div className="flex gap-4 mb-5 max-sm:mb-4 max-sm:gap-3">
        <button className="px-6 py-4 max-sm:px-3 max-sm:py-3 bg-[#3EB36D] font-bold">本日営業中の店舗</button>
        <button className="px-6 py-4 max-sm:px-3 max-sm:py-3 bg-sky-500">本日定休日の店舗</button>
      </div>
      {shops.map((shop, index) => (
        <ShopCard shop={shop} key={index}/>
      ))}
    </div>
	)
}

export default ShopCardList

