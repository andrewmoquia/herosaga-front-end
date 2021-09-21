import '../scss/main.scss'
import Nav from './Nav'
import Dashboard from './Dashboard'
import Marketplace from './Marketplace'
import Farm from './Farm'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function App() {
   return (
      <BrowserRouter>
         <main>
            <Nav />
            <Switch>
               <Route path="/" exact component={Dashboard}></Route>
               <Route path="/" exact component={Marketplace}></Route>
               <Route path="/" exact component={Farm}></Route>
            </Switch>
         </main>
      </BrowserRouter>
   )
}
