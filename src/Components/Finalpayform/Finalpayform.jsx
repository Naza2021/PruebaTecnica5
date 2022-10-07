import Styles from './Finalpayform.module.scss'
import Genericbutton from '@Components/Genericbutton'
import { useEffect, useRef, useState } from 'react'
import dateFormat from 'dateformat'
import { toast } from 'react-toastify'
import { verifyIcon, timerIcon, copyIcon, MetamaskNameLogo } from '@Img/Icons/Icons'
import Tabselector from '@Components/Tabselector'
import { useTabsSelector } from '@Components/Tabselector/Tabselector'
import { useMounted } from '@Hooks/useMounted'
import { CopyClipBoard } from '@Utils'
import { useTime } from '@Hooks/useTime'
import { useOrderWebSocket } from '@Hooks/useOrderWebSocket'
import { useNavigate } from 'react-router-dom'
import Successscreen from '@Screens/SuccessScreen'
import SpinnerLoading from '@Components/SpinnerLoading'
import Errorscreen from '@Screens/ErrorScreen'
import useSimpleLoading from '@Hooks/useSimpleLoading'
import { transferCoin } from '@Utils/ethersUtils'

const BITCOINSYMBOL = 'BTC_TEST'

/**@param {{payContext: payContext, setPayContext: useState<payContext>[1]}} props*/
const ControlledFinalPayForm = ({ payContext, setPayContext }) => {
  const isUserPay = location.pathname.includes('payment')

  /**@param {OrderInfo} Message*/
  const onMessageWebSocket = (Message) => {
    setPayContext((prev) => ({ ...prev, PaymentStatus: Message.status }))
  }

  const { initOrderWebsocket, socketRef } = useOrderWebSocket(payContext?.OrderInfo?.identifier, onMessageWebSocket, true)

  useEffect(() => {
    if (payContext?.OrderInfo?.identifier && socketRef.current === undefined && payContext?.OrderInfo?.status !== 'CO' && payContext?.OrderInfo?.status !== 'EX') {
      initOrderWebsocket(payContext.OrderInfo.identifier)
    }
  }, [payContext])

  if (isUserPay) {
    if (payContext?.PaymentStatus === 'CO') {
      return <PaymentUserConfirmed />
    }
  }

  if (payContext?.PaymentStatus === 'AC') {
    return <WaitingForConfirmation />
  }

  if (payContext?.PaymentStatus === 'CO') {
    return <PaymentConfirmed />
  }

  if (payContext?.PaymentStatus === 'EX') {
    return <TimeExpired disabledButton={isUserPay} />
  }

  return <FinalPayForm {...{ payContext, setPayContext, isUserPay }} />
}

/**@param {{payContext: payContext, setPayContext: useState<payContext>[1]}} props*/
const FinalPayForm = ({ payContext, setPayContext, isUserPay }) => {
  const Options = payContext.CurrencySelected.symbol === BITCOINSYMBOL ? payContext.QrData.QrOptions.filter((option) => option !== 'Web 3') : payContext.QrData.QrOptions
  const { TabsSelectorProps, optionSelected } = useTabsSelector(Options)
  const { loadState, setLoading } = useSimpleLoading()

  const transferViaMetamask = async () => {
    if (loadState) {
      return
    }
    const TransferResponse = await setLoading(transferCoin(payContext.CurrencySelected.symbol, payContext.OrderInfo.crypto_amount, payContext.OrderInfo.address))
    if (TransferResponse.success) {
      toast.success('Transferencia realizada pronto se vera reflejada', { autoClose: 5000 })
      return
    }
    toast.error(TransferResponse.message ?? 'La transferencia fallo, prueba reintentando', { autoClose: 5000 })
  }

  const qrRef = useRef()

  useMounted(() => {
    if (optionSelected === 'Web 3') {
      return
    }
    qrRef.current.replaceChild(payContext.QrData.QrGenerated[optionSelected]._svg, qrRef.current.children[0])
  }, [optionSelected])

  useEffect(() => {
    if (optionSelected === 'Web 3') {
      return
    }
    qrRef.current?.appendChild(payContext.QrData.QrGenerated[optionSelected]._svg)
  }, [])

  const onPayTimeout = () => {
    setPayContext((prev) => ({ ...prev, PaymentStatus: 'EX' }))
  }

  return (
    <div className={Styles.SelectCurrencyContainer}>
      <section className={Styles.PayContextInfoContainer}>
        <h1 className={Styles.TittleSection}>Resumen del pedido</h1>
        <div>
          <InfoItem text={'Importe:'}>
            <h2 className={Styles.BoldStyle}>{payContext.FiatAmount} EUR</h2>
          </InfoItem>
          <hr />
          <InfoItem text={'Moneda seleccionada:'}>
            <span>
              <img src={payContext.CurrencySelected.image} alt='verify commerce icon' />
              <h2 className={Styles.BoldStyle}>{payContext.CurrencySelected.symbol}</h2>
            </span>
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

      <section className={Styles.PayInfoContainer}>
        <h1 className={Styles.TittleSection}>{isUserPay ? 'Informacion para realizar el pago' : 'Informacion para el cliente'}</h1>
        <div className={Styles.PayInfo}>
          <div className={Styles.TimerInfo}>
            <h2>Tiempo restante:</h2>
            <img src={timerIcon} alt='Timer icon' />
            <TimeH2 startDate={payContext.OrderInfo.created_at} endDate={payContext.OrderInfo.expired_time} timeoutFunc={onPayTimeout} />
          </div>
          <Tabselector {...TabsSelectorProps} />

          {optionSelected === 'Web 3' && (
            <div className={Styles.MetamaskButtonContainer}>
              {loadState && <SpinnerLoading />}
              <button onClick={transferViaMetamask}>
                <img src={MetamaskNameLogo} alt='Metamask logo' />
              </button>
            </div>
          )}

          <div className={Styles.QRContainer} ref={qrRef} />

          {payContext.QrData.QrInformations[optionSelected].map((qrInformation, index) => (
            <InfoCopyItem text={qrInformation?.text ?? qrInformation} copy={qrInformation?.copy} key={index} />
          ))}
          <InfoCopyItem text={payContext.OrderInfo.identifier} />
        </div>
      </section>
    </div>
  )
}

const TimeH2 = ({ startDate, endDate, updateTime = 1000, timeoutFunc, ...props }) => {
  const { time } = useTime(startDate, endDate, updateTime, timeoutFunc)

  return <h2 {...props}>{time}</h2>
}

const InfoItem = ({ text, children }) => {
  return (
    <div className={Styles.InfoItem}>
      <h2>{text}</h2>
      {children}
    </div>
  )
}

const InfoCopyItem = ({ text, copy }) => {
  const onCopy = () => {
    CopyClipBoard(copy ?? text)
    toast.success('Copiado')
  }
  const htmlCase = text.includes('em')
  return (
    <div className={Styles.InfoCopyItem}>
      {htmlCase ? <h2 dangerouslySetInnerHTML={{ __html: text.replaceAll('script', '') }} /> : <h2>{text}</h2>}
      <img alt='Copy' src={copyIcon} onClick={onCopy} />
    </div>
  )
}

const TimeExpired = ({ disabledButton }) => {
  const navigate = useNavigate()
  return (
    <Errorscreen Message={'Tiempo maximo agotado'} info={'El pago a expirado por superar el tiempo limite'}>
      {Boolean(disabledButton) === false && <Genericbutton onClick={() => navigate('/')}>Crear otro pago</Genericbutton>}
    </Errorscreen>
  )
}

const WaitingForConfirmation = () => (
  <Successscreen Message={'Pago recibido'} info={'El pago fue enviado y este se confirmara a la brevedad'}>
    <SpinnerLoading />
  </Successscreen>
)

const PaymentUserConfirmed = () => <Successscreen Message={'Pago realizado'} info={'El pago fue realizado con exito'} />

const PaymentConfirmed = () => {
  const navigate = useNavigate()
  return (
    <Successscreen Message={'La transaccion fue completada con exito'} info={'En breve vera acreditado en su balance el pago.'}>
      <Genericbutton onClick={() => navigate('/')}>Crear otro pago</Genericbutton>
    </Successscreen>
  )
}

export default ControlledFinalPayForm
