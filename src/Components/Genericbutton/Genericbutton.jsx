import SpinnerLoading from '@Components/SpinnerLoading'
import { S } from '@Utils/index'
import Styles from './Genericbutton.module.scss'

/**@param {React.InputHTMLAttributes<HTMLButtonElement> & { onClick: Function, children, load: boolean}} props*/
const Genericbutton = ({ onClick, children, load, ...props }) => {
  return (
    <button onClick={() => onClick && !load && onClick()} className={S(Styles.GenericButton, load && Styles.isLoad)} {...props}>
      <div>
        <h2>{children}</h2>
        {load && (
          <div className={Styles.Loader}>
            <SpinnerLoading />
          </div>
        )}
      </div>
    </button>
  )
}

export default Genericbutton
