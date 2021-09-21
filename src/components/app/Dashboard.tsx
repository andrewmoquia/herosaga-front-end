import { MainStore } from '../reduceStore/StoreProvider'
import { useContext } from 'react'

export default function Dashboard() {
   const { dispatch } = useContext(MainStore)

   const handleLogout = () => {
      return dispatch({ type: 'LOG0UT_SUCCESS' })
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
