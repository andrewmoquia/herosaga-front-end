import Nav from './microsite/Nav'
import MysteryShop from './dashboards/MysteryShop'
import Marketplace from './dashboards/Marketplace'
import MyNFT from './dashboards/MyNFT'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function MainPage() {
   return (
      <BrowserRouter>
         <Nav />
         <section>
            <Switch>
               <Route path="/" exact component={MysteryShop}></Route>
               <Route path="/mysteryshop" exact component={MysteryShop}></Route>
               <Route path="/marketplace" exact component={Marketplace}></Route>
               <Route path="/myNFT" exact component={MyNFT}></Route>
            </Switch>
         </section>
      </BrowserRouter>
   )
}
