export default class Texture {
  public id: string;
  public image: string;
  public data: any;

  constructor(id: string = '', image: string = '') {
    this.id = id;
    this.image = image;
    this.data = null;
  }

}
