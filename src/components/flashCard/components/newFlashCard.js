import React from 'react'
import { Button } from '@/components'

const newFlashCard = ({ appendFunction }) => {
  return (
    <div
      style={{ width: 384, height: 442, alignItems: 'center' }}
      className='flex justify-center'
    >
      <Button
        onClick={(e) => appendFunction(e)}
        className='rounded-full hover:rounded-full'
        text={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-20 h-20 stroke-1 hover:stroke-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v12m6-6H6'
            />
          </svg>
        }
      />
    </div>
  )
}

export default newFlashCard
