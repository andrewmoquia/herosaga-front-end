import axios from 'axios'
import { runDispatch, sixtySecTimer } from './dispatch'
import { config } from '../../api'

const { VERIF_EMAIL } = config

export const verifyUser = (dispatch: Function) => {
   //Activate processing to disable buttons.
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Login the user to check if it's not verified.
   axios
      .get(`${VERIF_EMAIL}`, {
         withCredentials: true,
      })
      .then((res) => {
         //Run if verification is processing on the server.
         if (res.data.status === 200) {
            runDispatch(dispatch, 'VERIFICATION_IN_PROCESS', res.data.message)
            //Start 60s timer to make request again.
            return sixtySecTimer(dispatch)
         }
         if (res.data.status === 500) {
            return runDispatch(dispatch, 'VERIFICATION_FAILED', res.data.message)
         }
      })
      //Failed verification, server fault or expired token.
      .catch(() => {
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'VERIFICATION_FAILED', msg)
      })
}

export const checkVerificationToken = (token: any, dispatch: Function) => {
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Send request to verify the token sent to email.
   axios
      .get(`${VERIF_EMAIL}/${token}`, {
         withCredentials: true,
      })
      .then((res) => {
         console.log(res.data)
         //Verification success.
         if (res.data.status === 200) {
            runDispatch(dispatch, 'VERIFICATION_SUCCESS', res.data.message)
            return setTimeout(() => {
               runDispatch(dispatch, 'REQ_PROCESSING_DONE', '')
               window.open('/welcome', '_self')
            }, 3000)
         } else if (res.data.status === 400 || 500) {
            //Expired token or server error.
            return runDispatch(dispatch, 'VERIFICATION_FAILED', res.data.message)
         } else {
            return runDispatch(
               dispatch,
               'VERIFICATION_FAILED',
               'Something went wrong. Please try again later.'
            )
         }
      })
      //Failed verification, server fault or expired token.
      .catch(() => {
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'VERIFICATION_FAILED', msg)
      })
}
