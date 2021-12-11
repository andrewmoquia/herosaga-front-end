import { useCallback, useEffect, useRef, useContext } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { verifyUser, checkVerificationToken } from '../../actions/verifyUser'
import { useParams } from 'react-router'
import AlertNotif from './AlertNotif'

export default function VerifyAcc() {
   const { state, dispatch } = useContext(MainStore)

   //Allows us to direct modifying the dom element.
   const nodeRef: any = useRef()

   //Check verification token.
   const { token }: any = useParams()

   useEffect(() => {
      if (token) checkVerificationToken(token, dispatch)
   }, [token, dispatch])

   //UseCallBack was used to trigger useEffect on button click.
   const handleVerifyUser = useCallback(
      (e: any) => {
         e.preventDefault()
         const props: any = {
            dispatch,
            username: e.target.unVerifiedUsername.value,
            password: e.target.unVerifiedPW.value,
            token: state.csrfToken,
         }
         //Process verifying of user
         verifyUser(props)
      },
      [dispatch, state.csrfToken]
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
               <p>Verify Account</p>
            </div>
            <div className="warn-container">
               <AlertNotif {...props} />
            </div>
            <form
               action="/"
               className="default-form"
               onSubmit={(e) => {
                  handleVerifyUser(e)
               }}
            >
               <input
                  type="text"
                  name="unVerifiedUsername"
                  placeholder="Username"
                  autoComplete="off"
                  required
                  id="unVerifiedUsername"
                  className="default-input"
                  disabled={state.isReqCooldown || state.isReqProcessing}
               />
               <input
                  type="password"
                  name="unVerifiedPW"
                  placeholder="Password"
                  autoComplete="off"
                  required
                  id="unVerifiedPW"
                  className="default-input"
                  disabled={state.isReqCooldown || state.isReqProcessing}
               />
               <button
                  type="submit"
                  className="button-1"
                  disabled={state.isReqCooldown || state.isReqProcessing}
               >
                  {!state.isReqCooldown && !state.isReqProcessing ? (
                     <p>Verify</p>
                  ) : !state.isReqCooldown && state.isReqProcessing ? (
                     <p>Please wait processing...</p>
                  ) : (
                     <p>Try again in: {state.reqTimer}</p>
                  )}
               </button>
               <button
                  className="button-transparent-1"
                  type="button"
                  disabled={state.isReqCooldown || state.isReqProcessing}
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
