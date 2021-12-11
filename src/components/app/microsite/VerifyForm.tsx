import { useState, useCallback, useEffect, useRef, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { MainStore } from '../../reduceStore/StoreProvider'
import { verifyUser, checkVerificationToken } from '../../actions/verifyUser'
import { useParams } from 'react-router'
import { runDispatch } from '../../actions/dispatch'

export default function VerifyAcc() {
   const { state, dispatch } = useContext(MainStore)

   //Not connected to the main store because of over complexity.
   const [timer, setTimer] = useState(60)
   const [isVerifying, setVerifying] = useState(false)

   //Allows us to direct modifying the dom element.
   const intervalRef: any = useRef()
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
            isVerifying,
            setVerifying,
         }
         //Process verifying of user
         verifyUser(props)
      },
      [dispatch, isVerifying, state.csrfToken]
   )

   //TO-DO: Make one central function of this to avoid replication.
   const handleShowAlert = () => {
      if (state.isAlertNotifOn) {
         return runDispatch(dispatch, 'CLEAR_ALERT_MSG', '')
      }
      //For testing.
      if (!state.isAlertNotifOn) {
         return runDispatch(dispatch, 'WRONG_CREDENTIALS', 'Testing')
      }
   }

   //Run timer if verification link was sent to email.
   useEffect(() => {
      //Timer activated.
      if (isVerifying && timer === 60) {
         intervalRef.current = setInterval(() => {
            setTimer((timer) => timer - 1)
         }, 1000)
      }
      //Disable timer and set back to 60 the counter.
      if (timer === 0) {
         setVerifying(!isVerifying)
         setTimer(60)
         runDispatch(dispatch, 'VERIFICATION_TIMEOUT', '')
         return clearInterval(intervalRef.current) //Stop the setInterval
      }
   }, [setVerifying, timer, isVerifying, dispatch])

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
               <CSSTransition
                  in={state.isAlertNotifOn}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                  nodeRef={nodeRef}
               >
                  <div
                     className={`alert-notif ${state.alertType}`}
                     ref={nodeRef}
                     onClick={() => {
                        handleShowAlert()
                     }}
                  >
                     <h1>{state.alertMsg}</h1>
                  </div>
               </CSSTransition>
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
                  disabled={isVerifying || state.isReqProcessing}
               />
               <input
                  type="password"
                  name="unVerifiedPW"
                  placeholder="Password"
                  autoComplete="off"
                  required
                  id="unVerifiedPW"
                  className="default-input"
                  disabled={isVerifying || state.isReqProcessing}
               />
               <button
                  type="submit"
                  className="button-1"
                  disabled={isVerifying || state.isReqProcessing}
               >
                  {!isVerifying ? <p>Verify</p> : <p>Try again in: {timer}</p>}
               </button>
               <button
                  className="button-transparent-1"
                  type="button"
                  disabled={isVerifying || state.isReqProcessing}
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
