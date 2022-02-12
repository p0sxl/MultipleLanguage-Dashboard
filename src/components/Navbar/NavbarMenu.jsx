import React from 'react'
import { Menu } from 'antd';
import {HomeOutlined,ProjectOutlined,UserOutlined,TranslationOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

const NavbarMenu = () => {
  return (
    <Menu className="navbar-menu" onClick={1} selectedKeys={[1]} mode="horizontal" style={{borderBottom : '1px solid #dbdbdb'}}>
    <Menu.Item key="mail" icon={<HomeOutlined />} >
      Home
    </Menu.Item>
    <Menu.Item key="app"  icon={<ProjectOutlined />}>
    <Link to="/projects">Project</Link>
    </Menu.Item>
    <Menu.Item key="users"  icon={<UserOutlined />}>
      <Link to="/users">Users</Link>
    </Menu.Item>

    <Menu.Item key="alipay" icon={<TranslationOutlined />}>
    <Link to="/translations">Translations</Link>

    </Menu.Item>
  </Menu>
  )
}

export default NavbarMenu