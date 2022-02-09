import ReactDOM from 'react-dom'
import { StrictMode, Suspense, lazy } from 'react'
import { StoreProvider } from './components/reduceStore/StoreProvider'
const App = lazy(() => import('./components/app/App'))
import entry from '../scss/entry.css'
// import RegisterServiceWorker from './swRegistration'

ReactDOM.render(
   <StrictMode>
      <StoreProvider>
         <Suspense fallback={<div className={entry.loading_screen}>Creating universe..</div>}>
            <App />
         </Suspense>
      </StoreProvider>
   </StrictMode>,
   document.getElementById('root')
)

// RegisterServiceWorker()
