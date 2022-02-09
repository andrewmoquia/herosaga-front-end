import { useState, useContext, useEffect, useCallback } from 'react'
import { NavMenus } from '../../interfaces/navInterface'
import { MainStore } from '../../reduceStore/StoreProvider'
import NavMenu from './NavMenu'
// import { v4 as uuidv4 } from 'uuid'
import { runDispatch } from '../../actions/dispatch'

import s from '../../../../scss/main.css'

export default function Nav() {
   const { state } = useContext(MainStore)
   const [onStartUp, setOnStartUp] = useState(true)
   const { navMenuLogoData } = state
   const navMenus: NavMenus = {
      class: s.menu_change_to_main,
      status: true,
   }

   const currDashboard = window.location.href.split('/')[3]

   //TO-DO: Simplify this functions and refractor. Make it more readable. Add comments.

   const [activeMenu, setActiveMenu] = useState<NavMenus>(navMenus)

   const changeMenuClass = (newObj: NavMenus) => {
      setActiveMenu((prevObj: NavMenus) => {
         return { ...prevObj, ...newObj }
      })
   }

   const handleChangeNavMenu = () => {
      if (activeMenu.status === true) {
         const newObj = {
            class: s.menu_change_to_profile,
            status: false,
         }
         changeMenuClass(newObj)
      }
      if (activeMenu.status === false) {
         const newObj = {
            class: s.menu_change_to_main,
            status: true,
         }
         changeMenuClass(newObj)
      }
   }

   useEffect(() => {
      if (onStartUp) {
         if (currDashboard == 'logout' || currDashboard == 'profile') {
            const newObj = {
               class: s.menu_change_to_profile,
               status: false,
            }
            changeMenuClass(newObj)
         }
         return setOnStartUp(false)
      }
   }, [currDashboard, onStartUp])

   const props = {
      data: navMenuLogoData,
   }

   return (
      <>
         <nav id={s.main_nav}>
            {/* Game Logo  */}
            <div className={`${s.logo_icon} ${s.d_none} ${s.d_sm_flex}`}>
               <img
                  src="https://herosaga.netlify.app/images/misc/231asaa3ff433112d.webp"
                  alt="Spell-Book-Preface-14"
               />
            </div>
            <div className={`${s.game_logo} ${s.d_none} ${s.d_sm_flex}`}>INCU MONSTERS</div>
            <div id={s.nav_menu}>
               {/* Menus */}
               <NavMenu {...props} />
               {/* Empty menu for animation purposes. */}
               <div className={activeMenu.class}> </div>
            </div>
            {/* Profile Icon  */}
            <div id={s.profile} onClick={() => handleChangeNavMenu()}>
               <img
                  src="https://herosaga.netlify.app/images/bg/Electromancer16-1.webp"
                  alt="Electromancer16"
               />
            </div>
         </nav>
         <CustomNotification />
      </>
   )
}

function CustomNotification() {
   const { state, dispatch } = useContext(MainStore)
   const { notif } = state
   const [notifsData, setNotifsData] = useState<any>([])

   // const addNotif = () => {
   //    const newItem = {
   //       id: uuidv4(),
   //       message: 'Test',
   //       type: 'success',
   //    }
   //    runDispatch(dispatch, 'SET_NOTIF_STATUS', {
   //       notif: newItem,
   //    })
   // }

   const handleNotificationAction = useCallback((notif: any) => {
      setNotifsData((items: any) => {
         return [...items, notif]
      })
      setTimeout(() => {
         setNotifsData((items: any) => {
            return items.filter((item: any) => item.id !== notif.id)
         })
      }, 4500)
   }, [])

   const handleRemoveNotif = (notif: any) => {
      setNotifsData((items: any) => {
         return items.filter((item: any) => item.id !== notif.id)
      })
   }

   useEffect(() => {
      if (notif) {
         handleNotificationAction(notif)
         runDispatch(dispatch, 'SET_NOTIF_STATUS', {
            notif: null,
         })
      }
   }, [notif, handleNotificationAction, dispatch])

   return (
      <div className={s.notif_container}>
         {notifsData.map((item: any) => {
            const { id, message, type } = item
            return (
               <CreateNotif
                  key={id}
                  message={message}
                  type={type}
                  onClick={() => handleRemoveNotif(item)}
                  id={id}
               />
            )
         })}
         {/* <button onClick={() => addNotif()}>Add notif</button> */}
      </div>
   )
}

function CreateNotif(props: any) {
   const { message, type, id, onClick } = props
   return (
      <div className={`${s.notif} ${s[type]}`} onClick={() => onClick(id)}>
         {message}
      </div>
   )
}
