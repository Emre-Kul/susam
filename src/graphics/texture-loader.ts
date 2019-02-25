import Texture from './texture';

export default class TextureLoader {

  public gl: any;
  public texture: Texture;

  constructor(gl: any, texture: Texture) {
    this.gl = gl;
    this.texture = texture;
  }

  create() {
    this.texture.data = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.data);

    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
                       new Uint8Array([0, 0, 255, 255]));
  }

  load() {
    this.create();
    const image = this.texture.image;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.data);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
  }
}
