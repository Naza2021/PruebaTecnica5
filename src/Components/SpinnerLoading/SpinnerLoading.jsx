import Styles from './SpinnerLoading.module.scss'

const SpinnerLoading = (props) => {
  return (
    <div className={Styles.LoadingContainer} id='Loader'>
      <div className={Styles.ldsring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default SpinnerLoading
