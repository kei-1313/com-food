"use client"

import { useState } from "react"
import PageTitle from "./PageTitle"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import Loading from '@/app/loading'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormContext, SubmitHandler } from "react-hook-form";
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

const UserContactConfirm = () => {
  const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [ errorMessage, setErrorMessage ] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const supabase = createClientComponentClient<Database>()

	console.log();
	

	const {
    handleSubmit,
    getValues,
    formState: { isValid }
  } = useFormContext<Schema>();

	//入力データの取得
  const values = getValues();
	console.log(values);

	// if (!isValid) {
  //   router.push(`/contact`);
  // }
	

  const onSubmit: SubmitHandler<Schema> = async () => {
		setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

		try {
			//データベースにお問い合わせのデータを保存する
			const { error: errorContact } = await supabase
			.from("contacts")
			.insert({name: values.name, email: values.email, title: values.subject, description: values.content})

			if(errorContact) {
				setErrorMessage('エラーが発生しました' + errorContact)
				return
			}

			await fetch("api/contact", {
				method: "POST",
				headers: {
					Accept:"application/json, text/plain",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(values)
			}).then(res => {
				if(res.status === 200) {
					router.push("/contact/complete")
				}
			})
		} catch (error) {
			setErrorMessage('エラーが発生しました。' + error)
		} finally {
			setLoading(false)
			router.refresh()
		}
  }

  return (
		<div className="py-20">
			<PageTitle title={"お問い合わせ"}/>
			<p className="text-sm text-red-500 mt-2 mb-4 font-bold">{ errorMessage }</p>
			<p className="text-sm text-green-500 text-center mt-2 mb-4 font-bold">{ successMessage }</p>
			<div className="max-w-[600px] w-full mx-auto px-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-8">
							<label className="text-base font-bold block mb-2">名前</label>
              <p className="text-base">{ values.name }</p>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">メールアドレス<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
              <p className="text-base">{ values.email }</p>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせタイトル</label>
              <p className="text-base">{ values.subject }</p>
					</div>
					<div className="mt-8">
							<label className="text-base font-bold mb-2 block">お問い合わせ内容<span className="text-red-500 text-sm inline-block ml-1">(必須)</span></label>
              <p className="text-base">{ values.content }</p>
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