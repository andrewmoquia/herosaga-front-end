import '../scss/main.scss'
import Login from './LoginPage'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import ForgotPasswordPage from './ForgotPasswordPage'
import ResetPassword from './ResetPassword'
import { MainStore } from '../reduceStore/StoreProvider'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useCallback, useContext, useEffect } from 'react'

import axios from 'axios'

export default function App() {
   const { state, dispatch } = useContext(MainStore)

   const readCookie = (dispatch: Function) => {
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
   }, [fetchCookie])

   console.log(state)
   return (
      <BrowserRouter>
         <main>
            <Switch>
               <Route path="/" exact component={LandingPage}></Route>
               <Route path="/dashboard" exact component={LandingPage}></Route>
               <Route path="/login" exact component={Login}></Route>
               <Route path="/register" exact component={RegisterPage}></Route>
               <Route path="/marketplace" exact component={LandingPage}></Route>
               <Route path="/farm" exact component={LandingPage}></Route>
               <Route path="/myNFT" exact component={LandingPage}></Route>
               <Route path="/forgot-password" exact component={ForgotPasswordPage}></Route>
               <Route path="/reset-password/:token" exact component={ResetPassword}></Route>
            </Switch>
         </main>
      </BrowserRouter>
   )
}
