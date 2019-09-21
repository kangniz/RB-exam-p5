import React, {Component} from 'react'
import TenementItem from './components/tenementlist/tenementlist'
import axios from 'axios'

import { Select } from 'fish'
const Option = Select.Option
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectType: 0,
      selectPrice: 0,
      selectHouse: 0,
      load: false,
      pagination: 1
    }
  }
  componentDidMount() {
    this.getData()
    var container = document.getElementsByClassName('container')[0]
    container.onscroll = () => {
      var divScrollTop = container.scrollTop
      var divClientHeight = container.clientHeight
      var divScrollHeight = container.scrollHeight
      if (divScrollTop + divClientHeight >= divScrollHeight) {
        this.loadMore()
      }
    }
  }
  getData = () => {
    axios.get(
      `/api/v0.1/articles?_sort=date&_order=DESC&_page=${this.state.pagination || 1}`
    ).then(res => {
      this.setState({
        data: this.state.pagination === 1 ? res.data : [...this.state.data, ...res.data],
        total: res.data.length,
        load: res.data.length < 10
      })
    })
  }

  loadMore = () => {
    if (this.state.load) {
      return
    }
    this.setState({
      pagination: this.state.pagination + 1
    }, () => {
      this.getData()
    })
  }

  typeOnChange = (selectType) => {
    this.setState({ selectType: selectType - 0 })
  }

  priceChange = (selectPrice) => {
    this.setState({ selectPrice: selectPrice - 0 })
  }

  houseTypeOnChange = (selectHouse) => {
    this.setState({ selectHouse: selectHouse - 0 })
  }

  render() {
    const {data} = this.state
    return (
      <div>
        <div className="selectlist">
          <span className="selectlist__text">出租方式：</span>
          <Select key="selectType" defaultValue="0" style={{ width: 200 }} onChange={this.typeOnChange}>
            <Option value="0">选择方式</Option>
            <Option value="1">整租</Option>
            <Option value="2">合租</Option>
          </Select>
          <span className="selectlist__text">租金范围：</span>
          <Select key="selectPrice" defaultValue="0" style={{ width: 200 }} onChange={this.priceChange}>
            <Option value="0">选择租金</Option>
            <Option value="1">0~1000</Option>
            <Option value="2">1001~2000</Option>
            <Option value="3">2001~4000</Option>
            <Option value="4">4001~6000</Option>
            <Option value="5">6001以上</Option>
          </Select>
          <span className="selectlist__text">房屋户型：</span>
          <Select key="selectHouse" defaultValue="0" style={{ width: 200 }} onChange={this.houseTypeOnChange}>
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
            {
              data.filter(item => {
                const { selectType, selectPrice, selectHouse } = this.state
                if (selectType && selectType !== item.type) return false
                if (selectPrice) {
                  const arr = [0, 1000, 2000, 4000, 6000]
                  if (item.price > arr[selectPrice] || item.price <= arr[selectPrice - 1]) {
                    return false
                  }
                }
                if (selectHouse && selectHouse !== item.romm) return false
                return true
              }).sort((i1, i2) => {
                return i2.date - i1.date
              }).map((item, index) => {
                return <TenementItem key={index} renementItem={item} />
              })
            }
          </ul>
          <div className="load"><span onClick={this.loadMore}>{this.state.load ? '没有更多房源了！' : '加载更多...'}</span></div>
        </div>
      </div>
    )
  }
}
