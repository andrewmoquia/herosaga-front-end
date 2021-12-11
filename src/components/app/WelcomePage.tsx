import { useState, useRef, useContext } from 'react'
import RegisterForm from './microsite/RegisterForm'
import LoginForm from './microsite/LoginForm'
import { CSSTransition } from 'react-transition-group'
import { MainStore } from '../reduceStore/StoreProvider'

export default function WelcomePage() {
   const { state, dispatch } = useContext(MainStore)
   const nodeRef = useRef(null)
   const [activeForm, setActiveForm] = useState('login')

   //TO-DO: Make one central function of this to avoid replication.
   const handleShowAlert = () => {
      if (state.isAlertNotifOn) {
         return dispatch({
            type: 'CLEAR_ALERT_MSG',
            payload: '',
         })
      }
      if (!state.isAlertNotifOn) {
         return dispatch({
            type: 'REGISTRATION_FAILED',
            payload: 'Invalid username or password.',
         })
      }
   }

   const handleSwitchForms = (form: string) => {
      setActiveForm(form)
      dispatch({
         type: 'CLEAR_ALERT_MSG',
         payload: '',
      })
   }

   return (
      <main className="container posRel">
         <div className="container posAbs oHidden">
            <div className="bg-chess"></div>
         </div>
         {/*-------------------*/}
         {/*---LOGO BANNER-----*/}
         <section className="welcome-logo-banner">Incu Monsters</section>
         {/*-------------------*/}
         {/*-------FORMS-------*/}
         <section className="default-menu">
            {/*-------------------*/}
            <div className="welcome-forms-button-anim">
               <div className={`${activeForm}-button-active`}></div>
               <div></div>
            </div>
            {/*-------------------*/}
            <div className="login-register-buttons">
               <div
                  className="login-button"
                  onClick={() => {
                     if (!state.isReqProcessing) handleSwitchForms('login')
                  }}
               ></div>
               <div
                  className="register-button"
                  onClick={() => {
                     if (!state.isReqProcessing) handleSwitchForms('reg')
                  }}
               ></div>
            </div>
            {/*-------------------*/}
            <div className="warn-container">
               <CSSTransition
                  in={state.isAlertNotifOn}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                  nodeRef={nodeRef}
               >
                  <div
                     className={`alert-notif ${state.alertType}`}
                     ref={nodeRef}
                     onClick={() => {
                        if (!state.isReqProcessing) handleShowAlert()
                     }}
                  >
                     <h1>{state.alertMsg}</h1>
                  </div>
               </CSSTransition>
            </div>
            {/*-------------------*/}
            <div className="login-register-forms">
               <div className={`${activeForm}-active-form`}></div>
               <div className="login-form-container">
                  <LoginForm />
               </div>
               <div className="reg-form-container">
                  <RegisterForm />
               </div>
            </div>
            {/*-------------------*/}
            <button
               onClick={() => {
                  handleShowAlert()
               }}
            >
               Show Alert
            </button>
         </section>
      </main>
   )
}
