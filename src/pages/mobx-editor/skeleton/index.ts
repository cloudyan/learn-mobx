import { createElement } from 'react';
import { observable, makeObservable, makeAutoObservable } from '@/utils/obx';
import AreaContainer from './area-container'
import Widget from './widget';

import { AreaEnums } from './types';

// 装饰器只能用于装饰 class component，不能装饰函数式组件
export class Skeleton {
  readonly editor;
  private containers = new Map<string, {}>();
  readonly topArea;
  readonly leftArea;
  readonly toolArea;
  readonly mainArea;
  readonly rightArea;

  constructor(editor) {
    makeObservable(this, {
      editor: observable,
    })

    this.editor = editor
    // makeAutoObservable(this, {
    // })
    this.topArea = new AreaContainer('topArea')
    this.leftArea = new AreaContainer('leftArea')
    this.toolArea = new AreaContainer('toolArea')
    this.mainArea = new AreaContainer('mainArea')
    this.rightArea = new AreaContainer('rightArea')
  }

  add(config) {
    console.log('skeleton add', config);
    const { area } = config;

    let item = new Widget(config.name, config)
    // let item = createElement(config.content, config.contentProps)
    console.log(item)
    switch (area) {
      case 'topArea':
      case 'leftArea':
      case 'toolArea':
      case 'mainArea':
      case 'rightArea':
        return this[area].add(config, item)
      default:
        // do nothing...
        const errArea: never = area;
        console.error(`${errArea} 扩展区不存在`)
    }
  }

  remove(area: AreaEnums, name: string) {
    switch (area) {
      case 'topArea':
      case 'leftArea':
      case 'toolArea':
      case 'mainArea':
      case 'rightArea':
        return this[area].remove(name)
      default:
        // do nothing...
    }
  }
}
