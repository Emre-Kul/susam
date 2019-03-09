import Camera from './camera';
import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

// https://www.mauriciopoppe.com/notes/computer-graphics/viewing/camera/first-person/

export default class FpsCamera extends Camera{
  private yaw: number;
  private pitch: number;

  private sensitivity: number;
  private initialTarget: Vector3;
  constructor(sensitivity: number = 0.1, eye: Vector3 = Vector3.create(0, 4, 10),
              at: Vector3 = Vector3.create()) {
    super(eye, at);

    this.sensitivity = sensitivity;
    this.yaw = 0;
    this.pitch = 0;
    this.initialTarget = at;
  }
  point2(yaw: number, pitch: number) {
    this.yaw += yaw * this.sensitivity;
    this.pitch += pitch * this.sensitivity;
    if (this.pitch > 89.9) {
      this.pitch = 89.9;
      return;
    }
    if (this.pitch < -85) {
      this.pitch = -85;
      return;
    }
    this.yaw = this.yaw % 360;
    const rx = Matrix4.create();
    const rz = Matrix4.create();
    rx.rotateY(yaw * this.sensitivity);
    rz.rotateX(pitch * this.sensitivity);
    let direction = Vector3.subtract(this.target, this.eye);
    direction = Matrix4.multiplyV3(Matrix4.multiply(rx, rz), direction);
    direction.add(this.eye);
    this.target = Vector3.create(direction.x, direction.y, direction.z);
    this.calculateView();
  }
  point(diff: Vector3) {
    const rx = Matrix4.create();
    const rz = Matrix4.create();
    rx.rotateY(diff.x * this.sensitivity);
    rz.rotateX(diff.y * this.sensitivity);
    let direction = Vector3.subtract(this.target, this.eye);
    direction = Matrix4.multiplyV3(Matrix4.multiply(rx, rz), direction);
    direction.add(this.eye);
    this.target = Vector3.create(direction.x, direction.y, direction.z);
    this.calculateView();
  }

  moveForward(val: number) {
    const direction = Vector3.subtract(this.target, this.eye);
    direction.normalize();
    direction.multiply(Vector3.create(val, val, val));
    this.eye.add(direction);
    this.target.add(direction);
    // this.up.add(direction);
    this.calculateView();
  }

  moveSide(val: number) {

  }

}
