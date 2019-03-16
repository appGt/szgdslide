import React from 'react'
import { Carousel, Icon, Card } from 'antd';
import { NavLink } from 'react-router-dom'
import './web.less'
import './carousel.less'

export default class Web extends React.Component {
  render() {
    return (
      <div className="web-body">
        <Top />
        <Nav />
        <Body />
        <Video />
      </div>
    )
  }
}

function Top(props) {
  return (
    <div className="web-top">
      <div className="web-logo">
        滑板网
       </div>
    </div>
  )
}

function Nav(props) {
  return (
    <div className="web-nav">
      <div className="web-nav-item">
        <NavLink to="/web/news">
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
    </div>
  )
}

function Body() {
  return (
    <div className="clearfix" style={{ marginTop: 10 }}>
      <Carousel style={{ float: 'left' }}>
        <div className="carousel-item">
          <img src="http://dummyimage.com/715x414" alt="carousel" />
          <p className="text">Nike SB X Frog超萌小青蛙合作款3月16号正式发布！</p>
        </div>
        <div className="carousel-item">
          <img src="http://dummyimage.com/715x414" alt="carousel" />
          <p className="text">Nike SB X Frog超萌小青蛙合作款3月16号正式发布！</p>
        </div>
        <div className="carousel-item">
          <img src="http://dummyimage.com/715x414" alt="carousel" />
          <p className="text">Nike SB X Frog超萌小青蛙合作款3月16号正式发布！</p>
        </div>
        <div className="carousel-item">
          <img src="http://dummyimage.com/715x414" alt="carousel" />
          <p className="text">Nike SB X Frog超萌小青蛙合作款3月16号正式发布！</p>
        </div>
      </Carousel>
      <NewsList />
    </div>
  )
}

function NewsList() {
  return (
    <Card className="news-list" title="资讯">
      <ul>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
        <li><a href="#">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</a></li>
      </ul>
    </Card>
  )
}

function Video() {
  return (
    <Card title="精彩视频" style={{ marginTop: 10 }}>
      <div className="video-warpper">
        <div className="video-item">
          <img src="http://dummyimage.com/262x181" alt="videoImg" />
          <div className="text">
            <p className="play-count">
              <span className="count">1000</span> 次播放
          </p>
            <p className="title">
              【WHATSUP WKND】#262 山西滑板新秀：张少春&李卓洋
          </p>
          </div>
        </div>
        <div className="video-item">
          <img src="http://dummyimage.com/262x181" alt="videoImg" />
          <div className="text">
            <p className="play-count">
              <span className="count">1000</span> 次播放
          </p>
            <p className="title">
              【WHATSUP WKND】#262 山西滑板新秀：张少春&李卓洋
          </p>
          </div>
        </div>
        <div className="video-item">
          <img src="http://dummyimage.com/262x181" alt="videoImg" />
          <div className="text">
            <p className="play-count">
              <span className="count">1000</span> 次播放
          </p>
            <p className="title">
              【WHATSUP WKND】#262 山西滑板新秀：张少春&李卓洋
          </p>
          </div>
        </div>
        <div className="video-item">
          <div className="text">
            <img src="http://dummyimage.com/262x181" alt="videoImg" />
            <p className="play-count">
              <span className="count">1000</span> 次播放
          </p>
            <p className="title">
              【WHATSUP WKND】#262 山西滑板新秀：张少春&李卓洋
          </p>
          </div>
        </div>
      </div>
    </Card>
  )
}