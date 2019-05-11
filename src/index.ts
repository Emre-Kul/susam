/* MATH */
import Matrix4 from './math/matrix4';
import Random from './math/random';
import Vector3 from './math/vector3';
/* GRAPHICS */
import Color from './graphics/color';
import Texture from './graphics/texture';
import TextureMaterial from './graphics/texture-material';
import ColorMaterial from './graphics/color-material';
/* PHYSICS */
import Physics from './physics/physics';
import Body from './physics/body';
/* GEOMETRY */
import Geometry from './geometry/geometry';
import CubeGeometry from './geometry/cube-geometry';
/* CORE */
import Camera from './core/camera';
import Mesh from './core/mesh';
import MeshRenderer from './core/mesh-renderer';
import Scene from './core/scene';
import Shader from './core/shader';
import FpsCamera from './core/fps-camera';
import Window from './core/window';
import GameObject from './core/game-object';
import Game from './core/game';
import Transform from './core/transform';
import { DRAW_TYPE } from './core/enums';

export const GE = {
  Matrix4,
  Random,
  Vector3,
  Color,
  Texture,
  TextureMaterial,
  ColorMaterial,
  Physics,
  Body,
  Game,
  Geometry,
  CubeGeometry,
  Camera,
  Mesh,
  MeshRenderer,
  Scene,
  Shader,
  FpsCamera,
  Window,
  GameObject,
  Transform,
  DRAW_TYPE,
};
