import { MainStore } from '../reduceStore/StoreProvider'
import { useContext, Fragment } from 'react'
import MainPage from './MainPage'
import WelcomePage from './WelcomePage'
import Error404 from './Error404'

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
            <MainPage />
         ) : !isAuthenticating && !isAuthenticated ? (
            <WelcomePage />
         ) : (
            <Error404 />
         )}
      </Fragment>
   )
}
