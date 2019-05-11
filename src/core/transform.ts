import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

export default class Transform {
  get rotate(): Vector3 {
    return this._rotate;
  }

  set rotate(value: Vector3) {
    this._rotate = value;
    this.calculateModelMatrix();
  }
  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
    this.calculateModelMatrix();
  }
  get scale(): Vector3 {
    return this._scale;
  }

  set scale(value: Vector3) {
    this._scale = value;
    this.calculateModelMatrix();
  }

  get rotationAngle(): number {
    return this._rotationAngle;
  }

  set rotationAngle(value: number) {
    this._rotationAngle = value;
    this.calculateModelMatrix();
  }
  private _position : Vector3;
  private _scale : Vector3;
  private _rotate : Vector3;
  private _rotationAngle: number;

  public modelMatrix: Matrix4;

  constructor(position: Vector3 = new Vector3(),
              scale: Vector3 = new Vector3(1, 1, 1),
              rotate: Vector3 = new Vector3(),
              rotationAngle: number = 10,
  ) {
    this._position = position;
    this._scale = scale;
    this._rotate = rotate;
    this._rotationAngle = rotationAngle;
    this.modelMatrix = Matrix4.create();
    this.calculateModelMatrix();
  }

  private calculateModelMatrix() {
    const t = Matrix4.create();
    const s = Matrix4.create();
    const rx = Matrix4.create();
    const ry = Matrix4.create();
    const rz = Matrix4.create();
    let r;

    t.translate(this._position);
    s.scale(this._scale);
    rx.rotateX(this._rotate.x * this._rotationAngle);
    ry.rotateY(this._rotate.y * this._rotationAngle);
    rz.rotateZ(this._rotate.z * this._rotationAngle);

    r = Matrix4.multiply(Matrix4.multiply(rx, ry), rz);
    this.modelMatrix = Matrix4.multiply(Matrix4.multiply(t, s), r);
  }

}
