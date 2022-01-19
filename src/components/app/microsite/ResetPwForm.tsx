import { useContext, useRef } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { useParams } from 'react-router-dom'
import { changePassword } from '../../actions/changePw'
import AlertNotif from './AlertNotif'
import s from '../../../../scss/main.css'
import { CreatePasswordValidation } from '../WelcomePage'

export default function ResetPwForm() {
   const nodeRef: any = useRef()
   const { state, dispatch } = useContext(MainStore)

   const {
      isPwLengthValid,
      isPwHasSpecialCharacter,
      isPwHasCapitalLetter,
      isPwHasSmallLetter,
      isPwHasNumber,
   } = state

   const { token }: any = useParams()

   const handleResetPassword = (e: any) => {
      e.preventDefault()
      const props: any = {
         dispatch,
         password: e.target.newPass.value,
         confirmPassword: e.target.confirmNewPass.value,
         token,
         csrfToken: state.csrfToken,
      }
      //Run
      changePassword(props)
   }

   const props: any = {
      state,
      nodeRef,
      dispatch,
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
      <main className={`${s.wl_container}`}>
         <div className={s.wl_forms_fp_container}>
            <div className={s.default_menu}>
               <div className={s.def_menu_header}>
                  <p>Reset Password</p>
               </div>
               <div className={s.warn_container}>
                  <AlertNotif {...props} />
               </div>
               <form
                  action="/"
                  className={s.default_form}
                  onSubmit={(e) => {
                     handleResetPassword(e)
                  }}
               >
                  <CreatePasswordValidation />
                  <input
                     type="text"
                     name="newPass"
                     placeholder="New Password"
                     autoComplete="off"
                     required
                     id="newPass"
                     className={s.default_input}
                     disabled={state.isReqProcessing || state.isReqCooldown}
                     onChange={(e) => handlePasswordOnChange(e)}
                  />
                  <input
                     type="text"
                     name="confirmNewPass"
                     placeholder="Confirm password"
                     autoComplete="off"
                     required
                     id="confirmNewPass"
                     className={s.default_input}
                     disabled={state.isReqProcessing || state.isReqCooldown}
                  />
                  {isPwLengthValid &&
                  isPwHasSpecialCharacter &&
                  isPwHasCapitalLetter &&
                  isPwHasSmallLetter &&
                  isPwHasNumber ? (
                     <button
                        type="submit"
                        className={s.button_1}
                        disabled={state.isReqProcessing || state.isReqCooldown}
                     >
                        {!state.isReqCooldown && !state.isReqProcessing ? (
                           <p>Change</p>
                        ) : (
                           <p>Changing...</p>
                        )}
                     </button>
                  ) : (
                     <button type="button" className={s.button_1} disabled={true}>
                        <p>Weak password</p>
                     </button>
                  )}

                  <button
                     className={s.button_transparent_1}
                     type="button"
                     disabled={state.isReqProcessing || state.isReqCooldown}
                     onClick={() => {
                        window.open('/welcome', '_self')
                     }}
                  >
                     Back
                  </button>
               </form>
            </div>
         </div>
      </main>
   )
}
