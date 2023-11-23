'use client'

import { useEffect, useState } from "react"
import Loading from '@/app/loading'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
import useStore from "@/store"
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  newEmail: z.string().email({ message: 'メールアドレスの形式ではありません'}),
  newConfirmEmail: z.string().email({ message: 'メールアドレスの形式ではありません'})
}).refine((data) => data.newEmail === data.newConfirmEmail, {
  message: '新しいパスワードと確認用パスワードが一致しません',
  path: ['newConfirmEmail']
})

const Email = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

  const { user } = useStore()
  const [currentUserEmail, setCurrentUserEmail ] = useState('')
  
  useEffect(() => {
    if(user.email) {
      setCurrentUserEmail(user.email)
    }
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      newEmail: '',
      newConfirmEmail: ''
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    try {
      //現在のメールアドレスと変更後のメールアドレスが同じ時
      if(currentUserEmail == data.newEmail) {
        setErrorMessage('変更後メールアドレスが現在のメールアドレスと同じです')
        return
      }

      const { error: updatedEmailError } = await supabase.auth.updateUser(
        { email: data.newEmail },
        { emailRedirectTo: `${location.origin}/auth/login` }
      )

       // エラーチェック
       if (updatedEmailError) {
        setErrorMessage('エラーが発生しました。' + updatedEmailError.message)
        return
      }
      
      //ログアウト cookieの情報と新しいメールアドレスとの整合性がとれなくなるため
      const { error: logoutError } = await supabase.auth.signOut()
    
       // エラーチェック
       if (logoutError) {
        setErrorMessage('エラーが発生しました。' + logoutError.message)
        return
      }

      setSuccessMessage('確認用のURLを記載したメールを送信しました')

      router.push('/auth/login')
    } catch (error) {
      setErrorMessage('エラーが発生しました' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }
 
	return (
		<div className="p-10 w-[560px]">
			<h2 className="text-2xl font-bold mb-6">メールアドレス変更</h2>
			<p className="text-sm text-red-500 mt-2 mb-4 font-bold">{ errorMessage }</p>
			<p className="text-sm text-green-500 mt-2 mb-4 font-bold">{ successMessage }</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8">
            <p className="text-base font-bold block mb-2">現在のメールアドレス</p>
            <p className="text-base block mb-2">{ currentUserEmail }</p>
        </div>
        <div className="mt-8">
            <label className="text-base font-bold block mb-2">新しいメールアドレス</label>
            <input 
              type="text"
              id="newEmail"
              placeholder="新しいメールアドレス"
              className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
              {...register('newEmail', { required: true })}
              autoComplete="on"
            />
            <div className="my-3 text-sm text-red-500">{errors.newEmail?.message}</div>
        </div>
        <div className="mt-8">
            <label className="text-base font-bold mb-2 block">新しいメールアドレス（確認）</label>
            <input 
              type="text"
              id="newConfirmEmail"
              placeholder="確認用メールアドレス"
              className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
              {...register('newConfirmEmail', { required: true })}
              autoComplete="on"
            />
            <div className="my-3 text-sm text-red-500">{errors.newConfirmEmail?.message}</div>
        </div>
        <div className="mt-8">
				{loading ? (
            <Loading />
          ) : (
					<button type="submit" className="text-sm bg-orange px-4 py-2 text-center rounded border border-orange block text-white bold hover:opacity-80">変更する</button>
				)}
				</div>
      </form>
    </div>
	)
}

export default Email

