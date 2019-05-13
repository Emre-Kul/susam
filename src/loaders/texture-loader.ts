import Texture from '../graphics/texture';
import WebGL from '../core/webgl';
import Loader from './loader';

export default class TextureLoader extends Loader{

  public gl: WebGL;
  private texture: any;

  constructor(gl: any, url: any) {
    super(url);
    this.gl = gl;
  }

  create() {
    this.texture.data = this.gl.context.createTexture();
    this.gl.context.texImage2D(
        this.gl.context.TEXTURE_2D,
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
    this.texture = new Texture();
    this.create();

    this.texture.image = new Image();
    this.texture.image.src = this.url;
    this.texture.image.onload = () => {
      this.bindTexture(this.texture.image);
    };

    return this.texture;
  }

  private bindTexture(image: any) {
    this.gl.context.bindTexture(this.gl.context.TEXTURE_2D, this.texture.data);
    this.gl.context.texImage2D(
        this.gl.context.TEXTURE_2D,
        0,
        this.gl.context.RGBA,
        this.gl.context.RGBA,
        this.gl.context.UNSIGNED_BYTE,
        image);

    if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
      this.gl.context.generateMipmap(this.gl.context.TEXTURE_2D);
    } else {
      this.gl.context.texParameteri(this.gl.context.TEXTURE_2D, this.gl.context.TEXTURE_WRAP_S, this.gl.context.CLAMP_TO_EDGE);
      this.gl.context.texParameteri(this.gl.context.TEXTURE_2D, this.gl.context.TEXTURE_WRAP_T, this.gl.context.CLAMP_TO_EDGE);
      this.gl.context.texParameteri(this.gl.context.TEXTURE_2D, this.gl.context.TEXTURE_MAG_FILTER, this.gl.context.NEAREST);
      this.gl.context.texParameteri(this.gl.context.TEXTURE_2D, this.gl.context.TEXTURE_MIN_FILTER, this.gl.context.NEAREST);
      this.gl.context.generateMipmap(this.gl.context.TEXTURE_2D);
    }
  }

  private isPowerOf2(num: number) {
    return (Math.log(num) / Math.log(2)) % 1 === 0;
  }
}
