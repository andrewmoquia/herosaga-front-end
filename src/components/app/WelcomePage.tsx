import { useState, useRef, useContext, useEffect, useCallback } from 'react'
import { MainStore } from '../reduceStore/StoreProvider'
import RegisterForm from './microsite/RegisterForm'
import LoginForm from './microsite/LoginForm'
import AlertNotif from './microsite/AlertNotif'
import { runDispatch } from '../actions/dispatch'
import s from '../../../scss/main.css'
import { CheckCircle, CheckCircleFill } from './misc/svg'

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
      <main className={`${s.wl_container}`}>
         <div className={s.wl_forms_container}>
            <div className={s.welcome_logo_banner}>
               <img
                  src="https://i.ibb.co/N3WSt5R/231asaa3ff433112d.webp"
                  alt="Spell-Book-Preface-14"
                  width={50}
                  height={50}
               />
               INCU MONSTERS
            </div>
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
                     {activeForm === 'login' ? null : <CreatePasswordValidation />}
                     <RegisterForm />
                  </div>
               </div>
               {/*-------------------*/}
            </section>
         </div>
      </main>
   )
}

function CreatePasswordValidation() {
   const { state, dispatch } = useContext(MainStore)

   const {
      isPwLengthValid,
      isPwHasSpecialCharacter,
      isPwHasCapitalLetter,
      isPwHasSmallLetter,
      isPwHasNumber,
      inputPw,
   } = state

   const handlePwValidation = useCallback(
      (e: any) => {
         const pass = e
         const passLength = new RegExp('^[A-Za-z\\d@$!%*?&]{8,32}$')
         const passHasCapitalLetter = new RegExp('^(?=.*[A-Z])')
         const passHasSmallLetter = new RegExp('^(?=.*[a-z])')
         const passHasNumber = new RegExp('^(?=.*\\d)')
         const passSpecialChar = new RegExp('^(?=.*[@$!%*?&])')

         //Check if password has number
         if (passHasNumber.test(pass)) {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasNumber: true,
            })
         } else {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasNumber: false,
            })
         }

         //Check if password has capital letter
         if (passHasCapitalLetter.test(pass)) {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasCapitalLetter: true,
            })
         } else {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasCapitalLetter: false,
            })
         }

         //Check if password has special character
         if (passSpecialChar.test(pass)) {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasSpecialCharacter: true,
            })
         } else {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasSpecialCharacter: false,
            })
         }

         //Check if password has small letter
         if (passHasSmallLetter.test(pass)) {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasSmallLetter: true,
            })
         } else {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwHasSmallLetter: false,
            })
         }

         //Chech password length
         if (passLength.test(pass)) {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwLengthValid: true,
            })
         } else {
            runDispatch(dispatch, 'UPDATE_PW_VALID_STATUS', {
               isPwLengthValid: false,
            })
         }
      },
      [dispatch]
   )

   useEffect(() => {
      if (inputPw || !inputPw) {
         handlePwValidation(inputPw)
      }
   }, [inputPw, handlePwValidation])

   return (
      <div className={s.wl_validator_container}>
         <div className={s.wl_validator}>
            <div className={s.prf_pw_validations}>
               <p>Your password must:</p>
               <CreateValidationElem
                  validation={isPwHasCapitalLetter}
                  label="Includes capital letter."
               />
               <CreateValidationElem
                  validation={isPwHasSmallLetter}
                  label="Includes small letter."
               />
               <CreateValidationElem
                  validation={isPwHasSpecialCharacter}
                  label="Includes special character."
               />
               <CreateValidationElem validation={isPwHasNumber} label="Includes number." />
               <CreateValidationElem
                  validation={isPwLengthValid}
                  label="Minimum of 8 characters and maximum of 32 characters."
               />
            </div>
         </div>
      </div>
   )
}

function CreateValidationElem(props: any) {
   const { validation, label } = props
   return (
      <div className={s.prf_validation}>
         <span>{!validation ? <CheckCircle /> : <CheckCircleFill />}</span>
         <p>{label}</p>
      </div>
   )
}
