import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";
import Theme from "../Theme.js";
import GUI from 'lil-gui';

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setSunlight();

    }

    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.sunLight.ambientLight = this.obj.intensity;
            console.log(this.obj);
        });
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.2;
        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color,{
                r: 0.047058823529411764,
                g: 0.09411764705882353,
                b: 0.15294117647058825,
            });
            GSAP.to(this.ambientLight.color,{
                r: 0.047058823529411764,
                g: 0.09411764705882353,
                b: 0.15294117647058825,
            });
            GSAP.to(this.sunLight, {
                intensity: 1.5,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1.5,
            });
        } else {
            GSAP.to(this.sunLight.color,{
                r: 0.7254901960784313,
                g: 0.8627450980392157,
                b: 1,
            });
            GSAP.to(this.ambientLight.color,{
                r: 0.7254901960784313,
                g: 0.8627450980392157,
                b: 1,
            });
            GSAP.to(this.sunLight, {
                intensity: 1,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        }
    }

    resize(){
        
    }

    update(){
        
    }
}