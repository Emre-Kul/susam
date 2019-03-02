import Camera from './camera';
import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';

// https://www.mauriciopoppe.com/notes/computer-graphics/viewing/camera/first-person/

export default class FpsCamera extends Camera{
  private yaw: number;
  private pitch: number;

  private sensitivity: number;

  constructor(sensitivity: number = 0.1, eye: Vector3 = Vector3.create(0, 4, 10),
              at: Vector3 = Vector3.create()) {
    super(eye, at);

    this.sensitivity = sensitivity;
    this.yaw = 0;
    this.pitch = 0;
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

  move(direction: Vector3) {
    // direction.normalize();
    this.target.add(direction);
    this.eye.add(direction);
    this.calculateView();
  }

}
