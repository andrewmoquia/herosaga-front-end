import { useEffect, useRef, useContext, useMemo } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { verifyUser, checkVerificationToken } from '../../actions/verifyUser'
import AlertNotif from './AlertNotif'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { IAlertProps } from '../../interfaces/interfaces'

export default function VerifyAcc() {
   const { state, dispatch } = useContext(MainStore)

   //Returns the location object that represents the current URL.
   const { search } = useLocation()

   const useQuary = () => {
      //Use memo = Only recompute the memoized value when one of the dependencies has changed
      //URLSearchParams = Utility methods to work with the query string of a URL.
      return useMemo(() => new URLSearchParams(search), [])
   }

   const quary = useQuary()

   //Allows us to direct modifying the dom element.
   const nodeRef: any = useRef()

   useEffect(() => {
      if (quary.get('first-step')) {
         const jwtToken = quary.get('first-step') //Get the query of first-step
         Cookies.set('jwt', `${jwtToken}`, { path: '' }) //Create cookie
      }
      if (quary.get('second-step')) {
         const token = quary.get('second-step') //Get the query of second-step
         Cookies.remove('jwt', { path: '' }) //Remove the cookie
         checkVerificationToken(token, dispatch) //Final verification process
      }
   }, [dispatch, quary])

   const handleVerifyUser = (e: any) => {
      e.preventDefault()
      verifyUser(dispatch) //Process verifying of user
   }

   const alertProps: IAlertProps = {
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
               <AlertNotif {...alertProps} />
            </div>
            <form
               action="/"
               className="default-form"
               onSubmit={(e) => {
                  handleVerifyUser(e)
               }}
            >
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
