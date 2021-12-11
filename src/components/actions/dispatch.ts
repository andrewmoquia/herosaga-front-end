export const runDispatch = (dispatch: Function, type: string, payload: any) => {
   return dispatch({
      type,
      payload,
   })
}

export const sixtySecTimer = (dispatch: any) => {
   //Start 60s timer to make request again.
   const timer = setInterval(() => {
      runDispatch(dispatch, 'RUN_REQ_TIMER', '')
   }, 1000)
   //If timer is zero allow user to send request to change pw again.
   return setTimeout(() => {
      clearInterval(timer)
      return runDispatch(dispatch, 'REQUEST_TIMEOUT', '')
   }, 60000)
}
