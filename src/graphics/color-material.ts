import Material from './material';
import Color from './color';
import { COLORING_TYPE, DRAW_TYPE } from '../core/enums';

export default class ColorMaterial extends Material {

  public color: Color;

  constructor(color: Color = new Color(), drawType: DRAW_TYPE = DRAW_TYPE.TRIANGLES) {
    super(COLORING_TYPE.COLOR, drawType);
    this.color = color;
  }

}
