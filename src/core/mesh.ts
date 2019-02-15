import Transform from './transform';

export default class Mesh {
  public transform: Transform;
  public vertices: number[];
  public indices: number[];

  constructor(vertices: number[] = [],
              indices: number[] = [],
              transform: Transform = new Transform()) {
    this.vertices = vertices;
    this.transform = transform;
    this.indices = indices;
  }

}
