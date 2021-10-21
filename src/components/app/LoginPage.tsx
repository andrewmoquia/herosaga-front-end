import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Login() {
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
      console.log('log out trigger')
      axios
         .post(
            'http://localhost:5000/login',
            {
               email: 'totoypogi123@gmail.com',
               password: 'totoypogi123',
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
         })
         .catch((error) => {
            console.log(error)
         })
   }

   const handleProtectedRoute = (e: any) => {
      e.preventDefault()
      axios
         .get('http://localhost:5000/protected', {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response.data)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   const handleLogout = (e: any) => {
      e.preventDefault()
      axios
         .get('http://localhost:5000/logout', {
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
            <button>Login</button>
         </form>
         <button onClick={(e) => handleProtectedRoute(e)}>Enter Protected Route</button>
         <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
   )
}
