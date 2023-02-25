export class RenderScene {
    constructor(canvas, assetsArray) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;
        this.assetsArray = assetsArray;
        this.scene = this.CreateScene();
        // render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        // window resize policy
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    CreateScene() {
        // Setup default render scene
        const scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color3(0, 0.5, 0.8);
        // camera
        const camera = new BABYLON.ArcRotateCamera("camera1",
                                                   Math.PI / 2,
                                                   Math.PI / 2.1,
                                                   25,
                                                   new BABYLON.Vector3(0, 3, 0),
                                                   scene);
        camera.attachControl(this.canvas, false);
        // light
        const light = new BABYLON.HemisphericLight("lightKey",
                                                   new BABYLON.Vector3(0, 1, 0),
                                                   scene);
        light.intensity = 0.7;
        // assets
        this.LoadAssets(this.assetsArray, scene);
        return scene;
    }

    LoadAssets(assetsArray, scene) {
        // Load assets from given array
        assetsArray.forEach(eachAsset => {
            BABYLON.SceneLoader.Append("../assets/", eachAsset, scene);
        });
    }
}