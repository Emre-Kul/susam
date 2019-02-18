import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

export default class Transform {
  public position : Vector3;
  public scale : Vector3;
  public rotate : Vector3;
  public rotationAngle: number;

  public modelMatrix: Matrix4;

  constructor(position: Vector3 = new Vector3(),
              scale: Vector3 = new Vector3(1, 1, 1),
              rotate: Vector3 = new Vector3(),
              rotationAngle: number = 10,
  ) {
    this.position = position;
    this.scale = scale;
    this.rotate = rotate;
    this.rotationAngle = rotationAngle;
    this.modelMatrix = Matrix4.create();

  }

  createModelMatrix() {
    const t = Matrix4.create();
    const s = Matrix4.create();
    const rx = Matrix4.create();
    const ry = Matrix4.create();
    const rz = Matrix4.create();
    let r;

    t.translate(this.position);
    s.scale(this.scale);
    rx.rotateX(this.rotate.x * this.rotationAngle);
    ry.rotateY(this.rotate.y * this.rotationAngle);
    rz.rotateZ(this.rotate.z * this.rotationAngle);

    r = Matrix4.multiply(Matrix4.multiply(rx, ry), rz);
    this.modelMatrix = Matrix4.multiply(Matrix4.multiply(t, s), r);
  }

}
