import { MainStore } from '../reduceStore/StoreProvider'
import { useContext, Fragment } from 'react'
import MainPage from './MainPage'
import Login from './LoginPage'
import Error404 from './Error404'

export default function LandingPage() {
   const { state } = useContext(MainStore)

   const { isAuthenticated, isAuthenticating } = state
   return (
      <Fragment>
         {isAuthenticating && !isAuthenticated ? (
            <div>
               <h1>Loading...</h1>
            </div>
         ) : !isAuthenticating && isAuthenticated ? (
            <MainPage />
         ) : !isAuthenticating && !isAuthenticated ? (
            <Login />
         ) : (
            <Error404 />
         )}
      </Fragment>
   )
}
