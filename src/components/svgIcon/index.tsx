import React from 'react'

interface IProps {
  className?: string
  fill?: string // ex: fill-primay
  type: string
  color?: string
  size?: string | number
  style?: React.CSSProperties
  onClick?: () => void
}
const SvgIcon: React.FC<IProps> = props => {
  const { className, fill, type, color = '#eeeeee', size = 16, onClick, style } = props
  return (
    <i
      className={`relative align-middle not-italic inline-block ${className || ''}`}
      style={style}
      onClick={onClick}
    >
      <svg
        className={`size-16px align-top mx-0 ${fill}`}
        aria-hidden="true"
        style={{ width: size, height: size, color, fill: fill ? '' : 'currentColor' }}
      >
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    </i>
  )
}

export default SvgIcon
