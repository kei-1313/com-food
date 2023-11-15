import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type  {Database } from '@/lib/database.types'
import Sidebar from './components/Sidebar'

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies
  })

  //セッションの取得
  const { data: {session} } = await supabase.auth.getSession()

  return (
    <div>
      {session ?
      <div>
        <Sidebar/>
      </div> :
      <div>
        未ログイン
      </div>
      }
    </div>
  )
}

export default Home