'use client'
import React from 'react'

import PropTypes from 'prop-types'
import { DefaultFlashCard, NewFlashCard } from './components'

const CardComponent = (props) => {
  const { createNew } = props
  return (
    <div className='card w-96 bg-base-100 grid justify-content-center shadow-lg'>
      {createNew ? (
        <NewFlashCard {...props} />
      ) : (
        <DefaultFlashCard {...props} />
      )}
    </div>
  )
}

CardComponent.propTypes = {
  createNew: PropTypes.bool,
  index: PropTypes.number,
  removeCardFunction: PropTypes.function,
  control: PropTypes.function,
  register: PropTypes.function,
  setValue: PropTypes.function,
  appendFunction: PropTypes.function,
}

export default CardComponent
