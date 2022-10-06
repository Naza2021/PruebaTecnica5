import PayForm from '@Components/Payform/Payform'
import { useState } from 'react'
import Styles from './Merchantpayscreen.module.scss'

const Merchantpayscreen = (props) => {
  /**@type {useState<payContext>} */
  const [payContext, setPayContext] = useState()
  return <PayForm {...{ payContext, setPayContext }} />
}

export default Merchantpayscreen
