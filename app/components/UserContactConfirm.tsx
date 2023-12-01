"use client"

import { useState } from "react"
import PageTitle from "./PageTitle"
import Loading from '@/app/loading'
import { useRouter, useSearchParams } from 'next/navigation'

const UserContactConfirm = () => {
  const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [ errorMessage, setErrorMessage ] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const searchParams = useSearchParams();

	const name = searchParams.get("name")

	console.log(name);
	

  const handleSubmit = () => {

  }

  return (
		<div className="py-20">
			<PageTitle title={"お問い合わせ"}/>
			<p className="text-sm text-green-500 text-center mt-2 mb-4 font-bold">{ successMessage }</p>
			<div className="max-w-[600px] w-full mx-auto px-4">
				<form onSubmit={handleSubmit}>
					<div className="mt-8">
							<label className="text-base font-bold block mb-2">名前</label>
              <p className="text-base">テストネーム</p>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">メールアドレス<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
              <p className="text-base">テストネーム</p>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせタイトル</label>
              <p className="text-base">テストネーム</p>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせ内容<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
              <p className="text-base">お問い合わせ内容お問い合わせ内容お問い合わせ内容お問い合わせ内容お問い合わせ内容お問い合わせ内容</p>
					</div>
					<div className="mt-8">
					{loading ? (
							<Loading />
						) : (
						<button type="submit" className="text-sm max-md:w-full  m-auto bg-orange px-4 tracking-wider py-2 text-center rounded border border-orange block text-white bold hover:opacity-80">送信する</button>
					)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default UserContactConfirm