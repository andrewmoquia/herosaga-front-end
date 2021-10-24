export function LoginReducer(state: any, action: any) {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            isAuthenticating: false,
         }
      case 'NOT_VERIFIED':
         return {
            ...state,
            isNotVerified: true,
         }
      case 'VERIFIED_USER':
         return {
            ...state,
            isNotVerified: false,
         }
      default:
         return state
   }
}
