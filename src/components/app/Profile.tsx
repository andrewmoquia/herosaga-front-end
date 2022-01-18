import s from '../../../scss/main.css'
import { useContext, useState } from 'react'
import axios from 'axios'
import { MainStore } from '../reduceStore/StoreProvider'
import { v4 as uuidv4 } from 'uuid'
import { runDispatch } from '../actions/dispatch'
import { CheckCircle, CheckCircleFill, EyeFill, EyeLash } from './misc/svg'
import { config } from '../../api'

const { CHANGE_PASSWORD } = config

export default function Profile() {
   const { state, dispatch } = useContext(MainStore)
   const { balance, username, email } = state.user

   const pw = {
      isPwLengthValid: false,
      isPwHasSpecialCharacter: false,
      isPwHasCapitalLetter: false,
      isPwHasSmallLetter: false,
      isPwHasNumber: false,
   }
   const [pwValidation, setPwValidation] = useState(pw)

   const {
      isPwLengthValid,
      isPwHasSpecialCharacter,
      isPwHasCapitalLetter,
      isPwHasSmallLetter,
      isPwHasNumber,
   } = pwValidation

   const handlePwValidation = (e: any) => {
      const pass = e.target.value
      const passLength = new RegExp('^[A-Za-z\\d@$!%*?&]{8,32}$')
      const passHasCapitalLetter = new RegExp('^(?=.*[A-Z])')
      const passHasSmallLetter = new RegExp('^(?=.*[a-z])')
      const passHasNumber = new RegExp('^(?=.*\\d)')
      const passSpecialChar = new RegExp('^(?=.*[@$!%*?&])')

      setPwValidation((prevVal) => {
         return { ...prevVal, newPw: pass }
      })

      //Check if password has number
      if (passHasNumber.test(pass)) {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasNumber: true }
         })
      } else {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasNumber: false }
         })
      }

      //Check if password has capital letter
      if (passHasCapitalLetter.test(pass)) {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasCapitalLetter: true }
         })
      } else {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasCapitalLetter: false }
         })
      }

      //Check if password has special character
      if (passSpecialChar.test(pass)) {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasSpecialCharacter: true }
         })
      } else {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasSpecialCharacter: false }
         })
      }

      //Check if password has small letter
      if (passHasSmallLetter.test(pass)) {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasSmallLetter: true }
         })
      } else {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwHasSmallLetter: false }
         })
      }

      //Chech password length
      if (passLength.test(pass)) {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwLengthValid: true }
         })
      } else {
         setPwValidation((prevVal) => {
            return { ...prevVal, isPwLengthValid: false }
         })
      }
   }

   const handleOnSubmit = (e: any) => {
      e.preventDefault()
      const oldPw = e.target.oldPw.value
      const newPw = e.target.newPw.value
      const confirmNewPw = e.target.confirmNewPw.value

      const emptyInputValue = () => {
         e.target.oldPw.value = ''
         e.target.newPw.value = ''
         e.target.confirmNewPw.value = ''
      }

      axios
         .put(
            `${CHANGE_PASSWORD}`,
            {
               password: oldPw,
               newPw,
               confirmNewPw,
            },
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            const { status, message } = res.data
            console.log(res.data)
            if (status === 200) {
               emptyInputValue()
               runDispatch(dispatch, 'SET_NOTIF_STATUS', {
                  notif: {
                     id: uuidv4(),
                     type: 'success',
                     message,
                  },
               })
            } else if (status === 400) {
               runDispatch(dispatch, 'SET_NOTIF_STATUS', {
                  notif: {
                     id: uuidv4(),
                     type: 'error',
                     message,
                  },
               })
            } else {
               runDispatch(dispatch, 'SET_NOTIF_STATUS', {
                  notif: {
                     id: uuidv4(),
                     type: 'error',
                     message: 'Something went wrong. Please try again later',
                  },
               })
            }
         })
         .catch(() => {
            runDispatch(dispatch, 'SET_NOTIF_STATUS', {
               notif: {
                  id: uuidv4(),
                  type: 'error',
                  message: 'Something went wrong. Please try again later',
               },
            })
         })
   }

   return (
      <section className={s.main_bg}>
         <div className={s.prf_container}>
            <div className={s.prf_details}>
               <div className={s.prf_picture}></div>
               <div className={s.prf_username}>{username}</div>
               <div className={s.prf_balance}>
                  <p>Balance:</p>
                  <span>{balance} INCM</span>
               </div>
            </div>
            <div className={s.prf_body}>
               <div className={s.prf_email}>
                  <p>{email}</p>
                  <p>Email</p>
               </div>

               <div className={s.prf_changePass}>
                  <form action="#" className={s.prf_form} onSubmit={(e) => handleOnSubmit(e)}>
                     <div>Change Password</div>
                     <div className={s.prf_pw_validations}>
                        <CreateValidationElem
                           validation={isPwLengthValid}
                           label="Minimum of 8 characters and maximum of 32 characters."
                        />
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
                     </div>
                     <CustomInput name="oldPw" id="oldPw" placeholder="Old Password" />
                     <CustomInput
                        name="newPw"
                        id="newPw"
                        placeholder="New Password"
                        onChange={(e: any) => handlePwValidation(e)}
                     />
                     <CustomInput
                        name="confirmNewPw"
                        id="confirmNewPw"
                        placeholder="Confirm Password"
                     />
                     {isPwLengthValid &&
                     isPwHasSpecialCharacter &&
                     isPwHasCapitalLetter &&
                     isPwHasSmallLetter &&
                     isPwHasNumber ? (
                        <button type="submit">Change</button>
                     ) : (
                        <button type="submit" disabled>
                           Change
                        </button>
                     )}
                  </form>
               </div>
            </div>
         </div>
      </section>
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

function CustomInput(props: any) {
   const { name, id, placeholder, onChange } = props
   const [isViewPw, setViewPw] = useState(false)

   const handleViewPw = () => {
      setViewPw(!isViewPw)
   }

   return (
      <div className={s.prf_input}>
         <span onClick={() => handleViewPw()}>{isViewPw ? <EyeFill /> : <EyeLash />}</span>
         <input
            type={isViewPw ? 'text' : 'password'}
            name={name}
            id={id}
            placeholder={placeholder}
            required
            autoComplete="off"
            onChange={(e) => {
               onChange ? onChange(e) : null
            }}
         />
      </div>
   )
}
