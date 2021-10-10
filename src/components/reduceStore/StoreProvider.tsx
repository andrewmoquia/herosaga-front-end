import { createContext, useReducer } from 'react'
import { AuthReducer } from './authReducer'
import { LogoutReducer } from './logoutReducer'
import * as interfaces from '../interfaces/storeInterfaces'
import * as state from './states'

const initialState: any = Object.assign(state.userState, state.authState)

export const MainStore = createContext<any>(initialState)

const combineReducers =
   (...reducers: Function[]) =>
   (state: interfaces.IInitialState = initialState, action: interfaces.IAction) => {
      for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action)
      return state
   }

const allReducers = combineReducers(AuthReducer, LogoutReducer)

export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
   const [state, dispatch] = useReducer(allReducers, initialState)
   return <MainStore.Provider value={{ state, dispatch }}>{props.children}</MainStore.Provider>
}
