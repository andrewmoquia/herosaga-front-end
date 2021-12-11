import { useContext } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { sendReqChangePass } from '../../actions/forgotPw'

export default function ForgotPasswordPage() {
   const { state, dispatch } = useContext(MainStore)

   const handleForgotPassword = (e: any) => {
      e.preventDefault()
      const props = {
         dispatch,
         username: e.target.resetPwUsername.value,
         token: state.csrfToken,
      }
      //Process changing of password.
      sendReqChangePass(props)
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
                  disabled={state.isReqProcessing}
               />
               <button type="submit" className="button-1" disabled={state.isReqProcessing}>
                  <p>Send Request</p>
               </button>
               <button
                  className="button-transparent-1"
                  type="button"
                  disabled={state.isReqProcessing}
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
