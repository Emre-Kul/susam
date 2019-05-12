function createGround(game) {
 const cube = new GE.CubeGeometry(1000.0);
 const shader = game.resourceManager.getShader("shader-default");
 const ground = new GE.GameObject(
     new GE.Transform(new GE.Vector3(0, -1, 0), new GE.Vector3(1000, 0.1, 1000)),
     cube.getMesh(),
     shader,
     new GE.TextureMaterial(game.resourceManager.getTexture("texture-grass")),
     new GE.Body());

   ground.material.applyLighting = false;
   game.addObject(ground);


}

function createLight(game) {
 const cube = new GE.CubeGeometry();
 const color = new GE.Color();
 const shader = game.resourceManager.getShader("shader-default");
 color.setWhite();
 const light = new GE.GameObject(
   new GE.Transform(),
   cube.getMesh(),
   shader,
   new GE.ColorMaterial(color),
   new GE.Body());
 light.material.applyLighting = false;
 game.addObject(light);
}

function createRandomObj(game, count) {
 for(let i = 0;i < count;i++) {
  const cube = new GE.CubeGeometry();
  const color = new GE.Color();
  const shader = game.resourceManager.getShader("shader-default");
  color.setRandom();
  const obj = new GE.GameObject(
    new GE.Transform(new GE.Vector3(Math.random() * 100 - 50, 0, Math.random() * 100 - 50), new GE.Vector3(1, 1, 1)),
    cube.getMesh(),
    shader,
    new GE.ColorMaterial(color));
  obj.material.applyLighting = false;
  game.addObject(obj);
 }
}

