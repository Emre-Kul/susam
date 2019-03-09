import Vector3 from '../math/vector3';
import Color from '../graphics/color';

export default class PointLight {
  public position: Vector3;
  public color: Color;
  public activate: boolean;

  constructor(activate: boolean = true, position: Vector3 = Vector3.create(), color: Color = new Color()) {
    this.position = position;
    this.color = color;
    this.activate = activate;
  }

}
