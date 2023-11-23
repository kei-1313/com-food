'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SidebarProfile = () => {
  const pathname = usePathname()

  // ナビゲーション
  const subNavigation = [
    {
      name: 'プロフィール',
      href: '/admin/user',
    },
    {
      name: 'パスワード変更',
      href: '/admin/settings/password',
    },
    {
      name: 'メールアドレス変更',
      href: '/admin/settings/email',
    },
    {
      name: 'ログアウト',
      href: '/admin/settings/logout',
    },
  ]


	return (
		<div className="p-10 w-[300px] ml-[60px]">
      <h3 className="text-base text-black font-bold border-b border-gray-200 pb-3 mb-3">プロフィール設定</h3>
      <ul>
        {subNavigation.map((item, index) => (
          <li 
            key={index}>
            <Link className={`${
            item.href == pathname ? 'bg-currentPurple text-activePurple' : 'text-noActivePurple'
            } px-3 py-2 rounded block font-bold text-sm`}  href={ item.href }>{ item.name }</Link>
          </li>
        ))}
      </ul>
    </div>
	)
}

export default SidebarProfile

