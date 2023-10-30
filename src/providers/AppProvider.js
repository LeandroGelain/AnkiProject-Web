import React from 'react'
import PropTypes from 'prop-types'
import { LoadingProvider, UserProvider, SnackbarProvider } from './'

function AppProvider({ children }) {
  return (
    <>
      <LoadingProvider>
        <SnackbarProvider>
          <UserProvider>{children}</UserProvider>
        </SnackbarProvider>
      </LoadingProvider>
    </>
  )
}

AppProvider.propTypes = {
  children: PropTypes.element,
}

export default AppProvider
