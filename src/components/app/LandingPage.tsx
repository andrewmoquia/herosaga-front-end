import { MainStore } from '../reduceStore/StoreProvider'
import { useContext, Fragment, lazy, Suspense } from 'react'

const MainPage = lazy(() => import('./MainPage'))
const WelcomePage = lazy(() => import('./WelcomePage'))
const Error404 = lazy(() => import('./Error404'))

import entry from '../../../scss/entry.css'

export default function LandingPage() {
   const { state } = useContext(MainStore)
   const { isAuthenticated } = state

   return (
      <Suspense fallback={<div className={entry.loading_screen}>Assembling heroes....</div>}>
         <Fragment>
            {!isAuthenticated ? <WelcomePage /> : isAuthenticated ? <MainPage /> : <Error404 />}
         </Fragment>
      </Suspense>
   )
}
