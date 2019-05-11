function createGround(game) {
 const cube = new GE.CubeGeometry();
 const color = new GE.Color();
 const shader = game.resourceManager.getShader("shader-default");
 color.setBlue();
   const ground = new GE.GameObject(
     new GE.Transform(new GE.Vector3(0, -50, 0), new GE.Vector3(1000, 0.1, 1000)),
     cube.getMesh(),
     shader,
     new GE.ColorMaterial(color),
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

function createDumyObj(game) {
 const cube = new GE.CubeGeometry();
 const color = new GE.Color();
 const shader = game.resourceManager.getShader("shader-default");
 color.setRed();
 const obj = new GE.GameObject(
   new GE.Transform(new GE.Vector3(), new GE.Vector3(0.1, 0.1, 0.1)),
   cube.getMesh(),
   shader,
   new GE.ColorMaterial(color));
 obj.material.applyLighting = false;
 game.addObject(obj);
}
