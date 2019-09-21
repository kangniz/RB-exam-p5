import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Frame from 'modules/shared/layouts/frame'
import Intl from 'i18n/intl'

const TenementList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/tenement/list'))
  }, 'TenementList')
}
const ExampleDetail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/tenement/detail'))
  }, 'TenementDetail')
}
const ExampleArticleAdd = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/tenement/add'))
  }, 'TenementArticleAdd')
}

const routes = history => (
  <Router history={history}>
    <Route component={Intl}>
      <Route path="/" component={Frame}>
        <IndexRoute getComponent={TenementList} />
        {/* <Route path="/detail/:id" getComponent={ExampleDetail} /> */}
        <Route path="/detail/:id" getComponent={ExampleDetail} />
        <Route path="/add" getComponent={ExampleArticleAdd} />
      </Route>
    </Route>
  </Router>
)

export default routes
