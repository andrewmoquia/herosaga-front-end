import { useContext } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { registerUser } from '../../actions/registerUser'

import s from '../../../../scss/main.css'

export default function RegisterForm() {
   const { state, dispatch } = useContext(MainStore)

   const {
      isPwLengthValid,
      isPwHasSpecialCharacter,
      isPwHasCapitalLetter,
      isPwHasSmallLetter,
      isPwHasNumber,
   } = state

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

   const handlePasswordOnChange = (e: any) => {
      dispatch({
         type: 'SET_INPUT_PW',
         payload: {
            inputPw: e.target.value,
         },
      })
   }

   return (
      <form action="/" onSubmit={(e) => handleRegister(e)} className={s.default_form}>
         <input
            type="text"
            name="regUsername"
            placeholder="Username"
            autoComplete="on"
            required
            id="regUsername"
            className={s.default_input}
            disabled={state.isReqProcessing}
         />
         <input
            type="email"
            name="regEmail"
            placeholder="Email"
            autoComplete="on"
            required
            id="regEmail"
            className={s.default_input}
            disabled={state.isReqProcessing}
         />
         <div className={s.reg_password_container}>
            <input
               type="password"
               name="regPassword"
               placeholder="Password"
               autoComplete="off"
               id="regPassword"
               required
               className={s.default_input}
               disabled={state.isReqProcessing}
               onChange={(e) => handlePasswordOnChange(e)}
            />
            <input
               type="password"
               name="regConfirmPassword"
               placeholder="Confirm Password"
               autoComplete="off"
               id="regConfirmPassword"
               required
               className={s.default_input}
               disabled={state.isReqProcessing}
            />
         </div>
         <div className={s.wl_submit_button}>
            {isPwLengthValid &&
            isPwHasSpecialCharacter &&
            isPwHasCapitalLetter &&
            isPwHasSmallLetter &&
            isPwHasNumber ? (
               <button
                  type="submit"
                  className={`${s.button_1} ${s.reg_button}`}
                  disabled={state.isReqProcessing}
               >
                  Register
               </button>
            ) : (
               <button type="button" className={`${s.button_1} ${s.reg_button}`} disabled={true}>
                  <p>Weak Password</p>
               </button>
            )}
         </div>
      </form>
   )
}
