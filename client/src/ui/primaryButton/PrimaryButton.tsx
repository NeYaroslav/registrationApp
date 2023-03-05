import React from 'react'
import './style.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton: React.FC<Props> = ({ className, children, ...rest }) => {
  return (
    <button className={`primary-button ${className ?? ''}`} {...rest}>{children}</button>
  )
}

export default PrimaryButton
