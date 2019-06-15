const OPT = {};

OPT.LIGHT_POS = GE.Vector3.create(100, 10, -100);

function createGround(game) {
 const cube = new GE.CubeGeometry(500.0);
 const shader = game.resourceManager.getShader("shader-default");
 const ground = new GE.GameObject(
     new GE.Transform(new GE.Vector3(0, -1, 0), new GE.Vector3(1000, 0.1, 1000)),
     cube.getMesh(),
     shader,
     new GE.TextureMaterial(game.resourceManager.getTexture("texture-ground")),
     new GE.Body(0));
   ground.material.applyLighting = false;
   game.addObject(ground);
}

function createSkybox(game) {
 const mesh = game.resourceManager.getObject("obj-skybox");
 const shader = game.resourceManager.getShader("shader-default");
 const obj = new GE.GameObject(
   new GE.Transform(new GE.Vector3(0, 1000, 0), new GE.Vector3(1000, 1000, 1000)),
   mesh,
   shader,
   new GE.TextureMaterial(game.resourceManager.getTexture("texture-skybox")));
 game.addObject(obj);
}

function createLight(game) {
 const mesh = game.resourceManager.getObject("obj-sphere");
 const shader = game.resourceManager.getShader("shader-default");
 const color = new GE.Color();
 color.setWhite();
 const light = new GE.GameObject(
   new GE.Transform(OPT.LIGHT_POS),
   mesh,
   shader,
   new GE.ColorMaterial(color));
 light.material.applyLighting = false;
 game.scene.light.position = OPT.LIGHT_POS;
 game.addObject(light);
}

function createRandomObj(game, count = 50, area = 100) {
 for(let i = 0;i < count;i++) {
  const cube = new GE.CubeGeometry();
  const color = new GE.Color();
  const shader = game.resourceManager.getShader("shader-default");
  color.setRandom();
  const obj = new GE.GameObject(
    new GE.Transform(new GE.Vector3(Math.random() * area - area / 2, 10, Math.random() * area - area / 2), new GE.Vector3(1, 1, 1)),
    cube.getMesh(),
    shader,
    (i % 2 === 0) ? new GE.TextureMaterial(game.resourceManager.getTexture(randomTexture())) : new GE.ColorMaterial(color),
    new GE.Body(0.01));
  // obj.material.applyLighting = false;
  game.addObject(obj);
 }
}

function createTeaPot(game) {
 const mesh = game.resourceManager.getObject("obj-teapot");
 const shader = game.resourceManager.getShader("shader-default");
 const obj = new GE.GameObject(
   new GE.Transform(OPT.LIGHT_POS, new GE.Vector3(0.01, 0.01, 0.01)),
   mesh,
   shader,
   new GE.TextureMaterial(game.resourceManager.getTexture("texture-grass")),
   new GE.Body());
 obj.material.applyLighting = false;
 game.addObject(obj);
}



function createElephant(game, count = 10) {
 for(let i = 0;i < count;i++) {
  const color = new GE.Color();
  color.setRed();
  const mesh = game.resourceManager.getObject("obj-elephant");
  const shader = game.resourceManager.getShader("shader-default");
  const obj = new GE.GameObject(
    new GE.Transform(new GE.Vector3(i * 10 - (count * 10) / 2, 0, -100), new GE.Vector3(3, 3, 3), new GE.Vector3(0, 18, 0)),
    mesh,
    shader,
    new GE.ColorMaterial(color),
    new GE.Body());
  // obj.material.applyLighting = false;
  game.addObject(obj);
 }
}

function randomTexture() {
 const textures = ['texture-cube1', 'texture-cube2'];
 return textures[Math.floor(Math.random() * textures.length)]
}
