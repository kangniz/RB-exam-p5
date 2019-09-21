import {
  createAction
} from 'redux-actions'
import * as T from './actionTypes'
import axios from 'axios'

export const getLangList = createAction(T.GET_LANG_LIST, () =>
  axios.get(
    `${window.location.protocol}${window.__config.base_url_fac}/v1.0/web-resources?name=${
      window.__config.packageJson.name
    }&terminal=browser&version=${window.__config.packageJson.facVersion}`
  )
)

export const setNavType = createAction(T.SET_NAV_TYPE,
  (data) => {
    return data
  }
)
