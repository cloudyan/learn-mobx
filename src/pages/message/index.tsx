import mobx, {
  makeAutoObservable,
  autorun,
  reaction,
  when,
  runInAction,
  trace,
  getDependencyTree,
  toJS,
} from 'mobx'
import { useEffect, useState } from 'react'


// 了解响应式
// https://mobx.js.org/understanding-reactivity.html
// MobX 跟踪属性的访问，而不是属性的值本身
// 这里有许多示例，明确指出了使用误区等
// 总结: MobX reacts to any existing observable property that is read during the execution of a tracked function.
// Mobx 会对跟踪函数执行时读取的任何 存在的 可观测的 属性 做出响应。

class Message {
  title
  author
  likes
  constructor(title, author, likes) {
    makeAutoObservable(this)
    this.title = title
    this.author = author
    this.likes = likes
  }

  updateTitle(title) {
    this.title = title
  }
}

let message = new Message("Foo", { name: "Michel" }, ["Joe", "Sara"])

// 1.
// autorun(() => {
//   console.log(message.title)
// })

// const disposer = autorun(() => {
//   console.log(message.title)
//   trace()
// })
// console.log(getDependencyTree(disposer))

// let time = 0;
// setInterval(() => {
//   if (time < 5) {
//     message.updateTitle(message.title === 'Foo' ? 'Bar' : 'Foo')
//     console.log(time)
//   }
//   time++
// }, 1000)

// ❌ 错误用法
// autorun 跟踪之前就取消了引用
// let title = message.title
// autorun(() => {
//     console.log(title)
// })
// message.updateMessage("Bar")


// ✅
// 必须在runInAction这里使用才能允许在action
autorun(() => {
  console.log('author', message.author.name)
})

runInAction(() => {
  message.author.name = "Sara"
})
runInAction(() => {
  message.author = { name: "Joe" }
})


// ❌ 错误用法
// message 没发生变化
autorun(() => {
  console.log('err', message)
})
// ✅ 正确用法
autorun(() => {
  console.log('1', message.title)
})
autorun(() => {
  // https://mobx.js.org/api.html#tojs
  console.log('2', toJS(message))
})
autorun(() => {
  console.log('3', {...message})
})
autorun(() => {
  console.log('4', JSON.stringify(message))
})

// Won't trigger a re-run.
message.updateTitle("Hello world")

export default () => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    autorun(() => {
      setTitle(message.title)
    })
  }, [])

  return <>
    {/* Message: {title} */}
    {message.title}
  </>
}
