import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

export default class Transform {
  public position : Vector3;
  public scale : Vector3;
  public rotate : Vector3;

  public modelMatrix: any;

  constructor(position: Vector3 = new Vector3(),
              scale: Vector3 = new Vector3(1, 1, 1),
              rotate: Vector3 = new Vector3(),
  ) {
    this.position = position;
    this.scale = scale;
    this.rotate = rotate;
    this.modelMatrix = null;
  }

  calcModelMatrix() {
    const scaleMtr = Matrix4.scale(this.scale);
    const translateMtr = Matrix4.translate(this.position);
    this.modelMatrix = Matrix4.multiply([scaleMtr, translateMtr]);
    console.log(this.modelMatrix);
  }

}
