import React, { useState } from 'react'
import './FormField.css'

const FormField = ({title,placeholder,handleInput,value,otherStyles,...props}) => {
    const Props = props
//   const darkmode = darkmode;

  const [entering, setEntering] = useState(false)
    return (
        <div className="body">
        <div className="fieldtitle" style={{ color: 'var(--text-primary)' }}>{title} </div>
        <input className="field" onChange={(e)=>{handleInput(e.target.value)}}  onFocus={()=>{setEntering(true)}} onBlur={()=>{setEntering(false)}} placeholder={placeholder} 
        style={{ 
            border: `1px solid ${entering ? '#969696' : ''}`,
            transition: 'all 0.3s ease',
            ...otherStyles,
            ...(entering && { transform: 'scale(1.02)' }) 
             }} 
        {...props}
        value={value}
        ></input>


        </div>
  )
}

export default FormField

