import { Link } from 'react-router-dom'

export default function Nav() {
   return (
      <nav id="main-nav">
         <div id="pvu-logo"></div>
         <ul>
            <Link to="/">
               <li>
                  <p>Home</p>
                  <span></span>
               </li>
            </Link>
            <Link to="/predictor">
               <li>
                  <span></span>
                  <p>Predictor</p>
               </li>
            </Link>
            <Link to="/dictionary">
               <li>
                  <span></span>
                  <p>Dictionary</p>
               </li>
            </Link>
            <Link to="/credits">
               <li>
                  <span></span>
                  <p>Credits</p>
               </li>
            </Link>
         </ul>
         <div id="login">Donate</div>
      </nav>
   )
}
