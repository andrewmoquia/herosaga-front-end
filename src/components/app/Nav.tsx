import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LiElement } from '../interfaces/navInterface'

export default function Nav() {
   const liElement: LiElement = {
      dashboard: '',
      marketplace: '',
      farm: '',
      myNFT: '',
      profile: '',
      transactions: '',
   }

   const changeMenu: any = {
      class: 'menu-change-to-main',
      status: true,
   }

   const [activeLi, setActiveLi] = useState<LiElement>(liElement)
   const [activeMenu, setActiveMenu] = useState<any>(changeMenu)

   const mapLiObj = (route: string) => {
      // console.log('menu changed')
      const tempObj: any = activeLi
      Object.keys(tempObj).map((key) => {
         return route === key
            ? (tempObj[`${key}`] = 'active-nav')
            : route === ''
            ? (tempObj[`dashboard`] = 'active-nav')
            : (tempObj[`${key}`] = 'inactive-nav')
      })
      setActiveLi((prevObj: LiElement) => {
         return { ...prevObj, ...tempObj }
      })
   }

   useEffect(() => {
      mapLiObj(window.location.href.slice(22))
      //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const handleActiveNav = (route: string) => {
      mapLiObj(route)
   }

   const handleChangeNavMenu = () => {
      if (activeMenu.status === true) {
         const newObj = {
            class: 'menu-change-to-profile',
            status: false,
         }
         setActiveMenu((prevObj: any) => {
            return { ...prevObj, ...newObj }
         })
         // console.log(activeMenu.class)
      }
      if (activeMenu.status === false) {
         const newObj = {
            class: 'menu-change-to-main',
            status: true,
         }
         setActiveMenu((prevObj: any) => {
            return { ...prevObj, ...newObj }
         })
         // console.log(activeMenu.class)
      }
   }

   return (
      <nav id="main-nav">
         <div className="logo-icon d-none d-sm-flex">
            <img
               src="https://i.ibb.co/CVHL7MN/Spell-Book-Preface-14.png"
               alt="Spell-Book-Preface-14"
            />
         </div>
         <div className="game-logo d-none d-sm-flex">INCU MONSTERS</div>
         <div id="nav-menu">
            {/* Profile Menu  */}
            <ul className={`menu main`}>
               <Link to="/" className={activeLi.dashboard}>
                  <li onClick={() => handleActiveNav('dashboard')}>
                     <div className="nav-icon">
                        <img
                           src="https://i.ibb.co/8c0hdC6/UI-Graphic-Resource-Gems.png"
                           alt="UI-Graphic-Resource-Gems"
                        />
                     </div>
                     <p className="d-none d-lg-block">Dashboard</p>
                  </li>
               </Link>
               <Link to="/marketplace" className={activeLi.marketplace}>
                  <li onClick={() => handleActiveNav('marketplace')}>
                     <div className="nav-icon">
                        <img
                           src="https://i.ibb.co/zNmxRH1/UI-Graphic-Resource-Coins.png"
                           alt="UI-Graphic-Resource-Coins"
                        />
                     </div>
                     <p className="d-none d-lg-block">Marketplace</p>
                  </li>
               </Link>
               <Link to="/farm" className={activeLi.farm}>
                  <li onClick={() => handleActiveNav('farm')}>
                     <div className="nav-icon">
                        <img
                           src="https://i.ibb.co/fDB1Tsf/UI-Graphic-Resource-Wood.png"
                           alt="UI-Graphic-Resource-Wood"
                        />
                     </div>
                     <p className="d-none d-lg-block">Farm</p>
                  </li>
               </Link>
               <Link to="/myNFT" className={activeLi.myNFT}>
                  <li onClick={() => handleActiveNav('myNFT')}>
                     <div className="nav-icon">
                        <img
                           src="https://i.ibb.co/JydCdMs/UI-Graphic-Resource-Iron.png"
                           alt="UI-Graphic-Resource-Iron"
                        />
                     </div>
                     <p className="d-none d-lg-block">My NFT</p>
                  </li>
               </Link>
            </ul>
            {/* Main Menu  */}

            <ul className={`menu main`}>
               <Link to="/" className={activeLi.profile}>
                  <li onClick={() => handleActiveNav('profile')}>
                     <div className="nav-icon">
                        <div className="nav-icon">
                           <img src="https://i.ibb.co/thCCPfj/Menu.png" alt="Menu" />
                        </div>
                     </div>
                     <p className="d-none d-lg-block">Profile</p>
                  </li>
               </Link>
               <Link to="/marketplace" className={activeLi.transactions}>
                  <li onClick={() => handleActiveNav('transactions')}>
                     <div className="nav-icon">
                        <img src="https://i.ibb.co/2y06sSm/Reload.png" alt="Reload" />
                     </div>
                     <p className="d-none d-lg-block">Transactions</p>
                  </li>
               </Link>
               <Link to="/farm">
                  <li>
                     <div className="nav-icon">
                        <img src="https://i.ibb.co/mGY9ncP/Pause.png" alt="Pause" />
                     </div>
                     <p className="d-none d-lg-block">Logout</p>
                  </li>
               </Link>
            </ul>
            <ul className={activeMenu.class}> </ul>
         </div>

         <div id="profile" onClick={() => handleChangeNavMenu()}>
            <img src="https://i.ibb.co/w41drH1/Electromancer16.png" alt="Electromancer16" />
         </div>
      </nav>
   )
}
