"use client"

import { useState } from "react"
import PageTitle from "./PageTitle"
import Loading from '@/app/loading'

const UserContact = () => {
	const [loading, setLoading] = useState(false)


	return (
		<div className="py-20">
			<PageTitle title={"お問い合わせ"}/>
			<div className="max-w-[600px] w-full mx-auto px-4">
				<form>
					<div className="mt-8">
							<label className="text-base font-bold block mb-2">名前</label>
							<input 
								type="text"
								placeholder="comfood"
								className="text-sm rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
								autoComplete="on"
							/>
							{/* <div className="my-3 text-sm text-red-500">エラー</div> */}
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">メールアドレス<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
							<input 
								type="email"
								placeholder="comfood@gmail.com"
								className="text-sm rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
								autoComplete="on"
							/>
							{/* <div className="my-3 text-sm text-red-500">エラー</div> */}
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせタイトル</label>
							<input 
								type="text"
								placeholder="〇〇について"
								className="text-sm rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
								autoComplete="on"
							/>
							{/* <div className="my-3 text-sm text-red-500">エラー</div> */}
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせ内容<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
							<textarea 
								placeholder="comfood@gmail.com"
								className="text-sm h-[200px] rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none leading-6"
								autoComplete="on"
							/>
							{/* <div className="my-3 text-sm text-red-500">エラー</div> */}
					</div>
					<div className="mt-8 ">
					{loading ? (
							<Loading />
						) : (
						<button type="submit" className="text-sm max-md:w-full  m-auto bg-orange px-4 tracking-wider py-2 text-center rounded border border-orange block text-white bold hover:opacity-80">確認画面へ</button>
					)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default UserContact

