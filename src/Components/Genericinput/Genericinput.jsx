import Styles from './Genericinput.module.scss'

/**@param {React.InputHTMLAttributes<HTMLInputElement> & { symbol: string, text: string }} props*/
const Genericinput = ({ symbol, text, ...props }) => {
  return (
    <div className={Styles.GenericInput} id='GenericInputContainer'>
      <h3>{text}</h3>
      <div>
        {symbol && <h2>{symbol}</h2>}
        <input type='text' id='GenericInput' {...props} />
      </div>
    </div>
  )
}

export default Genericinput
