import React from 'react'
import { NavLink } from 'react-router-dom'
import './goodItem.less'
export default function GoodsItem(props) {
  return (
    <div className="good-item">
      <NavLink to={'/shop/' + props.id}><img src={props.path || "http://dummyimage.com/262x181"} alt="videoImg" /></NavLink>
      <div className="text">
        <p className="price">
          <span className="price-num">价格：￥{props.price}</span>

          <span style={{marginLeft:50}}>销量：{props.saleNum}</span>
        </p>
        <p className="title">
          <NavLink to={'/shop/' + props.id}>{props.name}</NavLink>
        </p>
      </div>
    </div>
  )
}