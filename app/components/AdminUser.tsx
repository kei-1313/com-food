"use client"

import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Loading from '@/app/loading'
import type { Database } from '@/lib/database.types'
import useStore from '@/store'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { refFromURL } from 'firebase/database';
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
})

const AdminUser = () => {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [fileMessage, setFileMessage] = useState('')
	const [email, setIsEmail] = useState('')
	const [avatar, setAvatar] = useState<File | null>(null)
	const [avatarUrl, setAvatarUrl] = useState('/icon_person.svg')
	// console.log(supabase);
	

	const { user } = useStore()

	//ファイル選択のカスタマイズのためにinputへアクセス
  const inputRef = useRef<HTMLInputElement>(null!);

	const onProfileImageClick = () => {
		inputRef.current.click()
	}

	console.log(user);
	

	useEffect(() => {
		if(user.email) {
			setIsEmail(user.email)
		}

		// アバター画像の取得
		if(user && user.avatar_url) {
      setAvatarUrl(user.avatar_url)
    }
	}, [user])

	const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		setFileMessage('')

		// ファイルが選択されていない場合
    if (!files || files?.length == 0) {
      setFileMessage('画像をアップロードしてください。')
      return
    }
		
		const fileSize = files[0]?.size / 1024 / 1024 //ファイルサイズ
    const fileType = files[0]?.type //ファイルタイプ

		// 画像サイズが2MBを超える場合
    if (fileSize > 2) {
      setFileMessage('画像サイズを2MB以下にする必要があります。')
      return
    }

    // ファイル形式がjpgまたはpngでない場合
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      setFileMessage('画像はjpgまたはpng形式である必要があります。')
      return
    }

		// 画像をセット
		setAvatar(files[0])

    //アイコンを選択すると画像が切り替わる
    setAvatarUrl(window.URL.createObjectURL(files[0]))
		
	},  [])

	const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: {
      name: user.name ? user.name : '',
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })
	

	// 送信
	const onSubmit: SubmitHandler<Schema> = async (data) => {
		setLoading(true)
		setMessage('')
		setSuccessMessage('')
		console.log(data);
		
		try {
			let avatar_url = user.avatar_url

			console.log(avatar_url);
			if (avatar)  {
				// supabaseストレージに画像アップロード
        const { data: storageData, error: storageError } = await supabase.storage
          .from('admin_users_profiles')
          .upload(`${user.id}/${uuidv4()}`, avatar)

				// エラーチェック
				if (storageError) {
					setMessage('エラーが発生しました。' + storageError.message)
					return
				}

				//先の画像が設定されている場合ストレージから削除
				if (avatar_url) {
          const fileName = avatar_url.split('/').slice(-1)[0]

          // 古い画像を削除
          await supabase.storage.from('admin_users_profiles').remove([`${user.id}/${fileName}`])
        }

				// 画像のURLを取得
        const { data: urlData } = await supabase.storage
          .from('admin_users_profiles')
          .getPublicUrl(storageData.path)

        avatar_url = urlData.publicUrl			
			}

			const { error: updateError } = await supabase
				.from('admin_users')
				.update({
					name: data.name,
					avatar_url: avatar_url,
				})
				.eq('id', user.id)

			if(updateError) {
				setMessage('エラーが発生しました' + updateError)
				return
			}

			setSuccessMessage('プロフィールが更新されました')
		} catch (error) {
			setMessage('エラーが発生しました。' + error)
			return
		} finally {
			setLoading(false)
      router.refresh()
		}
	}

	return (
		<div className="p-10 w-[560px]">
			<h2 className="text-2xl font-bold mb-6">プロフィール</h2>
			<p className="text-sm text-red-500 mt-2 mb-4 font-bold">{ message }</p>
			<p className="text-sm text-green-500 mt-2 mb-4 font-bold">{ successMessage }</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<p className="text-base font-bold mb-2">アカウント画像</p>
					<div className="w-[120px] cursor-pointer" onClick={onProfileImageClick}>
						<input type="file" hidden ref={inputRef} onChange={onUploadImage}/>
						<div className="w-[120px] h-[120px] relative">
							<Image src={avatarUrl} alt="avatar" fill/>
							<div className="w-[34px] h-[34px] bg-activePurple absolute bottom-0 right-0 rounded-full">
								<Image className="w-[24px] h-[24px] m-auto absolute top-0 left-0 right-0 bottom-0" src={'/icon_edit.svg'} alt="pencil" width={2} height={2}/>
							</div>
						</div>
					</div>
					<p className="text-sm text-red-500 mt-2 font-bold">{ fileMessage }</p>
				</div>
				<div className="mt-8">
					<label className="text-base font-bold mb-2 block">表示名</label>
					<input 
						type="text" 
						className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"
						{...register('name', { required: true })}
						required
					/>
					<div className="my-3 text-sm text-red-500">{errors.name?.message}</div>
				</div>
				<div className="mt-8">
					<p className="text-base font-bold mb-2 block">メールアドレス</p>
						<p className="text-base">{email}</p>
				</div>
				<div className="mt-8">
				{loading ? (
            <Loading />
          ) : (
					<button className="text-sm bg-orange px-4 py-2 text-center rounded border border-orange block text-white bold hover:opacity-80">保存する</button>
				)}
				</div>
			</form>
		</div>
	)
}

export default AdminUser

