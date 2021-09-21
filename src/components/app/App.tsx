import '../scss/main.scss'
import Dashboard from './Dashboard'
import Marketplace from './Marketplace'
import Farm from './Farm'
import MyNFT from './MyNFT'
import Nav from './Nav'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function App() {
   return (
      <BrowserRouter>
         <main>
            <Nav />
            <Switch>
               <Route path="/" exact component={Dashboard}></Route>
               <Route path="/marketplace" exact component={Marketplace}></Route>
               <Route path="/farm" exact component={Farm}></Route>
               <Route path="/myNFT" exact component={MyNFT}></Route>
            </Switch>
         </main>
      </BrowserRouter>
   )
}
