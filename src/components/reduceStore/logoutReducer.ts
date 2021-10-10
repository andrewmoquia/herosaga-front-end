export function LogoutReducer(state: any, action: any) {
   switch (action.type) {
      case 'LOG0UT_SUCCESS':
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
