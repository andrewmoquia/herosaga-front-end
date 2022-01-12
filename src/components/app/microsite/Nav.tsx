import { useState, useContext } from 'react'
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

   const props = {
      data: navMenuLogoData,
   }

   return (
      <nav id={s.main_nav}>
         {/* Game Logo  */}
         <div className={`${s.logo_icon} ${s.d_none} ${s.d_sm_flex}`}>
            <img
               src="https://i.ibb.co/CVHL7MN/Spell-Book-Preface-14.png"
               alt="Spell-Book-Preface-14"
            />
         </div>
         <div className={`${s.game_logo} ${s.d_none} ${s.d_sm_flex}`}>INCU MONSTERS</div>
         <div id={s.nav_menu}>
            {/* Menus */}
            <NavMenu {...props} />
            {/* Empty menu for animation purposes. */}
            <ul className={activeMenu.class}> </ul>
         </div>
         {/* Profile Icon  */}
         <div id={s.profile} onClick={() => handleChangeNavMenu()}>
            <img src="https://i.ibb.co/w41drH1/Electromancer16.png" alt="Electromancer16" />
         </div>
      </nav>
   )
}
