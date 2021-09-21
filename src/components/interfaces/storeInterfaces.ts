export interface IInitialState {
   isAuthenticated: boolean
   isAuthenticating: boolean
}

export interface IAction {
   type: string
   payload?: any
}
