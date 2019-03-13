import React from 'react'
import { Input, Form, Message, Select } from 'antd'
import Axios from 'axios';
const FormItem = Form.Item


class EditGood extends React.Component {
  state = {
    id: '',
    name: '',
    price: '',
    sale_num: '',
    supplier: '',
    supplierList:[]
  }
  componentWillMount() {
    let goodsId = this.props.goodsId
    if (goodsId) {
      this.getGoods()
    }
  }

  getGoods = () => {
    Axios({
      method: 'post',
      url: '',
      params: { id: this.state.id }
    }).then((res) => {
      let data = res.data
      this.setState({
        ...data
      })
    }).catch((err) => {
      Message.error('获取商品信息失败')
    })
  }

  getSupplierList =()=>{
    Axios({
      url: '',
    }).then((res) => {
      let supplierList = res.data
      this.setState({
        supplierList
      })
    }).catch((err) => {
      Message.error('获取供应商信息失败')
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="vertical">
        <FormItem label="商品名称" key="name">
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入商品名称',
                }
              ],
              initialValue: this.state.name
            })(
              <Input placeholder="商品名称" />
            )
          }
        </FormItem>
        <FormItem label="库存" key="stock">
          {
            getFieldDecorator('stock', {
              rules: [
                {
                  required: true,
                  message: '请输入货物数量'
                }
              ],
              initialValue: this.state.stock
            })(
              <Input placeholder="库存" />
            )
          }
        </FormItem>
        <FormItem label="供应商" key="supplier">
          {
            getFieldDecorator('supplier', {
              rules: [
                {
                  required: true,
                  message: '请输入供应商名称'
                }
              ],
              initialValue: this.state.supplier
            })(
              <Select>
                {this.state.supplierList}
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(EditGood)