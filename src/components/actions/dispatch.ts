export const runDispatch = (dispatch: Function, type: string, payload: any) => {
   return dispatch({
      type,
      payload,
   })
}
