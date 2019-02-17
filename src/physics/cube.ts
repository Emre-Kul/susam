import Shape from './shape';
import Transform from '../core/transform';
import Vector3 from '../math/vector3';
import Mesh from '../core/mesh';

export default class Cube extends Shape{

  constructor() {
    super();
  }

  public createMesh() {
    const vertices: number[] = [
      // Front face
      -0.1, -0.1,  0.1,
      0.1, -0.1,  0.1,
      0.1,  0.1,  0.1,
      -0.1,  0.1,  0.1,

      // Back face
      -0.1, -0.1, -0.1,
      -0.1,  0.1, -0.1,
      0.1,  0.1, -0.1,
      0.1, -0.1, -0.1,

      // Top face
      -0.1,  0.1, -0.1,
      -0.1,  0.1,  0.1,
      0.1,  0.1,  0.1,
      0.1,  0.1, -0.1,

      // Bottom face
      -0.1, -0.1, -0.1,
      0.1, -0.1, -0.1,
      0.1, -0.1,  0.1,
      -0.1, -0.1,  0.1,

      // Right face
      0.1, -0.1, -0.1,
      0.1,  0.1, -0.1,
      0.1,  0.1,  0.1,
      0.1, -0.1,  0.1,

      // Left face
      -0.1, -0.1, -0.1,
      -0.1, -0.1,  0.1,
      -0.1,  0.1,  0.1,
      -0.1,  0.1, -0.1,
    ];

    const indices: number[] = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];

    const transform = new Transform(new Vector3(0, 0, 0));
    transform.calcModelMatrix();
    this.mesh = new Mesh(vertices, indices, transform);
  }
}
