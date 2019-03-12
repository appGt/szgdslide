import React from 'react'
import { Button, Card, Modal, Input, message } from 'antd'
import { NavLink } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjsToHtml from 'draftjs-to-html'
import htmlToDraftjs from 'html-to-draftjs'
import Axios from 'axios'

export default class EditNews extends React.Component {
  state = {
    title: '',
    showRichText: false,
    content: '',
    editorState: '',
    showBack: false,
  }
  componentWillMount() {
    this.initData()
  }

  initData = () => {
    let id = this.props.match.params.id
    if (id) {
      this.setState({
        showBack: true
      })
      Axios.post('/szgdslide/admin/detailNews', {
        id: id
      })
        .then(function (res) {
          this.setState({
            id,
            title: res.data.title,
            content: htmlToDraftjs(res.data.content)
          })
        })
        .catch(function (error) {
          message.warn('获取数据失败');
        });
    }
  }

  //提交
  handleSubmit = () => {
    let { title, content } = this.state
    content = draftjsToHtml(content)
    Axios.post('/admin/detailNews', {
      title,
      content,
    })
      .then(function (res) {
        if (res.status)
          message('提交成功');
      })
      .catch(function (error) {
        message('获取数据失败');
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
  onEditorChange = (content) => {
    this.setState({
      content
    })
  }

  render() {
    return (
      <div>
        <Card>
          {
            this.state.showBack ? <NavLink to="/news/list"><Button type="primary" icon="left">返回</Button></NavLink> : ''
          }
          <Button type="primary" onClick={this.onHandleGetHtml} style={{ marginLeft: 10 }}>预览</Button>
          <Button type="primary" onClick={this.handleSubmit} style={{ marginLeft: 10 }}>提交</Button>
        </Card>
        <Card title="标题" style={{ marginTop: 10 }}>
          <Input placeholder="标题" allowClear onChange={this.onChange} defaultValue={this.state.title} />
        </Card>
        <Card style={{ marginTop: -10 }}>
          <Editor
            editorState={this.state.editorState}
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
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}>
          {
            <div dangerouslySetInnerHTML={{ __html: draftjsToHtml(this.state.contentState) }}>

            </div>
          }
        </Modal>
      </div>
    )
  }
}