import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {setNavType} from 'modules/shared/reducer/actions'
const TIME_FORMAT = 'YYYY-MM-DD'

@connect(
  state => {
    return {
    }
  },
  {
    setNavType
  }
)
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
  tenementDetail = (id) => {
    this.props.setNavType('detail')
    this.context.router.push(`/detail/${id}`)
  }

  getDateDiff(timeData) {
    const m = 1000 * 60
    const h = m * 60
    const day = h * 24
    let result = ''
    const now = new Date().getTime()
    const timeGap = now - timeData
    if (timeGap < 0) {
      return
    }
    const dayGap = timeGap / day
    const hourGap = timeGap / h
    const minGap = timeGap / m

    if (dayGap >= 1) {
      result = timeData && moment(timeData).format(TIME_FORMAT)
    } else if (hourGap >= 1) {
      result = parseInt(hourGap) + '个小时前'
    } else if (minGap >= 1) {
      result = parseInt(minGap) + '分钟前'
    } else result = '刚刚'
    return result
  }

  render() {
    const {renementItem} = this.props
    return <li className="piclist__item" onClick={() => {
      this.tenementDetail(renementItem.id)
    }}>
      <div className="piclist__pic">
        <img src={renementItem.pic.length > 0 ? renementItem.pic[0] : ''} alt="" />
      </div>
      <div className="piclist__con">
        <div className="piclist__tit">{renementItem.title}</div>
        <div className="piclist__sub"><span>{renementItem.type === 1 ? '合租' : '整租'}</span> | {renementItem.romm}室{renementItem.saloon}厅{renementItem.toiled}卫 | {renementItem.size}㎡</div>
        <div className="piclist__add">{renementItem.addr}</div>
        <div className="piclist__foot">
          <span className="time">{this.getDateDiff(renementItem.date)}</span>
          <span className="price">{renementItem.price}元/每月</span>
        </div>
      </div>
    </li>
  }
}
