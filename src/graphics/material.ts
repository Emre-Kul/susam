import { COLORING_TYPE, DRAW_TYPE } from '../core/enums';

export default class Material {

  public drawType: DRAW_TYPE;
  public coloringType: COLORING_TYPE;
  public applyLighting: boolean;

  constructor(coloringType: COLORING_TYPE, drawType: DRAW_TYPE = DRAW_TYPE.TRIANGLES, applyLighting: boolean = true) {
    this.drawType = drawType;
    this.coloringType = coloringType;
    this.applyLighting = applyLighting;
  }


}
