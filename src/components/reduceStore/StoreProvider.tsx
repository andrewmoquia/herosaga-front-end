import { createContext, useReducer } from 'react'
import { AuthReducer } from './authReducer'

const initialState = {
   isAuthenticated: false,
   isAuthenticating: true,
}

export const MainStore = createContext<any>(initialState)

const combineReducers =
   (...reducers: Function[]) =>
   (state: any = initialState, action: any) => {
      for (let i = 0; i < reducers.length; i++) {
         state = reducers[i](state, action)
         return state
      }
   }

const allReducers = combineReducers(AuthReducer)

export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
   const [state, dispatch] = useReducer(allReducers, initialState)
   return <MainStore.Provider value={{ state, dispatch }}>{props.children}</MainStore.Provider>
}
