import { MainStore } from '../../reduceStore/StoreProvider'
import { useContext } from 'react'
import axios from 'axios'

export default function MysteryShop() {
   const { dispatch } = useContext(MainStore)

   const handleLogout = (e: any) => {
      e.preventDefault()
      axios
         .get('http://localhost:5000/logout', {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response.data)
            if (response.data.status === 200) {
               return dispatch({
                  type: 'LOGOUT_SUCCESS',
               })
            }
         })
         .catch((error) => {
            console.log(error)
         })
   }
   return (
      <section className="main-bg">
         <h1>Dashboard</h1>
         <button type="button" onClick={(e) => handleLogout(e)}>
            Logout
         </button>
      </section>
   )
}
