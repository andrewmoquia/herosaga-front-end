import axios from 'axios'
import { runDispatch } from './dispatch'
import { config } from '../../api'

const { RESET_PW } = config

export const changePassword = (props: any) => {
   const { password, confirmPassword, token, dispatch, csrfToken } = props
   console.log(password, confirmPassword)
   //Run
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //
   axios
      .post(
         `${RESET_PW}/${token}`,
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
         } else if (res.data.status === 400) {
            return runDispatch(dispatch, 'FORGOT_PW_FAILED', res.data.message)
         } else if (res.data.status === 200) {
            const msg = 'Password successfully. Redirecting to login...'
            runDispatch(dispatch, 'FORGOT_PW_SUCCESS', msg)
            return setTimeout(() => {
               window.open('/welcome', '_self')
            }, 3000)
         } else {
            return runDispatch(
               dispatch,
               'FORGOT_PW_FAILED',
               'Something went wrong. Please try again later.'
            )
         }
      })
      .catch(() => {
         return runDispatch(
            dispatch,
            'FORGOT_PW_FAILED',
            'Something went wrong. Please try again later.'
         )
      })
}
