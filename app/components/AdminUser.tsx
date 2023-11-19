"use client"

import Image from 'next/image'

const AdminUser = () => { 
	return (
		<div className="p-10">
			<h2 className="text-2xl font-bold mb-6">プロフィール</h2>
			<div>
				<p className="text-base font-bold mb-2">アカウント画像</p>
				<div className="w-[120px] relative cursor-pointer">
					<input type="file" hidden />
					<Image src={'/icon_person.svg'} alt="avatar" width={8} height={8}/>
					<div className="w-[34px] h-[34px] bg-activePurple absolute bottom-0 right-0 rounded-full">
						<Image className="w-[24px] h-[24px] m-auto absolute top-0 left-0 right-0 bottom-0" src={'/icon_edit.svg'} alt="pencil" width={2} height={2}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminUser

