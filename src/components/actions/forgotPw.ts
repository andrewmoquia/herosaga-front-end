import axios from 'axios'
import { runDispatch, sixtySecTimer } from './dispatch'

export const sendReqChangePass = (props: any) => {
   const { dispatch, username, token } = props
   //Activate processing to disable buttons.
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Send request to change password.
   axios
      .post(
         'http://localhost:5000/forgot-password',
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
         console.log(res.data)
         if (res.data.status === 200) {
            //Reset token was sent to email disable buttons and input
            runDispatch(dispatch, 'FORGOT_PW_PROCESSING', res.data.message)
            //Start 60s timer to make request again.
            return sixtySecTimer(dispatch)
         }
         //Failed reset password, user fault.
         if (res.data.status === 400 || 500) {
            return runDispatch(dispatch, 'FORGOT_PW_FAILED', res.data.message)
         }
      })
      //Failed reset password, server fault or expired token.
      .catch(() => {
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'FORGOT_PW_FAILED', msg)
      })
}
