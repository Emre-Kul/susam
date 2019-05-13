export default class Mesh {
  public vertices: number[];
  public indices: number[];
  public textureVertices: number[];
  public normals: number[];
  public ready: boolean;

  constructor(vertices: number[] = [],
              indices: number[] = [],
              textureVertices: number[] = [],
              normals: number[] = []) {
    this.vertices = vertices;
    this.indices = indices;
    this.textureVertices = textureVertices;
    this.normals = normals;
    this.ready = true;
  }

  static merge(meshes: Mesh[]) {
    if (meshes.length <= 0) return new Mesh();
    const mergedMeshes = new Mesh();
    for (const mesh of meshes) {
      mergedMeshes.vertices = mergedMeshes.vertices.concat(mesh.vertices);
      mergedMeshes.indices = mergedMeshes.indices.concat(mesh.indices);
      mergedMeshes.textureVertices = mergedMeshes.textureVertices.concat(mesh.textureVertices);
      mergedMeshes.normals = mergedMeshes.normals.concat(mesh.normals);
    }
    return mergedMeshes;
  }

}
