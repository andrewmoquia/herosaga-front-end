import { useState } from 'react'
import { NavMenus } from '../../interfaces/navInterface'
import { navMenuLogoData } from '../../data/navMenuData'
import NavMenu from './NavMenu'

export default function Nav() {
   const navMenus: NavMenus = {
      class: 'menu-change-to-main',
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
            class: 'menu-change-to-profile',
            status: false,
         }
         changeMenuClass(newObj)
      }
      if (activeMenu.status === false) {
         const newObj = {
            class: 'menu-change-to-main',
            status: true,
         }
         changeMenuClass(newObj)
      }
   }

   const props = {
      data: navMenuLogoData,
   }

   return (
      <nav id="main-nav">
         {/* Game Logo  */}
         <div className="logo-icon d-none d-sm-flex">
            <img
               src="https://i.ibb.co/CVHL7MN/Spell-Book-Preface-14.png"
               alt="Spell-Book-Preface-14"
            />
         </div>
         <div className="game-logo d-none d-sm-flex">INCU MONSTERS</div>
         <div id="nav-menu">
            {/* Menus */}
            <NavMenu {...props} />
            {/* Empty menu for animation purposes. */}
            <ul className={activeMenu.class}> </ul>
         </div>
         {/* Profile Icon  */}
         <div id="profile" onClick={() => handleChangeNavMenu()}>
            <img src="https://i.ibb.co/w41drH1/Electromancer16.png" alt="Electromancer16" />
         </div>
      </nav>
   )
}
