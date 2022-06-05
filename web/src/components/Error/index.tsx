import React, { FC } from 'react'

interface ErrorProps {
  message: string
}

const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <div className="container h-full pt-24 pb-12 mx-auto">
      <div className="w-full p-2 mb-6 text-neutral-400 bg-neutral-800 border border-neutral-700 rounded-lg shadow-md md:p-6">
        <div className="flex justify-center w-full">
          <p className="text-3xl">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Error
