import React from 'react'

import styles from './input.module.css'

const Input = (inputOptions) => {
  return (
    <>
      <label htmlFor={inputOptions.id} className='sr-only'>
        {inputOptions.label}
      </label>
      <input {...inputOptions} className={styles.input} />
    </>
  )
}

export default Input
