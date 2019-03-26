import React from 'react'
import { Card } from 'antd'
import { NavLink } from 'react-router-dom'
import Axios from 'axios';

export default class Video extends React.Component {

  state = {
    videoList: []
  }
  componentWillMount() {
    this.getVideo()
  }

  getVideo = () => {
    Axios
      .get('/szgdslide/admin/listVideos?pageSize=4')
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          this.setState({
            videoList: res.data.data.result
          })
        }
      })
  }
  render() {
    const { videoList } = this.state
    return (
      <div>
        <Card title="精彩视频" style={{ marginTop: 10 }}>
          <div className="video-warpper">
            {
              videoList.map((item, i) => {
                return (<div className="video-item" key={i}>
                  <NavLink to={"/video/" + item.id} target="_blank"> <img src={item.imgpath} alt="videoImg" style={{ width: 262, height: 181 }} /></NavLink>
                  <div className="text">
                    <p className="play-count"><span className="count">{item.browes}</span> 次播放</p>
                    <p className="title"><NavLink to={"/video/" + item.id} target="_blank">{item.title}</NavLink></p>
                  </div>
                </div>)
              })
            }


          </div>
        </Card>
      </div>
    )
  }
}