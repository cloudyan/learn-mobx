
import { makeAutoObservable } from '@/utils/obx';
import { AreaEnums } from './types';

export default class AreaContainer {
  readonly areaName: string;
  items: [] = [];

  constructor(areaName: AreaEnums) {
    this.areaName = areaName;
    makeAutoObservable(this)
  }

  add(config, item) {
    const current = this.items.find(item => item.name === config.name)

    if (!current) {
      this.items.push(item)
      return item
    } else {
      console.warn(`${this.areaName} 已存在扩展 ${config.name}`)
      return current
    }
  }

  remove(name: string) {
    const len = this.items.length;
    this.items = this.items.filter(item => item.name === name)
    return this.items.length !== len
  }
}
