import { useCallback, useContext, useRef } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { sendReqChangePass } from '../../actions/forgotPw'
import AlertNotif from './AlertNotif'
import s from '../../../../scss/main.css'

export default function ForgotPasswordPage() {
   const nodeRef: any = useRef()
   const { state, dispatch } = useContext(MainStore)

   const handleForgotPassword = useCallback(
      (e: any) => {
         e.preventDefault()
         const props = {
            dispatch,
            username: e.target.resetPwUsername.value,
            token: state.csrfToken,
         }
         //Process changing of password.
         sendReqChangePass(props)
      },
      [dispatch, state]
   )

   const props: any = {
      state,
      nodeRef,
      dispatch,
   }

   return (
      <section className={`${s.container} ${s.posRel}`}>
         <div className={`${s.container} ${s.oHidden} ${s.posAbs}`}>
            <div className={s.bg_chess}></div>
         </div>
         <div className={s.default_menu}>
            <div className={s.def_menu_header}>
               <p>Forgot Password</p>
            </div>
            <div className={s.warn_container}>
               <AlertNotif {...props} />
            </div>
            <form
               action="/"
               className={s.default_form}
               onSubmit={(e) => {
                  handleForgotPassword(e)
               }}
            >
               <input
                  type="text"
                  name="resetPwUsername"
                  placeholder="Username"
                  autoComplete="off"
                  required
                  id="resetPwUsername"
                  className={s.default_input}
                  disabled={state.isReqProcessing || state.isReqCooldown}
               />
               <button
                  type="submit"
                  className={s.button_1}
                  disabled={state.isReqProcessing || state.isReqCooldown}
               >
                  {!state.isReqCooldown && !state.isReqProcessing ? (
                     <p>Send Request</p>
                  ) : !state.isReqCooldown && state.isReqProcessing ? (
                     <p>Please wait processing...</p>
                  ) : (
                     <p>Try again in: {state.reqTimer}</p>
                  )}
               </button>
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
      </section>
   )
}
