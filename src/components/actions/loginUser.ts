import axios from 'axios'
import { runDispatch } from './dispatch'

export const loginUser = (props: any) => {
   const { dispatch, username, password, token } = props
   //Activate processing to disable buttons
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Login user
   axios
      .post(
         'http://localhost:5000/login',
         {
            username: username,
            password: password,
         },
         {
            withCredentials: true,
            headers: {
               'CSRF-Token': token,
            },
         }
      )
      .then((res) => {
         console.log(res.data)
         //Run if the user is not yet verified.
         if (res.data.status === 401) {
            return (window.location.href = '/verify/account')
         }
         //Login the verified user to the dashboard.
         if (res.data.status === 200) {
            runDispatch(dispatch, 'LOGIN_SUCCESS', res.data.message)
            return (window.location.href = '/')
         }
         //Wrong username or passsword.
         if (res.data.status === 400) {
            return runDispatch(dispatch, 'LOGIN_FAILED', res.data.message)
         }
      })
      .catch(() => {
         //Server error or expired csrf token.
         const msg = 'Please try again later or refresh your browser.'
         return runDispatch(dispatch, 'LOGIN_FAILED', msg)
      })
}
