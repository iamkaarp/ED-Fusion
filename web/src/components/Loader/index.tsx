import React, { FC } from 'react'

import './css/index.scss'

const Loader: FC = () => {
  return (
    <svg
      style={{ height: '170px' }}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="m5,8l5,8l5,-8z" className="l1 d1" />
      <path d="m5,8l5,-8l5,8z" className="l1 d2" />
      <path d="m10,0l5,8l5,-8z" className="l1 d3" />
      <path d="m15,8l5,-8l5,8z" className="l1 d4" />
      <path d="m20,0l5,8l5,-8z" className="l1 d5" />
      <path d="m25,8l5,-8l5,8z" className="l1 d6" />
      <path d="m25,8l5,8l5,-8z" className="l1 d7" />
      <path d="m30,16l5,-8l5,8z" className="l1 d8" />
      <path d="m30,16l5,8l5,-8z" className="l1 d9" />
      <path d="m25,24l5,-8l5,8z" className="l1 d10" />
      <path d="m25,24l5,8l5,-8z" className="l1 d11" />
      <path d="m20,32l5,-8l5,8z" className="l1 d13" />
      <path d="m15,24l5,8l5,-8z" className="l1 d14" />
      <path d="m10,32l5,-8l5,8z" className="l1 d15" />
      <path d="m5,24l5,8l5,-8z" className="l1 d16" />
      <path d="m5,24l5,-8l5,8z" className="l1 d17" />
      <path d="m0,16l5,8l5,-8z" className="l1 d18" />
      <path d="m0,16l5,-8l5,8z" className="l1 d20" />
      <path d="m10,16l5,-8l5,8z" className="l2 d0" />
      <path d="m15,8l5,8l5,-8z" className="l2 d3" />
      <path d="m20,16l5,-8l5,8z" className="l2 d6" />
      <path d="m20,16l5,8l5,-8z" className="l2 d9" />
      <path d="m15,24l5,-8l5,8z" className="l2 d12" />
      <path d="m10,16l5,8l5,-8z" className="l2 d15" />
    </svg>
  )
}

export default Loader
