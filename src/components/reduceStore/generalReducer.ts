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
      case 'PROCESING_DONE':
         return {
            ...state,
            respondMsg: action.payload,
            isProcessing: false,
         }
      default:
         return state
   }
}
