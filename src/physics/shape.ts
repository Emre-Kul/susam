import Mesh from '../core/mesh';
import Transform from '../core/transform';

export default class Shape {
  public mesh: Mesh | null;
  private transform: Transform;

  constructor(transform: Transform) {
    this.mesh = null;
    this.transform = transform;
  }

  public setTransform(transform: Transform) {
    this.transform = transform;
  }
  public getTransform():Transform {
    return this.transform;
  }

}
