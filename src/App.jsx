import Styles from './App.module.scss'
import { ToastContainer } from 'react-toastify'
import Errorscreen from '@Screens/ErrorScreen'
import Genericbutton from '@Components/Genericbutton'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Merchantpayscreen from '@Screens/MerchantpayScreen'
import Userpayscreen from '@Screens/UserpayScreen'
import Showmerchantpayscreen from '@Screens/ShowMerchantPayScreen'
import { PoweredByBitnovo } from '@Img/Images'
import Successscreen from '@Screens/SuccessScreen'

export const Page404 = ({ customMessage, customInfo }) => {
  const navigate = useNavigate()
  return (
    <Successscreen Message={customMessage ?? 'No se encontro la pagina'} info={customInfo ?? 'Esta pagina puede no existir o ya no estar en funcionamiento.'}>
      <Genericbutton onClick={() => navigate('/')}>Ir al inicio</Genericbutton>
    </Successscreen>
  )
}

function App() {
  return (
    <div className={Styles.GeneralContainer}>
      <ToastContainer position='top-right' autoClose={1000} hideProgressBar={false} closeOnClick draggable />
      <div className={Styles.FormsContainer}>
        <Routes>
          <Route path='*' element={<Page404 />} />
          <Route path='/' element={<Merchantpayscreen />}></Route>
          <Route path='/:identifierId' element={<Showmerchantpayscreen />}></Route>
          <Route path='/payment/:identifierId' element={<Userpayscreen />}></Route>
        </Routes>
      </div>
      <footer>
        <img src={PoweredByBitnovo} alt='Powered by bitnovo' />
        <div />
        <h2>© 2022 Bitnovo. All rights reserved.</h2>
      </footer>
    </div>
  )
}

export default App
