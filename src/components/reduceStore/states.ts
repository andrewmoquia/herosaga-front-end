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

const reqCooldown = {
   isReqCooldown: false,
   reqTimer: 60,
   reqInterval: '',
}

export const state = Object.assign(userState, authState, csrfToken, reqCooldown)
