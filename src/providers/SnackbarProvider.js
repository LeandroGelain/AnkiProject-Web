import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SnackbarContext from '@/contexts/snackbarContext'

function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState('success')

  const openSnackbar = ({ message = '', type = 'success' }) => {
    setMessage(message)
    setType(type)
    setOpen(true)
  }

  return (
    <SnackbarContext.Provider
      value={{
        open,
        setOpen,
        message,
        setMessage,
        type,
        setType,
        openSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

SnackbarProvider.propTypes = {
  children: PropTypes.element,
}

export default SnackbarProvider
