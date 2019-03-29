import React from 'react'
import { Card } from 'antd'
import { NavLink } from 'react-router-dom'
import Axios from 'axios';

export default class Shop extends React.Component {

  state = {
    goodList: []
  }
  componentWillMount() {
    this.getVideo()
  }

  getVideo = () => {
    Axios
      .get('/szgdslide/admin/listGoods?pageSize=4')
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          this.setState({
            goodList: res.data.data.result
          })
        }
      })
  }
  render() {
    const { goodList } = this.state
    return (
      <div>
        <Card title="热卖商品" style={{ marginTop: 10, marginBottom: 30 }}>
          <div className="video-warpper">
            {
              goodList.map((item, i) => {
                return (<div className="video-item" key={i}>
                  <NavLink to={'/shop/' + item.id} target="_blank"><img src={item.path} alt="videoImg" style={{width:'100%',height:183}}/></NavLink>
                  <div className="text">
                    <p className="price">
                      ￥<span className="price-num">{item.price}</span>
                    </p>
                    <p className="title">
                      <NavLink to={'/shop/' + item.id} target="_blank">{item.name}</NavLink>
                    </p>
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