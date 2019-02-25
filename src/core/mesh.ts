import Transform from './transform';
import Color from '../graphics/color';
import Texture from '../graphics/texture';

export default class Mesh {
  public vertices: number[];
  public indices: number[];
  public textureVertices: number[];

  public texture: Texture;
  public transform: Transform;
  public color: Color;

  constructor(vertices: number[] = [],
              indices: number[] = [],
              textureVertices: number[] = [],
              transform: Transform = new Transform(),
              color: Color = new Color(),
              texture: Texture = new Texture()) {
    this.vertices = vertices;
    this.indices = indices;
    this.textureVertices = textureVertices;
    this.transform = transform;
    this.color = color;
    this.texture = texture;
  }

  static merge(meshes: Mesh[]) {
    if (meshes.length <= 0) return new Mesh();
    const mergedMeshes = new Mesh();
    for (const mesh of meshes) {
      mergedMeshes.vertices = mergedMeshes.vertices.concat(mesh.vertices);
      mergedMeshes.indices = mergedMeshes.indices.concat(mesh.indices);
      mergedMeshes.textureVertices = mergedMeshes.textureVertices.concat(mesh.textureVertices);
      mergedMeshes.textureVertices = mergedMeshes.textureVertices.concat(mesh.textureVertices);
    }
    mergedMeshes.transform = meshes[0].transform;
    mergedMeshes.color = meshes[0].color;
    return mergedMeshes;
  }

}
