import { useState, useRef, useContext } from 'react'
import RegisterForm from './microsite/RegisterForm'
import LoginForm from './microsite/LoginForm'
import { MainStore } from '../reduceStore/StoreProvider'
import AlertNotif from './microsite/AlertNotif'

export default function WelcomePage() {
   const { state, dispatch } = useContext(MainStore)
   const nodeRef: any = useRef()
   const [activeForm, setActiveForm] = useState('login')

   const handleSwitchForms = (form: string) => {
      setActiveForm(form)
      dispatch({
         type: 'CLEAR_ALERT_MSG',
         payload: '',
      })
   }

   const props: any = {
      dispatch,
      nodeRef,
      state,
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
               <AlertNotif {...props} />
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
         </section>
      </main>
   )
}
