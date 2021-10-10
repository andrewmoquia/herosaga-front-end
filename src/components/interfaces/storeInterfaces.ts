export interface IInitialState {
   user: object
   isAuthenticated: boolean
   isAuthenticating: boolean
}

export interface IAction {
   type: string
   payload?: any
}
