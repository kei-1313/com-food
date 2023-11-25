'use client'

import { FormEvent, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import type { Database } from '@/lib/database.types'

const Logout = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

  // 送信
  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error: logoutError } = await supabase.auth.signOut()
      setSuccessMessage("ログアウトしました")

      // エラーチェック
      if (logoutError) {
        setErrorMessage('エラーが発生しました。' + logoutError.message)
        return
      }

      router.push('/')
    } catch (error) {
      setErrorMessage('エラーが発生しました'+ error)
      return
    }finally {
      setLoading(false)
      router.refresh()
    }
  }

	return (
		<div className="py-10 pr-10 w-[860px] pl-[360px]">
			<h2 className="text-2xl font-bold mb-6">ログアウト</h2>
      <p className="text-sm text-red-500 mt-2 mb-4 font-bold">{ errorMessage }</p>
			<p className="text-sm text-green-500 mt-2 mb-4 font-bold">{ successMessage }</p>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-red-500 hover:brightness-95 w-full max-w-[300px] rounded-full p-2 text-white text-sm"
            >
              ログアウト
            </button>
          )}
        </div>
      </form>
    </div>
	)
}

export default Logout

