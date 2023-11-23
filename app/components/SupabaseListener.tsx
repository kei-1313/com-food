'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Navigation from './Navigation'

import type  { Database } from '@/lib/database.types'

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  //セッションの取得
  const { data: { session }} = await supabase.auth.getSession()

  let adminUser = null
  if(session) {
    //セッションがある場合 admin_userを取得
    const { data: currentAdminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', session.user.id )
      .single()
    
    adminUser = currentAdminUser
    //メールアドレスを変更した場合、ユーザ情報を更新
    if(currentAdminUser && currentAdminUser.email !== session.user.email) {
      const { data: updateAdminUser } = await supabase
        .from('admin_users')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single()

        adminUser = updateAdminUser
    }

  }

  return <Navigation session={session} adminUser={adminUser}/>
}

export default SupabaseListener

