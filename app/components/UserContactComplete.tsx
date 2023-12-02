"use client"

import Link from "next/link"
import PageTitle from "./PageTitle"

const UserContactComplete = () => { 
	return (
		<div className="py-20 text-center">
			<PageTitle title={"お問い合わせ完了"}/>
      <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">お問い合わせありがとうございます</h2>
          <p className="text-gray-600 mb-6">お問い合わせを受け付けました。後ほど担当者よりご連絡いたします。</p>
          <Link href={"/"} className="text-sm w-[150px]  m-auto bg-orange px-4 tracking-wider py-2 text-center rounded border border-orange block text-white bold hover:opacity-80">ホームに戻る</Link>
      </div>
    </div>
	)
}

export default UserContactComplete

