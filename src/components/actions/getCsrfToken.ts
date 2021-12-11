import axios from 'axios'

export const getCsrfToken = (dispatch: any) => {
   axios
      .get('http://localhost:5000/getToken', {
         withCredentials: true,
      })
      .then((response) => {
         return dispatch({ type: 'GET_CSRF_TOKEN', payload: response.data })
      })
      .catch((error) => {
         console.log(error)
      })
}
