import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NavLiElement } from '../interfaces/navInterface'

export default function NavMenu(props: any): any {
   const { data } = props

   const navLiElement: NavLiElement = {
      dashboard: '',
      marketplace: '',
      farm: '',
      myNFT: '',
      profile: '',
      transactions: '',
   }
   const [activeLi, setActiveLi] = useState<NavLiElement>(navLiElement)

   // Change Nav Li class when activated.
   const mapLiElements = (route: string) => {
      // console.log('menu changed')
      const newObj: any = activeLi
      Object.keys(newObj).map((key) => {
         return route === key
            ? (newObj[`${key}`] = 'active-nav')
            : route === ''
            ? (newObj[`dashboard`] = 'active-nav')
            : (newObj[`${key}`] = 'inactive-nav')
      })
      setActiveLi((prevObj: NavLiElement) => {
         return { ...prevObj, ...newObj }
      })
   }
   // //Identify which page we are.
   useEffect(() => {
      mapLiElements(window.location.href.slice(22))
      //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const handleActiveNav = (route: string) => {
      mapLiElements(route)
   }

   return (
      <ul className={`menu main`}>
         {data.map((key: any) => {
            return (
               <Link
                  to={`/${key.type.route}`}
                  className={activeLi[key.type.route]}
                  key={key.type.route}
               >
                  <li onClick={() => handleActiveNav(key.type.route)}>
                     <div className="nav-icon">
                        <img src={key.img} alt={key.alt} />
                     </div>
                     <p className="d-none d-lg-block">{key.type.label}</p>
                  </li>
               </Link>
            )
         })}
      </ul>
   )
}
