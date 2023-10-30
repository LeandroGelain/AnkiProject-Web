'use client'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import UserContext from '@/contexts/userContext'
import { useRouter } from 'next/navigation'

function UserProvider({ children }) {
  const router = useRouter()
  const loadUserToken = () => {
    const userToken = localStorage.getItem('anki/token')
    if (userToken === 'null') return null

    return userToken
  }
  const loadLoggedUser = () => {
    return JSON.parse(localStorage.getItem('anki/user')) || {}
  }

  const [token, setToken] = useState(loadUserToken())
  const [user, setUser] = useState(loadLoggedUser())
  const [signed, setSigned] = useState(Boolean(loadUserToken()))

  const signIn = (user, token) => {
    setUser(user)
    setToken(token)
    setSigned(true)
    localStorage.setItem('anki/user', JSON.stringify(user))
    localStorage.setItem('anki/token', token)
    router.push('/home')
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setSigned(false)

    localStorage.removeItem('anki/user')
    localStorage.removeItem('anki/token')
    router.push('/')
  }

  useEffect(() => {
    if (token) {
      setSigned(true)
    } else {
      setSigned(false)
    }
  }, [token])

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        signed,
        setSigned,
        signIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.element,
}

export default UserProvider
