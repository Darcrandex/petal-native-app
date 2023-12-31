import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { UserModel } from '@/types/user.model'

const userAtom = atomWithStorage<UserModel | null>('@user', null)

export function useUserState() {
  const [user, setUser] = useAtom(userAtom)
  return { user, setUser }
}
