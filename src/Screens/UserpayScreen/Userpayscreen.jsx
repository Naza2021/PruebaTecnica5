import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrencys, getOrder } from '@Utils/apiUtils'
import QRCodeStyling from 'qr-code-styling'
import QROptions from '@Utils/QR.options'
import useSimpleLoading from '@Hooks/useSimpleLoading'
import SpinnerLoading from '@Components/SpinnerLoading'
import Finalpayform from '@Components/Finalpayform'
import { Page404 } from '@Root/App'

const Userpayscreen = (props) => {
  const { identifierId } = useParams()
  /**@type {useState<payContext>} */
  const [payContext, setPayContext] = useState()
  const { loadState, setLoading } = useSimpleLoading(undefined, true)

  const getPaymentInfo = async () => {
    try {
      const [orderInfoResponse] = await getOrder(identifierId)

      const Currencys = await getCurrencys()
      const SelectedCurrency = Currencys.find((Currency) => Currency.symbol === orderInfoResponse.currency_id)

      const SmartQR =
        orderInfoResponse.currency_id === 'ETH_TEST'
          ? `ethereum:${orderInfoResponse.address}?amount=${orderInfoResponse.crypto_amount}`
          : `bitcoin:${orderInfoResponse.address}?amount=${orderInfoResponse.crypto_amount}&rbf=false`

      setPayContext((prev) => ({
        ...prev,
        FiatAmount: orderInfoResponse.fiat_amount,
        Commerce: 'Prueba tecnica 5',
        Concept: orderInfoResponse.reference,
        CurrencySelected: SelectedCurrency,
        QrData: {
          QrOptions: ['Wallet QR', 'Smart QR', 'Web 3'],
          QrInformations: {
            'Wallet QR': [{ text: `Enviar <em>${orderInfoResponse.crypto_amount} ${SelectedCurrency.symbol}<em/>`, copy: orderInfoResponse.crypto_amount }, orderInfoResponse.address],
            'Smart QR': [{ text: `Enviar <em>${orderInfoResponse.crypto_amount} ${SelectedCurrency.symbol}<em/>`, copy: orderInfoResponse.crypto_amount }, orderInfoResponse.address],
            'Web 3': [{ text: `Enviar <em>${orderInfoResponse.crypto_amount} ${SelectedCurrency.symbol}<em/>`, copy: orderInfoResponse.crypto_amount }, orderInfoResponse.address],
          },
          QrGenerated: {
            'Wallet QR': new QRCodeStyling({ ...QROptions, image: SelectedCurrency.image, data: orderInfoResponse.address }),
            'Smart QR': new QRCodeStyling({ ...QROptions, image: SelectedCurrency.image, data: SmartQR }),
          },
        },
        OrderInfo: orderInfoResponse,
        PaymentStatus: orderInfoResponse.status,
      }))
    } catch (e) {
      setPayContext((prev) => ({ ...prev, Error: { text: 'Pago no encontrado', info: 'Hubo un error en la busqueda del pago' } }))
    }
  }

  useEffect(() => {
    setLoading(getPaymentInfo())
  }, [])

  if (payContext?.Error) {
    return <Page404 customInfo={payContext.Error.info} customMessage={payContext.Error.text} />
  }

  if (loadState) {
    return <SpinnerLoading />
  }

  return <Finalpayform {...{ payContext, setPayContext }} />
}

export default Userpayscreen
