import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js";
// import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.9/pixi.min.js";
// import * as PIXI from "pixi.js";
// import "pixi-spine";
// import pixiSpine from 'https://cdn.jsdelivr.net/npm/pixi-spine@4.0.4/+esm'

console.log("PIXI", PIXI.Application);
var app = new PIXI.Application(1000, 800, { backgroundColor: 0x111111 });
app.stage.interactive = true;
document.body.appendChild(app.view);

PIXI.loader
  .add("spineboy1", "assets/spineboy1/spineboy-pro.json", { crossOrigin: true })
  .add("spineboy2", "assets/spineboy2/spineboy-pro.json", { crossOrigin: true })
  .load(onAssetsLoaded);

var spine, spine2;
var spineData1, spineData2;

function onAssetsLoaded(loader, res) {
  spineData1 = res.spineboy1.spineData;
  spineData2 = res.spineboy2.spineData;

  spine = app.stage.addChild(new PIXI.spine.Spine(res.spineboy1.spineData));
  spine.position.set(app.renderer.width * 0.5, app.renderer.height);
  spine.state.setAnimation(0, "walk", true);
  spine.state.timeScale = 0.5;

  spine2 = new PIXI.spine.Spine(res.spineboy2.spineData);

  app.stage.on("click", onClicked);
}

function onClicked() {
  spine.spineData = spine.spineData === spineData1 ? spineData2 : spineData1;

  for (var i = 0, n = spine.skeleton.slots.length; i < n; i++) {
    var slot = spine.skeleton.slots[i];

    if (slot.attachment) {
      var newAttachment = spine2.skeleton.getAttachmentByName(
        slot.data.name,
        slot.attachment.name
      );

      spine.hackTextureBySlotName(
        slot.data.name,
        newAttachment.region.texture,
        slot.attachment.region.texture.orig
      );
    }
  }
}
