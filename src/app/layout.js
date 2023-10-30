/* eslint-disable react/react-in-jsx-scope */
'use client'

import { Inter } from 'next/font/google'
import { AppProvider } from '@/providers'
import { Snackbar } from '@/components'
import PropTypes from 'prop-types'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

RootLayout.propTypes = {
  children: PropTypes.object,
}

export default function RootLayout({ children }) {
  return (
    <html lang='pt'>
      <body className={`max-h-screen max-w-screen ${inter.className}`}>
        <AppProvider>
          <Snackbar />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
