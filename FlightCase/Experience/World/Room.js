import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        // console.log(this.actualRoom);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true; 
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            //see through
            if(child.name === "water"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            if(child.name === "screen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
        });

        const width = 0.5;
        const height = 0.25;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 
            0xffffff, 
            intensity,  
            width, 
            height 
        );
        rectLight.position.set( 3.06789, 3,  -19.0607 );
        rectLight.rotation.x = -Math.PI / 0.5;
        rectLight.rotation.y = -Math.PI / 0.5;
        this.actualRoom.add( rectLight )

        const secondLight = new THREE.RectAreaLight(
            0xffffff, 
            intensity,  
            width, 
            height
        );

        secondLight.position.set( -7.88641, 3,  5 );
        secondLight.rotation.x = -Math.PI / 0.5;
        secondLight.rotation.y = -Math.PI / 0.5;
        this.actualRoom.add( secondLight )

        const thirdLight = new THREE.RectAreaLight(
            0xffffff, 
            intensity,  
            width, 
            height
        );

        thirdLight.position.set( -4.97838, 3,  5 );
        thirdLight.rotation.x = -Math.PI / 2;
        thirdLight.rotation.y = -Math.PI / 2;
        this.actualRoom.add( thirdLight )

        const Ballwidth = 0.05;
        const Ballheight = 0.05;
        const Ballintensity = 10;
        const Ball = new THREE.RectAreaLight( 
            0x990000, 
            Ballintensity,  
            Ballwidth, 
            Ballheight 
        );

        Ball.position.set( -14.1977, 12,  -1.55827 );
        Ball.rotation.x = -Math.PI / 2;
        Ball.rotation.y = -Math.PI / 2;
        this.actualRoom.add( Ball )
        

        // const rectLightHelper = new RectAreaLightHelper( Ball );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
        this.actualRoom.rotation.y = Math.PI;
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.spin = this.mixer.clipAction(this.room.animations[0]);
        this.spin.play();
        // console.log(this.room);
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = 
            ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }


    resize(){
        
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.009);
    }
}