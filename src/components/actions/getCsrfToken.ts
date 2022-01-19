import axios from 'axios'

export const getCsrfToken = (dispatch: any) => {
   axios
      .get(`${process.env.GET_TOKEN}`, {
         withCredentials: true,
      })
      .then((response) => {
         return dispatch({ type: 'GET_CSRF_TOKEN', payload: response.data })
      })
      .catch()
}
