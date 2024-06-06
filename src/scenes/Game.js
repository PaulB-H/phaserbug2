import { Scene } from "phaser";

import Ship from "../ship";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("background", "bg.png");

    this.load.image("ship", ["orangeship2.png", "orangeship2_n.png"]);

    // if all turrets use this, the right dont lite brite
    this.load.image("turret", ["turret.png", "turret_n.png"]);

    // If we load a separate texture for each turret, its all good
    // I guess we can do this dynamically somehow?
    this.load.image("turret1", ["turret.png", "turret_n.png"]);
    this.load.image("turret2", ["turret.png", "turret_n.png"]);
    this.load.image("turret3", ["turret.png", "turret_n.png"]);
    this.load.image("turret4", ["turret.png", "turret_n.png"]);
    this.load.image("turret5", ["turret.png", "turret_n.png"]);
    this.load.image("turret6", ["turret.png", "turret_n.png"]);
    this.load.image("turret7", ["turret.png", "turret_n.png"]);
    this.load.image("turret8", ["turret.png", "turret_n.png"]);
  }

  create() {
    const myship = new Ship(this);

    this.lights.enable();

    this.cameras.main.setZoom(5);

    this.input.on("wheel", (event) => {
      const zoomSpeed = 0.001;
      const zoomFactor = 1 - event.deltaY * zoomSpeed;
      const minZoom = 10;
      const maxZoom = 0.0005;
      let newZoom = this.cameras.main.zoom * zoomFactor;
      if (newZoom > minZoom) newZoom = minZoom;
      if (newZoom < maxZoom) newZoom = maxZoom;
      this.cameras.main.zoom = newZoom;
    });

    this.lights.addLight(500, -500, 10000, "0xffffff", 2);

    this.cameras.main.startFollow(myship);
  }
}
