import React, { useContext, useEffect, useState } from 'react'
import { observer, useLocalObservable, Observer } from 'mobx-react'
import { observable, runInAction } from 'mobx'
import toDoList, { Status, ToDoList } from '../../mobx/todo'
import todoContext from './todoContext'

(window as any).toDoList = toDoList

export default class MobXReact extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        {/* <ToDoListDemoGlobalInstance/> */}
        {/* <ToDoListDemoByProps toDoList={toDoList}/> */}
        {/* <todoContext.Provider value={toDoList}>
          <ToDoListDemoByContext/>
        </todoContext.Provider> */}
        <ToDoListFuncDemoLocalInstance/>
        {/* <ToDoListClassDemoLocalInstance/> */}
        {/* <LocalObservableDemo/> */}
        {/* <UseLocalObservableDemo/> */}
        {/* <ObservableDemo/> */}
        {/* <RenderPropsMobx
          render={
            () => <Observer>{() => <div>{toDoList.searchStatus}</div>}</Observer>
          }
        /> */}
      </>
    );
  }
}

// 停止使用装饰器 bye bye decorators https://michel.codes/blogs/mobx6
// 装饰器代码一键升级到 mobx@6 代码 `npx mobx-undecorate`
// import {observable, computed, action, makeObservable} from "mobx"
// // Before:
// class TodoStore {
//   @observable
//   todos: Todo[] = []

//   @computed
//   get unfinishedTodoCount() {
//     return this.todos.filter(todo => !todo.done).length
//   }

//   @action
//   addTodo(todo: Todo) {
//     this.todos.push(todo)
//   }
// }

// // After:
// class TodoStore {
//   todos: Todo[] = []
//   constructor() {
//     makeObservable(this, {
//       todos: observable,
//       unfinishedTodoCount: computed,
//       addTodo: action
//     })
//   }
//   get unfinishedTodoCount() {
//     return this.todos.filter(todo => !todo.done).length
//   }
//   addTodo(todo: Todo) {
//     this.todos.push(todo)
//   }
// }
//
// 还有函数式组件
// const SimpleLogo = observer(() => {
//   return <>123 logo</>
// })

const ToDoListDemoGlobalInstance = observer(
  class extends React.Component<{}, {}> {
    componentDidMount() {
      setTimeout(() => {
        console.log(Status, toDoList)
        toDoList.changeStatus(Status.finished)
      }, 1000);

      setTimeout(() => {
        // 不通过 action 操作，会收到警告（启用了严格模式），以下有两种解决方案
        // [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ToDoList@3.searchStatus
        // toDoList.searchStatus = 0

        // 解决方案 1
        toDoList.changeStatus(0)

        // 解决方案 2
        // runInAction(() => {
        //   toDoList.searchStatus = 0
        // })
      }, 3000);
    }

    render() {
      return (
        <div>ToDoListDemoGlobalInstance - searchStatus: {toDoList.searchStatus}</div>
      )
    }
  }
)

@observer
class ToDoListDemoByProps extends React.Component<{toDoList: ToDoList}, {}> {
  componentDidMount() {
    setTimeout(() => {
      console.log(Status, toDoList)
      toDoList.changeStatus(Status.finished)
    }, 1000);

    setTimeout(() => {
      toDoList.searchStatus = 0
    }, 3000);
  }

  render() {
    return (
      <div>ToDoListDemoByProps - searchStatus: {this.props.toDoList.searchStatus}</div>
    )
  }
}

const ToDoListDemoByContext = observer(() => {
  const context = useContext(todoContext);
  useEffect(() => {
    setTimeout(() => {
      context.changeStatus(Status.finished)
    }, 3000);
  })
  return (
    <div>ToDoListDemoByContext - searchStatus: {context.searchStatus}</div>
  )
})

const ToDoListFuncDemoLocalInstance = observer(() => {
  // 不需要使用 setState 更新状态
  // useState 接收一个函数,（这里和直接传入 new ToDoList() 是一样的）
  // const [ todoList ] = useState(new ToDoList())
  const [ todoList ] = useState(() => new ToDoList())
  useEffect(() => {
    setTimeout(() => {
      todoList.changeStatus(Status.finished)
    }, 1000);

    // TODO: 这样调用有问题，导致渲染值会不断来回 0, 1 互改
    // setTimeout(() => {
    //   todoList.changeStatus(0)
    // }, 3000);
  })
  return (
    <div>ToDoListDemoLocalInstance - searchStatus: {todoList.searchStatus}</div>
  )
})

@observer
class ToDoListClassDemoLocalInstance extends React.Component<{}, {}> {
  todoList = new ToDoList()
  componentDidMount() {
    setTimeout(() => {
      this.todoList.changeStatus(Status.finished)
    }, 3000);
  }
  render() {
    return <div>ToDoListDemoLocalInstance - searchStatus: {this.todoList.searchStatus}</div>
  }
}

const LocalObservableDemo = observer(() => {
  const [counter] = useState(() => observable({
    count: 0,
    addCount() {
      this.count ++
    }
  }))

  return <>
    <div>{counter.count}</div>
    <button onClick={() => counter.addCount()}>add</button>
  </>
})


const UseLocalObservableDemo = observer(() => {
  const counter = useLocalObservable(() => ({
    count: 0,
    addCount() {
      this.count ++
    }
  }))

  return <>
    <div>{counter.count}</div>
    <button onClick={() => counter.addCount()}>add</button>
  </>
})

class ObservableDemo extends React.Component<{},{}> {
  componentDidMount() {
    setTimeout(() => {
      toDoList.changeStatus(Status.finished)
    }, 1000);

    // 这样不行，为什么？
    // setTimeout(() => {
    //   toDoList.changeStatus(0)
    // }, 3000);
  }
  render() {
    return (
    <>
      <div>{toDoList.searchStatus || '-'}</div>
      <Observer render={() => <div>{toDoList.searchStatus || '-'}</div>}/>
    </>
    )
  }
}

const RenderPropsMobx = function RenderPropsMobx(props: {render: () => React.ReactNode}) {
  setTimeout(() => {
    toDoList.changeStatus(0)
  }, 3000)

  return (
    <div>
      render props API
      {props.render()}
    </div>
  )
}


// antd 的 ConfigProvider 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。
// https://ant.design/components/config-provider-cn
