import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Nav = lazy(() => import('./microsite/Nav'))
const MysteryShop = lazy(() => import('./dashboards/MysteryShop'))
const Marketplace = lazy(() => import('./dashboards/Marketplace'))
const MyNFT = lazy(() => import('./dashboards/MyNFT'))
const ViewNFT = lazy(() => import('./microsite/ViewNFT'))

export default function MainPage() {
   return (
      <BrowserRouter>
         <Nav />
         <Switch>
            <Suspense fallback={<div>Loading...</div>}>
               <Route path="/" exact component={MysteryShop}></Route>
               <Route path="/mysteryshop" exact component={MysteryShop}></Route>
               <Route path="/marketplace" exact component={Marketplace}></Route>
               <Route path="/marketplace/nft/:id" exact component={ViewNFT}></Route>
               <Route path="/myNFT" exact component={MyNFT}></Route>
               <Route path="/myNFT/query" exact component={MyNFT}></Route>
               <Route path="/myNFT/nft/:id" exact component={ViewNFT}></Route>
               <Route path="/view/nft/:id" exact component={ViewNFT}></Route>
            </Suspense>
         </Switch>
      </BrowserRouter>
   )
}
