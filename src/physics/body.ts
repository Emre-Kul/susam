import Vector3 from '../math/vector3';
import { Body as CBody, Vec3, Box } from 'cannon';
import Vector4 from '../math/vector4';

export default class Body {

  private mass: number;
  private position: Vector3;
  public cBody: CBody;

  constructor(mass: number = 0) {
    this.mass = mass;
    this.position = new Vector3();
    this.cBody = new CBody({
      mass: this.mass,
      position: new Vec3(this.position.x, this.position.y, this.position.z),
      linearDamping: 0,
    });

  }

  public setPosition(vec: Vector3) {
    this.cBody.position = new Vec3(vec.x, vec.y, vec.z);
  }

  public addShape(vec: Vector3) {
    this.cBody.addShape(new Box(new Vec3(vec.x, vec.y, vec.z)));
  }

  public getRotation(): Vector4 {
    // this.cBody.quaternion.setFromAxisAngle(new Vec3(), angle);
    const q = this.cBody.quaternion;
    return Vector4.create(Vector3.create(q.x, q.y, q.z), q.w);
  }

  public getId(): number {
    return this.cBody.id;
  }

  public applyForce(force: Vector3, point: Vector3) {
    this.cBody.applyForce(new Vec3(force.x, force.y, force.z), new Vec3(point.x, point.y, point.z));
  }
}
