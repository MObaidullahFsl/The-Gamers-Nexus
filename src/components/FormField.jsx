import React, { useState } from 'react'
import './FormField.css'
const FormField = ({title,placeholder,handleInput,value,otherStyles,...props}) => {
    const Props = props
  
  const [entering, setEntering] = useState(false)
    return (
        <div className="body">
        <div className="fieldtitle">{title}</div>
        <input className="field" onChange={(e)=>{handleInput(e.target.value)}}  onFocus={()=>{setEntering(true)}} onBlur={()=>{setEntering(false)}} placeholder={placeholder} style={[entering&&{border:'1px solid #969696;', transform:'scale(1.5)' },{otherStyles}]} 
        {...props}
        value={value}
        ></input>


        </div>
  )
}

export default FormField

