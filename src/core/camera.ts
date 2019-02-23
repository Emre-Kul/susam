import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';
import Vector4 from '../math/vector4';

export default class Camera {
  get eye(): Vector3 {
    return this._eye;
  }

  set eye(value: Vector3) {
    this.calculateView();
    this._eye = value;
  }
  get up(): Vector3 {
    return this._up;
  }

  set up(value: Vector3) {
    this.calculateView();
    this._up = value;
  }
  get target(): Vector3 {
    return this._target;
  }

  set target(value: Vector3) {
    this.calculateView();
    this._target = value;
  }
  get projectionMtr(): any {
    return this._projectionMtr;
  }
  get viewMatrix(): any {
    return this._viewMatrix;
  }
  private _target: Vector3;
  private _up: Vector3;
  private _eye: Vector3;

  protected _viewMatrix: any;
  protected _projectionMtr: any;

  constructor(eye: Vector3 = new Vector3(0, 0, 5),
              target: Vector3 = Vector3.create(),
              up: Vector3 = Vector3.create(0, 1),
              ) {
    this._eye = eye;
    this._target = target;
    this._up = up;
    this._viewMatrix = null;
  }

  update() {
    this.calculateProjection();
    this.calculateView();
  }

  // https://github.com/Emre-Kul/YTU-WEBGL/blob/master/Common/MV.js#L434
  protected calculateView() {
    const v = Vector3.subtract(this._target, this._eye);
    v.normalize();
    const n = Vector3.cross(v, this._up);
    n.normalize();
    const u = Vector3.cross(n, v);
    u.normalize();
    v.negate();
    this._viewMatrix = Matrix4.create(Vector4.create(n, - Vector3.dot(n, this._eye)),
                                      Vector4.create(u, - Vector3.dot(u, this._eye)),
                                      Vector4.create(v, - Vector3.dot(v, this._eye)),
                                      Vector4.create());
  }
  // https://github.com/Emre-Kul/YTU-WEBGL/blob/master/Common/MV.js#L496
  protected calculateProjection(fovy: number = 45, aspect: number = 1, near: number = -10, far: number = 100) {
    this._projectionMtr = Matrix4.create();
    const f = 1.0 / Math.tan((fovy * Math.PI / 180.0) / 2);
    const d = far - near;

    this._projectionMtr.matrix[0][0] = f / aspect;
    this._projectionMtr.matrix[1][1] = f;
    this._projectionMtr.matrix[2][2] = -(near + far) / d;
    this._projectionMtr.matrix[2][3] = -2 * near * far / d;
    this._projectionMtr.matrix[3][2] = -1;
    this._projectionMtr.matrix[3][3] = 0.0;
  }

}
