import React from 'react'
import { Input, Form, Message, Upload, Button } from 'antd'
import Axios from 'axios';
const FormItem = Form.Item


class EditVideo extends React.Component {
  state = {
    data: '',
    loading: false
  }
  Url = {
    add: '/szgdslide/admin/addVideo',
    update: '/szgdslide/admin/updateVideo'
  }

  componentWillMount() {
    let videoId = this.props.videoId
    if (videoId) {
      this.setState({ id: videoId })
      this.getVideo(videoId)
    }
  }

  getVideo = (videoId) => {
    Axios({
      method: 'post',
      url: '/szgdslide/admin/detailVideo',
      data: { id: videoId },
      transformRequest: [function (data) {
        // 将数据转换为表单数据
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
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
      Message.error('请上传视频')
      return
    }
    if(this.state.id){
      data.id = this.state.id
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
        if(res.data.success === true){
          Message.success('更新成功')
          this.props.handleEditSuc()
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
        <Upload
          name="files"
          action='/szgdslide/upload'
          onChange={
            this.onUpload
          }
        >
          <Button type="primary" icon={this.state.loading ? 'loading' : 'upload'} loading={this.state.loading}>
            上传视频
        </Button>
        </Upload>
        <FormItem style={{marginTop: 20}}>
          <Button onClick={this.Submit} type="primary" style={{ marginRight: 10 }}>提交</Button>
        </FormItem>
      </Form >
    )
  }
}

export default Form.create({})(EditVideo)