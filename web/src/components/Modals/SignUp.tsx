import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import User from '../../apis/User'
import portraits from '../../helpers/Portraits'

import ModalProps from './interfaces/ModalProps'

import './css/index.scss'

interface Errors {
  [key: string]: string
}

const SignUp: FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [errors, setErrors] = useState<Errors>({} as Errors)
  const dispatch = useDispatch()

  const keys = Object.keys(portraits)

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    let img = ''
    if (errors.email || errors.password || errors.passwordConfirm) {
      return
    }

    if (image === '') {
      img = keys[Math.floor(Math.random() * keys.length)]
    }

    const res = await User.signUp(
      email,
      username,
      password,
      passwordConfirm,
      image === '' ? img : image
    )
    if (res.status === 200) {
      const res = await User.signIn(email, password)
      if (res.status === 200) {
        dispatch({ type: 'user/setToken', payload: { token: res.data.token } })
        closeModal()
      }
    } else {
    }
  }

  const handleFocus = (type: string) => {
    switch (type) {
      case 'email':
        if (email.length === 0) {
          setErrors({ ...errors, email: 'Email is required' })
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setErrors({ ...errors, email: 'Email is not valid' })
        } else {
          setErrors({ ...errors, email: '' })
        }
        break
      case 'username':
        if (username.length === 0) {
          setErrors({ ...errors, username: 'Username is required' })
        } else {
          setErrors({ ...errors, username: '' })
        }
        break
      case 'password':
        if (password.length === 0) {
          setErrors({ ...errors, password: 'Password is required' })
        } else if (password.length < 5) {
          setErrors({ ...errors, password: 'Password length must be more than 5 characters' })
        } else {
          setErrors({ ...errors, password: '' })
        }
        break
      case 'passwordConfirm':
        if (passwordConfirm !== password) {
          setErrors({ ...errors, passwordConfirm: 'Passwords dont match' })
        } else {
          setErrors({ ...errors, passwordConfirm: '' })
        }
        break
    }
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col w-full h-full p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow md:p-6 md:w-1/2"
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
                  onBlur={() => handleFocus('email')}
                  type="email"
                  id="email"
                  className={`email ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                  required
                />
                {errors.email && (
                  <div className="mt-2 text-xs italic text-red-500">{errors.email}</div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => handleFocus('username')}
                  type="text"
                  id="username"
                  className={`username ${errors.username ? 'border-red-500' : 'border-gray-600'}`}
                  required
                />
                {errors.username && (
                  <div className="mt-2 text-xs italic text-red-500">{errors.username}</div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleFocus('password')}
                  type="password"
                  id="password"
                  className={`password ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
                  autoComplete="off"
                  required
                />
                {errors.password && (
                  <div className="mt-2 text-xs italic text-red-500">{errors.password}</div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="passwordConfirm"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  onBlur={() => handleFocus('passwordConfirm')}
                  type="password"
                  id="passwordConfirm"
                  className={`password ${
                    errors.passwordConfirm ? 'border-red-500' : 'border-gray-600'
                  }`}
                  autoComplete="off"
                  required
                />
                {errors.passwordConfirm && (
                  <div className="mt-2 text-xs italic text-red-500">{errors.passwordConfirm}</div>
                )}
              </div>
              <span className="block mb-2 text-sm font-medium text-gray-300">Avatar</span>
              <div className="flex w-full py-4 mb-4 overflow-x-auto" style={{ height: '200px' }}>
                {keys.map((key: string) => {
                  if (key !== 'elite') {
                    return (
                      <div
                        key={key}
                        onClick={() => setImage(key)}
                        className={`${
                          key === image
                            ? 'outline outline-4 outline-orange-400 image-border cursor-none'
                            : ''
                        } bg-gray-700 mx-2 flex-none md:flex border-gray-900 rounded-lg cursor-pointer hover:outline hover:outline-4 hover:outline-orange-400`}
                        style={{ width: '100px', height: '150px' }}
                      >
                        <div
                          className="w-full h-full bg-center bg-cover rounded-lg"
                          style={{ backgroundImage: `url(${portraits[key]})` }}
                        />
                      </div>
                    )
                  }
                })}
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default SignUp
