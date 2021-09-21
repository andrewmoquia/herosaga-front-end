export function AuthReducer(state: any, action: any) {
   switch (action.type) {
      case 'AUTH_SUCCESS':
         return {
            ...state,
            isAuthenticated: true,
            isAuthenticating: false,
         }
      case 'AUTH_PROCESSING':
         return {
            ...state,
            isAuthenticated: false,
            isAuthenticating: true,
         }
      case 'AUTH_FAILED':
         return {
            ...state,
            isAuthenticated: false,
            isAuthenticating: false,
         }
      default:
         return state
   }
}
