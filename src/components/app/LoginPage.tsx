import { useContext } from 'react'
import { MainStore } from '../reduceStore/StoreProvider'

export default function Login() {
   const { state } = useContext(MainStore)
   console.log(state)
   return (
      <div>
         {/* <h1>Login</h1> */}
         <button>Login</button>
      </div>
   )
}
