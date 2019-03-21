import React from 'react'
import { Avatar, Row, Col, Button } from 'antd'

export default function UserInfo(props) {
  return (
    <div className="user-info">
      <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>{props.userData.userdesc.charAt(0)}</Avatar>
      <p style={{ marginTop: 10, paddingBottom: 10, borderBottom: '1px solid #ccc' }}>{props.userData.userdesc}</p>
      <Row className="user-info-more" style={{ marginBottom: 20 }}>
        <Col span={12} className="user-more-left" style={{ padding: 20, height: 100, borderRight: '1px solid #ccc' }}>
          <span>10</span>
          <br />
          <span>发帖数</span>
        </Col>
        <Col span={12} className="user-more-right" style={{ padding: 20, height: 100 }}>
          <span>55</span>
          <br />
          <span>回复数</span>
        </Col>
      </Row>
      <Button block type="danger" onClick={props.logout}>登出</Button>
    </div>
  )
}