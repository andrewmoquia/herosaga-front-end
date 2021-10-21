import '../scss/main.scss'
import Login from './LoginPage'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function App() {
   return (
      <BrowserRouter>
         <main>
            <Switch>
               <Route path="/" exact component={LandingPage}></Route>
               <Route path="/dashboard" exact component={LandingPage}></Route>
               <Route path="/login" exact component={Login}></Route>
               <Route path="/register" exact component={RegisterPage}></Route>
               <Route path="/marketplace" exact component={LandingPage}></Route>
               <Route path="/farm" exact component={LandingPage}></Route>
               <Route path="/myNFT" exact component={LandingPage}></Route>
            </Switch>
         </main>
      </BrowserRouter>
   )
}
