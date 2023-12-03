import { create } from 'zustand'
import type { Database } from '@/lib/database.types'
type UserContactType = Database['public']['Tables']['contacts']['Row']

type StateType = {
  contactData: UserContactType
  setContactData: (payload: UserContactType) => void
}

const useContactStore = create<StateType>((set) => ({
  // 初期値
  contactData: { id: 0, created_at: "",  name: "", email: "", title: "", description: "", contact_date: ""},
  // アップデート
  setContactData: (payload) => set({ contactData: payload }),
}))

export default useContactStore