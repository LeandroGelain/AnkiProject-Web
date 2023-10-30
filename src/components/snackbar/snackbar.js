import React, { useState, useEffect } from 'react'

import CloseIcon from '@/assets/x.svg'
import XCircleIcon from '@/assets/x-circle.svg'
import CheckCircleIcon from '@/assets/check-circle.svg'
import WarningIcon from '@/assets/warning.svg'

import { useSnackbar } from '@/hooks'

const Snackbar = () => {
  const { open, setOpen, message, type } = useSnackbar()

  const handleClose = () => {
    setOpen(false)
  }

  const [iconType, setIconType] = useState(<></>)

  const defaultStyle = ({ icon }) => {
    setIconType(icon)
  }

  const setStylesByType = () => {
    switch (type) {
      case 'success':
        return defaultStyle({
          icon: <CheckCircleIcon width={40} height={40} color='#63DC4B' />,
        })
      case 'error':
        return defaultStyle({
          icon: <XCircleIcon width={40} height={40} color='#EF3215' />,
        })
      case 'warning':
        return defaultStyle({
          icon: <WarningIcon width={40} height={40} color='#EDF336' />,
        })

      default:
        return setIconType(<></>)
    }
  }

  useEffect(() => {
    if (open) {
      setStylesByType()
    }
    // eslint-disable-next-line
  }, [open])
  if (!open) return
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '40px',
        backgroundColor: '#fff',
      }}
      className='mx-2 sm:mx-auto max-w-sm flex flex-row items-center justify-between bg-gray-50 shadow-lg p-6 text-sm leading-none font-medium rounded-xl whitespace-no-wrap'
    >
      <div className='inline-flex items-center text-red-500'>
        <div className='pr-4'>{iconType}</div>
        <div className='pr-4'>{message}</div>
      </div>
      <div>
        <button className='cursor-pointer p-1' onClick={handleClose}>
          <CloseIcon width={30} height={30} color='#FFF' />
        </button>
      </div>
    </div>
  )
}

export default Snackbar
