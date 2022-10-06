import { S } from '@Utils/index'
import { Fragment, useState } from 'react'
import Styles from './Tabselector.module.scss'

export const useTabsSelector = (options) => {
  const [optionSelected, setOptionSelected] = useState(options[0])
  return { TabsSelectorProps: { optionSelected, options, setOptionSelected }, optionSelected }
}

const Tabselector = ({ optionSelected, options, setOptionSelected, ...props }) => {
  return (
    <div className={Styles.TabSelectorContainer}>
      {options.map((option, index) => (
        <Fragment key={index}>
          <h1 className={S(Styles.Option, optionSelected === option && Styles.SelectedOption)} onClick={() => setOptionSelected(option)}>
            {option}
          </h1>
          {index < options.length - 1 && <div />}
        </Fragment>
      ))}
    </div>
  )
}

export default Tabselector
