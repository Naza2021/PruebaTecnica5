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
  // FiatAmount: 10.99,
  // Concept: 'Concepto',
  // Commerce: 'Prueba tecnica 5',
  // CreateDate: new Date(),
  // Currencys: HardCodedCurrencys,
  // CurrencySelected: HardCodedCurrencys[1],
  // OrderInfo: HardCodedOrderInfo,
  // QrData: {
  //   QrOptions: ['Web QR', 'Wallet QR'],
  //   QrInformations: {
  //     'Web QR': ['Informacion Wallet Qr 1'],
  //     'Wallet QR': [{ text: 'Informacion 1 <em>BRRR<em/>', copy: 'Especial case' }, 'https://payments.smsdata.com/media/crytocurrencies/ETH_nkJxyIJ.png'],
  //   },
  //   QrGenerated: {
  //     'Web QR': new QRCodeStyling({ ...QROptions, image: 'https://payments.smsdata.com/media/crytocurrencies/ETH_nkJxyIJ.png', data: 'DiualasoasujnmwdhdfuihsdfuihsdfihusdfOG' }),
  //     'Wallet QR': new QRCodeStyling({ ...QROptions, image: 'https://payments.smsdata.com/media/crytocurrencies/ETH_nkJxyIJ.png', data: 'DiuashuioasdfhuiasdiwuwjwmwjwddwfihusdfOG' }),
  //   },
  // },
  // PaymentStatus: 'PE',

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

//   payment_uri: 'bitcoin:tb1q0rvvgz86sm37pqr7u2lz55uavznnynjs2rr408?amount=0.0004965&rbf=false',
//   identifier: 'bd5c80bf-bbe1-46a6-9aae-e7e726af33d6',
//   web_url: 'https://paytest.bitnovo.com/payment/bd5c80bf-bbe1-46a6-9aae-e7e726af33d6/',
//   address: 'tb1q0rvvgz86sm37pqr7u2lz55uavznnynjs2rr408',
//   tag_memo: '',
//   input_currency: 'BTC_TEST',
//   expected_input_amount: 0.0004965,
//   rate: 20140.99,
//   notes: null,
//   reference: null,
//   fiat: 'EUR',
//   language: 'ES',
// }

// const HardCodedOrderInfo = {
//   identifier: 'ae875895-8040-4d21-823f-72669e26ecca',
//   reference: null,
//   created_at: '2022-10-06T15:00:59.821392+02:00',
//   edited_at: '2022-10-06T15:01:02.126543+02:00',
//   status: 'PE',
//   fiat_amount: 10.99,
//   crypto_amount: 0.0079758,
//   unconfirmed_amount: 0.0,
//   confirmed_amount: 0.0,
//   currency_id: 'ETH_TEST',
//   merchant_device_id: 47,
//   address: '0xA851bBB59890560c0812B29946EF555F37F32B81',
//   url_ko: null,
//   url_ok: null,
//   expired_time: '2022-10-06T15:16:02.124192+02:00',
//   good_fee: false,
//   notes: null,
//   rbf: false,
//   safe: false,
//   fiat: 'EUR',
//   language: 'ES',
//   transactions: [],
// }

// const HardCodedCurrencys = [
//   {
//     symbol: 'BTC_TEST',
//     name: 'Bitcoin BTC',
//     min_amount: '0.01',
//     max_amount: '100000.00',
//     image: 'https://payments.smsdata.com/media/crytocurrencies/BTC_mfESKCB.png',
//     blockchain: 'BTC_TEST',
//   },
//   {
//     symbol: 'ETH_TEST',
//     name: 'Ethereum ETH',
//     min_amount: '0.05',
//     max_amount: '20000.00',
//     image: 'https://payments.smsdata.com/media/crytocurrencies/ETH_nkJxyIJ.png',
//     blockchain: 'ETH_TEST',
//   },
//   {
//     symbol: 'USDT_T2',
//     name: 'Tether USDT',
//     min_amount: '0.05',
//     max_amount: null,
//     image: 'https://payments.smsdata.com/media/crytocurrencies/Tether_Red_Eth_1.png',
//     blockchain: 'ETH_TEST',
//   },
// ]
