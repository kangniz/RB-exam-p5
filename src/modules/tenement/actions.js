// import {createAction} from 'redux-actions'
// import * as T from './actionTypes'
// import axios from 'axios'

// export const articleGet = createAction(T.ARTICLE_GET,
//   () => axios.get('/api/v0.1/articles')
// )

// export const articleAdd = createAction(T.ARTICLE_ADD,
//   (data) => axios.post('/api/v0.1/articles', data)
// )
import {
  createAction
} from 'redux-actions'
import * as T from './actionTypes'
import axios from 'axios'

export const tenementGet = createAction(T.RENTINGLIST_GET,
  (filter) => {
    let queryStr = `?_limit=${filter.pageSize}&_start=${filter.pageSize * filter.pageNum}&_sort=date&_order=DESC`
    if (filter.modal) {
      queryStr = `${queryStr}&modal=${filter.modal}`
    }
    if (filter.room) {
      queryStr = `${queryStr}&room=${filter.room}`
    }
    if (filter.rent && parseInt(filter.rent) < 4) {
      const rentArray = [
        [0, 1000],
        [1001, 2000],
        [2001, 4000],
        [4001, 6000]
      ]
      queryStr = `${queryStr}&rent_gte=${rentArray[filter.rent][0]}&rent_lte=${rentArray[filter.rent][1]}`
    }
    if (filter.rent && parseInt(filter.rent) === 4) {
      queryStr = `${queryStr}&rent_gte=6000`
    }

    return axios.get(`/api/v0.1/articles${queryStr}`)
  }
)

export const rentingDetailGet = createAction(T.RENTINGDETAIL_GET, (id) => {
  return axios.get(`/api/v0.1/renting?id=${id}`)
})

export const cleanList = createAction(T.CLEAN_LIST, () => [])

export const articleAdd = createAction(T.RENTINGLIST_ADD,
  (data) => axios.post('/api/v0.1/articles', data)
)
