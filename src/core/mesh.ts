import Transform from './transform';
import Color from '../graphics/color';

export default class Mesh {
  public transform: Transform;
  public vertices: number[];
  public indices: number[];
  public color: Color;

  constructor(vertices: number[] = [],
              indices: number[] = [],
              transform: Transform = new Transform(),
              color: Color = new Color()) {
    this.vertices = vertices;
    this.transform = transform;
    this.indices = indices;
    this.color = color;
  }

}
