import { CustomWindow } from '../interfaces';

export default class Scene {
  private canvas: any;
  private readonly attributes: string[];
  public context: any;

  constructor(canvasId: string, attributes: string[]) {
    this.canvas = document.getElementById(canvasId);
    this.attributes = attributes;
    this.context = null;
  }

  public init() {
    this.context = this.setupWebGl();
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearColor(1.0, 1.0, 1.0, 1.0);
    this.context.clearDepth(1.0);
    // this.context.enable(this.context.DEPTH_TEST);
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
    // this.context.depthFunc(this.context.LEQUAL);
  }

  private setupWebGl() {
    let context;
    if (!(window as CustomWindow).WebGLRenderingContext) {
      return null;
    }
    context = this.create3DContext();
    if (!context) {
      return null;
    }
    return context;
  }

  private create3DContext() {
    const names: string[] = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    let context = null;
    for (const name of names) {
      try {
        context = this.canvas.getContext(name, this.attributes);
      } catch (e) {}
      if (context) {
        break;
      }
    }
    return context;
  }

}
