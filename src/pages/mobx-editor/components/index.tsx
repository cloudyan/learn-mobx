import React, {useState} from 'react'
import { observer } from '@/utils/obx'

export const Theme = observer((props) => {

  const onChange = () => {
    props.config.set('device', props.config.get('device') === 'mobile' ? 'pc' : 'mobile')
    // setDevice(props.config.get('device'))
  }

  return <>
    <button title="切换设备" onClick={onChange}>device: { props.config.get('device') }</button>
  </>
})


export const TopPanel = (props) => {
  console.log('TopPanel', props)
  return <>
     {/* 顶部扩展: {props.title} */}
     <Theme config={props.config} />
  </>
}



export const ComponentsPanel = (props: {title?: string}) => {
  return <>
    组件面板: {props.title}
  </>
}


export const CanvasPanel = (props: {title?: string}) => {
  return <>
    画布面板: {props.title}
  </>
}


export const SettersPanel = (props: {title?: string}) => {
  return <>
    设置器面板: {props.title}
  </>
}
