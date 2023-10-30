import React, { useEffect, useState } from 'react'

import { Controller, useWatch } from 'react-hook-form'

import styles from '../flashCard.module.css'

const defaultFlashCard = (props) => {
  const { removeCardFunction, index, control, register, setValue, group } =
    props

  const randomId = (Math.random() + 1).toString(36).substring(1)
  const [previewImage, setPreviewImage] = useState('')

  const results = useWatch({ control, name: 'flashCardInputs' })

  const toBase64 = (file) => {
    if (!file) return setPreviewImage('')

    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    }).then((result) => {
      setPreviewImage(result)
    })
  }

  useEffect(() => {
    if (typeof results[index].image !== 'object') {
      setPreviewImage(results[index].image)
    } else {
      toBase64(results[index].image)
    }
  }, [results[index].image])

  return (
    <div id={`flashcard-${index}`} className='mb-10'>
      <Controller
        render={() => (
          <input
            id={index}
            {...register(`flashCardInputs.${index}.id`)}
            name={`flashCardInputs.${index}.id`}
            type='text'
            className='hidden'
          />
        )}
        className='hidden'
        name={`flashCardInputs.${index}.id`}
        control={control}
      />
      <div className='flex justify-end mt-4 mr-4'>
        <button
          className={styles.removeButton}
          onClick={(e) => {
            removeCardFunction(e, group)
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#000'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      <div className='card-body flex justify-center mb-6'>
        <Controller
          render={() => (
            <label
              htmlFor={randomId}
              style={{
                background: `url(${previewImage}) transparent no-repeat center`,
              }}
              className={
                !previewImage ? styles.inputImageAdd : styles.inputImage
              }
            >
              {!previewImage ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#fff'
                  className='w-20 h-20 stroke-1 hover:stroke-2 visible:important'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v12m6-6H6'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='#fff'
                  className='w-20 h-20 stroke-1 hover:stroke-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              )}

              <input
                id={randomId}
                {...register(`flashCardInputs.${index}.image`)}
                name={`flashCardInputs.${index}.image`}
                type='file'
                accept='image/*'
                hidden={true}
                onClick={(e) => {
                  if (!previewImage) return
                  e.preventDefault()

                  setValue(`flashCardInputs.${index}.image`, '')
                  setPreviewImage(null)
                }}
                onChange={(e) => {
                  if (previewImage) return
                  if (typeof results[index].image !== 'object') return
                  if (e?.target?.files?.[0]) {
                    const file = e.target.files[0]
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setPreviewImage(reader.result)
                    }
                    setValue(`flashCardInputs.${index}.image`, file)
                    reader.readAsDataURL(file)
                  }
                }}
              />
            </label>
          )}
          name={`flashCardInputs.${index}.image`}
          control={control}
        />
      </div>
      <div className='card-body items-center text-center p-4'>
        <Controller
          render={() => (
            <input
              id={index}
              {...register(`flashCardInputs.${index}.currentLang`)}
              name={`flashCardInputs.${index}.currentLang`}
              type='text'
              placeholder='Palavra na sua lingua'
              className={styles.input}
            />
          )}
          name={`flashCardInputs.${index}.currentLang`}
          control={control}
        />
        <div className='mt-2 h-full'>
          <Controller
            render={() => (
              <input
                id={index}
                {...register(`flashCardInputs.${index}.foreignLang`)}
                name={`flashCardInputs.${index}.foreignLang`}
                type='text'
                placeholder='Palavra na lingua estrangeira'
                className={styles.input}
              />
            )}
            name={`flashCardInputs.${index}.foreignLang`}
            control={control}
          />
        </div>
      </div>
    </div>
  )
}

export default defaultFlashCard
