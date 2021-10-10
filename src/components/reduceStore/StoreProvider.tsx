import { createContext, useReducer } from 'react'
import { AuthReducer } from './authReducer'
import { LogoutReducer } from './logoutReducer'
import { LoginReducer } from './loginReducer'
import * as interfaces from '../interfaces/storeInterfaces'
import * as state from './states'

//Combine all objects.
const initialState: any = Object.assign(state.userState, state.authState)
//Create store.
export const MainStore = createContext<any>(initialState)
//Combine all reducers.
const combineReducers =
   (...reducers: Function[]) =>
   (state: interfaces.IInitialState = initialState, action: interfaces.IAction) => {
      for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action)
      return state
   }
const allReducers = combineReducers(AuthReducer, LogoutReducer, LoginReducer)
//Provide store in all elements.
export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
   const [state, dispatch] = useReducer(allReducers, initialState)
   return <MainStore.Provider value={{ state, dispatch }}>{props.children}</MainStore.Provider>
}
