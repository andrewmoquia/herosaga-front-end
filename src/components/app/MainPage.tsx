import Nav from './Nav'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Marketplace from './Marketplace'
import Farm from './Farm'
import MyNFT from './MyNFT'

export default function MainPage() {
   return (
      <BrowserRouter>
         <Nav />
         <section>
            <Switch>
               <Route path="/" exact component={Dashboard}></Route>
               <Route path="/marketplace" exact component={Marketplace}></Route>
               <Route path="/farm" exact component={Farm}></Route>
               <Route path="/myNFT" exact component={MyNFT}></Route>
            </Switch>
         </section>
      </BrowserRouter>
   )
}
