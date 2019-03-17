import React from 'react'
import { Button, Card, Modal, Input, Message } from 'antd'
import { NavLink } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjsToHtml from 'draftjs-to-html'
import htmlToDraftjs from 'html-to-draftjs'
import Axios from 'axios'
import './edit.less'

export default class EditNews extends React.Component {
  state = {
    id: '',
    title: '',
    nrcontent: '',
    editorState: '',
    showBack: false,
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
        params: {
          id
        }
      })
        .then(function (res) {
          if (res.status === 200 && res.data.success === true) {
            let data = res.data.data
            const contentBlock = htmlToDraftjs(data.nrcontent);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);

            _this.setState({
              ...data,
              editorState: editorState,
            })
          }
        })
        .catch(function (error) {
          Message.warn('获取数据失败');
        });
    }
  }

  //提交
  handleSubmit = () => {
    let { title, nrcontent, id, } = this.state
    let url = id ? this.Url.update : this.Url.add
    let newData = { title: title, nrcontent: nrcontent };
    let updateData = { title, nrcontent, id,}
    let data = id ? newData : updateData
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

  render() {
    return (
      <div>
        <Card>
          {
            this.state.showBack ? <NavLink to="/news/list"><Button type="primary" icon="left">返回</Button></NavLink> : ''
          }
          <Button type="primary" onClick={this.handleSubmit} style={{ marginLeft: 10 }}>提交</Button>
        </Card>
        <Card title="标题" style={{ marginTop: 10 }}>
          <Input placeholder="标题" onChange={this.titleChange} value={this.state.title} />
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
}