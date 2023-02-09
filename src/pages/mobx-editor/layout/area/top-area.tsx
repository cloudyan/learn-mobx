import React from "react";

export default (props) => {
  const { area } = props

  return (
    <>
      <div className="lc-workbench-top-area-left">骨架工作台</div>
      <div className="lc-workbench-top-area-center">
        {area.items.map(item => <div className="lc-widget-item" key={item.name}>{item.content}</div>)}
      </div>
      <div className="lc-workbench-top-area-right">right</div>
    </>
  )
}
