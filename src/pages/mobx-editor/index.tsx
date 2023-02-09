import React, {createElement, useState, useEffect} from 'react'
import { createRoot } from 'react-dom/client';
import { observer } from 'mobx-react'
import {
  config,
  init,
} from './core'
import './index.less'
import './plugin'

// 实现一个低代码工作台界面
// 支持常见的扩展位，并通过配置管理

config.setConfig({
  'device': 'mobile',
  'id': 5,
})

init();

export default () => {
  return <>loading</>
}
