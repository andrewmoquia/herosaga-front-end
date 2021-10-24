import { useParams } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function ResetPassword() {
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

   const { token }: any = useParams()
   console.log(token)

   const handleResetPassword = (e: any) => {
      e.preventDefault()
      axios
         .post(
            `http://localhost:5000/forgot-password/${token}`,
            {
               password: e.target.newPassword.value,
               confirmPassword: e.target.confirmPassword.value,
            },
            {
               withCredentials: true,
               headers: {
                  'CSRF-Token': csrfToken,
               },
            }
         )
         .then((response) => {
            console.log(response.data.message)
            if (response.data.status === 200) {
               return (window.location.href = '/login')
            }
            if (response.data.status === 400) {
               return (window.location.href = '/forgot-password')
            }
         })
         .catch((error) => {
            console.log(error)
            return (window.location.href = '/forgot-password')
         })
   }

   return (
      <div>
         <h1>Reset Password</h1>
         <form action="/" onSubmit={(e) => handleResetPassword(e)}>
            <label htmlFor="newPassword">New Password </label>
            <input type="password" name="newPassword" id="newPassword" required />
            <label htmlFor="confirmPassword">Confirmn Password </label>
            <input type="password" name="confirmPassword" id="confirmPassword" required />
            <button type="submit">Reset</button>
         </form>
      </div>
   )
}
