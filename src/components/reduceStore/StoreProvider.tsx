import { createContext, useReducer } from 'react'
import { AuthReducer } from './authReducer'
import * as interfaces from '../interfaces/storeInterfaces'

const initialState: interfaces.IInitialState = {
   isAuthenticated: true,
   isAuthenticating: false,
}

export const MainStore = createContext<any>(initialState)

const combineReducers =
   (...reducers: Function[]) =>
   (state: interfaces.IInitialState = initialState, action: interfaces.IAction) => {
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
