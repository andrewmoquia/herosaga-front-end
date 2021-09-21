import App from './components/app/App'
import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { StoreProvider } from './components/reduceStore/StoreProvider'

ReactDOM.render(
   <StrictMode>
      <StoreProvider>
         <App />
      </StoreProvider>
   </StrictMode>,
   document.getElementById('root')
)
