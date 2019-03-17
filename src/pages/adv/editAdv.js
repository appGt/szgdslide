import React from 'react'
import { Input, Form, Message, Select, Upload, Button } from 'antd'
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
const FormItem = Form.Item


class EditAdv extends React.Component {
  state = {
    data: '',
    loading: ''
  }

  componentWillMount() {
    let adverId = this.props.adverId
    if (adverId) {
      this.setState({ id: adverId })
      this.getAdv(adverId)
    }
  }

  getAdv = (adverId) => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/detailAdver',
      data: { id: adverId }
    }).then((res) => {
      let data = res.data
      this.setState({
        ...data.data
      })
    }).catch((err) => {
      Message.error('获取信息失败')
    })
  }

  onUpload = (info) => {
    if (info.file.status !== 'uploading') {
      this.setState({
        loading: true
      })
    }
    if (info.file.status === 'done' && info.file.response.status) {
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
    if (!data.path) {
      Message.error('请上传广告图片')
      return
    }
    Axios({
      url: '/szgdslide/admin/updateAdver',
      method: 'post',
      prarms: data
    }).then((res)=>{
      if(res.status === 200){
        if(res.data.data.status){
          Message.error('更新成功')
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
        <FormItem label="标题" key="title">
          {
            getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                }
              ],
              initialValue: this.state.title
            })(
              <Input placeholder="标题" />
            )
          }
        </FormItem>
        <FormItem label="描述" key="nrcontent">
          {
            getFieldDecorator('nrcontent', {
              rules: [
                {
                  required: true,
                  message: '描述',
                }
              ],
              initialValue: this.state.nrcontent
            })(
              <TextArea placeholder="描述" col="30"/>
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
        <div style={{ marginTop: 10, marginBottom: 10, width: 'auto'}} >
          <img style={{ width: '100%' }} src={
            this.state.path || 'http://dummyimage.com/715x414'
          } alt="广告" />
        </div>
        <FormItem>
          <Button onClick={this.Submit} type="primary" style={{ marginRight: 10 }}>提交</Button>
        </FormItem>
      </Form >
    )
  }
}

export default Form.create({})(EditAdv)