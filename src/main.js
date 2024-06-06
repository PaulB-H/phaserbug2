import { Game as MainGame } from "./scenes/Game";
import { AUTO, Scale, Game, Renderer, Physics } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: AUTO,
  width: "100%",
  height: "100%",
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Scale.RESIZE,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  scene: [MainGame],
};

export default new Game(config);
