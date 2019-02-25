export default class ResourceManager {
  public id: string;
  public loader: any;

  constructor(id: string, loader: any) {
    this.id = id;
    this.loader = loader;
  }

  load() {
    this.loader.load();
  }
}
