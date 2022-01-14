import axios from 'axios'
import { Fragment, useCallback, useContext, useEffect, lazy, Suspense } from 'react'
import { MainStore } from '../reduceStore/StoreProvider'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getCsrfToken } from '../actions/getCsrfToken'

const LandingPage = lazy(() => import('./LandingPage'))
const ForgotPasswordPage = lazy(() => import('./microsite/ForgotPasswordPage'))
const WelcomePage = lazy(() => import('./WelcomePage'))
const VerifyAcc = lazy(() => import('./microsite/VerifyForm'))
const ResetPwForm = lazy(() => import('./microsite/ResetPwForm'))

import entry from '../../../scss/entry.css'

export default function App() {
   const { dispatch } = useContext(MainStore)

   //TO-DO: Separate this function to another file and refractor.
   const readCookie = (dispatch: Function) => {
      dispatch({
         type: 'AUTH_PROCESSING',
      })
      axios
         .get('http://localhost:5000/check-logged-in-user', {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response.data)
            if (response.data.status === 200) {
               return dispatch({
                  type: 'AUTH_SUCCESS',
                  payload: response.data,
               })
            } else {
               return dispatch({
                  type: 'AUTH_FAILED',
               })
            }
         })
         .catch(() => {
            axios
               .get('http://localhost:5000/logout', {
                  withCredentials: true,
               })
               .then((response) => {
                  console.log(response.data)
               })
               .catch((error) => {
                  console.log(error)
               })
         })
   }

   const fetchCookie = useCallback(() => {
      readCookie(dispatch)
   }, [dispatch])

   useEffect(() => {
      fetchCookie()
      getCsrfToken(dispatch)
   }, [fetchCookie, dispatch])

   return (
      <BrowserRouter>
         <Fragment>
            <Switch>
               <Suspense
                  fallback={<div className={entry.loading_screen}>Spawning monsters...</div>}
               >
                  <Route path="/" exact component={LandingPage}></Route>
                  <Route path="/welcome" exact component={WelcomePage}></Route>
                  <Route path="/transactions" exact component={LandingPage}></Route>
                  <Route path="/transactions/query" exact component={LandingPage}></Route>
                  <Route path="/transactions/nft/:id" exact component={LandingPage}></Route>
                  <Route path="/mysteryshop" exact component={LandingPage}></Route>
                  <Route path="/marketplace" exact component={LandingPage}></Route>
                  <Route path="/marketplace/query" exact component={LandingPage}></Route>
                  <Route path="/myNFT" exact component={LandingPage}></Route>
                  <Route path="/myNFT/query" exact component={LandingPage}></Route>
                  <Route path="/marketplace/nft/:id" exact component={LandingPage}></Route>
                  <Route path="/myNFT/nft/:id" exact component={LandingPage}></Route>
                  <Route path="/forgot/password" exact component={ForgotPasswordPage}></Route>
                  <Route path="/reset/password/" exact component={ResetPwForm}></Route>
                  <Route path="/reset/password/:token" exact component={ResetPwForm}></Route>
                  <Route path="/verify/account" exact component={VerifyAcc}></Route>
                  <Route path="/verify/account/:token" exact component={VerifyAcc}></Route>
               </Suspense>
            </Switch>
         </Fragment>
      </BrowserRouter>
   )
}
