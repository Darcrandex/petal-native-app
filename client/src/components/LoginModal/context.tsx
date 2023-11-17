import { createContext, useContext } from 'react'

export type LoginModalContextType = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const LoginModalContext = createContext<LoginModalContextType>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
})

export const useLoginModal = () => {
  return useContext(LoginModalContext)
}
