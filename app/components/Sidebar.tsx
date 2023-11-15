'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
  Cog8ToothIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'


const Sidebar = () => {
	return (
    <div className="flex">
      <div className="w-[60px] bg-blackPurple h-full min-h-screen flex flex-col justify-end">
        <div className="w-[36px] mx-auto pb-4 cursor-pointer">
          <Image src={'/icon_person.svg'} alt="avatar" width={14} height={14}/>
        </div>
      </div>
      <div className="w-[200px] bg-lightPurple h-full min-h-screen px-4 py-2">
        <ul>
          <li className="px-2 py-2 rounded hover:bg-currentPurple border-gray-100 cursor-pointer">
            <Link href="/setting/" className=" flex gap-2 items-center">
              <ClipboardDocumentIcon width={22}/>
              <span className="text-sm">お問い合わせ</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
	)
}

export default Sidebar

