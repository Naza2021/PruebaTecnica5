import { S } from '@Utils/index'
import { useState } from 'react'
import Styles from './CurrencySelect.module.scss'

/**@returns {{setSelectedCurrencyName, selectedCurrency: GenericCurrency, currencys: Array<GenericCurrency>}} */
export const useCurrencySelect = (currencys) => {
  const [selectedCurrencyName, setSelectedCurrencyName] = useState(currencys[0].name)

  const selectedCurrency = currencys.find((currency) => currency.name === selectedCurrencyName)

  return { setSelectedCurrencyName, selectedCurrency, currencys }
}

/**@param {React.InputHTMLAttributes<HTMLElement> & { currencys: Array<GenericCurrency> }} props*/
const CurrencySelect = ({ setSelectedCurrencyName, selectedCurrency, currencys, ...props }) => {
  const [visibleCurrencys, setVisibleCurrencys] = useState(false)

  const filterSelectedCurrencys = currencys.filter((currency) => currency.name !== selectedCurrency.name)

  const onSelectCurrency = (currency) => {
    setSelectedCurrencyName(currency.name)
    setVisibleCurrencys(false)
  }

  return (
    <div className={S(Styles.CurrencySelect, visibleCurrencys && Styles.VisibleCurrencySelect)} id='GenericInputContainer' tabIndex={1} {...props} onBlur={() => setVisibleCurrencys(false)}>
      <h3>Selecionar moneda</h3>
      <div>
        <h1 onClick={() => setVisibleCurrencys((prev) => !prev)}>
          {selectedCurrency?.name} ({selectedCurrency?.symbol})
        </h1>
        <div className={Styles.Arrow} />
        <ul className={Styles.ListCurrencys}>
          {filterSelectedCurrencys.map((currency, index) => (
            <li key={index} onClick={() => onSelectCurrency(currency)}>
              <h2>{currency.name}</h2>
              <h3>{currency.symbol}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CurrencySelect
