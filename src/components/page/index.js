import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks'
import { TopBar } from '@/components'

const Page = ({ children, auth = false }) => {
  const { token, user } = useUser()

  const router = useRouter()

  useEffect(() => {
    if ((auth && !token) || (auth && !user)) {
      router.push('/')
    }
  })

  return (
    <>
      <TopBar />
      <div>{children}</div>
    </>
  )
}

export default Page
