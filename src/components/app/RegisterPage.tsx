import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
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

   const handleRegister = (e: any) => {
      e.preventDefault()
      console.log(e.target)
      axios
         .post(
            'http://localhost:5000/register',
            {
               username: e.target.username.value,
               email: e.target.email.value,
               password: e.target.password.value,
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
         <Link to="/">
            <button>Back</button>
         </Link>
         <h1>Register</h1>
         <form action="/" onSubmit={(e) => handleRegister(e)}>
            <label htmlFor="username">Username </label>
            <input type="text" name="username" id="username" required />
            <br />
            <label htmlFor="email">Email </label>
            <input type="email" name="email" id="email" required />
            <br />
            <label htmlFor="password">Password </label>
            <input type="text" name="password" id="password" required />
            <br />
            <label htmlFor="confirm-password">Confirm Password </label>
            <input type="password" name="confirmPassword" id="confirmPassword" required />
            <br />
            <button type="submit"> Submit</button>
         </form>
      </div>
   )
}
