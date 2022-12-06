import React from 'react'
import "../assets/css/wrapper.css"

const Wrapper = ({children}) => {
  return (
    <div className='wrapper'>
        {children}
    </div>
  )
}

export default Wrapper