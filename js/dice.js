// ============================================================
// Riyadh Tycoon — Dice Animation System
// ============================================================

var DiceManager = {
  scene: null,
  container: null,
  die1: null,
  die2: null,
  rolling: false,
  result: null,
  onComplete: null,

  create: function(scene, x, y) {
    this.scene = scene;
    this.container = scene.add.container(x, y);
    this.container.setDepth(100);

    // Create two dice graphics
    this.die1 = this.createDie(scene, -45, 0);
    this.die2 = this.createDie(scene, 45, 0);
    this.container.add([this.die1.container]);
    this.container.add([this.die2.container]);
    this.container.setVisible(false);
  },

  createDie: function(scene, x, y) {
    var dieContainer = scene.add.container(x, y);
    var size = 70;

    // Die background
    var bg = scene.add.graphics();
    bg.fillStyle(0xFCF5E5, 1);
    bg.fillRoundedRect(-size/2, -size/2, size, size, 10);
    bg.lineStyle(3, 0xC8A951, 1);
    bg.strokeRoundedRect(-size/2, -size/2, size, size, 10);
    dieContainer.add(bg);

    // Dots container
    var dotsContainer = scene.add.container(0, 0);
    dieContainer.add(dotsContainer);

    return { container: dieContainer, bg: bg, dotsContainer: dotsContainer, size: size };
  },

  drawDots: function(die, value) {
    die.dotsContainer.removeAll(true);
    var s = die.size;
    var r = 6;
    var positions = this.getDotPositions(value, s);

    for (var i = 0; i < positions.length; i++) {
      var dot = this.scene.add.graphics();
      dot.fillStyle(0x1A2744, 1);
      dot.fillCircle(positions[i].x, positions[i].y, r);
      die.dotsContainer.add(dot);
    }
  },

  getDotPositions: function(value, s) {
    var cx = 0, cy = 0;
    var off = s * 0.25;
    var positions = {
      1: [{ x: cx, y: cy }],
      2: [{ x: cx - off, y: cy - off }, { x: cx + off, y: cy + off }],
      3: [{ x: cx - off, y: cy - off }, { x: cx, y: cy }, { x: cx + off, y: cy + off }],
      4: [{ x: cx - off, y: cy - off }, { x: cx + off, y: cy - off }, { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }],
      5: [{ x: cx - off, y: cy - off }, { x: cx + off, y: cy - off }, { x: cx, y: cy }, { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }],
      6: [{ x: cx - off, y: cy - off }, { x: cx + off, y: cy - off }, { x: cx - off, y: cy }, { x: cx + off, y: cy }, { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }],
    };
    return positions[value] || positions[1];
  },

  roll: function(d1, d2, callback) {
    if (this.rolling) return;
    this.rolling = true;
    this.onComplete = callback;
    this.result = { d1: d1, d2: d2, total: d1 + d2, isDoubles: d1 === d2 };
    this.container.setVisible(true);
    this.container.setAlpha(1);

    var self = this;
    var frames = 0;
    var maxFrames = 12;

    AudioManager.diceRoll();

    // Animate random faces
    var interval = setInterval(function() {
      var rv1 = Math.floor(Math.random() * 6) + 1;
      var rv2 = Math.floor(Math.random() * 6) + 1;
      self.drawDots(self.die1, rv1);
      self.drawDots(self.die2, rv2);

      // Wobble
      self.die1.container.setRotation((Math.random() - 0.5) * 0.3);
      self.die2.container.setRotation((Math.random() - 0.5) * 0.3);

      frames++;
      if (frames >= maxFrames) {
        clearInterval(interval);
        self.showResult();
      }
    }, 100);
  },

  showResult: function() {
    var self = this;
    // Show final result
    this.drawDots(this.die1, this.result.d1);
    this.drawDots(this.die2, this.result.d2);
    this.die1.container.setRotation(0);
    this.die2.container.setRotation(0);

    // Bounce effect
    this.scene.tweens.add({
      targets: this.die1.container,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      yoyo: true,
      ease: 'Bounce.easeOut'
    });
    this.scene.tweens.add({
      targets: this.die2.container,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 100,
      yoyo: true,
      ease: 'Bounce.easeOut'
    });

    if (this.result.isDoubles) {
      AudioManager.doubles();
    }

    // Hold for a moment then callback
    this.scene.time.delayedCall(800, function() {
      self.rolling = false;
      if (self.onComplete) {
        self.onComplete(self.result);
      }
    });
  },

  hide: function() {
    if (this.container) {
      this.container.setVisible(false);
    }
  },

  setPosition: function(x, y) {
    if (this.container) {
      this.container.setPosition(x, y);
    }
  }
};
