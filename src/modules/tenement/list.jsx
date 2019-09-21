import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {tenementGet, cleanList, articleGet} from './actions'
import TenementItem from './components/tenementlist/tenementlist'
import axios from 'axios'
// import {push} from 'react-router-redux/lib/actions'
// // import axios from 'axios'
// import moment from 'moment'
// import {defineMessages, intlShape, injectIntl} from 'react-intl'
// import {articleGet} from './actions'
import { Select } from 'fish'
const Option = Select.Option

// @connect(state => {
//   return {
//     articleList: state.articleList.items
//   }
// }, {
//   tenementGet,
//   cleanList,
//   articleGet
// })

// function handleChange(value) {
//   console.log(`selected ${value}`)
// }

export default class List extends Component {
  // static propTypes = {
  //   tenementList: PropTypes.arrayOf(PropTypes.object),
  //   tenementGet: React.PropTypes.func,
  //   cleanList: React.PropTypes.func
  // }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      t1: 0,
      t2: 0,
      t3: 0,
      noMore: false,
      pageNum: 1
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    axios.get(
      `/api/v0.1/articles?_sort=update_time&_order=DESC&_page=${this.state.pageNum || 1}`
    ).then(res => {
      this.setState({
        data: this.state.pageNum === 1 ? res.data : [...this.state.data, ...res.data],
        total: res.data.length,
        noMore: res.data.length < 10
      })
    })
  }
  // componentDidMount() {
  //   this.props.cleanList()
  //   this.props.tenementGet(this.state.filter)
  // }

  loadMore = () => {
    if (this.state.noMore) {
      return
    }
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => {
      this.getData()
    })
  }

  modalOnChange = (t1) => {
    this.setState({ t1: t1 - 0 })
  }

  priceChange = (t2) => {
    this.setState({ t2: t2 - 0 })
  }

  houseTypeOnChange = (t3) => {
    this.setState({ t3: t3 - 0 })
  }

  listData = (data) => {
    // const t = data.filter(item => {
    //   const { t1, t2, t3 } = this.state
    //   if (t1 && t1 !== item.type) return false
    //   if (t2) {
    //     const arr = [0, 1000, 2000, 4000, 6000]
    //     console.log(
    //       item.price,
    //       item.price >= arr[t2],
    //       item.price <= arr[t2 - 1]
    //     )
    //     if (item.price >= arr[t2] || item.price <= arr[t2 - 1]) {
    //       return false
    //     }
    //   }
    //   if (t3 && t3 !== item.roomCount) return false
    //   return true
    // }).sort((i1, i2) => {
    //   return i2.date - i1.date
    // })
    // this.setState({
    //   data: t
    // })
  }
  render() {
    const {data} = this.state
    return (
      <div>
        <div className="selectlist">
          <span className="selectlist__text">出租方式：</span>
          <Select key="t1" defaultValue="1" style={{ width: 200 }} onChange={this.modalOnChange}>
            <Option value="0">选择方式</Option>
            <Option value="1">整租</Option>
            <Option value="2">合租</Option>
          </Select>
          <span className="selectlist__text">租金范围：</span>
          <Select key="t2" defaultValue="1" style={{ width: 200 }} onChange={this.priceChange}>
            <Option value="0">选择租金</Option>
            <Option value="1">0~1000</Option>
            <Option value="2">1001~2000</Option>
            <Option value="3">2001~4000</Option>
            <Option value="4">4001~6000</Option>
            <Option value="5">6001以上</Option>
          </Select>
          <span className="selectlist__text">房屋户型：</span>
          <Select key="t3" defaultValue="1" style={{ width: 200 }} onChange={this.houseTypeOnChange}>
            <Option value="0">选择户型</Option>
            <Option value="1">1室</Option>
            <Option value="2">2室</Option>
            <Option value="3">3室</Option>
            <Option value="4">4室</Option>
            <Option value="5">5室</Option>
          </Select>
        </div>
        <div className="articlelist">
          <ul className="piclist">
            {/* <TenementItem renementItem={data} /> */}
            {
              data.filter(item => {
                const { t1, t2, t3 } = this.state
                if (t1 && t1 !== item.type) return false
                if (t2) {
                  const arr = [0, 1000, 2000, 4000, 6000]
                  console.log(
                    item.price,
                    item.price >= arr[t2],
                    item.price <= arr[t2 - 1]
                  )
                  if (item.price >= arr[t2] || item.price <= arr[t2 - 1]) {
                    return false
                  }
                }
                if (t3 && t3 !== item.roomCount) return false
                return true
              }).sort((i1, i2) => {
                return i2.date - i1.date
              }).map((item, index) => {
                return <TenementItem key={index} renementItem={item} />
              })
            }
          </ul>
          <div style={{textAlign: 'center'}}><a onClick={this.loadMore}>{this.state.noMore ? '没有更多房源了！' : '加载更多'}</a></div>
        </div>
      </div>
    )
  }
}
