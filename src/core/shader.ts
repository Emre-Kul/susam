export default class Shader {
  public vertex: any;
  public fragment: any;
  public ready: boolean;

  constructor(vertex: any = '', fragment: any = '', ready: boolean = false) {
    this.vertex = vertex;
    this.fragment = fragment;
    this.ready = ready;
  }

}
