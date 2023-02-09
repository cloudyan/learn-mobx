
import { makeObservable, makeAutoObservable, observable, action, computed, runInAction, autorun, override } from 'mobx'

class EditorConfig {
  readonly config: {} = {};
  constructor(options = {}) {
    this.config = options
    makeAutoObservable(this, {
      config: observable,
    })
  }

  set(name: string, value: any) {
    this.config[name] = value;
  }

  get(name) {
    return this.config[name]
  }
}

export default new EditorConfig({})
