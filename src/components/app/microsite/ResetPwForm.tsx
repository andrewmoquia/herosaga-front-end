import React from 'react'

export default function ResetPwForm() {
   return (
      <div>
         <h1>Reset Password</h1>
         <form action="/">
            <label htmlFor="newPassword">New Password </label>
            <input type="password" name="newPassword" id="newPassword" required />
            <label htmlFor="confirmPassword">Confirmn Password </label>
            <input type="password" name="confirmPassword" id="confirmPassword" required />
            <button type="submit">Reset</button>
         </form>
      </div>
   )
}
