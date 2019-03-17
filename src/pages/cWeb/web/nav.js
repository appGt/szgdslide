import React from 'react'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
function Nav(props) {
  return (
    <div className="web-nav">
      <div className="web-nav-item">
        <NavLink to="/web">
          <Icon type="home" theme="filled" style={{ fontSize: 25, marginRight: 10 }} />
          首页
        </NavLink>
      </div>
      <div className="web-nav-item">
        <NavLink to="/web/news">新闻</NavLink>
      </div>
      <div className="web-nav-item">
        <NavLink to="/web/video">视频</NavLink>
      </div>
      <div className="web-nav-item">
        <NavLink to="/web/bbs">社区</NavLink>
      </div>
      <div className="web-nav-item">
        <NavLink to="/web/shop">商城</NavLink>
      </div>
      <div className="web-nav-item">
        <NavLink to="/adminlogin">管理员登录</NavLink>
      </div>
    </div>
  )
}

export default Nav