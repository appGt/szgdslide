import React from 'react'
import { Menu, Icon } from 'antd'
import menuConfig from './../../config/menuConfig'
import { NavLink } from 'react-router-dom'
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component {
  componentWillMount() {
    let menuList = this.renderMenu(menuConfig)
    this.setState({
      menuList
    })
    // const IconFont = Icon.createFromIconfontCN({
    //   scriptUrl: '//at.alicdn.com/t/font_1074642_e1fgru0spu.js'
    // })
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
            key={item.key}
          >
            {
              this.renderMenu(item.children)
            }
          </SubMenu>
        )
      }
      return <MenuItem title={item.title} key={item.key}>
        <NavLink to={item.key}>
          {
            item.icon ? <Icon type={item.icon} /> : ''
          }
          <span>
            {item.title}
          </span>
        </NavLink>
      </MenuItem>
    })
  }
  render() {
    return (
      <Menu theme="dark" mode="vertical" >
        {
          this.state.menuList
        }
      </Menu>
    )
  }
}