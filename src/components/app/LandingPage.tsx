import { MainStore } from '../reduceStore/StoreProvider'
import { useContext, Fragment, lazy, Suspense } from 'react'
const MainPage = lazy(() => import('./MainPage'))
const WelcomePage = lazy(() => import('./WelcomePage'))
const Error404 = lazy(() => import('./Error404'))

export default function LandingPage() {
   const { state } = useContext(MainStore)

   const { isAuthenticated, isAuthenticating } = state

   return (
      <Fragment>
         {isAuthenticating && !isAuthenticated ? (
            <div className="loading-screen">
               <h1>Loading...</h1>
            </div>
         ) : !isAuthenticating && isAuthenticated ? (
            <Suspense fallback={<div>Loading....</div>}>
               <MainPage />
            </Suspense>
         ) : !isAuthenticating && !isAuthenticated ? (
            <Suspense fallback={<div>Loading....</div>}>
               <WelcomePage />
            </Suspense>
         ) : (
            <Suspense fallback={<div>Loading....</div>}>
               <Error404 />
            </Suspense>
         )}
      </Fragment>
   )
}
