export default class Shader {
  public vertex: any;
  public fragment: any;

  constructor(vertex: any, fragment: any) {
    this.vertex = vertex;
    this.fragment = fragment;
  }

}
