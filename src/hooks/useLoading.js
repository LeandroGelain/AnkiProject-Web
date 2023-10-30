import { useContext } from 'react'

import loadingContext from '@/contexts/loadingContext'

function useLoading() {
  return useContext(loadingContext)
}

export default useLoading
