export class RenderScene {
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    CreateScene() {
        const scene = new BABYLON.Scene(this.engine);
        scene.clearColor = BABYLON.Color3.White();
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl();
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        BABYLON.SceneLoader.Append("../assets/", "suzanne.gltf", scene);
        return scene;
    }
}