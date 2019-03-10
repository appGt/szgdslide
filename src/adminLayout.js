import React from 'react'
import { Layout, Icon } from 'antd'
import MenuList from './components/NavLeft'
import './style/common.less'
const { Sider, Header, Content } = Layout

export default class AdminLayout extends React.Component {
  state = {
    collapsed: false,
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