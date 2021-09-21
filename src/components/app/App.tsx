import '../scss/main.scss'
import Login from './LoginPage'
import Register from './Register'
import LandingPage from './LandingPage'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function App() {
   return (
      <BrowserRouter>
         <main>
            <Switch>
               <Route path="/" exact component={LandingPage}></Route>
               <Route path="/login" exact component={Login}></Route>
               <Route path="/register" exact component={Register}></Route>
               <Route path="/marketplace" exact component={LandingPage}></Route>
               <Route path="/farm" exact component={LandingPage}></Route>
               <Route path="/myNFT" exact component={LandingPage}></Route>
            </Switch>
         </main>
      </BrowserRouter>
   )
}
