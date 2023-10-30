import React from 'react'
import PropTypes from 'prop-types'
const Button = (props) => {
  const { text } = props
  return (
    <button
      className='my-2 mx-3'
      style={{ backgroundColor: '#6982AA' }}
      {...props}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
}

export default Button
