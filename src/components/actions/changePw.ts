import axios from 'axios'
import { runDispatch } from './dispatch'
import { config } from '../../api'

const { RESET_PW } = config

export const changePassword = (props: any) => {
   const { password, confirmPassword, token, dispatch } = props
   //Run
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //
   axios
      .put(
         `${RESET_PW}/${token}`,
         {
            password,
            confirmPassword,
         },
         {
            withCredentials: true,
         }
      )
      .then((res) => {
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
