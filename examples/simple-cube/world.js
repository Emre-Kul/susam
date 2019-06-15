function createCube(game) {
 const cube = new GE.CubeGeometry();
 const shader = game.resourceManager.getShader("shader-default");
 const obj = new GE.GameObject(
   new GE.Transform(),
   cube.getMesh(),
   shader,
   new GE.TextureMaterial(game.resourceManager.getTexture("texture-ytu"))
 );
 obj.material.applyLighting = false;
 game.addObject(obj);
}
