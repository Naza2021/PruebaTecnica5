import { CircleXIcon } from '@Img/Icons'
import Styles from './Errorscreen.module.scss'

const Errorscreen = ({ Message, info, children }) => {
  return (
    <div className={Styles.ErrorScreenContainer}>
      <CircleXIcon />
      <h2>{Message}</h2>
      <h3>{info}</h3>
      {children}
    </div>
  )
}

export default Errorscreen
