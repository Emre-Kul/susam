import Shape from './shape';
import Transform from '../core/transform';
import Vector3 from '../math/vector3';
import Mesh from '../core/mesh';

export default class Rectangle extends Shape{
  public center: Vector3;
  public size: Vector3;

  constructor(center: Vector3 = new Vector3(),
              size: Vector3 = new Vector3(1, 1, 1)) {
    super();
    this.center = center;
    this.size = size;
  }

  public createMesh() {
    const c = this.center;
    const s = this.size;

    const vertices : number[] = [
      c.x - s.x / 2, c.y + s.y / 2, c.z,
      c.x - s.x / 2, c.y - s.y / 2, c.z,
      c.x + s.x / 2, c.y - s.y / 2, c.z,
      c.x + s.x / 2, c.y + s.y / 2, c.z,

    ];

    const indices: number[] = [3, 2, 1, 3, 1, 0];

    const transform = new Transform(new Vector3(0.1, 0 , 0));
    this.mesh = new Mesh(vertices, indices, transform);
  }
}
