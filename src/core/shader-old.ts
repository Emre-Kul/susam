import Matrix4 from '../math/matrix4';
import Vector4 from '../math/vector4';

export default class Shader {
  public context: any;
  public vertexShaderId: string;
  public fragmentShaderId: string;
  public program: any;

  constructor(context: any, vertexShaderId: string, fragmentShaderId: string) {
    this.context = context;
    this.vertexShaderId = vertexShaderId;
    this.fragmentShaderId = fragmentShaderId;
  }




}
