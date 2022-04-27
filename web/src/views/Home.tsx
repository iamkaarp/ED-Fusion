import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/systems')
  }, [])

  return <div className="container h-full pt-24 pb-12 mx-auto">home</div>
}

export default Home
