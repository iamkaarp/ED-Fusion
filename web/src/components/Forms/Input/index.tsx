import React, { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
interface Input {
  type: string
  title: string
  placeholder: string
  classes?: string
  value: string
  onChange: (e: React.ChangeEvent<any>) => void
}

import './css/Input.scss'

const Input: FC<Input> = ({ type, title, classes, placeholder, onChange, value }) => {
  const id = uuidv4()
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
        {title}
      </label>
      <input
        type={type}
        id={id}
        className={`input ${classes}`}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e)
        }}
        value={value}
      />
    </div>
  )
}

export default Input
