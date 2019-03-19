import React from 'react'
import { Layout, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import MenuList from './components/NavLeft'
import { withRouter } from 'react-router-dom'
import './style/common.less'
import Axios from 'axios';
const { Sider, Header, Content } = Layout

class AdminLayout extends React.Component {
  state = {
    collapsed: false,
  }

  loginOut = () => {
    Axios({
      url: '/szgdslide/admin/logout'
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        localStorage.removeItem('isLogin')
        this.props.history.push('/adminlogin')
      }
    })
  }

  onNavLeftToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <Layout>
        <Sider
          className="navLeft"
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <MenuList />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onNavLeftToggle}
            />
            <a onClick={this.loginOut} style={{ float: 'right', marginRight: 50 }} href="#">退出登录</a>
            <NavLink to="/" style={{ float: 'right', marginRight: 20 }}>首页</NavLink>
          </Header>
          <Content className="content">
            {
              this.props.children
            }
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(AdminLayout)