import { create } from 'zustand'
import type { Database } from '@/lib/database.types'
type UserContactType = Database['public']['Tables']['contacts']['Row']

type StateType = {
  contactData: Array<UserContactType> | null
  setContactData: (payload: Array<UserContactType>) => void
}

const useContactStore = create<StateType>((set) => ({
  // 初期値
  contactData: null,
  // アップデート
  setContactData: (payload) => set({ contactData: payload }),
}))

export default useContactStore