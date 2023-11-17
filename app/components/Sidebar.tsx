'use client'

import Link from 'next/link'
import Image from 'next/image'
import SidebarContact from './SidebarContact'
import { useRouter, usePathname } from 'next/navigation'
import SidebarProfile from './SidebarProfile'

const Sidebar = () => {
  const router = useRouter()
  const currentUrl = usePathname()
  console.log(currentUrl);
  

	return (
    <div className="flex">
      <div className="w-[60px] bg-blackPurple h-full min-h-screen flex flex-col justify-end">
        <Link href="/admin/user/" className="block">
          <div className="w-[36px] mx-auto pb-4 cursor-pointer">
            <Image src={'/icon_person.svg'} alt="avatar" width={14} height={14}/>
          </div>
        </Link>
      </div>
      {currentUrl === '/admin/user' ? (
        <SidebarProfile/>
      ) :
        <SidebarContact/>
      }
      
    </div>
	)
}

export default Sidebar

