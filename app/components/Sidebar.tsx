'use client'

import Link from 'next/link'
import Image from 'next/image'
import SidebarContact from './SidebarContact'
import { useRouter, usePathname } from 'next/navigation'
import SidebarProfile from './SidebarProfile'
import useStore from '@/store'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const router = useRouter()
  const { user } = useStore()
  const [avatar, setAvatar] = useState('/icon_person.svg')
  const currentUrl = usePathname()

  useEffect(() => {
    if(user.avatar_url) {
      setAvatar(user.avatar_url)
    }
  }, [user])

	return (
    <div className="flex">
      <div className="w-[60px] bg-blackPurple h-full min-h-screen flex flex-col justify-end fixed top-0 left-0">
        <Link href="/admin/user/" className="block">
          <div className="w-[36px] mx-auto pb-4 cursor-pointer relative">
            <div className="w-[36px] h-[36px] absolute top-[-36px] left-0 right-0 mx-auto">
              <Image src={avatar} alt="avatar" fill/> 
            </div>
          </div>
        </Link>
      </div>
      {currentUrl === '/admin/user' || currentUrl === '/admin/settings/password' || currentUrl === '/admin/settings/logout' || currentUrl === '/admin/settings/email' ? (
        <SidebarProfile/>
      ) :
        <SidebarContact/>
      }
      
    </div>
	)
}

export default Sidebar

