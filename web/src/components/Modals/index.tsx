import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './css/index.scss'

import Search from './Search'

const ModalHandler: FC = () => {
  const search = useSelector((state: any) => state.modal.search)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (search) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    } else {
      setShowModal(false)
      document.getElementsByTagName('body')[0].classList.add('overflow-auto')
    }
  }, [search])

  return (
    <div className={`modal ${showModal ? 'flex' : 'hidden'}`}>
      <Search isOpen={search} />
    </div>
  )
}

export default ModalHandler
