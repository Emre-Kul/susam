import Mesh from '../core/mesh';
import Geometry from './geometry';

export default class CubeGeometry extends Geometry{

  private textureSize: number;

  constructor(textureSize: number = 1.0) {
    super();

    this.textureSize = textureSize;

  }

  getMesh() {
    if (this.meshCreatedBefore) return this.mesh;
    const vertices: number[] = [
      // Front face
      -1.0, -1.0,  1.0,
      1.0, -1.0,  1.0,
      1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
      1.0,  1.0,  1.0,
      1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
      1.0, -1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0,  1.0,  1.0,
      1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ];

    const textureVertices: number[] = [
      // Front face
      0.0, 0.0,
      this.textureSize, 0.0,
      this.textureSize, this.textureSize,
      0.0, this.textureSize,

      // Back face
      this.textureSize, 0.0,
      this.textureSize, this.textureSize,
      0.0, this.textureSize,
      0.0, 0.0,

      // Top face
      0.0, this.textureSize,
      0.0, 0.0,
      this.textureSize, 0.0,
      this.textureSize, this.textureSize,

      // Bottom face
      this.textureSize, this.textureSize,
      0.0, this.textureSize,
      0.0, 0.0,
      this.textureSize, 0.0,

      // Right face
      this.textureSize, 0.0,
      this.textureSize, this.textureSize,
      0.0, this.textureSize,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      this.textureSize, 0.0,
      this.textureSize, this.textureSize,
      0.0, this.textureSize,
    ];

    const normals: number[] = [
      // Front
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,

      // Back
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,

      // Top
      0.0,  1.0,  0.0,
      0.0,  1.0,  0.0,
      0.0,  1.0,  0.0,
      0.0,  1.0,  0.0,

      // Bottom
      0.0, -1.0,  0.0,
      0.0, -1.0,  0.0,
      0.0, -1.0,  0.0,
      0.0, -1.0,  0.0,

      // Right
      1.0,  0.0,  0.0,
      1.0,  0.0,  0.0,
      1.0,  0.0,  0.0,
      1.0,  0.0,  0.0,

      // Left
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
    ];

    const indices: number[] = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];

    this.mesh = new Mesh(vertices, indices, textureVertices, normals);
    this.meshCreatedBefore = true;

    return this.mesh;
  }
}
