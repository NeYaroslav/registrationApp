import React from 'react'
import './style.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput: React.FC<Props> = ({ className, placeholder, style, ...rest }) => {
  return (
  <label className={`form-input ${className ?? ''}`} style={style}>
    {placeholder !== undefined &&
    <p className='form-input__placeholder'>
      {placeholder}
    </p>}
    <input className='form-input__input' type="text" {...rest}/>
  </label>
  )
}

export default FormInput
