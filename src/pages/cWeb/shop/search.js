import React from 'react'
import { Input, Button, Form } from 'antd'
import './search.less'

export default class Search extends React.Component {
  state = {
    name: ''
  }
  onSearch = () => {
    this.props.onSearch(this.state.name)
  }
  onChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <div className="searchBar" >
        <div className="main">
          <Form layout="inline">
            <Form.Item>
              <Input className="search-input" placeholder="搜索" value={this.state.name} onChange={this.onChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="search" onClick={this.onSearch} />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
