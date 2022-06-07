import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import User from '../../apis/User'

import portraits from '../../helpers/Portraits'

import './css/index.scss'

const UserSettings: FC = () => {
  const [password, setPassword] = useState<string>('')
  const user = useSelector((state: any) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const keys = Object.keys(portraits)

  const setImage = (image: string) => {
    if (image !== user.image) {
      User.update({ image })
      dispatch({ type: 'user/setProfile', payload: { profile: { image } } })
      navigate('/settings')
    }
  }

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    User.update({ password })
  }

  useEffect(() => {
    if (!user.token) {
      navigate('/')
    }
  }, [user])

  return (
    <>
      <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
        <div className="flex justify-between w-full pb-4 mb-4 border-b border-gray-700">
          <p className="text-3xl">{user.name}</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                New password
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
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full mt-4">
          <p className="text-xl text-gray-400">Avatar</p>
          <div className="grid grid-cols-1 gap-2 mt-4 md:gap-4 md:grid-cols-5">
            {keys.map((key: string) => {
              if (key !== 'elite') {
                return (
                  <div
                    key={key}
                    onClick={() => setImage(key)}
                    className={`${
                      key === user.profile.image
                        ? 'outline outline-4 outline-orange-400 image-border cursor-none'
                        : ''
                    } bg-gray-700 border-gray-900 rounded-lg cursor-pointer hover:outline hover:outline-4`}
                    style={{ height: '400px' }}
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
        </div>
      </div>
    </>
  )
}

export default UserSettings
