import { useCallback, useContext, useRef } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { sendReqChangePass } from '../../actions/forgotPw'
import AlertNotif from './AlertNotif'

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
      <section className="container posRel">
         <div className="container oHidden posAbs">
            <div className="bg-chess"></div>
         </div>
         <div className="default-menu">
            <div className="def-menu-header">
               <p>Forgot Password</p>
            </div>
            <div className="warn-container">
               <AlertNotif {...props} />
            </div>
            <form
               action="/"
               className="default-form"
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
                  className="default-input"
                  disabled={state.isReqProcessing || state.isReqCooldown}
               />
               <button
                  type="submit"
                  className="button-1"
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
                  className="button-transparent-1"
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
