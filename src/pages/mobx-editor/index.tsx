import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react'
import editorConfig from './config'

// 一个简单的编辑器实例
// 修改编辑器配置，界面自动更新

editorConfig.set('id', 5)

const MobxEditor = observer((props) => {
  const [inputValue, setInput] = useState('')

  const onChangeInput = (e) => {
    setInput(e.target.value.trim())
  }

  const changeConfig = () => {
    console.log(+new Date())
    let id = editorConfig.get('id')
    editorConfig.set('id', id+1)
  }

  const editorId = editorConfig.get('id')
  return <>
    <h2>编辑</h2>
    <input value={inputValue} onChange={onChangeInput} />
    <div>
      <div>{editorId}</div>
      <button onClick={changeConfig}>更新编辑器 ID</button>
    </div>
  </>
})

export default MobxEditor
