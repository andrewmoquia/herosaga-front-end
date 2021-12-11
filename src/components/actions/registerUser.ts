import axios from 'axios'
import { runDispatch } from './dispatch'

export const registerUser = (props: any) => {
   const { dispatch, username, email, password, confirmPassword, token } = props
   //Activate processing to disable buttons.
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Register the user.
   axios
      .post(
         'http://localhost:5000/register',
         {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
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
         //Success registration
         if (res.data.status === 200) {
            return runDispatch(dispatch, 'REGISTRATION_SUCCESS', res.data.message)
         }
         //Failed registration, user fault.
         if (res.data.status === 400) {
            return runDispatch(dispatch, 'REGISTRATION_FAILED', res.data.message)
         }
      })
      .catch(() => {
         //Failed registration, server fault or expired token.
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'REGISTRATION_FAILED', msg)
      })
}
