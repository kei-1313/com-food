'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  
})

const ResetPassword = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // パスワードリセットメールを送信
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/password-reset/confirm`,
      })

      // エラーチェック
      if (error) {
        setErrorMessage('エラーが発生しました。' + error.message)
        return
      }

      setSuccessMessage('パスワードリセットに必要なメールを送信しました。')
    } catch (error) {
      setErrorMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

	return (
		<div className="max-w-lg m-auto mt-20 mb-20">
      <h2 className="adminPageTitle mb-10">パスワードを忘れた場合</h2>
      <p className="text-sm text-green-500 mt-2 mb-4 font-bold">{ successMessage }</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="mb-2 block tracking-wider">メールアドレス</label>
          <input
            type="text"
            placeholder="メールアドレス"
            {...register("email", { required: true })} 
            className="border-[2px] rounded-md w-full py-2 px-3 focus:outline-none focus:border-yellow-500"
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="text-center">
          {loading ? (
            <Loading/>
          ): (
            <button type="submit" className="transition ease-in-out delay-150 px-10 rounded-md py-3 text-white bg-yellow-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">パスワード変更</button>
          )}
        </div>
      </form>
    </div>
	)
}

export default ResetPassword

