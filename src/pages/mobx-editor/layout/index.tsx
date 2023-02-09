import React, { Component } from 'react'
import { makeObservable, makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Skeleton } from '../skeleton';
import {
  TopArea,
  LeftArea,
  ToolArea,
  MainArea,
  RightArea,
} from './area'

import './index.less'

export const Workbench = observer((props: {skeleton: Skeleton, config?: any}) => {

  const { skeleton, className, topAreaItemClassName, config } = props;

  return (
    <div className="lc-workbench">
      <div className="lc-workbench-top-area">
        <TopArea area={skeleton.topArea} config={config} />
      </div>
      <div className="lc-workbench-body">
        <div className="lc-workbench-left-area">
          <LeftArea area={skeleton.leftArea} config={config} />
        </div>
        <div className="lc-workbench-main-area">
          <ToolArea area={skeleton.toolArea} config={config} />
          <MainArea area={skeleton.mainArea} config={config} />
        </div>
        <div className="lc-workbench-right-area">
          <RightArea area={skeleton.rightArea} config={config} />
        </div>
      </div>
    </div>
  );
})


