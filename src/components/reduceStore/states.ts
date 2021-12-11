const userState = {}

const authState = {
   isAuthenticated: false,
   isAuthenticating: false,
   isReqProcessing: false,
   isAlertNotifOn: false,
   alertType: '',
   alertMsg: '',
}

const csrfToken = {
   csrfToken: '',
}

export const state = Object.assign(userState, authState, csrfToken)
