import React from 'react'
import { Carousel, Icon, Card } from 'antd';
import { NavLink } from 'react-router-dom'
import Nav from './nav'
import Top from './top'
import './web.less'
import './carousel.less'

export default class Web extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="web-body">
        <Top />
        <Nav />
        <Body />
        <Video />
        <Shop />
      </div>
    )
  }
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
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
        <li><NavLink to="/web/news/1">周末大放送！时间胶囊开启，Afterbang滑板片段回顾！</NavLink></li>
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

function Shop() {
  return (
    <Card title="热卖滑板" style={{ marginTop: 10 }}>
      <div className="video-warpper">
        <div className="video-item">
          <img src="http://dummyimage.com/262x181" alt="videoImg" />
          <div className="text">
            <p className="price">
              ￥<span className="price-num">200</span>
            </p>
            <p className="title">
              滑板1
          </p>
          </div>price-num
        </div>
        <div className="video-item">
          <img src="http://dummyimage.com/262x181" alt="videoImg" />
          <div className="text">
            <p className="price">
              ￥<span className="price-num">200</span>
            </p>
            <p className="title">
              【WHATSUP WKND】#262 山西滑板新秀：张少春&李卓洋
          </p>
          </div>
        </div>
        <div className="video-item">
          <img src="http://dummyimage.com/262x181" alt="videoImg" />
          <div className="text">
            <p className="price">
              ￥<span className="price-num">200</span>
            </p>
            <p className="title">
              【WHATSUP WKND】#262 山西滑板新秀：张少春&李卓洋
          </p>
          </div>
        </div>
        <div className="video-item">
          <div className="text">
            <img src="http://dummyimage.com/262x181" alt="videoImg" />
            <p className="price">
              ￥<span className="price-num">200</span>
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