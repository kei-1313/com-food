import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

import type { Database } from '@/lib/database.types'
import AdminContact from '@/app/components/AdminContact'


const AdminContactPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })


  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: items, error } = await supabase
    .from("contacts")
    .select("*")
  
  

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return  <AdminContact items={items} />
}

export default AdminContactPage