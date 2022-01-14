import { MainStore } from '../reduceStore/StoreProvider'
import { useContext, Fragment, lazy, Suspense } from 'react'

const MainPage = lazy(() => import('./MainPage'))
const WelcomePage = lazy(() => import('./WelcomePage'))
const Error404 = lazy(() => import('./Error404'))

import entry from '../../../scss/entry.css'

export default function LandingPage() {
   const { state } = useContext(MainStore)
   const { isAuthenticated, isAuthDone } = state

   return (
      <Suspense fallback={<div className={entry.loading_screen}>Assembling heroes....</div>}>
         <Fragment>
            {!isAuthenticated && isAuthDone ? (
               <WelcomePage />
            ) : isAuthenticated && isAuthDone ? (
               <MainPage />
            ) : isAuthDone ? (
               <Error404 />
            ) : null}
         </Fragment>
      </Suspense>
   )
}
