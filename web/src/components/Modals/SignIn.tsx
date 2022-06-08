import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import User from '../../apis/User'

import ModalProps from './interfaces/ModalProps'

const SignIn: FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    const res = await User.signIn(email, password)
    if (res.status === 200) {
      dispatch({ type: 'user/setToken', payload: { token: res.data.token } })
      closeModal()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col w-full p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md h-1/2 overflow md:p-6 md:w-1/2"
        >
          <div className="w-full text-xl text-gray-400">Signin</div>
          <div className="w-full mt-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="input"
                  placeholder="me@mail.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="input"
                  autoComplete="off"
                  required
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default SignIn
