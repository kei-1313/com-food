"use client"

import ShopCard from "../shopCard/ShopCard"

interface ShopsProps {
  shops: google.maps.places.PlaceResult[]
}

const ShopCardList:React.FC<ShopsProps> = ({shops}) => {
	return (
	  <div>
      {shops.map((shop, index) => (
        <ShopCard shop={shop} key={index}/>
      ))}
    </div>
	)
}

export default ShopCardList

