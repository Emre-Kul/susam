import Camera from './camera';
import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

// https://www.mauriciopoppe.com/notes/computer-graphics/viewing/camera/first-person/

export default class FpsCamera extends Camera{
  private yaw: number;
  private pitch: number;
  private sensitivity: number;

  constructor(sensitivity: number = 0.1, eye: Vector3 = Vector3.create(0, 0, 10), at: Vector3 = Vector3.create()) {
    super(eye, at);
    this.sensitivity = sensitivity;
    this.yaw = 0;
    this.pitch = 0;
  }

  point(yaw: number, pitch: number) {
    this.yaw += yaw * this.sensitivity;
    this.pitch += pitch * this.sensitivity;
    /*
    if (this.pitch > 89.9) {
      this.pitch = 89.9;
    }
    if (this.pitch < 0) {
      this.pitch = 0;
    }
    */
    this.yaw = this.yaw % 360;
    this.pitch = this.pitch % 90;

    const rx = Matrix4.create();
    const ry = Matrix4.create();
    ry.rotateY(yaw);
    // rx.rotateX(pitch);
    let direction = Vector3.subtract(this.target, this.eye);
    direction = Matrix4.multiplyV3(Matrix4.multiply(ry, rx), direction);
    direction.add(this.eye);
    this.target = Vector3.create(direction.x, direction.y, direction.z);
    this.calculateView();
  }

  moveForward(val: number) {
    const direction = Vector3.subtract(this.target, this.eye);
    direction.normalize();
    direction.multiply(Vector3.create(val, val, val));
    this.eye.add(new Vector3(direction.x, 0, direction.z));
    this.target.add(new Vector3(direction.x, 0, direction.z));
    this.calculateView();
  }

  moveSide(val: number) {
    const ry = Matrix4.create();
    const t = Matrix4.create();
    let direction = Vector3.subtract(this.eye, this.target);
    ry.rotateY(- 90);
    direction = Matrix4.multiplyV3(ry, direction);
    direction.normalize();
    direction.multiply(Vector3.create(val, 0, val));
    t.translate(direction);
    this.eye = Matrix4.multiplyV3(t, this.eye);
    this.target = Matrix4.multiplyV3(t, this.target);
  }

}
