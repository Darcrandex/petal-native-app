import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

type loginModalState = { isOpen: boolean }

const loginModalAtom = atom<loginModalState>({ isOpen: false })

export function useLoginModal() {
  const [state, setState] = useAtom(loginModalAtom)
  const { isOpen } = state

  const onOpen = useCallback(() => setState({ isOpen: true }), [setState])
  const onClose = useCallback(() => setState({ isOpen: false }), [setState])

  return { isOpen, onOpen, onClose }
}
