import axios from 'axios'
import { runDispatch } from './dispatch'
import { config } from '../../api'

const { LOGIN_USER } = config

export const loginUser = (props: any) => {
   const { dispatch, username, password } = props

   //Activate processing to disable buttons
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Login user
   axios
      .put(
         `${LOGIN_USER}`,
         {
            username: username,
            password: password,
         },
         {
            withCredentials: true,
         }
      )
      .then((res) => {
         //Run if the user is not yet verified.
         if (res.data.status === 401) {
            return (window.location.href = `/verify/account?first-step=${res.data.jwt}`)
         } else if (res.data.status === 200) {
            //Login the verified user to the dashboard.
            runDispatch(dispatch, 'LOGIN_SUCCESS', res.data.message)
            return (window.location.href = '/')
         } else if (res.data.status === 400) {
            //Wrong username or passsword.
            return runDispatch(dispatch, 'LOGIN_FAILED', res.data.message)
         } else {
            return runDispatch(
               dispatch,
               'LOGIN_FAILED',
               'Something went wrong. Please try again later.'
            )
         }
      })
      .catch(() => {
         //Server error or expired csrf token.
         const msg = 'Please try again later or refresh your browser.'
         return runDispatch(dispatch, 'LOGIN_FAILED', msg)
      })
}
