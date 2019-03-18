export default class ObjectLoader{

  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  load() {
    console.log(this.url);
    return 1;
  }

}
