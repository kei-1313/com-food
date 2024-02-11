"use client"

import ShopCard from "../shopCard/ShopCard"

interface ShopsProps {
  shops: google.maps.places.PlaceResult[]
}

const ShopCardList:React.FC<ShopsProps> = ({shops}) => {
  console.log(shops);
  
	return (
	  <div>
      {shops.length > 0? (
        <>
          {shops.map((shop, index) => (
            <ShopCard shop={shop} key={index}/>
          ))}
        </>
      ) : (
        <div>
          <h3 className="font-bold text-center">検索結果が見つかりません</h3>
        </div>
      )
      }
      
    </div>
	)
}

export default ShopCardList

