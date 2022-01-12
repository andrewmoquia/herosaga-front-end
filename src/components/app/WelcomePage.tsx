import { useState, useRef, useContext } from 'react'
import { MainStore } from '../reduceStore/StoreProvider'

import RegisterForm from './microsite/RegisterForm'
import LoginForm from './microsite/LoginForm'
import AlertNotif from './microsite/AlertNotif'

import s from '../../../scss/main.css'

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
      <main className={`${s.container} ${s.posRel}`}>
         <div className={`${s.container} ${s.posAbs} ${s.oHidden}`}>
            <div className={s.bg_chess}></div>
         </div>
         {/*-------------------*/}
         {/*---LOGO BANNER-----*/}
         <section className={s.welcome_logo_banner}>Incu Monsters</section>
         {/*-------------------*/}
         {/*-------FORMS-------*/}
         <section className={s.default_menu}>
            {/*-------------------*/}
            <div className={s.welcome_forms_button_anim}>
               <div
                  className={activeForm == 'login' ? s.login_button_active : s.reg_button_active}
               ></div>
               <div></div>
            </div>
            {/*-------------------*/}
            <div className={s.login_register_buttons}>
               <div
                  className={s.login_button}
                  onClick={() => {
                     if (!state.isReqProcessing) handleSwitchForms('login')
                  }}
               ></div>
               <div
                  className={s.register_button}
                  onClick={() => {
                     if (!state.isReqProcessing) handleSwitchForms('reg')
                  }}
               ></div>
            </div>
            {/*-------------------*/}
            <div className={s.warn_container}>
               <AlertNotif {...props} />
            </div>
            {/*-------------------*/}
            <div className={s.login_register_forms}>
               <div
                  className={activeForm == 'login' ? s.login_active_form : s.reg_active_form}
               ></div>
               <div className={s.login_form_container}>
                  <LoginForm />
               </div>
               <div className={s.reg_form_container}>
                  <RegisterForm />
               </div>
            </div>
            {/*-------------------*/}
         </section>
      </main>
   )
}
