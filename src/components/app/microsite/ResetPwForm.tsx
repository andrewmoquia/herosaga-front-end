import { useContext, useRef } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { useParams } from 'react-router-dom'
import { changePassword } from '../../actions/changePw'
import AlertNotif from './AlertNotif'

export default function ResetPwForm() {
   const nodeRef: any = useRef()
   const { state, dispatch } = useContext(MainStore)

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

   return (
      <section className="container posRel">
         <div className="container oHidden posAbs">
            <div className="bg-chess"></div>
         </div>
         <div className="default-menu">
            <div className="def-menu-header">
               <p>Reset Password</p>
            </div>
            <div className="warn-container">
               <AlertNotif {...props} />
            </div>
            <form
               action="/"
               className="default-form"
               onSubmit={(e) => {
                  handleResetPassword(e)
               }}
            >
               <input
                  type="text"
                  name="newPass"
                  placeholder="New Password"
                  autoComplete="off"
                  required
                  id="newPass"
                  className="default-input"
                  disabled={state.isReqProcessing || state.isReqCooldown}
               />
               <input
                  type="text"
                  name="confirmNewPass"
                  placeholder="Confirm password"
                  autoComplete="off"
                  required
                  id="confirmNewPass"
                  className="default-input"
                  disabled={state.isReqProcessing || state.isReqCooldown}
               />
               <button
                  type="submit"
                  className="button-1"
                  disabled={state.isReqProcessing || state.isReqCooldown}
               >
                  {!state.isReqCooldown && !state.isReqProcessing ? (
                     <p>Change</p>
                  ) : (
                     <p>Changing...</p>
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
