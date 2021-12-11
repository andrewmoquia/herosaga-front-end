import '../scss/main.scss'
import axios from 'axios'
import LandingPage from './LandingPage'
import ForgotPasswordPage from './microsite/ForgotPasswordPage'
import WelcomePage from './WelcomePage'
import VerifyAcc from './microsite/VerifyForm'
import { MainStore } from '../reduceStore/StoreProvider'
import { Fragment, useCallback, useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getCsrfToken } from '../actions/getCsrfToken'
import ResetPwForm from './microsite/ResetPwForm'

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
                  payload: response.data.user,
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
               <Route path="/" exact component={LandingPage}></Route>
               <Route path="/welcome" exact component={WelcomePage}></Route>
               {/*TO-DO: Change this dashboard route to mysteryshop*/}
               <Route path="/mysteryshop" exact component={LandingPage}></Route>
               <Route path="/marketplace" exact component={LandingPage}></Route>
               <Route path="/myNFT" exact component={LandingPage}></Route>
               <Route path="/forgot/password" exact component={ForgotPasswordPage}></Route>
               <Route path="/reset/password/" exact component={ResetPwForm}></Route>
               <Route path="/reset/password/:token" exact component={ResetPwForm}></Route>
               <Route path="/verify/account" exact component={VerifyAcc}></Route>
               <Route path="/verify/account/:token" exact component={VerifyAcc}></Route>
            </Switch>
         </Fragment>
      </BrowserRouter>
   )
}
