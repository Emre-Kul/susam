import Camera from './camera';
import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

export default class FpsCamera extends Camera{
  private yaw: number;
  private pitch: number;
  private roll: number;

  private sensitivity: number;

  constructor(sensitivity: number, eye: Vector3 = Vector3.create(5, 5, 5),
              at: Vector3 = Vector3.create()) {
    super(eye, at);

    this.sensitivity = sensitivity;
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
  }

  init() {
    this.updateViewMatrix();
  }

  move(diff: Vector3) {
    this.yaw += diff.x * this.sensitivity;
    this.pitch += diff.y * this.sensitivity;
    this.roll += diff.z * this.sensitivity;
    this.updateViewMatrix();
  }

  // http://in2gpu.com/2016/02/26/opengl-fps-camera/
  private updateViewMatrix() {
    const direction = Vector3.subtract(this.eye, this.at); // -eyeVector
    const matRoll = Matrix4.create();
    const matPitch = Matrix4.create();
    const matYaw = Matrix4.create();
    const matTranslate = Matrix4.create();
    let matRotate;

    matYaw.rotateY(this.yaw);
    matPitch.rotateX(this.pitch);
    matRoll.rotateZ(this.roll);
    matRotate = Matrix4.multiply(Matrix4.multiply(matRoll, matPitch), matYaw);
    matTranslate.translate(direction);

    this.viewMatrix = Matrix4.multiply(matRotate, matTranslate);
  }

}
