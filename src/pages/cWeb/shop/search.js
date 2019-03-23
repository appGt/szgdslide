import React from 'react'
import { Input, Button, Form } from 'antd'
import './search.less'

export default class Search extends React.Component {
  state={
    name: ''
  }
  onSearch =()=>{
    if(this.state.name){
      this.props.onSearch(this.state.name)
    }
  }
  render() {
    return (
      <div className="searchBar" >
        <div className="main">
          <Form layout="inline">
            <Form.Item>
              <Input className="search-input" placeholder="搜索" value={this.state.name}/>
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
