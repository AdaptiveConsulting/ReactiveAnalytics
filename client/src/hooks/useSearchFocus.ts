import { useContext } from 'react'
import { FocusContext } from '@/containers/search/FocusContext'

export const useSearchFocus = () => {
  return useContext(FocusContext)
}
