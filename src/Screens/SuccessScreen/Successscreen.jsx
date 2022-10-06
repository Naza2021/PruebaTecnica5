import { CircleCheckIcon } from '@Img/Icons'
import Styles from './Successscreen.module.scss'

const Successscreen = ({ Message, info, children }) => {
  return (
    <div className={Styles.SucessScreenContainer}>
      <CircleCheckIcon />
      <h2>{Message}</h2>
      <h3>{info}</h3>
      {children}
    </div>
  )
}

export default Successscreen
