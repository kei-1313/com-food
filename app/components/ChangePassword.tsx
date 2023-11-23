'use client'

import Loading from '@/app/loading'
import { useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  newPassword: z.string().min(6, { message: '6文字以上入力する必要があります。' }).regex(/^[a-zA-Z0-9]+$/, {message: "英大文字、英小文字、数字で入力してください"}),
  confirmNewPassword: z.string().min(6, { message: '6文字以上入力する必要があります。' }).regex(/^[a-zA-Z0-9]+$/, {message: "英大文字、英小文字、数字で入力してください"})
})
.refine((data) => data.newPassword === data.confirmNewPassword, {
  message: '新しいパスワードと確認用パスワードが一致しません',
  path: ['confirmNewPassword']
})

const ChangePassword = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setErrorMessage('')
    try {
      // パスワードの更新
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (error) {
        setErrorMessage('エラーが発生しました。' + error.message)
        return
      }

      reset()
      setSuccessMessage('パスワード変更が変更されました')
    } catch (error) {
      setErrorMessage('エラーが発生しました。' + error)
      return
    }finally {
      setErrorMessage('')
      router.refresh()
    }
  }

	return (
		<div className="p-10 w-[560px]">
			<h2 className="text-2xl font-bold mb-6">パスワード変更</h2>
      <p className="text-sm text-red-500 mt-2 mb-4 font-bold">{ errorMessage }</p>
      <p className="text-sm text-green-500 mt-2 mb-4 font-bold">{ successMessage }</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8">
            <label className="text-base font-bold block mb-2">新しいパスワード</label>
            <span className="text-xs text-attentionPurple block mb-2">6文字以上で入力してください。大文字、小文字、数字を含める必要があります。</span>
            <input 
              type="password"
              id="newPassword"
              placeholder="新しいパスワード"
              className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
              {...register('newPassword', { required: true })}
              autoComplete="on"
            />
            <div className="my-3 text-sm text-red-500">{errors.newPassword?.message}</div>
        </div>
        <div className="mt-8">
            <label className="text-base font-bold mb-2 block">新しいパスワード（確認）</label>
            <input 
              type="password"
              id="confirmNewPassword"
              placeholder="確認用パスワード"
              className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
              {...register('confirmNewPassword', { required: true })}
              autoComplete="on"
            />
            <div className="my-3 text-sm text-red-500">{errors.confirmNewPassword?.message}</div>
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

export default ChangePassword

