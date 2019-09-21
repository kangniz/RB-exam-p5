import React, {Component, PropTypes} from 'react'
import axios from 'axios'
export default class Detail extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    this.getDate()
  }

  getDate = () => {
    axios.get(
      `/api/v0.1/articles?${`id=${this.props.params.id}&`}_sort=date&_order=DESC`
    ).then(res => {
      this.setState({
        data: res.data[0]
      })
    })
  }
  render() {
    const {data} = this.state
    if (!data) {
      return null
    }
    return (
      <div className="detailpic">
        <div className="detailpic__pic">
          <img src={data.pic.length > 0 ? data.pic[0] : ''} alt="" />
        </div>
        <div className="detailpic__tit">{data.title}</div>
        <div className="detailpic__sub">
          <span className="item"><em>{data.price}元/月</em>(整租)</span>
          <span className="item">{data.room}室{data.saloon}厅{data.toiled}卫</span>
          <span className="item">{data.size}㎡</span>
        </div>
        <div className="detailpic__subtit">房租描述</div>
        <div className="detailpic__text">{data.description}</div>
      </div>
    )
  }
}
