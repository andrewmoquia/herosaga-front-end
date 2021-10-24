import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { MainStore } from '../reduceStore/StoreProvider'

export default function Login() {
   const { state, dispatch } = useContext(MainStore)
   const [csrfToken, setCsrfToken] = useState('')

   useEffect(() => {
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
   }, [])

   const handleLogin = (e: any) => {
      e.preventDefault()
      axios
         .post(
            'http://localhost:5000/login',
            {
               username: e.target.username.value,
               password: e.target.password.value,
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
            if (response.data.status === 401) {
               return dispatch({
                  type: 'NOT_VERIFIED',
               })
            }
            if (response.data.status === 200) {
               dispatch({
                  type: 'VERIFIED_USER',
               })
               return (window.location.href = '/')
            }
         })
         .catch((error) => {
            console.log(error)
         })
   }

   const handleVerifyEmail = (e: any) => {
      e.preventDefault()
      axios
         .get('http://localhost:5000/verify/email', {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response.data)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <div>
         <Link to="/">
            <button>Back</button>
         </Link>
         {/* <h1>Login</h1> */}
         <form action="/" onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="username">Username </label>
            <input type="text" name="username" id="username" required />
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" required />
            <button type="submit">Login</button>
         </form>
         {state.isNotVerified ? (
            <button onClick={(e) => handleVerifyEmail(e)}>Verify Email here!</button>
         ) : null}

         <Link to="/forgot-password">
            <button>Forgot Password</button>
         </Link>
      </div>
   )
}
