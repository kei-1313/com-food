'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
type AdminUserType = Database['public']['Tables']['admin_users']['Row']


const Navigation = ({session, adminUser}: {session: Session | null, adminUser: AdminUserType | null}) => { 
	return (
		<header className="shadow-lg shadow-gray-100">
      <div className="py-5 px-5 container max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          com-food
        </Link>

        <p>{adminUser?.email}</p>
      </div>
    </header>
	)
}

export default Navigation

