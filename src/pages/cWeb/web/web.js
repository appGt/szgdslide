import React from 'react'
import { Card } from 'antd';
import Nav from './nav'
import Top from './top'
import Adver from './adver'
import News from './news'
import Video from './video'
import Shop from './shop'
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
      <Adver />
      <NewsList />
    </div>
  )
}

function NewsList() {
  return (
    <Card className="news-list" title="新闻">
      <News />
    </Card>
  )
}
