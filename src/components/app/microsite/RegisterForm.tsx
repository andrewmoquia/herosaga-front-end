import { useContext } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { registerUser } from '../../actions/registerUser'

export default function RegisterForm() {
   const { state, dispatch } = useContext(MainStore)

   const handleRegister = (e: any) => {
      e.preventDefault()
      const props = {
         dispatch,
         username: e.target.regUsername.value,
         email: e.target.regEmail.value,
         password: e.target.regPassword.value,
         confirmPassword: e.target.regConfirmPassword.value,
         token: state.csrfToken,
      }
      //Process registering the user.
      registerUser(props)
   }

   return (
      <form action="/" onSubmit={(e) => handleRegister(e)} className="default-form">
         <input
            type="text"
            name="regUsername"
            placeholder="Username"
            autoComplete="on"
            required
            id="regUsername"
            className="default-input"
            disabled={state.isReqProcessing}
         />
         <input
            type="email"
            name="regEmail"
            placeholder="Email"
            autoComplete="on"
            required
            id="regEmail"
            className="default-input"
            disabled={state.isReqProcessing}
         />
         <div className="reg-password-container">
            <input
               type="password"
               name="regPassword"
               placeholder="Password"
               autoComplete="off"
               id="regPassword"
               required
               className="default-input"
               disabled={state.isReqProcessing}
            />
            <input
               type="password"
               name="regConfirmPassword"
               placeholder="Confirm Password"
               autoComplete="off"
               id="regConfirmPassword"
               required
               className="default-input"
               disabled={state.isReqProcessing}
            />
         </div>

         <button type="submit" className="button-1 reg-button" disabled={state.isReqProcessing}>
            <p>Register</p>
         </button>
      </form>
   )
}
