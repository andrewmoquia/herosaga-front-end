import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LiElement } from '../interfaces/navInterface'

export default function Nav() {
   const liElement: LiElement = {
      dashboard: '',
      marketplace: '',
      farm: '',
      myNFT: '',
   }

   const [activeLi, setActiveLi] = useState<LiElement>(liElement)

   const mapObj = (route: string) => {
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
      mapObj(window.location.href.slice(22))
      //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const handleActiveNav = (route: string) => {
      mapObj(route)
   }

   return (
      <nav id="main-nav">
         <div id="game-logo"></div>
         <ul>
            <Link to="/" className={activeLi.dashboard}>
               <li onClick={() => handleActiveNav('dashboard')}>
                  <p>Dashboard</p>
               </li>
            </Link>
            <Link to="/marketplace" className={activeLi.marketplace}>
               <li onClick={() => handleActiveNav('marketplace')}>
                  <p>Marketplace</p>
               </li>
            </Link>
            <Link to="/farm" className={activeLi.farm}>
               <li onClick={() => handleActiveNav('farm')}>
                  <p>Farm</p>
               </li>
            </Link>
            <Link to="/myNFT" className={activeLi.myNFT}>
               <li onClick={() => handleActiveNav('myNFT')}>
                  <p>My NFT</p>
               </li>
            </Link>
         </ul>
         <div id="profile"></div>
      </nav>
   )
}
