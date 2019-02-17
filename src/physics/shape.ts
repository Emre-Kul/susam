import Mesh from '../core/mesh';
import Transform from '../core/transform';

export default class Shape {
  public mesh: Mesh | null;

  constructor() {
    this.mesh = null;
  }

}
