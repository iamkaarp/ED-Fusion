import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './css/index.scss'

import Search from './Search'

const ModalHandler: FC = () => {
  const modals = useSelector((state: any) => state.modal)
  const search = useSelector((state: any) => state.modal.search)
  const [showModal, setShowModal] = useState<boolean>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeModal = () => {
    setShowModal(false)
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
    const m = Object.keys(modals)
    m.forEach((key: string) => {
      dispatch({ type: 'modal/closeModal', payload: { modal: key } })
    })
  }

  useEffect(() => {
    if (search) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    }
  }, [search])

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  })
  return (
    <div onClick={closeModal} className={`modal ${showModal ? 'flex' : 'hidden'}`}>
      <Search closeModal={closeModal} isOpen={search} />
    </div>
  )
}

export default ModalHandler
