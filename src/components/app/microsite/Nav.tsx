import { useState, useContext, useEffect } from 'react'
import { NavMenus } from '../../interfaces/navInterface'
import { MainStore } from '../../reduceStore/StoreProvider'
import NavMenu from './NavMenu'

import s from '../../../../scss/main.css'

export default function Nav() {
   const { state } = useContext(MainStore)
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
      // console.log(activeMenu.class)
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
      if (currDashboard == 'logout' || currDashboard == 'profile') {
         const newObj = {
            class: s.menu_change_to_profile,
            status: false,
         }
         changeMenuClass(newObj)
      }
   }, [currDashboard])

   const props = {
      data: navMenuLogoData,
   }

   return (
      <nav id={s.main_nav}>
         {/* Game Logo  */}
         <div className={`${s.logo_icon} ${s.d_none} ${s.d_sm_flex}`}>
            <img
               src="https://i.ibb.co/RzZqFb3/Spell-Book-Preface-14.webp"
               alt="Spell-Book-Preface-14"
               width={400}
               height={400}
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
               src="https://i.ibb.co/M1SK1sq/Electromancer16.webp"
               alt="Electromancer16"
               width={200}
               height={200}
            />
         </div>
      </nav>
   )
}
