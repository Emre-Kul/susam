import Mesh from '../core/mesh';

export default class Geometry {
  protected mesh: Mesh;
  protected meshCreatedBefore: boolean;
  constructor() {
    this.mesh = new Mesh();
    this.meshCreatedBefore = false;
  }

  getMesh() {
    return this.mesh;
  }

}
