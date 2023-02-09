import { observer } from '@/utils/obx';
import React from 'react';

export default observer((props) => {
  const { area } = props

  return (
    <div className="lc-widget">
      {props.config.get('device')}
      {area.items.map(item => <div className="lc-widget-item" key={item.name}>{item.content}</div>)}
    </div>
  )
})
