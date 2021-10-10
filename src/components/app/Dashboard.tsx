import { MainStore } from '../reduceStore/StoreProvider'
import { useContext } from 'react'

export default function Dashboard() {
   const { state, dispatch } = useContext(MainStore)

   const handleLogout = () => {
      console.log('log out trigger', state)
      return dispatch({
         type: 'LOGOUT_SUCCESS',
      })
   }
   return (
      <section className="main-bg">
         <h1>Dashboard</h1>
         <button type="button" onClick={() => handleLogout()}>
            Logout
         </button>
      </section>
   )
}
