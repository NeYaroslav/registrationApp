import React from 'react'
import Arrow from 'remixicon-react/ArrowRightSLineIcon'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import './style.scss'

interface Props extends React.RefAttributes<HTMLAnchorElement>, LinkProps {
  withArrow?: boolean
}
const PrimaryLink: React.FC<Props> = ({ children, className, withArrow = false, ...rest }) => {
  return (
    <Link className={`primary-link ${className ?? ''}`} {...rest}>{children}{withArrow && <Arrow size="1.6rem"/>}</Link>
  )
}

export default PrimaryLink
