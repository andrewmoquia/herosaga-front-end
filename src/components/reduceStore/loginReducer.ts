export function LoginReducer(state: any, action: any) {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            isAuthenticating: false,
         }
      default:
         return state
   }
}
