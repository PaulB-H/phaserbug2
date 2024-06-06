export default class Ship extends Phaser.Physics.Arcade.Sprite {
  turrets = [];
  turretMountPoints = {
    1: { x: -30, y: -42 },
    2: { x: 30, y: -42 },
    3: { x: -30, y: -28 },
    4: { x: 30, y: -28 },
    5: { x: -30, y: -13 },
    6: { x: 30, y: -13 },
    7: { x: -30, y: 1.5 },
    8: { x: 30, y: 1.5 },
  };

  constructor(scene) {
    super(scene, 0, 0, "ship");
    scene.add.existing(this);

    this.setPipeline("Light2D");

    // Scale ship down to 194 px
    const desiredHeight = 194;
    const scaleFactorHeight = desiredHeight / this.height;
    this.setScale(scaleFactorHeight);

    // Create turrets
    for (let i = 1; i <= 8; i++) {
      // NOT WORKING - One for all
      const turretTexture = "turret";

      // WORKING - All have one
      // const turretTexture = `turret${i}`;

      const newTurret = scene.add.sprite(this.x, this.y, turretTexture);

      newTurret.setDepth(20);
      newTurret.setScale(0.18);
      newTurret.angle = 45;
      newTurret.setPipeline("Light2D");

      this.turrets.push(newTurret);
    }

    scene.events.on("postupdate", () => {
      if (this.turrets) {
        this.turrets.forEach((turret, index) => {
          const { x: mountX, y: mountY } = this.turretMountPoints[index + 1];

          // We need to calculate the turrets rotation relative to the rotation
          // and position of the ship and the turrets mount point
          const rotatedX =
            this.x +
            mountX * Math.cos(this.rotation) -
            mountY * Math.sin(this.rotation);
          const rotatedY =
            this.y +
            mountX * Math.sin(this.rotation) +
            mountY * Math.cos(this.rotation);

          turret.setPosition(rotatedX, rotatedY);

          const pointer = this.scene.input.mousePointer;
          const dx = pointer.worldX - turret.x;
          const dy = pointer.worldY - turret.y;

          const angle = Math.atan2(dy, dx); // ANGLE IN RADS

          // Finally we set the rotation of the turret to point at mouse
          turret.rotation = angle + Math.PI / 2;
        });
      }
    });
  }
}
