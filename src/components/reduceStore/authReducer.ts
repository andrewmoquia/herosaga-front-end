export function AuthReducer(state: any, action: any) {
   switch (action.type) {
      case 'AUTH_SUCCESS':
         return {
            ...state,
            isAuthenticated: true,
            isAuthenticating: false,
         }
      case 'AUTH_FAILED':
         return {
            ...state,
            isAuthenticated: true,
            isAuthenticating: false,
         }
      default:
         return state
   }
}
