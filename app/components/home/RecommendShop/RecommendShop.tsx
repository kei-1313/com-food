"use client"

import RecommendShopCard from "./RecommendShopCard";

interface shuffledShopProps {
  shuffledShop: google.maps.places.PlaceResult;
}

const RecommendShop:React.FC<shuffledShopProps> = ({shuffledShop}) => {
	return (
		<div className="max-w-[1200px] mx-auto px-5 mb-20 mt-20">
      <h2 className="text-2xl font-bold mb-8 pl-5 max-sm:mb-4 max-sm:pl-0">本日のオススメ店舗</h2>
      <RecommendShopCard  shuffledShop={shuffledShop} />
    </div>
	)
}

export default RecommendShop

