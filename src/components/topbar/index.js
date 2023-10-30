import React from 'react'
import { useRouter } from 'next/navigation'

import styles from './topbar.module.css'
import { useUser } from '@/hooks'

const TopBar = () => {
  const { logout } = useUser()
  const router = useRouter()

  const signOut = () => {
    logout()
    router.push('/')
  }

  return (
    <div className='w-screen p-4 bg-primary-500 shadow-xl flex justify-end'>
      <button className='py-2 px-4' onClick={signOut}>
        Sair
      </button>
    </div>
  )
}

export default TopBar
