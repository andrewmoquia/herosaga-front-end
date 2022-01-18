import axios from 'axios'
import { Fragment, useCallback, useContext, useEffect, lazy, Suspense } from 'react'
import { MainStore } from '../reduceStore/StoreProvider'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getCsrfToken } from '../actions/getCsrfToken'
import { config } from '../../api'

const LandingPage = lazy(() => import('./LandingPage'))
const ForgotPasswordPage = lazy(() => import('./microsite/ForgotPasswordPage'))
const WelcomePage = lazy(() => import('./WelcomePage'))
const VerifyAcc = lazy(() => import('./microsite/VerifyForm'))
const ResetPwForm = lazy(() => import('./microsite/ResetPwForm'))

import entry from '../../../scss/entry.css'

const { AUTH, LOGOUT } = config

export default function App() {
   const { dispatch } = useContext(MainStore)

   //TO-DO: Separate this function to another file and refractor.
   const readCookie = (dispatch: Function) => {
      dispatch({
         type: 'AUTH_PROCESSING',
      })
      axios
         .get(`${AUTH}`, {
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
               dispatch({
                  type: 'AUTH_FAILED',
               })
               return dispatch({
                  type: 'LOGIN_FAILED',
                  payload: 'Something went wrong. Please try again later.',
               })
            }
         })
         .catch(() => {
            dispatch({
               type: 'AUTH_FAILED',
            })
            axios
               .get(`${LOGOUT}`, {
                  withCredentials: true,
               })
               .then((res) => {
                  if (res.status !== 200) {
                     return dispatch({
                        type: 'LOGIN_FAILED',
                        payload: 'Something went wrong. Please try again later.',
                     })
                  }
               })
               .catch(() => {
                  return dispatch({
                     type: 'LOGIN_FAILED',
                     payload: 'Something went wrong. Please try again later.',
                  })
               })
            return dispatch({
               type: 'LOGIN_FAILED',
               payload: 'Something went wrong. Please try again later.',
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
                  <Route path="/logout" exact component={LandingPage}></Route>
                  <Route path="/profile" exact component={LandingPage}></Route>
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
