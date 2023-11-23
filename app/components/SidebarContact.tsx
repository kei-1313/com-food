'use client'

import Link from 'next/link'
import {
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'

const SidebarContact = () => { 
	return (
		<div className="w-[200px] bg-lightPurple h-full min-h-screen px-4 py-2 ml-[60px]">
      <ul>
        <li className="px-2 py-2 rounded border-gray-100 cursor-pointer">
          <Link href="/setting/" className=" flex gap-2 items-center">
            <ClipboardDocumentIcon width={22}/>
            <span className="text-sm">お問い合わせ</span>
          </Link>
        </li>
      </ul>
    </div>
	)
}

export default SidebarContact

