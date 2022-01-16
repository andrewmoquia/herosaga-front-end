import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Transactions = lazy(() => import('./dashboards/Transactions'))
const Nav = lazy(() => import('./microsite/Nav'))
const MysteryShop = lazy(() => import('./dashboards/MysteryShop'))
const Marketplace = lazy(() => import('./dashboards/Marketplace'))
const MyNFT = lazy(() => import('./dashboards/MyNFT'))
const ViewNFT = lazy(() => import('./microsite/ViewNFT'))

import entry from '../../../scss/entry.css'
import Logout from './Logout'
import Profile from './Profile'

export default function MainPage() {
   return (
      <BrowserRouter>
         <Nav />
         <Switch>
            <Suspense fallback={<div className={entry.loading_screen_mainPage}>Loading....</div>}>
               <Route path="/" exact component={MysteryShop}></Route>
               <Route path="/mysteryshop" exact component={MysteryShop}></Route>
               <Route path="/transactions" exact component={Transactions}></Route>
               <Route path="/transactions/query" exact component={Transactions}></Route>
               <Route path="/marketplace" exact component={Marketplace}></Route>
               <Route path="/marketplace/query" exact component={Marketplace}></Route>
               <Route path="/myNFT" exact component={MyNFT}></Route>
               <Route path="/myNFT/query" exact component={MyNFT}></Route>
               <Route path="/marketplace/nft/:id" exact component={ViewNFT}></Route>
               <Route path="/myNFT/nft/:id" exact component={ViewNFT}></Route>
               <Route path="/transactions/nft/:id" exact component={ViewNFT}></Route>
               <Route path="/logout" exact component={Logout}></Route>
               <Route path="/profile" exact component={Profile}></Route>
            </Suspense>
         </Switch>
      </BrowserRouter>
   )
}
