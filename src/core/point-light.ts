import Vector3 from '../math/vector3';

export default class PointLight {
  public position: Vector3;

  constructor(position: Vector3 = Vector3.create()) {
    this.position = position;
  }

}
