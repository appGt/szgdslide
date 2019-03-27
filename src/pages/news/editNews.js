import React from 'react'
import { Button, Card, Modal, Input, Message } from 'antd'
import { withRouter } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjsToHtml from 'draftjs-to-html'
import htmlToDraftjs from 'html-to-draftjs'
import Axios from 'axios'
import './edit.less'

export default withRouter(class EditNews extends React.Component {
  state = {
    id: '',
    title: '',
    nrcontent: '',
    editorState: '',
    showBack: false,
    path: ''
  }
  Url = {
    add: '/szgdslide/admin/addNew',
    update: '/szgdslide/admin/updateNew'
  }
  componentWillMount() {
    this.initData()
  }

  initData = () => {
    let id = this.props.match.params.id
    let _this = this
    if (id) {
      this.setState({
        showBack: true,
        id
      })
      Axios({
        method: 'post',
        url: '/szgdslide/admin/detailNew',
        data: {
          id
        },
        transformRequest: [function (data) {
          // 将数据转换为表单数据
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      })
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            let data = res.data.data
            const contentBlock = htmlToDraftjs(data.nrcontent || '');
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);

            _this.setState({
              ...data,
              editorState: editorState,
            })
          }
        })
        .catch((error) => {
          Message.warn('获取数据失败');
        });
    }
  }

  //提交
  handleSubmit = () => {
    let { title, nrcontent, id, path } = this.state
    let url = id ? this.Url.update : this.Url.add
    if (!path) {
      Message.error('请上传新闻图片')
      return
    }
    let newData = { title: title, nrcontent: nrcontent, path: path };
    let updateData = { title, nrcontent, id, path: path }
    let data = id ? updateData : newData
    Axios({
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 将数据转换为表单数据
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data: data
    })
      .then(function (res) {
        if (res.status === 200 && res.data.success === true)
          Message.success('提交成功');
      })
      .catch(function (error) {
        Message.error('更新失败');
      });
  }

  //标题改变
  titleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  //内容变动
  onEditorChange = (nrcontent) => {
    nrcontent = draftjsToHtml(nrcontent)
    this.setState({
      nrcontent
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

  back = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <Card>
          {
            this.state.showBack ? <Button type="primary" icon="left" onClick={this.back}>返回</Button> : ''
          }
          <Button type="primary" onClick={this.handleSubmit} style={{ marginLeft: 10 }}>提交</Button>
        </Card>
        <Card title="标题" style={{ marginTop: 10 }}>
          <Input placeholder="标题" onChange={this.titleChange} value={this.state.title} />
          <Upload
            accept="image"
            name="files"
            action='/szgdslide/upload'
            showUploadList={false}
            onChange={this.onUpload}
          >
            <Button type="primary" icon={this.state.loading ? 'loading' : 'upload'} loading={this.state.loading}>
              上传图片
            </Button>
          </Upload>
          <div style={{ marginTop: 10, marginBottom: 10, width: 200, height: 200 }} >
            <img style={{ width: 200, height: 200 }} src={
              this.state.path || 'http://dummyimage.com/200x200'
            } alt="新闻" /></div>
        </Card>
        <Card style={{ marginTop: -10 }}>
          <Editor
            editorState={this.state.editorState}
            // contentState={this.state.nrcontent}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="预览"
          visible={this.state.showRichText}
          footer={false}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          style={{ width: 970, }}>
          {
            <div className="preview" dangerouslySetInnerHTML={{ __html: this.state.nrcontent }}>

            </div>
          }
        </Modal>
      </div>
    )
  }
})