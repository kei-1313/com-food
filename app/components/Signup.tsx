'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loading from '@/app/loading'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import type { Database } from '@/lib/database.types'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(1, {message: '1文字以上入力する必要があります'}),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }).regex(/^[a-zA-Z0-9]+$/, {message: "英大文字、英小文字、数字で入力してください"})
})

const Signup = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [ loading, setLoading ] = useState(false)
  const [ message, setMessage ] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //初期値
    defaultValues: {name: '', email: '', password: ''},
    //入力値の検証
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      //signUp関数をつかってemailとpasswordでサインアップする
      const { error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback` 
        }
      })

      // エラーチェック
      if (signupError) {
        setMessage('エラーが発生しました。' + signupError.message)
        return
      }

      // プロフィールの名前を更新
      const { error : updateError } = await supabase
        .from('admin_users')
        .update({ name: data.name })
        .eq('email', data.email)

      // エラーチェック
      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message)
        return
      }

      // 入力フォームクリア
      reset()
      setMessage(
        '本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。'
      )

    } catch (error) {
      //エラー処理
      setMessage('エラーが発生しました。'+ error)
    } finally {
      setLoading(false)
      router.refresh()
    }
  }
	return (
		<div className="max-w-lg m-auto mt-20 mb-20">
      <h2 className="adminPageTitle mb-10">新規登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="mb-2 block tracking-wider">名前</label>
          <input
            type="text" 
            {...register("name", { required: true })}
            className="border-[2px] rounded-md w-full py-2 px-3 focus:outline-none focus:border-yellow-500"
          />
          <p className="error">{errors.name?.message}</p>
        </div>
        <div className="mb-5">
          <label className="mb-2 block tracking-wider">メールアドレス</label>
          <input
            type="text" 
            {...register("email", { required: true })} 
            className="border-[2px] rounded-md w-full py-2 px-3 focus:outline-none focus:border-yellow-500"
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="mb-10">
          <label className="mb-2 block tracking-wider">パスワード</label>
          <input 
            type="text" 
            {...register("password",  { required: true })}  
            className="border-[2px] rounded-md w-full py-2 px-3 focus:outline-none focus:border-yellow-500"
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="text-center">
          {loading ? (
            <Loading/>
          ): (
            <button type="submit" className="transition ease-in-out delay-150 px-10 rounded-md py-3 text-white bg-yellow-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">新規登録</button>
          )}
        </div>
      </form>

      {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}

      <div className="text-center text-sm mt-7 mb-5">
          <Link href="/auth/reset-password" className="text-gray-500 hover:opacity-70 hover:transition hover:duration-700 hover:ease-in-out">
            パスワードを忘れた方はこちら
          </Link>
        </div>

        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-gray-500 hover:opacity-70 hover:transition hover:duration-700 hover:ease-in-out">
            ログインする
          </Link>
        </div>
    </div>
	)
}

export default Signup

