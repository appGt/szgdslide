import React from 'react'
import {Layout} from 'antd'
import {NavLink} from 'react-router-dom'
import './CommonHeader.less'
const Header = Layout.Header

export default class CommonHeader extends React.Component{
  render(){
    return(
      <Header className="common-header">
          <div className="common-link-wrapper">
            <NavLink className="header-link" to="/">首页</NavLink>
            <NavLink className="header-link" to="/shop">商城</NavLink>
            <NavLink className="header-link" to="/bbs">论坛</NavLink>
          </div>
      </Header>
    )
  }
}