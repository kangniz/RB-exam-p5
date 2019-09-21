import React, {Component} from 'react'
// import { Button, Input, Select, Radio } from 'fish'
// const Option = Select.Option
// const { TextArea } = Input
import {Input, Radio, Select, Button, InputNumber, Modal, message} from 'fish'
import axios from 'axios'
const TextArea = Input.TextArea
const { Option } = Select
const RadioGroup = Radio.Group

export default class TenementAdd extends Component {
  state = {
    title: '',
    description: '',
    addr: '六一北路亚太中心',
    price: 2000,
    type: 1,
    romm: 1,
    saloon: 1,
    toiled: 1,
    size: 90,
    pic: ''
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: this.stripscript(e.target.value)
    })
  }
  handleChange2 = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  stripscript = s => {
    var pattern = new RegExp(
      "[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    )
    var rs = ''
    for (var i = 0; i < s.length; i++) {
      rs = rs + s.substr(i, 1).replace(pattern, '')
    }
    return rs
  }
  onRadioChange = e => {
    this.setState({
      type: e.target.value
    })
  }
  onNumChange = v => {
    this.setState({
      price: v
    })
  }
  onSizeChange = v => {
    this.setState({
      size: v
    })
  }
  onChangeRoom = romm => {
    this.setState({
      romm
    })
  }
  onChangeSaloon = saloon => {
    this.setState({
      saloon
    })
  }
  onChangeToilet = toiled => {
    this.setState({
      toiled
    })
  }
  handleGoBack = () => {
    this.props.router.goBack()
  }
  handleSubmit = () => {
    const { title, price, description, pic, size } = this.state
    if (!title) {
      message.error('请输入标题')
      return
    }
    if (!price) {
      message.error('请输入价格')
      return
    }
    if (!description) {
      message.error('请输入描述')
      return
    }
    if (!pic) {
      message.error('请输入图片地址')
      return
    }
    if (!size) {
      message.error('请输入房屋面积')
      return
    }
    if (title.length > 50) {
      message.error('请输入50字以内的中文、英文或数字得标题')
      return
    }
    if (description.length > 300) {
      message.error('请输入300字以内的中文、英文或数字得描述')
      return
    }
    if (pic.split('\n').length > 5) {
      message.error('请输入正确的url，每行一个图片url，最多5张')
      return
    }
    const values = {
      ...this.state,
      pic: pic.split('\n'),
      date: new Date().getTime()
    }
    Modal.confirm({
      title: '提示',
      content: '确认发布？',
      zIndex: 9999,
      onOk: () => {
        axios.post('/api/v0.1/articles', values)
        this.handleGoBack()
      },
      onCancel: () => {
        this.handleGoBack()
      }
    })
  }
  render() {
    return <div className="form">
      <ul>
        <li className="form__item">
          <div className="form__lab">出租方式：</div>
          <div className="form__con">
            <RadioGroup onChange={this.onRadioChange} value={this.state.type}>
              <Radio value={1}>合租</Radio>
              <Radio value={2}>整组</Radio>
            </RadioGroup>
          </div>
        </li>
        <li className="form__item">
          <div className="form__lab">房屋面积：</div>
          <div className="form__con">
            <InputNumber
              id="size"
              name="size"
              min={1}
              max={10000000}
              style={{ width: 200 }}
              placeholder={'请输入房屋面积'}
              onChange={this.onSizeChange}
            />
          </div>
        </li>
        <li className="form__item">
          <div className="form__lab">房屋户型：</div>
          <div className="form__con">
            <Select defaultValue="1" style={{ width: 80 }} onChange={this.onChangeRoom}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
            <span>室&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Select defaultValue="1" style={{ width: 80 }} onChange={this.onChangeSaloon}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
            <span>厅&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Select defaultValue="1" style={{ width: 80 }} onChange={this.onChangeToilet}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
            <span>卫</span>
          </div>
        </li>
        <li className="form__item">
          <div className="form__lab">租金要求：</div>
          <div className="form__con">
            <InputNumber
              id="price"
              name="price"
              min={1}
              max={10000000}
              style={{ width: 200 }}
              onChange={this.onNumChange}
              placeholder={'请输入正整数'}
            />
          </div>
        </li>
        <li className="form__item form__item--block">
          <div className="form__lab">房源标题：</div>
          <div className="form__con">
            <Input
              id="title"
              type="text"
              name="title"
              maxLength={50}
              placeholder={'50字以内的中文、英文或数字'}
              onChange={this.handleChange}
            />
          </div>
        </li>
        <li className="form__item form__item--block">
          <div className="form__lab">房源描述：</div>
          <div className="form__con">
            <TextArea
              maxLength={300}
              placeholder="300字以内的中文、英文或数字"
              showCounter
              id="description"
              name="description"
              onChange={this.handleChange}
            />
          </div>
        </li>
        <li className="form__item form__item--block">
          <div className="form__lab">房源图片：</div>
          <div className="form__con">
            <TextArea
              placeholder="请输入正确的url，每行一个图片url，最多5张"
              id="pic"
              name="pic"
              onChange={this.handleChange2}
            />
          </div>
        </li>
        <li className="form__item form__item--block">
          <Button type="primary" style={{marginRight: '10px'}} onClick={this.handleSubmit}>提交</Button>
          <Button onClick={this.handleGoBack}>取消</Button>
        </li>
      </ul>
    </div>
  }
}
