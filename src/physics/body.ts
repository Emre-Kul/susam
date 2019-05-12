import Vector3 from '../math/vector3';
import { Body as CBody, Vec3, Box } from 'cannon';
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
}
