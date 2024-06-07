Created for https://github.com/phaserjs/phaser/issues/6831

Issue: Multiple sprites that share a base texture with an associated normal map, can have rendering issues depending on sprite rotations

Workaround: Copy the original texture for each sprite that needs a guaranteed unique normal map

```js
const baseTexture = scene.textures.get("turret");

const copiedTexture = scene.textures.addImage(
  `turret${i}`,
  baseTexture.getSourceImage(),
  baseTexture.getDataSourceImage()
);

const newTurret = scene.add.sprite(this.x, this.y, copiedTexture);
```
