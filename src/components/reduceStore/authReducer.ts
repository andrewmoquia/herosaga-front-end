export function AuthReducer(state: any, action: any) {
   switch (action.type) {
      case 'AUTH_PROCESSING':
         return {
            ...state,
            isAuthDone: false,
            isAuthenticated: false,
            isAuthenticating: true,
         }
      case 'AUTH_SUCCESS':
         return {
            ...state,
            isAuthDone: true,
            user: action.payload.user,
            mintBoxData: action.payload.mintBoxData,
            navMenuLogoData: action.payload.navMenuLogoData,
            userNFTfilterData: action.payload.userNFTfilterData,
            marketFilterData: action.payload.marketFilterData,
            filterBrightness: action.payload.filterBrightness,
            spriteBg: action.payload.spriteBg,
            heroesData: action.payload.heroesData,
            starStyleOnRoulette: action.payload.starStyleOnRoulette,
            isAuthenticated: true,
            isAuthenticating: false,
         }
      case 'AUTH_FAILED':
         return {
            ...state,
            isAuthDone: true,
            isAuthenticated: false,
            isAuthenticating: false,
         }
      case 'UPDATE_AUTH_STATUS':
         return {
            ...state,
            ...action.payload,
         }
      case 'GET_USER_BALANCE':
         return {
            ...state,
            ...action.payload,
         }
      default:
         return state
   }
}

export function ForgotPwReducer(state: any, action: any) {
   switch (action.type) {
      case 'FORGOT_PW_PROCESSING':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            isReqCooldown: true,
            isReqProcessing: true,
            alertMsg: action.payload,
         }
      case 'FORGOT_PW_FAILED':
         return {
            ...state,
            alertType: 'failed',
            isAlertNotifOn: true,
            isReqProcessing: false,
            alertMsg: action.payload,
         }
      case 'FORGOT_PW_SUCCESS':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            alertMsg: action.payload,
         }
      case 'RUN_REQ_TIMER':
         return {
            ...state,
            reqTimer: state.reqTimer - 1,
         }
      case 'REQUEST_TIMEOUT':
         return {
            ...state,
            isReqProcessing: false,
            isReqCooldown: false,
            reqTimer: 60,
         }
      default:
         return state
   }
}

export function LoginReducer(state: any, action: any) {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            isReqProcessing: false,
            isAlertNotifOn: false,
            user: action.payload,
         }
      case 'LOGIN_FAILED':
         return {
            ...state,
            alertType: 'failed',
            isAlertNotifOn: true,
            isReqProcessing: false,
            alertMsg: action.payload,
         }
      case 'LOGOUT_SUCCESS':
         return {
            ...state,
            user: {},
            isAuthenticated: false,
            isAuthenticating: false,
         }
      default:
         return state
   }
}

export function VerificationReducer(state: any, action: any) {
   switch (action.type) {
      case 'VERIFICATION_FAILED':
         return {
            ...state,
            alertType: 'failed',
            isAlertNotifOn: true,
            isReqProcessing: false,
            alertMsg: action.payload,
         }
      case 'VERIFICATION_SUCCESS':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            isReqProcessing: true,
            alertMsg: action.payload,
         }
      case 'VERIFICATION_IN_PROCESS':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            isReqProcessing: true,
            isReqCooldown: true,
            alertMsg: action.payload,
         }
      case 'VERIFICATION_TIMEOUT':
         return {
            ...state,
            isReqProcessing: false,
            alertMsg: action.payload,
         }
      default:
         return state
   }
}

export function RegisterVerification(state: any, action: any) {
   switch (action.type) {
      case 'REGISTRATION_FAILED':
         return {
            ...state,
            alertType: 'failed',
            isAlertNotifOn: true,
            isReqProcessing: false,
            alertMsg: action.payload,
         }
      case 'REGISTRATION_SUCCESS':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            isReqProcessing: false,
            alertMsg: action.payload,
         }
      default:
         return state
   }
}
