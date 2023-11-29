"use client"

import { useState } from "react"
import PageTitle from "./PageTitle"
import Loading from '@/app/loading'
import { useRouter } from 'next/navigation'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'

type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
	name: z.string(),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
	subject: z.string(),
	content: z.string().min(1,  { message: '一文字以上で入力してください' }).max(400, { message: '400文字以内で入力してください' })
})

const UserContact = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [ errorMessage, setErrorMessage ] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //初期値
    defaultValues: {name: '', email: '', subject: '', content: ''},
    //入力値の検証
    resolver: zodResolver(schema)
  })

	const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

		try {
			const contactData = {
				name: data.name,
				email: data.email,
				subject: data.subject,
				content: data.content
			}
			
			await fetch("api/contact", {
				method: "POST",
				headers: {
					Accept: "application/json, text/plain",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contactData)
			}).then(res => {
				if(res.status === 200) {
					setSuccessMessage('お問い合わせが完了しました')
					reset()
				}
			})
      
    } catch (error) {
      setErrorMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }


	return (
		<div className="py-20">
			<PageTitle title={"お問い合わせ"}/>
			<p className="text-sm text-green-500 text-center mt-2 mb-4 font-bold">{ successMessage }</p>
			<div className="max-w-[600px] w-full mx-auto px-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-8">
							<label className="text-base font-bold block mb-2">名前</label>
							<input 
								type="text"
								placeholder="comfood"
								className="text-sm rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
								autoComplete="on"
								{...register("name")}
							/>
							{/* <div className="my-3 text-sm text-red-500">{errors.name?.message}</div> */}
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">メールアドレス<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
							<input 
								type="email"
								placeholder="comfood@gmail.com"
								className="text-sm rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
								autoComplete="on"
								{...register("email")}
							/>
							<div className="my-3 text-sm text-red-500">{errors.email?.message}</div>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせタイトル</label>
							<input 
								type="text"
								placeholder="〇〇について"
								className="text-sm rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
								autoComplete="on"
								{...register("subject")}
							/>
							{/* <div className="my-3 text-sm text-red-500">{errors.subject?.message}</div> */}
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせ内容<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
							<textarea 
								placeholder="comfood@gmail.com"
								className="text-sm h-[200px] rounded tracking-wider border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none leading-6"
								autoComplete="on"
								{...register("content", { required: true })}
							/>
							<div className="my-3 text-sm text-red-500">{errors.content?.message}</div>
					</div>
					<div className="mt-8">
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

