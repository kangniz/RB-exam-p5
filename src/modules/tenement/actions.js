
import {
  createAction
} from 'redux-actions'
import * as T from './actionTypes'
import axios from 'axios'

export const articleAdd = createAction(T.RENTINGLIST_ADD,
  (data) => axios.post('/api/v0.1/articles', data)
)
