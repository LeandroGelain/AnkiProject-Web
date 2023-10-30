/* eslint-disable react/react-in-jsx-scope */
'use client'
import Link from 'next/link'

import { Controller, useForm } from 'react-hook-form'
import Input from '@/components/input'
import schema from '@/schemas/login'
import api from '@/api/requests/user'
import styles from '@/styles/login.module.css'

import { useUser, useSnackbar } from '@/hooks'

export default function Home() {
  const { signIn } = useUser()
  const { openSnackbar } = useSnackbar()

  const { handleSubmit, control, register } = useForm({
    validationSchema: schema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await api.login(data)
      signIn(response.data.user, response.data.authToken)
    } catch (error) {
      openSnackbar({ message: error?.response?.data?.error, type: 'error' })
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
      className='flex justify-center items-center'
    >
      <div>
        <div className='card w-96 h-auto bg-base-100 rounded-lg grid justify-content-center shadow-2xl'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={() => {
                return (
                  <div className='m-6'>
                    <input
                      label='Email'
                      placeholder='Email'
                      {...register('email')}
                      name='email'
                      className={styles.input}
                    />
                  </div>
                )
              }}
              name='email'
              control={control}
            />
            <Controller
              render={() => {
                return (
                  <div className='m-6'>
                    <input
                      type='password'
                      label='Senha'
                      placeholder='Senha'
                      {...register('password')}
                      name='password'
                      className={styles.input}
                    />
                  </div>
                )
              }}
              name='password'
              control={control}
            />
            <button className='ml-6 p-4 px-20 mb-6'>
              <Link href='/home'>Login</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
