import Matrix4 from './math/matrix4';
import Random from './math/random';
import Vector3 from './math/vector3';
import Camera from './core/camera';
import Mesh from './core/mesh';
import MeshRenderer from './core/mesh-renderer';
import Scene from './core/scene';
import Shader from './core/shader';
import Line from './physics/line';
import Rectangle from './physics/rectangle';
import Shape from './physics/shape';
import Cube from './physics/cube';
import Color from './graphics/color';
import FpsCamera from './core/fps-camera';

// import ShaderLoader from './core/shader-loader';
import Transform from './core/transform';

export const GE = {
  Math : {
    Matrix4,
    Random,
    Vector3,
  },
  Core : {
    Camera,
    Mesh,
    MeshRenderer,
    Scene,
    Transform,
    Shader,
    FpsCamera,
  },
  Physics: {
    Shape,
    Rectangle,
    Line,
    Cube,
  },
  Graphics: {
    Color,
  },
};
