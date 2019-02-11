import Transform from './transform';

export default class Mesh {
  public transform: Transform;
  public vertices: number[];

  constructor(vertices: number[] = [], transform: Transform = new Transform()) {
    this.vertices = vertices;
    this.transform = transform;
  }

}
