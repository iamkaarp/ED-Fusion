import React, { FC } from 'react'
import { v4 } from 'uuid'

import './css/index.scss'

interface ToggleProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  label: string
}

const Toggle: FC<ToggleProps> = ({ onChange, checked, label }) => {
  const id = v4()
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only toggle"
          onChange={onChange}
          checked={checked}
        />
        <div className="block w-10 h-6 bg-gray-700 rounded-full track" />
        <div className="absolute w-4 h-4 transition bg-gray-200 rounded-full dot left-1 top-1" />
      </div>
      <div className="ml-3 font-medium text-gray-300">{label}</div>
    </label>
  )
}

export default Toggle
