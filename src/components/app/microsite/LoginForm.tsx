import { useContext, Fragment } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { loginUser } from '../../actions/loginUser'

export default function LoginForm() {
   const { state, dispatch } = useContext(MainStore)

   const handleLogin = (e: any) => {
      e.preventDefault()
      const props: any = {
         dispatch,
         token: state.csrfToken,
         username: e.target.loginUsername.value,
         password: e.target.loginPassword.value,
      }
      //Process login
      loginUser(props)
   }

   return (
      <Fragment>
         <form action="/" onSubmit={(e) => handleLogin(e)} className="default-form">
            <input
               type="text"
               name="loginUsername"
               placeholder="Username"
               autoComplete="on"
               required
               id="loginUsername"
               className="default-input"
               disabled={state.isReqProcessing}
            />
            <input
               type="password"
               name="loginPassword"
               placeholder="Password"
               autoComplete="off"
               id="loginPassword"
               required
               className="default-input"
               disabled={state.isReqProcessing}
            />
            <button type="submit" className="button-1" disabled={state.isReqProcessing}>
               <p>Login</p>
            </button>
            <button
               className="button-transparent-1"
               type="button"
               disabled={state.isReqProcessing}
               onClick={() => {
                  window.open('/forgot/password', '_self')
               }}
            >
               Forgot Password
            </button>
         </form>
      </Fragment>
   )
}
