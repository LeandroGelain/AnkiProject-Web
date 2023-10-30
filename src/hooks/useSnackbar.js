import { useContext } from 'react'

import snackbarContext from '@/contexts/snackbarContext'

function useSnackbar() {
  return useContext(snackbarContext)
}

export default useSnackbar
