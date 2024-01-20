import React from 'react'
import { ModalProps } from '@/app/interfaces'
import './modal.css'

const Modal: React.FC<ModalProps> = ({ show }) =>{
  return (
    <div className={`modalContainer ${show ? 'modalContainerActive' : 'modalContainerInactive'}`}>Modal</div>
  )
}

export default Modal