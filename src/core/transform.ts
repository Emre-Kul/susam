import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

export default class Transform {
  public position : Vector3;
  public scale : Vector3;
  public rotate : Vector3;

  public modelMatrix: any;

  constructor() {
    this.position = new Vector3();
    this.scale = new Vector3(1, 1, 1);
    this.rotate = new Vector3();
    this.modelMatrix = null;
  }

  calcModelMatrix() {
    const matrix = new Matrix4();
    this.modelMatrix = matrix.unit();
  }

}
