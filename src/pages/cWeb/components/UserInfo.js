import React from 'react'
import { Avatar, Row, Col, Button } from 'antd'
export default function UserInfo(props) {
  const { answerNum, reviewNum, sendNum, user,orderNum } = props.userData
  return (
    <div className="user-info">
      <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>{user.userdesc.charAt(0)}</Avatar>
      <p style={{ marginTop: 10, paddingBottom: 10, borderBottom: '1px solid #ccc' }}>{user.userdesc}</p>
      {
        props.shop ? (<Row style={{ marginBottom: 20 }}>
          <Col span={12} className="user-more-right" style={{ padding: 10, height: 80, borderRight: '1px solid #ccc'  }}>
          <span>{orderNum}</span>
            <br />
            <span onClick={props.showOrder} style={{cursor:'pointer',color:'#1890ff'}}>我的订单</span>
          </Col>
        </Row>) : (<Row className="user-info-more" style={{ marginBottom: 20 }}>
          <Col span={8} className="user-more-left" style={{ padding: 20, height: 100, borderRight: '1px solid #ccc' }}>
            <span>{answerNum}</span>
            <br />
            <span>发帖数</span>
          </Col>
          <Col span={8} className="user-more-right" style={{ padding: 20, height: 100, borderRight: '1px solid #ccc' }}>
            <span>{reviewNum}</span>
            <br />
            <span>回帖数</span>
          </Col>
          <Col span={8} className="user-more-right" style={{ padding: 20, height: 100 }}>
            <span>{sendNum}</span>
            <br />
            <span>回复数</span>
          </Col>
        </Row>)
      }
      <Button block type="danger" onClick={props.logout}>登出</Button>
    </div>
  )
}