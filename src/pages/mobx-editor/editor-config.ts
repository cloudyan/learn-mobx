import { makeAutoObservable } from "@/utils/obx";

interface IEditorConfig {
  [key: string]: any
}

class EditorConfig {
  private config: IEditorConfig = {};

  constructor(config?: IEditorConfig) {
    makeAutoObservable(this)
    this.config = config || {};
  }

  set(name: string, value: any) {
    this.config[name] = value;
  }

  get(name: string) {
    return this.config[name]
  }

  has(name: string) {
    return this.config[name] !== 'undefined'
  }

  setConfig(config: IEditorConfig) {
    if (config) {
      Object.keys(config).forEach((key) => {
        this.set(key, config[key]);
      });
    }
  }
}

export default new EditorConfig({})
