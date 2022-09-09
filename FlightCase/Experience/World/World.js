import * as THREE from "three";

import Experience from "../Experience.js";

import Room from "../World/Room.js";

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.camera = this.experience.camera;

        this.room = new Room();

        // console.log(this.camera, this.camera.perspectiveCamera);

        // this.setRenderer();
    }


    resize(){
        
    }

    update(){
        
    }
}