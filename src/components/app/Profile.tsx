import s from '../../../scss/main.css'
import { useState } from 'react'
import axios from 'axios'

export default function Profile() {
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
            'http://localhost:5000/change/password',
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
            const { status } = res.data
            console.log(res.data)
            if (status === 200) {
               emptyInputValue()
            }
            if (status === 400) {
            }
         })
         .catch(() => {
            console.log('err')
         })
   }

   return (
      <section className={s.main_bg}>
         <div className={s.prf_container}>
            <div className={s.prf_details}>
               <div className={s.prf_picture}></div>
               <div className={s.prf_username}>Sample</div>
               <div className={s.prf_balance}>
                  <p>Balance:</p>
                  <span>132 INCM</span>
               </div>
            </div>
            <div className={s.prf_body}>
               <div className={s.prf_email}>
                  <p>samples_sample@sample.com</p>
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

function EyeFill() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         fill="currentColor"
         className="bi bi-eye-fill"
         viewBox="0 0 16 16"
      >
         <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
         <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
   )
}

function EyeLash() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         fill="currentColor"
         className="bi bi-eye-slash"
         viewBox="0 0 16 16"
      >
         <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
         <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
         <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
      </svg>
   )
}

function CheckCircle() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         fill="currentColor"
         className="bi bi-x-circle"
         viewBox="0 0 16 16"
         color="red"
      >
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
   )
}

function CheckCircleFill() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         fill="currentColor"
         className="bi bi-check-circle-fill"
         viewBox="0 0 16 16"
         color="green"
      >
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
   )
}
