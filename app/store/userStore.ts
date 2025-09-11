import { create } from 'zustand'
import { API_BASE_URL, JWT_TOKEN } from '../constants';

export type LoginType = 'X' | 'G' | 'E';

export interface userStore {
  userData: {
    type: LoginType,
    id: string,
    name: string,
    avatar: string,
  } | null;
  setUserData: (id: string, type: LoginType, name: string, avatar: string) => void;
  checkUser: (id: string) => Promise<{error: string | null}>;
}

export const useUserStore = create<userStore>((set, get) => ({
  userData: null,

  setUserData: async (id, type, name, avatar) => {
    set({ userData: { id, type, name, avatar }})
  },

  checkUser: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/user/checkUser/${id}`)
    const jsonRes = await res.json()

    if (!jsonRes.error) {
      const setUserData = get().setUserData
      const { id, type, name, avatar, token } = jsonRes.results
      localStorage.setItem(JWT_TOKEN, token)
      setUserData(id, type, name, avatar)
      return {
        error: null
      }
    }
    return {
      error: jsonRes.error
    }
  }
}))
