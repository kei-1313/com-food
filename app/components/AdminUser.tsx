"use client"

import Image from 'next/image'

const AdminUser = () => { 
	return (
		<div className="p-10 w-[560px]">
			<h2 className="text-2xl font-bold mb-6">プロフィール</h2>
			<form>
				<p className="text-base font-bold mb-2">アカウント画像</p>
				<div className="w-[120px] relative cursor-pointer">
					<input type="file" hidden />
					<Image src={'/icon_person.svg'} alt="avatar" width={8} height={8}/>
					<div className="w-[34px] h-[34px] bg-activePurple absolute bottom-0 right-0 rounded-full">
						<Image className="w-[24px] h-[24px] m-auto absolute top-0 left-0 right-0 bottom-0" src={'/icon_edit.svg'} alt="pencil" width={2} height={2}/>
					</div>
				</div>
				<div className="mt-8">
					<label className="text-base font-bold mb-2 block">表示名</label>
					<input type="text" className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"/>
				</div>
				<div className="mt-8">
					<label className="text-base font-bold mb-2 block">メールアドレス</label>
					<input type="text" className="text-sm rounded border-gray-200 border-[1px] block py-3 px-3 w-full focus:border-activePurple focus:border-[2px] focus:outline-none"/>
				</div>
				<div className="mt-8">
					<button className="text-sm bg-orange px-4 py-2 text-center rounded border border-orange block text-white bold hover:opacity-80">保存する</button>
				</div>
			</form>
		</div>
	)
}

export default AdminUser

