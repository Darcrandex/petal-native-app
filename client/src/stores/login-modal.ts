import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

type loginState = { isOpen: boolean }

const loginAtom = atom<loginState>({ isOpen: false })

export function useLoginModal() {
  const [state, setState] = useAtom(loginAtom)
  const { isOpen } = state

  const onOpen = useCallback(() => setState({ isOpen: true }), [setState])
  const onClose = useCallback(() => setState({ isOpen: false }), [setState])

  return { isOpen, onOpen, onClose }
}
