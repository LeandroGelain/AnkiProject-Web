import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LoadingContext from '@/contexts/loadingContext'

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: PropTypes.element,
}

export default LoadingProvider
