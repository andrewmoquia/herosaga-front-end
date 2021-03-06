import { useContext } from 'react'
import s from '../../../scss/main.css'
import axios from 'axios'
import { runDispatch } from '../actions/dispatch'
import { MainStore } from '../reduceStore/StoreProvider'
import { v4 as uuidv4 } from 'uuid'

export default function Logout() {
   const { state, dispatch } = useContext(MainStore)
   const { isAuthenticating, notifs } = state

   const handleLogout = () => {
      runDispatch(dispatch, 'UPDATE_AUTH_STATUS', {
         isAuthenticating: true,
      })

      axios
         .get(`${process.env.LOGOUT}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status } = res
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_AUTH_STATUS', {
                  isAuthenticated: false,
               })
               return (window.location.href = '/')
            } else {
               runDispatch(dispatch, 'UPDATE_AUTH_STATUS', {
                  notifs: [
                     ...notifs,
                     { id: uuidv4(), msg: 'Something went wrong. Please try again later' },
                  ],
               })
            }
         })
         .catch(() => {
            runDispatch(dispatch, 'SET_NOTIF_STATUS', {
               notif: {
                  id: uuidv4(),
                  type: 'error',
                  message: 'Something went wrong. Please try again later',
               },
            })
         })

      return runDispatch(dispatch, 'UPDATE_AUTH_STATUS', {
         isAuthenticating: false,
      })
   }

   return (
      <section className={s.main_bg}>
         <div className={s.lg_container}>
            <div className={s.lg_form}>
               <div className={s.lg_header}>Are you sure you want to logout?</div>
               <div className={s.lg_body}>
                  <div className={s.lg_button} onClick={() => !isAuthenticating && handleLogout()}>
                     Yes
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
