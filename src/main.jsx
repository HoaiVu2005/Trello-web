import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import './index.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '../theme'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

// Kỹ thuật injectStore: Là kỹ thuẩt khi cần sử dụng biến redux sotre ở các file ngoài phạm vi component
import { injectStore } from './pages/Ultis/authorizeAxios'
injectStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename='/'>

      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            description: 'This action will permanently delete your Column and its Cards! Are you sure? ',
            dialogProps: { maxWidth: 'xs' },
            allowClose: false
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-right" />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </BrowserRouter >
  </Provider>
)
