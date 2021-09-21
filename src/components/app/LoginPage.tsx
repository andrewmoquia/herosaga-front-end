import { MainStore } from '../reduceStore/StoreProvider'
import { useContext } from 'react'

export default function Login() {
   const { dispatch } = useContext(MainStore)

   const handleLogin = () => {
      return dispatch({ type: 'AUTH_SUCCESS' })
   }

   return (
      <div>
         <h1>Login</h1>
         <form action="/" onSubmit={() => handleLogin()}>
            <input type="text" name="username" id="username" placeholder="Username" required />
            <input type="password" name="password" id="password" placeholder="Password" required />
            <button type="submit">submit</button>
         </form>
      </div>
   )
}
