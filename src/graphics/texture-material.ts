import Material from './material';
import Texture from './texture';
import { COLORING_TYPE, DRAW_TYPE } from '../core/enums';

export default class TextureMaterial extends Material {

  public texture: Texture;

  constructor(texture: Texture, drawType: DRAW_TYPE = DRAW_TYPE.TRIANGLES) {
    super(COLORING_TYPE.TEXTURE, drawType);
    this.texture = texture;
  }

}
