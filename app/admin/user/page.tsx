import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

import type { Database } from '@/lib/database.types'
import AdminUser from '@/app/components/AdminUser'

const adminUserPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証している場合、リダイレクト
  if(!session) {
    redirect('/auth/login')
  }
  
	return (
		<div>
      <AdminUser/>
    </div>
	)
}

export default adminUserPage

