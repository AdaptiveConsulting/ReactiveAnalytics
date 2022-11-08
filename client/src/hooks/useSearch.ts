import { useContext } from 'react'
import { SearchContext } from '@/containers/search/SearchContext'

export const useSearch = () => {
  return useContext(SearchContext)
}
