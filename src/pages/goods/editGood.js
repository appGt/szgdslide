import React from 'react'
import { Input, Form, Message, Select, Upload, Button } from 'antd'
import Axios from 'axios';
const FormItem = Form.Item


class EditGood extends React.Component {
  state = {
    data: '',
    loading: false
  }

  Url = {
    add: '/szgdslide/admin/addGood',
    update: '/szgdslide/admin/updateGoods'
  }

  componentWillMount() {
    let goodsId = this.props.goodsId
    if (goodsId) {
      this.setState({ id: goodsId })
      this.getGoods(goodsId)
    }
  }

  getGoods = (goodsId) => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/detailGood',
      params: { id: goodsId }
    }).then((res) => {
      let data = res.data
      this.setState({
        ...data.data
      })
    }).catch((err) => {
      Message.error('获取商品信息失败')
    })
  }

  onUpload = (info) => {
    if (info.file.status !== 'uploading') {
      this.setState({
        loading: true
      })
    }
    if (info.file.status === 'done' && info.file.response.success === true) {
      Message.success(`${info.file.name} 上传成功`);
      this.setState({
        path: '/szgdslide/files/' + info.file.name,
        loading: false
      })
    } else if (info.file.status === 'error') {
      Message.error(`${info.file.name} 上传失败.`);
      this.setState({
        path: '',
        loading: false
      })
    }
  }

  Submit = () => {
    let data = this.props.form.getFieldsValue()
    data.path = this.state.path
    let url = this.state.id ? this.Url.update : this.Url.add
    if(this.state.id){
      data.id = this.state.id
    }
    if (!data.path) {
      Message.error('请上传商品图片')
      return
    }
    Axios({
      url: url,
      method: 'post',
      data: data,
      transformRequest: [function (data) {
        // 将数据转换为表单数据
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res)=>{
      if(res.status === 200){
        if(res.data.success){
          Message.success('更新成功')
        }
      }
    }).catch(()=>{
      Message.error('更新失败')
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
              initialValue: this.state.stockNum
            })(
              <Input placeholder="库存" />
            )
          }
        </FormItem>
        <FormItem label="供应商" key="supplierId">
          {
            getFieldDecorator('supplierId', {
              rules: [
                {
                  required: true,
                  message: '请选择供应商',
                }
              ],
              initialValue: this.state.supplierId
            })(
              <Select>
                {this.props.supplierList}
              </Select>
            )
          }
        </FormItem>
        <Upload
          accept="image"
          name="files"
          action='/szgdslide/upload'
          showUploadList={false}
          onChange={
            this.onUpload
          }
        >
          <Button type="primary" icon={this.state.loading ? 'loading' : 'upload'} loading={this.state.loading}>
            上传图片
        </Button>
        </Upload>
        <div style={{ marginTop: 10, marginBottom: 10, width: 200, height: 200 }} >
          <img style={{ width: 200, height: 200 }} src={
            this.state.path || 'http://dummyimage.com/200x200'
          } alt="商品" />
        </div>
        <FormItem>
          <Button onClick={this.Submit} type="primary" style={{ marginRight: 10 }}>提交</Button>
        </FormItem>
      </Form >
    )
  }
}

export default Form.create({})(EditGood)