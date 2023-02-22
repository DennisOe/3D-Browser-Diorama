export class RenderScene {
    constructor(canvas, assets) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas
        this.assetList = assets
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
        scene.clearColor = BABYLON.Color3.White();
        // camera
        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 25, new BABYLON.Vector3.Zero(), scene);
        camera.attachControl(this.canvas, false);
        // light
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        // assets
        this.LoadAssets(this.assetList, scene);
        return scene;
    }

    LoadAssets(assets, scene) {
        // Load assets from given array
        for (let eachAsset of assets) {
            BABYLON.SceneLoader.Append("../assets/", eachAsset, scene);
        }
    }
}