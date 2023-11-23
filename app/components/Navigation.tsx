'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import useStore from '@/store'
type AdminUserType = Database['public']['Tables']['admin_users']['Row']


const Navigation = ({session, adminUser}: {session: Session | null, adminUser: AdminUserType | null}) => {
  const { setUser } = useStore()

  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      created_at: session && adminUser ? adminUser.created_at : '',
      email: session ? session.user.email! : '',
      name: session && adminUser ? adminUser.name : '',
      avatar_url: session && adminUser ? adminUser.avatar_url: '',
      authority_id: session && adminUser ? adminUser.authority_id : 0
    })
  },[session, setUser, adminUser])

	return (
    <div>
      {session ?
        <div></div>
        :
        <header className="shadow-lg shadow-gray-100">
        <div className="py-5 px-5 container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl cursor-pointer">
            com-food
          </Link>

          <p>{adminUser?.email}</p>
        </div>
      </header>
      }
    </div>
	)
}

export default Navigation

