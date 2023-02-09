import React, { useEffect } from 'react'
import { autorun, reaction, when, runInAction } from 'mobx'
import toDoList, { Status, waitTime } from '../../mobx/todo'


// 先看官方文档，结合官方示例 https://mobx.js.org/getting-started.html
// 了解各个方法的能力，什么作用及限制
//     概念: https://cn.mobx.js.org/intro/concepts.html
// 1. autorun
// 2. runInAction
// 3. reaction
// 4. when
//      https://cn.mobx.js.org/refguide/when.html
// waitTrue 怎么用的
export default function MobxStart() {

    useEffect(() => {
        autorun(async () => {
            // 会跟踪 toDoList.list.length 的变化
            console.log(toDoList.list.length, 'todo')

            await waitTime()
            // 不会跟踪 toDoList.searchStatus 的变化
            console.log(toDoList.searchStatus, 'searchStatus async')
        })
        autorun(() => {
            runInAction(() => {
                // toDoList.searchStatus 在action中被读取，它不会被跟踪。
                console.log(toDoList.searchStatus)
            })
            console.log(toDoList.displayList, 'displayList')
        })
        autorun(() => {
            console.log(toDoList.searchStatus, 'searchStatus')
        })
        autorun(() => {
            if (toDoList.list.length) {
                console.log(toDoList.list[0]?.status,'status')
            }
        })
        reaction(() => {
            const j = toDoList.searchStatus
            return toDoList.list.length
        }, () => {
            toDoList.list[0].changeStatus(Status.finished)
        })
        when(() => {
            const j = toDoList.searchStatus
            return toDoList.list.length > 2
        }, () => {
            console.log('disposer when')
        })

        async function waitTrue(){
            await when(() => toDoList.list.length > 2)
            // 直到 toDoList.list.length > 2 为true，才会运行到这里（？怎么用呢, 如上面的 when）
            console.log('list.length > 2')
        }
    }, [])

    const onClickSearchKey = () => {
        toDoList.changeStatus(Status.default)
    }

    const onClickAdd = () => {
        toDoList.addItem(Math.random() + '')
    }

    const onfetch = () => {
        console.log('onfetch')
        toDoList.fetchInitData()
    }

    return (
        <div>
            <button onClick={onfetch}>fetch</button>
            <button onClick={onClickSearchKey}>searchKey </button>
            <button onClick={onClickAdd}>todo </button>
        </div>
    )
}
