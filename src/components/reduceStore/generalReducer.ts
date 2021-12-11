export function GeneralReducer(state: any, action: any) {
   switch (action.type) {
      case 'CLEAR_ALERT_MSG':
         return {
            ...state,
            isAlertNotifOn: false,
            alertMsg: action.payload,
         }
      case 'GET_CSRF_TOKEN':
         return {
            ...state,
            csrfToken: action.payload,
         }
      case 'REQ_PROCESSING':
         return {
            ...state,
            isReqProcessing: true,
         }
      case 'REQ_PROCESSING_DONE':
         return {
            ...state,
            isReqProcessing: false,
         }
      case 'TEST_ALERT_SUCCESS':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            alertMsg: action.payload,
         }
      case 'TEST_ALERT_FAILED':
         return {
            ...state,
            alertType: 'failed',
            isAlertNotifOn: true,
            alertMsg: action.payload,
         }
      default:
         return state
   }
}
