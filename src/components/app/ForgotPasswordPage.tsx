import axios from 'axios'
import { useEffect, useState } from 'react'

export default function ForgotPasswordPage() {
   const [csrfToken, setCsrfToken] = useState('')

   const getNewToken = () => {
      axios
         .get('http://localhost:5000', {
            withCredentials: true,
         })
         .then((response) => {
            setCsrfToken(response.data)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   useEffect(() => getNewToken(), [])

   const handleForgotPassword = (e: any) => {
      e.preventDefault()
      axios
         .post(
            'http://localhost:5000/forgot-password',
            {
               username: e.target.username.value,
            },
            {
               withCredentials: true,
               headers: {
                  'CSRF-Token': csrfToken,
               },
            }
         )
         .then((response) => {
            console.log(response.data)
            if (response.data.status === 400) {
               getNewToken()
            }
         })
         .catch((error) => {
            console.log(error)
            getNewToken()
         })
   }
   return (
      <div>
         <h1>Forgot Password</h1>

         <form action="/" onSubmit={(e) => handleForgotPassword(e)}>
            <label htmlFor="username">Username </label>
            <input type="text" name="username" id="username" required />
            <button type="submit">Forgot Password</button>
         </form>
      </div>
   )
}
