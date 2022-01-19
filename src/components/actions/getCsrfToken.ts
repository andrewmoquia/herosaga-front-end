import axios from 'axios'
import { config } from '../../api'

const { GET_TOKEN } = config

export const getCsrfToken = (dispatch: any) => {
   axios
      .get(`${GET_TOKEN}`, {
         withCredentials: true,
      })
      .then((response) => {
         return dispatch({ type: 'GET_CSRF_TOKEN', payload: response.data })
      })
      .catch()
}
