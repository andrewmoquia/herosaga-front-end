import axios from 'axios'
import { runDispatch } from './dispatch'

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
         if (res.data.status === 200) {
            console.log(res.data)
         }
         if (res.data.status === 400 || 500) {
            return dispatch({
               type: 'PROCESING_DONE',
               payload: res.data.message,
            })
         }
      })
      .catch((error) => {
         return dispatch({
            type: 'PROCESING_DONE',
            payload: error,
         })
      })
}
