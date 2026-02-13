// ============================================================
// Riyadh Tycoon — Premium 3D Dice Animation System
// ============================================================

var DiceManager = (function() {

  // --- Constants ---
  var DIE_SIZE = 80;
  var DIE_HALF = DIE_SIZE / 2;
  var DIE_RADIUS = 12;
  var DOT_RADIUS = 7;
  var DOT_HIGHLIGHT_RADIUS = 3;
  var DOT_SHADOW_OFFSET = 1.5;
  var DIE_SPACING = 50;
  var SHADOW_OFFSET_Y = 8;

  // Colors
  var COL_BODY = 0xFCF5E5;
  var COL_BORDER = 0xC8A951;
  var COL_HIGHLIGHT = 0xFFFDF5;
  var COL_BEVEL_DARK = 0xD8CDB0;
  var COL_DOT = 0x1A2744;
  var COL_DOT_HIGHLIGHT = 0x3A4F6E;
  var COL_DOT_SHADOW = 0x0C1422;
  var COL_SHADOW = 0x040810;
  var COL_GLOW_DOUBLES = 0xE8B931;
  var COL_TOTAL_BG = 0x0F1B2E;
  var COL_TOTAL_BORDER = 0xC8A951;

  // Roll animation
  var ROLL_FRAMES = 8;
  var ROLL_INTERVAL = 80;
  var RESULT_HOLD_MS = 900;

  // --- Cached dot position lookup (value -> [{x,y}]) ---
  var DOT_POSITIONS_CACHE = null;

  function buildDotPositions() {
    if (DOT_POSITIONS_CACHE) return DOT_POSITIONS_CACHE;
    var off = DIE_SIZE * 0.25;
    var cx = 0;
    var cy = 0;
    DOT_POSITIONS_CACHE = {
      1: [{ x: cx, y: cy }],
      2: [{ x: cx - off, y: cy - off }, { x: cx + off, y: cy + off }],
      3: [{ x: cx - off, y: cy - off }, { x: cx, y: cy }, { x: cx + off, y: cy + off }],
      4: [
        { x: cx - off, y: cy - off }, { x: cx + off, y: cy - off },
        { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }
      ],
      5: [
        { x: cx - off, y: cy - off }, { x: cx + off, y: cy - off },
        { x: cx, y: cy },
        { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }
      ],
      6: [
        { x: cx - off, y: cy - off }, { x: cx + off, y: cy - off },
        { x: cx - off, y: cy },       { x: cx + off, y: cy },
        { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }
      ]
    };
    return DOT_POSITIONS_CACHE;
  }

  // --- Die factory ---
  function createDie(scene, x, y) {
    var dieContainer = scene.add.container(x, y);

    // 1) Drop shadow (dark ellipse underneath)
    var shadow = scene.add.graphics();
    shadow.fillStyle(COL_SHADOW, 0.35);
    shadow.fillEllipse(0, DIE_HALF + SHADOW_OFFSET_Y, DIE_SIZE * 0.85, 14);
    dieContainer.add(shadow);

    // 2) Main body
    var body = scene.add.graphics();
    body.fillStyle(COL_BODY, 1);
    body.fillRoundedRect(-DIE_HALF, -DIE_HALF, DIE_SIZE, DIE_SIZE, DIE_RADIUS);
    dieContainer.add(body);

    // 3) Gold border
    var border = scene.add.graphics();
    border.lineStyle(2.5, COL_BORDER, 1);
    border.strokeRoundedRect(-DIE_HALF, -DIE_HALF, DIE_SIZE, DIE_SIZE, DIE_RADIUS);
    dieContainer.add(border);

    // 4) Top bevel highlight — lighter stripe near top edge
    var bevelTop = scene.add.graphics();
    bevelTop.fillStyle(COL_HIGHLIGHT, 0.55);
    bevelTop.fillRoundedRect(
      -DIE_HALF + 4, -DIE_HALF + 2,
      DIE_SIZE - 8, 10,
      { tl: DIE_RADIUS - 2, tr: DIE_RADIUS - 2, bl: 0, br: 0 }
    );
    dieContainer.add(bevelTop);

    // 5) Bottom bevel shadow — darker stripe near bottom edge
    var bevelBottom = scene.add.graphics();
    bevelBottom.fillStyle(COL_BEVEL_DARK, 0.5);
    bevelBottom.fillRoundedRect(
      -DIE_HALF + 4, DIE_HALF - 12,
      DIE_SIZE - 8, 10,
      { tl: 0, tr: 0, bl: DIE_RADIUS - 2, br: DIE_RADIUS - 2 }
    );
    dieContainer.add(bevelBottom);

    // 6) Dots container (redrawn per face value)
    var dotsContainer = scene.add.container(0, 0);
    dieContainer.add(dotsContainer);

    // 7) Glow graphic (hidden by default, shown on doubles)
    var glow = scene.add.graphics();
    glow.fillStyle(COL_GLOW_DOUBLES, 0.25);
    glow.fillRoundedRect(
      -DIE_HALF - 4, -DIE_HALF - 4,
      DIE_SIZE + 8, DIE_SIZE + 8,
      DIE_RADIUS + 2
    );
    glow.setAlpha(0);
    dieContainer.add(glow);

    return {
      container: dieContainer,
      shadow: shadow,
      body: body,
      border: border,
      dotsContainer: dotsContainer,
      glow: glow
    };
  }

  // --- Pre-rendered dot textures for each face value (1-6) ---
  var DOT_TEXTURES_BUILT = false;

  function buildDotTextures(scene) {
    if (DOT_TEXTURES_BUILT) return;
    DOT_TEXTURES_BUILT = true;

    var positions = buildDotPositions();
    for (var val = 1; val <= 6; val++) {
      var texKey = '_diceDots' + val;
      var g = scene.add.graphics();
      var dots = positions[val];

      for (var i = 0; i < dots.length; i++) {
        var px = dots[i].x + DIE_HALF;
        var py = dots[i].y + DIE_HALF;
        g.fillStyle(COL_DOT_SHADOW, 0.5);
        g.fillCircle(px + DOT_SHADOW_OFFSET, py + DOT_SHADOW_OFFSET, DOT_RADIUS);
        g.fillStyle(COL_DOT, 1);
        g.fillCircle(px, py, DOT_RADIUS);
        g.fillStyle(COL_DOT_HIGHLIGHT, 0.7);
        g.fillCircle(px - 2, py - 2, DOT_HIGHLIGHT_RADIUS);
      }

      g.generateTexture(texKey, DIE_SIZE, DIE_SIZE);
      g.destroy();
    }
  }

  // --- Draw dots using pre-rendered textures (no graphics.clear() per frame) ---
  function drawDots(scene, die, value) {
    var texKey = '_diceDots' + value;

    if (!die.dotsImage) {
      die.dotsImage = scene.add.image(0, 0, texKey);
      die.dotsContainer.add(die.dotsImage);
    } else {
      die.dotsImage.setTexture(texKey);
    }
  }

  // --- The public manager object ---
  var manager = {
    scene: null,
    container: null,
    die1: null,
    die2: null,
    rolling: false,
    result: null,
    onComplete: null,
    totalText: null,
    totalBg: null,
    totalContainer: null,

    create: function(scene, x, y) {
      this.scene = scene;
      buildDotPositions();
      buildDotTextures(scene);

      this.container = scene.add.container(x, y);
      this.container.setDepth(100);

      // Create two dice, spaced apart
      this.die1 = createDie(scene, -DIE_SPACING, 0);
      this.die2 = createDie(scene, DIE_SPACING, 0);
      this.container.add([this.die1.container, this.die2.container]);

      // Total indicator container (positioned below dice)
      this.totalContainer = scene.add.container(0, DIE_HALF + 32);

      // Total background pill
      this.totalBg = scene.add.graphics();
      this.totalBg.fillStyle(COL_TOTAL_BG, 0.9);
      this.totalBg.fillRoundedRect(-28, -14, 56, 28, 14);
      this.totalBg.lineStyle(1.5, COL_TOTAL_BORDER, 0.8);
      this.totalBg.strokeRoundedRect(-28, -14, 56, 28, 14);
      this.totalContainer.add(this.totalBg);

      // Total text
      this.totalText = scene.add.text(0, 0, '', {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '20px',
        color: '#F5E6C8',
        stroke: '#0A1628',
        strokeThickness: 2
      }).setOrigin(0.5);
      this.totalContainer.add(this.totalText);

      this.totalContainer.setAlpha(0);
      this.totalContainer.setScale(0.5);
      this.container.add(this.totalContainer);

      // Start hidden
      this.container.setVisible(false);
      this.container.setAlpha(0);
      this.container.setScale(0.5);
    },

    roll: function(d1, d2, callback) {
      if (this.rolling) return;
      this.rolling = true;
      this.onComplete = callback;
      this.result = { d1: d1, d2: d2, total: d1 + d2, isDoubles: d1 === d2 };

      var self = this;
      var scene = this.scene;

      // Reset glow
      this.die1.glow.setAlpha(0);
      this.die2.glow.setAlpha(0);

      // Hide total indicator
      this.totalContainer.setAlpha(0);
      this.totalContainer.setScale(0.5);

      // Show container with scale+alpha entrance
      this.container.setVisible(true);
      this.container.setScale(0.5);
      this.container.setAlpha(0);

      scene.tweens.add({
        targets: this.container,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Back.easeOut'
      });

      // Play sound
      AudioManager.diceRoll();

      // Rolling animation using setInterval
      var frames = 0;

      var rollTimer = scene.time.addEvent({
        delay: ROLL_INTERVAL,
        repeat: ROLL_FRAMES - 1,
        callback: function() {
          var rv1 = Math.floor(Math.random() * 6) + 1;
          var rv2 = Math.floor(Math.random() * 6) + 1;
          drawDots(scene, self.die1, rv1);
          drawDots(scene, self.die2, rv2);

          // Dramatic rotation wobble (decreasing intensity)
          var progress = frames / ROLL_FRAMES;
          var intensity = (1 - progress) * 0.5;
          self.die1.container.setRotation((Math.random() - 0.5) * intensity);
          self.die2.container.setRotation((Math.random() - 0.5) * intensity);

          // Scale pulse during roll
          var pulse = 1 + Math.sin(frames * 1.2) * 0.08 * (1 - progress);
          self.die1.container.setScale(pulse);
          self.die2.container.setScale(pulse);

          frames++;
          if (frames >= ROLL_FRAMES) {
            self.showResult();
          }
        }
      });
    },

    showResult: function() {
      var self = this;
      var scene = this.scene;

      // Draw final face values
      drawDots(scene, this.die1, this.result.d1);
      drawDots(scene, this.die2, this.result.d2);

      // Reset rotation
      this.die1.container.setRotation(0);
      this.die2.container.setRotation(0);

      // Satisfying bounce scale effect on each die
      scene.tweens.add({
        targets: this.die1.container,
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 120,
        ease: 'Quad.easeOut',
        yoyo: true,
        onComplete: function() {
          self.die1.container.setScale(1);
        }
      });

      scene.tweens.add({
        targets: this.die2.container,
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 120,
        delay: 40,
        ease: 'Quad.easeOut',
        yoyo: true,
        onComplete: function() {
          self.die2.container.setScale(1);
        }
      });

      // Doubles: glow effect + sound
      if (this.result.isDoubles) {
        AudioManager.doubles();

        // Fade in glow on both dice
        scene.tweens.add({
          targets: this.die1.glow,
          alpha: 1,
          duration: 300,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: 1,
          hold: 200
        });
        scene.tweens.add({
          targets: this.die2.glow,
          alpha: 1,
          duration: 300,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: 1,
          hold: 200
        });
      }

      // Show total indicator below dice
      this.totalText.setText('' + this.result.total);
      scene.tweens.add({
        targets: this.totalContainer,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 250,
        delay: 180,
        ease: 'Back.easeOut'
      });

      // Hold for a moment then callback
      scene.time.delayedCall(RESULT_HOLD_MS, function() {
        self.rolling = false;
        if (self.onComplete) {
          self.onComplete(self.result);
        }
      });
    },

    hide: function() {
      if (!this.container) return;

      var self = this;
      var scene = this.scene;

      // Smooth hide with scale+alpha
      scene.tweens.add({
        targets: this.container,
        alpha: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 200,
        ease: 'Quad.easeIn',
        onComplete: function() {
          self.container.setVisible(false);
          // Reset glow and total for next roll
          self.die1.glow.setAlpha(0);
          self.die2.glow.setAlpha(0);
          self.totalContainer.setAlpha(0);
          self.totalContainer.setScale(0.5);
        }
      });
    },

    setPosition: function(x, y) {
      if (this.container) {
        this.container.setPosition(x, y);
      }
    }
  };

  return manager;
})();
