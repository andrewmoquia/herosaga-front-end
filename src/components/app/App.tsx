import '../scss/main.scss'
import Nav from './Nav'

import { BrowserRouter, Switch } from 'react-router-dom'

export default function App() {
   return (
      <BrowserRouter>
         <main>
            <Nav />
            <Switch></Switch>
         </main>
      </BrowserRouter>
   )
}
