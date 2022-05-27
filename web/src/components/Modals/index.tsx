import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './css/index.scss'

import Search from './Search'
import Ref from './Ref'
import SignIn from './SignIn'
import SignUp from './SignUp'

const ModalHandler: FC = () => {
  const modals = useSelector((state: any) => state.modal)
  const [showModal, setShowModal] = useState<boolean>(false)

  const dispatch = useDispatch()

  const closeModal = () => {
    setShowModal(false)
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
    const m = Object.keys(modals)
    m.forEach((key: string) => {
      dispatch({ type: 'modal/closeModal', payload: { modal: key } })
    })
  }

  useEffect(() => {
    if (modals.search) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    }

    if (modals.ref) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    }

    if (modals.signin) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    }

    if (modals.signin) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    }

    if (modals.signup) {
      setShowModal(true)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
    }
  }, [modals])

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  })
  return (
    <div onClick={closeModal} className={`modal ${showModal ? 'flex' : 'hidden'}`}>
      <Search closeModal={closeModal} isOpen={modals.search} />
      <Ref closeModal={closeModal} isOpen={modals.ref} />
      <SignIn closeModal={closeModal} isOpen={modals.signin} />
      <SignUp closeModal={closeModal} isOpen={modals.signup} />
    </div>
  )
}

export default ModalHandler
