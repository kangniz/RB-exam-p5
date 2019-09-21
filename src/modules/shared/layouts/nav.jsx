import React from 'react'
import {Button, Icon} from 'fish'
import {push} from 'react-router-redux/lib/actions'
import {connect} from 'react-redux'
import {getLangList, setNavType} from 'modules/shared/reducer/actions'

@connect(
  state => {
    return {
      langList: state.sharedModel.langList,
      navType: state.sharedModel.navType
    }
  },
  {
    getLangList,
    setNavType,
    push
  }
)
class Nav extends React.Component {
  static propTypes = {
    navType: React.PropTypes.string,
    push: React.PropTypes.func.isRequired,
    setNavType: React.PropTypes.func
  }
  render() {
    return (
      <nav className="nav">
        {
          this.props.navType
            ? <div>
              <div className="nav__left">
                <Icon type="left" onClick={() => {
                  this.props.setNavType('')
                  this.props.push('/')
                }}
                />
              </div>
              <div className="nav__tit">{this.props.navType === 'detail' ? '房源详情' : '发布房源'}</div>
            </div>
            : <div>
              <div className="nav__left">
                <span className="nav__logo">租房!</span>
              </div>
              <div className="nav__right">
                <Button type="primary" onClick={() => {
                  this.props.setNavType('add')
                  this.props.push('/add')
                }
                }>发布房源</Button>
              </div>
            </div>
        }
      </nav>
    )
  }
}

export default Nav
