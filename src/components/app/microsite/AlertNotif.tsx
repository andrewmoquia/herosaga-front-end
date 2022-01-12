import { runDispatch } from '../../actions/dispatch'
import { IAlertProps } from '../../interfaces/interfaces'
import s from '../../../../scss/main.css'

export default function AlertNotif(props: IAlertProps) {
   const { state, nodeRef, dispatch } = props
   const { alertType, alertMsg, isAlertNotifOn } = state

   const handleRemoveAlert = () => {
      if (isAlertNotifOn) {
         return runDispatch(dispatch, 'CLEAR_ALERT_MSG', '')
      }
      //For testing.
      if (!isAlertNotifOn) {
         return runDispatch(dispatch, 'WRONG_CREDENTIALS', 'Testing')
      }
   }

   return (
      <>
         {isAlertNotifOn && (
            <div
               className={`${s.alert_notif} ${s[alertType]}`}
               ref={nodeRef}
               onClick={() => {
                  handleRemoveAlert()
               }}
            >
               <h1>{alertMsg}</h1>
            </div>
         )}
      </>
   )
}
