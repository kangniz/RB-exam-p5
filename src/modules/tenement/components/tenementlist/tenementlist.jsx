import React, {Component, PropTypes} from 'react'
import moment from 'moment'
const TIME_FORMAT = 'YYYY-MM-DD'

export default class TenementItem extends Component {
  static contextTypes = {
    renementItem: PropTypes.array,
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }
  goDetail = (id) => {
    // this.props.setNavType('detail')
    this.context.router.push(`/detail/${id}`)
  }

  getDateDiff(dateTimeStamp) {
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    let result = ''
    const idata = dateTimeStamp
    const now = new Date().getTime()
    const diffValue = now - idata
    if (diffValue < 0) {
      return
    }
    const dayC = diffValue / day
    const hourC = diffValue / hour
    const minC = diffValue / minute

    if (dayC >= 1) {
      result = idata && moment(idata).format(TIME_FORMAT)
    } else if (hourC >= 1) {
      result = parseInt(hourC) + '个小时前'
    } else if (minC >= 1) {
      result = parseInt(minC) + '分钟前'
    } else result = '刚刚'
    return result
  }

  render() {
    const {renementItem} = this.props
    return <li className="piclist__item" onClick={() => {
      this.goDetail(renementItem.id)
    }}>
      <div className="piclist__pic">
        {/* <img src="" alt=""/> */}
      </div>
      <div className="piclist__con">
        <div className="piclist__tit">{renementItem.title}</div>
        <div className="piclist__sub">{renementItem.type} | {renementItem.romm}室{renementItem.saloon}厅{renementItem.toiled}卫 | {renementItem.size}㎡</div>
        <div className="piclist__add">{renementItem.addr}</div>
        <div className="piclist__foot">
          <span className="time">{this.getDateDiff(renementItem.date)}</span>
          <span className="price">{renementItem.price}元/每月</span>
        </div>
      </div>
    </li>
  }
}
