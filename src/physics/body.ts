import Vector3 from '../math/vector3';
import { Body as CBody, Vec3, Box } from 'cannon';
export default class Body {

  private mass: number;
  private position: Vector3;
  private shape: any; // will be shape class
  public cBody: CBody;

  constructor(mass: number = 0) {
    this.mass = mass;
    this.position = new Vector3();
    this.shape = null;
    this.cBody = new CBody({
      mass: this.mass,
      position: new Vec3(this.position.x, this.position.y, this.position.z),
      shape: new Box(new Vec3(this.position.x, this.position.y, this.position.z)),
    });
  }
}
