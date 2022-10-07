import Styles from './Payform.module.scss'
import Genericinput from '@Components/Genericinput'
import Genericbutton from '@Components/Genericbutton'
import { useForm } from '@Hooks/useForm'
import CurrencySelect from '@Components/CurrencySelect'
import { useCurrencySelect } from '@Components/CurrencySelect/CurrencySelect'
import dateFormat from 'dateformat'
import { createOrder, getCurrencys } from '@Utils/apiUtils'
import useSimpleLoading from '@Hooks/useSimpleLoading'
import { toast } from 'react-toastify'
import { verifyIcon } from '@Img/Icons/Icons'
import { useNavigate } from 'react-router-dom'

/**@param {{payContext: payContext, setPayContext: useState<payContext>[1]}} props*/
const PayForm = ({ payContext, setPayContext }) => {
  if (!payContext?.FiatAmount || payContext?.Concept === undefined) {
    return <CreatePaymentForm {...{ setPayContext, payContext }} />
  }

  if (!payContext?.CurrencySelected) {
    return <SelectCurrency {...{ payContext }} />
  }
}

/**@param {{setPayContext: useState<payContext>[1]}} props*/
const CreatePaymentForm = ({ setPayContext }) => {
  const { loadState, setLoading } = useSimpleLoading()

  const onPaymentSubmit = async (Inputs) => {
    if (loadState) {
      return
    }
    const [FiatAmount, Concept] = Inputs
    if (FiatAmount === '') {
      toast.info('Importe invalido')
      return
    }
    if (parseFloat(FiatAmount) < 0.1) {
      toast.info('El importe debe ser de al menos 0.1 EUR')
      return
    }

    const Currencys = await setLoading(getCurrencys())
    setPayContext((prev) => ({ ...prev, Concept, FiatAmount: parseFloat(FiatAmount), Currencys, CreateDate: new Date(), Commerce: 'Prueba tecnica 5' }))
  }

  const { formProps } = useForm(onPaymentSubmit)

  return (
    <div className={Styles.CreatePaymentContainer}>
      <h1>Crear pago</h1>
      <form {...formProps} noValidate>
        <Genericinput text='Importe a pagar' symbol='EUR' type='number' />
        <Genericinput text='Concepto' />
        <Genericbutton load={loadState}>Crear pago</Genericbutton>
      </form>
    </div>
  )
}

/**@param {{payContext: payContext, setPayContext: useState<payContext>[1]}} props*/
const SelectCurrency = ({ payContext }) => {
  const SelectProps = useCurrencySelect(payContext.Currencys)
  const { loadState, setLoading } = useSimpleLoading()
  const navigate = useNavigate()

  const onSelectCurrency = async () => {
    const CreateOrderResponse = await createOrder(payContext.FiatAmount, SelectProps.selectedCurrency.symbol, payContext.Concept)
    navigate(CreateOrderResponse.identifier)
  }

  return (
    <div className={Styles.SelectCurrencyContainer}>
      <section className={Styles.PayContextInfoContainer}>
        <h1 className={Styles.TittleSection}>Resumen del pedido</h1>
        <div>
          <InfoItem text={'Importe:'}>
            <h2>{payContext.FiatAmount} EUR</h2>
          </InfoItem>
          <hr />
          <InfoItem text={'Comercio:'}>
            <span>
              <img src={verifyIcon} alt='verify commerce icon' />
              <h2>{payContext.Commerce}</h2>
            </span>
          </InfoItem>
          <InfoItem text={'Fecha:'}>
            <h2>{dateFormat(new Date(), 'dd/mm/yyyy HH:MM')}</h2>
          </InfoItem>
          <hr />
          <InfoItem text={'Concepto:'}>
            <h2>{payContext.Concept}</h2>
          </InfoItem>
        </div>
      </section>
      <section className={Styles.SelectorCurrency}>
        <CurrencySelect {...SelectProps} />
        <Genericbutton load={loadState} onClick={() => setLoading(onSelectCurrency())}>
          Continuar
        </Genericbutton>
      </section>
    </div>
  )
}

const InfoItem = ({ text, children }) => {
  return (
    <div className={Styles.InfoItem}>
      <h2>{text}</h2>
      {children}
    </div>
  )
}

export default PayForm
