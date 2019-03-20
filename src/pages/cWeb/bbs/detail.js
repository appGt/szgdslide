import React from 'react'
import { Button, Avatar } from 'antd'
import { withRoute } from 'react-router-dom'
import Axios from 'axios';

class BBSDetail extends React.Component {
  componentWillMount() {
    let id = this.props.match.params.id
    if (id){
      Axios({
        methos: 'post',
        url: '/szgdslide/admin/detailSend',
        
      })
    } else {
      
    }
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default withRoute(BBSDetail)