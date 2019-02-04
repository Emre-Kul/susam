import { CustomWindow } from '../interfaces';

export default class Scene {
  private canvas: any;
  private readonly attributes: string[];
  private context: any;

  constructor(canvasId: string, attributes: string[]) {
    this.canvas = document.getElementById(canvasId);
    this.attributes = attributes;
    this.context = null;
  }

  public init() {
    this.context = this.setupWebGl();
  }

  public getContext() {
    return this.context;
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
