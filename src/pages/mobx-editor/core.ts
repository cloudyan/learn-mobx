
import React, {createElement, useState, useEffect} from 'react'
import { createRoot } from 'react-dom/client';
import config from './editor-config'
import { Workbench } from './layout'
import { Skeleton } from './skeleton'
import { Editor } from './editor'

const editor = new Editor()
const skeleton = new Skeleton(editor)

// test
window.config = config;

export {
  config,
  Workbench,
  editor,
  skeleton,
  delay,
  init,
}

const delay = (time: number, data?: any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data)
  }, time)
})

// container which will host LowCodeEngine DOM
// 1. 初始化数据 文档模型
// 2. 创建并挂载工作台
async function init(
  container?: HTMLElement,
  options: {} = {},
) {

  await delay(10);
  if (!container) {
    container = document.createElement('div')
    container.id = 'lowcode_container'
    document.body.appendChild(container)
  }

  const root = createRoot(container)
  root.render(
    createElement(Workbench, {
      skeleton: skeleton,
      config,
      // className: 'engine-main',
    })
  );
}
