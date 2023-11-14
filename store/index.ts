import { create } from 'zustand'
import type { Database } from '@/lib/database.types'
type AdminUserType = Database['public']['Tables']['admin_users']['Row']

type StateType = {
  user: AdminUserType
  setUser: (payload: AdminUserType) => void
}

const useStore = create<StateType>((set) => ({
  // 初期値
  user: { id: '', created_at: '', email: '', name: '', avatar_url: '', authority_id: 0 },
  // アップデート
  setUser: (payload) => set({ user: payload }),
}))

export default useStore

