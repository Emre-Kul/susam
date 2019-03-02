export default class ResourceManager {
  public resources: any;

  constructor() {
    this.resources = {};
  }

  load(id: string, loader: any) {
    this.resources[id] = loader.load();
  }

}
