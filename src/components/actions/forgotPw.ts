import axios from 'axios'
import { config } from '../../api'
import { runDispatch, sixtySecTimer } from './dispatch'

const { FORGET_PW } = config

export const sendReqChangePass = (props: any) => {
   const { dispatch, username, token } = props
   //Activate processing to disable buttons.
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Send request to change password.
   axios
      .put(
         `${FORGET_PW}`,
         {
            username,
         },
         {
            withCredentials: true,
            headers: {
               'CSRF-Token': token,
            },
         }
      )
      .then((res) => {
         if (res.data.status === 200) {
            //Reset token was sent to email disable buttons and input
            runDispatch(dispatch, 'FORGOT_PW_PROCESSING', res.data.message)
            //Start 60s timer to make request again.
            return sixtySecTimer(dispatch)
         } else if (res.data.status === 400 || 500) {
            //Failed reset password, user fault.
            return runDispatch(dispatch, 'FORGOT_PW_FAILED', res.data.message)
         } else {
            return runDispatch(
               dispatch,
               'FORGOT_PW_FAILED',
               'Something went wrong. Please try again later.'
            )
         }
      })
      //Failed reset password, server fault or expired token.
      .catch(() => {
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'FORGOT_PW_FAILED', msg)
      })
}
