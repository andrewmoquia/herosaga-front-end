import axios from 'axios'
import { runDispatch, sixtySecTimer } from './dispatch'

export const verifyUser = (props: any) => {
   const { dispatch, username, password, token } = props
   //Activate processing to disable buttons.
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Login the user to check if it's not verified.
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
         //Run if the user is not verified.
         if (res.data.status === 401) {
            //Send request to send email verification token.
            axios
               .get('http://localhost:5000/verify/email', {
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
         //Run if the user is verified.
         if (res.data.status === 200) {
            runDispatch(dispatch, 'LOGIN_SUCCESS', res.data.message)
            return (window.location.href = '/')
         }
         //Failed login, user fault.
         if (res.data.status === 400) {
            return runDispatch(dispatch, 'LOGIN_FAILED', res.data.message)
         }
      })
      //Failed login, server fault or expired token.
      .catch(() => {
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'LOGIN_FAILED', msg)
      })
}

export const checkVerificationToken = (token: string, dispatch: Function) => {
   runDispatch(dispatch, 'REQ_PROCESSING', '')
   //Send request to verify the token sent to email.
   axios
      .get(`http://localhost:5000/verify/email/${token}`, {
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
         }
         //Expired token or server error.
         if (res.data.status === 400 || 500) {
            return runDispatch(dispatch, 'VERIFICATION_FAILED', res.data.message)
         }
      })
      //Failed verification, server fault or expired token.
      .catch(() => {
         const msg = 'Please try later or refresh your browser.'
         return runDispatch(dispatch, 'VERIFICATION_FAILED', msg)
      })
}
