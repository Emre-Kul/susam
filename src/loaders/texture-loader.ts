import Texture from '../graphics/texture';
import WebGL from '../core/webgl';

export default class TextureLoader {

  public gl: WebGL;

  private readonly texture: Texture;

  constructor(gl: any, image: any) {
    this.gl = gl;
    this.texture = new Texture(image);
  }

  create() {
    this.texture.data = this.gl.context.createTexture();
    this.gl.context.bindTexture(this.gl.context.TEXTURE_2D, this.texture.data);
    this.gl.context.texImage2D(this.gl.context.TEXTURE_2D,
                               0,
                               this.gl.context.RGBA,
                               1,
                               1,
                               0,
                               this.gl.context.RGBA,
                               this.gl.context.UNSIGNED_BYTE,
                               new Uint8Array([0, 0, 255, 255]));
  }

  load() {
    this.create();
    const image = this.texture.image;
    this.gl.context.bindTexture(this.gl.context.TEXTURE_2D, this.texture.data);
    this.gl.context.texImage2D(
        this.gl.context.TEXTURE_2D,
        0,
        this.gl.context.RGBA,
        this.gl.context.RGBA,
        this.gl.context.UNSIGNED_BYTE,
        image);
    this.gl.context.generateMipmap(this.gl.context.TEXTURE_2D);
    return this.texture;
  }
}
