import React from 'react'
import Axios from 'axios';
import { Card, Row, Col } from 'antd'
import './index.less'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);
export default class Welcome extends React.Component {
  state = {
    showData: { dateNum: [] },
    animation: null,
  }
  componentWillMount() {
    this.getShowData()
  }

  getShowData = () => {
    Axios.get('/szgdslide/admin/indexShow').then((res) => {
      if (res.status === 200 && res.data.success) {
        let showData = res.data.data

        this.setState({
          animation1: {
            Children: {
              value: showData.registerNum,
              floatLength: 0
            },
            duration: 1000,
          },
          animation2: {
            Children: {
              value: showData.newNum,
              floatLength: 0
            },
            duration: 1000,
          },
          animation3: {
            Children: {
              value: showData.sendNum,
              floatLength: 0
            },
            duration: 1000,
          },
          animation4: {
            Children: {
              value: showData.viewNum,
              floatLength: 0
            },
            duration: 1000,
          },
          showData: res.data.data
        })
      }
    })
  }

  getOption = () => {
    let option = {
      title: {
        text: '成交额'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: this.state.showData.dateNum.map((item) => {
          return item.date
        })
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '成交额',
          type: 'line',
          data: this.state.showData.dateNum.map((item) => {
            return item.num
          })
        }
      ]
    }
    return option
  }
  render() {
    return (
      <div>
        <Card>
          <div className="data-item-wrapper">
            <div className="data-item">
              <div className="inside">
                <TweenOne
                  className="num"
                  animation={this.state.animation1}
                >
                  <p>0</p>
                </TweenOne>
                <p>今日注册数</p>
              </div>
            </div>
            <div className="data-item">
              <div className="inside">
                <TweenOne
                  className="num"
                  animation={this.state.animation2}
                >
                  0
                  </TweenOne>
                <p>今日新闻</p>
              </div>
            </div>
            <div className="data-item">
              <div className="inside">
                <TweenOne
                  className="num"
                  animation={this.state.animation3}
                >
                  0
                  </TweenOne>
                <p>今日帖子数</p>
              </div>
            </div>
            <div className="data-item">
              <div className="inside">
                <TweenOne
                  className="num"
                  animation={this.state.animation4}
                >
                  0
                  </TweenOne>
                <p>今日视频数</p>
              </div>
            </div>

          </div>
        </Card>
        <Card title="成交额" style={{ marginTop: 20 }}>
          <ReactEcharts option={this.getOption()} style={{ height: 500 }}></ReactEcharts>
        </Card>
      </div>
    )
  }
}