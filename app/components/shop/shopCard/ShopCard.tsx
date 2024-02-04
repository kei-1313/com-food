"use client"
import Image from 'next/image'

const ShopCard = () => { 
	return (
		<div className="flex justify-between gap-3 mb-4 max-sm:block">
      <div className="w-[30%] relative max-sm:w-full">
        <Image src="/icon_person.svg" alt="avatar" width={200} height={200}/>
      </div>
      <div className="w-[70%] bg-slate-500 px-5 py-4 max-sm:w-full">
        <div className="mb-5">
          <h3 className="text-lg font-bold">店舗タイトル</h3>
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
	)
}

export default ShopCard

