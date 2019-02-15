import Shape from './shape';
import Transform from '../core/transform';
import Vector3 from '../math/vector3';
import Mesh from '../core/mesh';

export default class Cube extends Shape{
  public center: Vector3;
  public size: Vector3;

  constructor(center: Vector3 = new Vector3(),
              size: Vector3 = new Vector3(1, 1, 1)) {
    super(new Transform());
    this.center = center;
    this.size = size;
  }

  public createMesh() {
    const c = this.center;
    const s = this.size;

    /*
    const cubeCords = [
      vec4(-1, -1, 1, 1),
      vec4(-1, 1, 1, 1),
      vec4(1, 1, 1, 1),
      vec4(1, -1, 1, 1),
      vec4(-1, -1, -1, 1),
      vec4(-1, 1, -1, 1),
      vec4(1, 1, -1, 1),
      vec4(1, -1, -1, 1)
    ];
    const cubeIndices = [
      //a, b, c, a, c, d
      1, 0, 3, 1, 3, 2,
      2, 3, 7, 2, 7, 6,
      3, 0, 4, 3, 4, 7,
      6, 5, 1, 6, 1, 2,
      4, 5, 6, 4, 6, 7,
      5, 4, 0, 5, 0, 1
    ];
    */

    const vertices : number[] = [
        // front
      c.x - s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y + s.y / 2, 0,
      c.x - s.x / 2, c.y + s.y / 2, 0,
        // back
      c.x - s.x / 4, c.y - s.y / 4, c.z - s.z / 2,
      c.x + s.x / 4, c.y - s.y / 4, c.z - s.z / 2,
      c.x + s.x / 4, c.y + s.y / 4, c.z - s.z / 2,
      c.x - s.x / 4, c.y + s.y / 4, c.z - s.z / 2,
        // top
      c.x - s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y + s.y / 2, 0,
      c.x - s.x / 2, c.y + s.y / 2, 0,
        // bottom
      c.x - s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y + s.y / 2, 0,
      c.x - s.x / 2, c.y + s.y / 2, 0,
        // right
      c.x - s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y + s.y / 2, 0,
      c.x - s.x / 2, c.y + s.y / 2, 0,
        // left
      c.x - s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y - s.y / 2, 0,
      c.x + s.x / 2, c.y + s.y / 2, 0,
      c.x - s.x / 2, c.y + s.y / 2, 0,
    ];
    this.mesh = new Mesh(vertices);
  }
}
