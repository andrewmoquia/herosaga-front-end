// import App from
import ReactDOM from 'react-dom'
import { lazy, StrictMode, Suspense } from 'react'
import { StoreProvider } from './components/reduceStore/StoreProvider'
const App = lazy(() => import('./components/app/App'))

ReactDOM.render(
   <StrictMode>
      <StoreProvider>
         <Suspense fallback={<div>Loading...</div>}>
            <App />
         </Suspense>
      </StoreProvider>
   </StrictMode>,
   document.getElementById('root')
)
