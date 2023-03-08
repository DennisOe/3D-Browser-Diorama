export class RenderScene {
    canvas;
    assetsArray;
    assetsImported;
    engine;
    camera;
    scene;

    constructor(canvas, assetsArray) {
        this.canvas = canvas;
        this.assetsArray = assetsArray;
        this.engine = new BABYLON.Engine(canvas, true);
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
        this.camera = this.CreateCamera(scene);
        // light
        const light = new BABYLON.HemisphericLight("lightKey",
                                                   new BABYLON.Vector3(0, 1, 0),
                                                   scene);
        light.intensity = 1;
        // assets
        this.LoadAssets(this.assetsArray, scene);
        return scene;
    }

    CreateCamera(scene) {
        const camera = new BABYLON.ArcRotateCamera("camera1",
                                                   Math.PI / 2,
                                                   Math.PI / 2.2,
                                                   20,
                                                   new BABYLON.Vector3(0, 3, 0),
                                                   scene);
        camera.attachControl(this.canvas, false);
        camera.wheelPrecision = 50;
        camera.panningSensibility = 0;
        camera.upperRadiusLimit = 25;
        camera.lowerRadiusLimit = 5;
        camera.upperBetaLimit = Math.PI / 1.9;
        camera.lowerBetaLimit = Math.PI / 10;
        return camera;
    }

    LoadAssets(assetsArray, scene) {
        // Load assets from given array
        assetsArray.forEach(async eachAsset => {
            const { meshes } = await BABYLON.SceneLoader.AppendAsync("../assets/", eachAsset, scene);
            meshes.forEach(node => {
                this.assetsImported.push(node)
            });
        });
    }
}