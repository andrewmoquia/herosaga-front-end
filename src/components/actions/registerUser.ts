import axios from 'axios'
import { runDispatch } from './dispatch'

export const registerUser = (props: any) => {
   const { dispatch, username, email, password, confirmPassword } = props
   //Activate processing to disable buttons.
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Register the user.
   axios
      .post(
         `${process.env.REG_USER}`,
         {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
         },
         {
            withCredentials: true,
         }
      )
      .then((res) => {
         //Success registration
         if (res.data.status === 200) {
            return runDispatch(dispatch, 'REGISTRATION_SUCCESS', res.data.message)
         } else if (res.data.status === 400) {
            //Failed registration, user fault.
            return runDispatch(dispatch, 'REGISTRATION_FAILED', res.data.message)
         } else {
            const msg = 'Please try later or refresh your browser.'
            return runDispatch(dispatch, 'REGISTRATION_FAILED', msg)
         }
      })
      .catch(() => {
         //Failed registration, server fault or expired token.
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'REGISTRATION_FAILED', msg)
      })
}
