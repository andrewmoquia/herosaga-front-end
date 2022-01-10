import { runDispatch } from '../../actions/dispatch'
import { CSSTransition } from 'react-transition-group'
import { IAlertProps } from '../../interfaces/interfaces'

export default function AlertNotif(props: IAlertProps) {
   const { state, nodeRef, dispatch } = props

   const handleShowAlert = () => {
      if (state.isAlertNotifOn) {
         return runDispatch(dispatch, 'CLEAR_ALERT_MSG', '')
      }
      //For testing.
      if (!state.isAlertNotifOn) {
         return runDispatch(dispatch, 'WRONG_CREDENTIALS', 'Testing')
      }
   }

   return (
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
   )
}
