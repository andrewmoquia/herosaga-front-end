import axios from 'axios'
import { runDispatch } from './dispatch'

export const changePassword = (props: any) => {
   const { password, confirmPassword, token, dispatch, csrfToken } = props
   console.log(password, confirmPassword)
   //Run
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //
   axios
      .post(
         `http://localhost:5000/reset/password/${token}`,
         {
            password,
            confirmPassword,
         },
         {
            withCredentials: true,
            headers: {
               'CSRF-Token': csrfToken,
            },
         }
      )
      .then((res) => {
         console.log(res.data)
         if (res.data.status === 403) {
            return runDispatch(dispatch, 'FORGOT_PW_FAILED', 'Invalid request. Repeat the process.')
         }
         if (res.data.status === 400) {
            return runDispatch(dispatch, 'FORGOT_PW_FAILED', res.data.message)
         }
         if (res.data.status === 200) {
            const msg = 'Password successfully. Redirecting to login...'
            runDispatch(dispatch, 'FORGOT_PW_SUCCESS', msg)
            return setTimeout(() => {
               window.open('/welcome', '_self')
            }, 3000)
         }
      })
      .catch(() => {
         //
      })
}
