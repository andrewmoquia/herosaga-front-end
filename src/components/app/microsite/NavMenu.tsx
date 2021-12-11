import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { navLiElement } from '../../data/navMenuData'
import { INavLiElement } from '../../interfaces/navInterface'

export default function NavMenu(props: any): any {
   const { data } = props
   const [activeDashboard, setActiveDashboard] = useState<INavLiElement>(navLiElement)

   //TO-DO: Simplify this functions and refractor. Make it more readable.

   //Change classname if its active or not. For animation.
   const mapDashboards = (selectedDashboard: string) => {
      //Create a copy of dashboard objects.
      const newObj: any = activeDashboard
      //Map each dashboard and give classname if its active or not.
      Object.keys(newObj).map((key) => {
         //Set selected dashboard to active.
         return selectedDashboard === key
            ? (newObj[`${key}`] = 'active-nav')
            : selectedDashboard === '' //If no selected dashboard set mysteryshop to active.
            ? (newObj[`mysteryshop`] = 'active-nav')
            : (newObj[`${key}`] = 'inactive-nav') //Inactive all dashboard that is not selected.
      })
      //Change the classnames of the dashboards.
      setActiveDashboard((prevObj: INavLiElement) => {
         return { ...prevObj, ...newObj }
      })
   }

   //Identify which page we are.
   useEffect(() => {
      //Get the current site and extract the dashboard the user going.
      const currDashboard = window.location.href.split('/')
      mapDashboards(currDashboard[3])
      //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   //Focus animation and style on selected dashboard.
   const handleChangeDashboard = (dashboard: string) => {
      mapDashboards(dashboard)
   }

   return (
      <>
         {/* Main Menu  */}
         <ul className={`menu main`}>
            {data.generalMenu.map((key: any) => {
               return (
                  <Link
                     to={`/${key.type.route}`}
                     className={activeDashboard[key.type.route]}
                     key={key.type.route}
                  >
                     <li onClick={() => handleChangeDashboard(key.type.route)}>
                        <div className="nav-icon">
                           <img src={key.img} alt={key.alt} />
                        </div>
                        <p className="d-none d-lg-block">{key.type.label}</p>
                     </li>
                  </Link>
               )
            })}
         </ul>
         {/* Profile Menu  */}
         <ul className={`menu main`}>
            {data.profileMenu.map((key: any) => {
               return (
                  <Link
                     to={`/${key.type.route}`}
                     className={activeDashboard[key.type.route]}
                     key={key.type.route}
                  >
                     <li onClick={() => handleChangeDashboard(key.type.route)}>
                        <div className="nav-icon">
                           <img src={key.img} alt={key.alt} />
                        </div>
                        <p className="d-none d-lg-block">{key.type.label}</p>
                     </li>
                  </Link>
               )
            })}
         </ul>
      </>
   )
}
