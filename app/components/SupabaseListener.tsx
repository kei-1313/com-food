'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Navigation from './Navigation'

import type  { Database } from '@/lib/database.types'

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  //セッションの取得
  const { data: { session }} = await supabase.auth.getSession()

  return <Navigation session={session} />
}

export default SupabaseListener
