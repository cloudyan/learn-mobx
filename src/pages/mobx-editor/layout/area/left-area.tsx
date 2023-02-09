import React from 'react';

export default (props) => {
  const { area } = props

  return (
    <div className="lc-widget">
      {area.items.map((item, index) => <div className="lc-widget-item" key={item.name || index}>121 {item.content}</div>)}
    </div>
  )
}
