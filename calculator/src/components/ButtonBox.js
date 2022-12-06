import React from 'react'
import "../assets/css/buttonBox.css"

const ButtonBox = ({children}) => {
  return (
    <div className='buttonBox'>
        {children}
    </div>
  )
}

export default ButtonBox