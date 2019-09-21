import React, {Component} from 'react'
import TenementAdd from './components/article/articleAdd'
export default class List extends Component {
  render() {
    return (
      <div>
        <TenementAdd {...this.props} />
      </div>
    )
  }
}
