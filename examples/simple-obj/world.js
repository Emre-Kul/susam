function createTeaPot(game) {
 const color = new GE.Color();
 color.setBlue();
 const shader = game.resourceManager.getShader("shader-default");
 const obj = new GE.GameObject(
   new GE.Transform(GE.Vector3.create(0,0, -500)),
   game.resourceManager.getObject("obj-teapot"),
   shader,
   new GE.ColorMaterial(color)
 );
 obj.material.applyLighting = false;
 game.addObject(obj);
}
