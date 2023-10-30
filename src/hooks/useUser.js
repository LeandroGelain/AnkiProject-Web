import { useContext } from 'react'

import userContext from '@/contexts/userContext'

function useUser() {
  return useContext(userContext)
}

export default useUser
