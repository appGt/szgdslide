import React from 'react'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
function Nav(props) {
  return (
    <div className="web-nav">
      <NavLink className="web-nav-item" to="/">
        <Icon type="home" theme="filled" style={{ fontSize: 25, marginRight: 10 }} />
        首页
        </NavLink>
      <NavLink className="web-nav-item" to="/news">新闻</NavLink>
      <NavLink className="web-nav-item" to="/video">视频</NavLink>
      <NavLink className="web-nav-item" to="/bbs">社区</NavLink>
      <NavLink className="web-nav-item" to="/shop">商城</NavLink>
      {/* <NavLink className="web-nav-item" to="/adminlogin">管理员登录</NavLink> */}
    </div>
  )
}

export default Nav