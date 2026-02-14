// ============================================================
// RiyadhTowers — Main Menu Scene (Samsung TV Performance Optimized)
// ============================================================

var MenuScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function MenuScene() {
    Phaser.Scene.call(this, { key: 'MenuScene' });
  },

  create: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;

    AudioManager.init();

    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);

    // ── All static elements rendered to a single texture ──────
    this.renderStaticBackground(w, h);

    // ── Minimal animated elements (3 tweens total) ────────────
    this.createAnimatedElements(w, h);

    // ── UI — Title, prompts ──────────────────────────────────
    this.createUI(w, h);

    // ── Input ────────────────────────────────────────────────
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      self.cameras.main.fadeOut(400, 6, 14, 26);
      self.time.delayedCall(400, function() {
        self.scene.start('PlayerSetupScene');
      });
    });
  },

  // ================================================================
  // STATIC BACKGROUND — pre-rendered as a single texture
  // ================================================================
  renderStaticBackground: function(w, h) {
    var g = this.add.graphics();

    // Sky gradient (6 slices instead of 12)
    var slices = 6;
    var sliceH = h / slices;
    var topColor = 0x060E1A;
    var midColor = 0x0F1E35;
    var horizonColor = 0x2A1F10;
    var i, t, c;
    for (i = 0; i < slices; i++) {
      t = i / (slices - 1);
      if (t < 0.6) {
        c = blendColors(topColor, midColor, t / 0.6);
      } else {
        c = blendColors(midColor, horizonColor, (t - 0.6) / 0.4);
      }
      g.fillStyle(c, 1);
      g.fillRect(0, Math.floor(i * sliceH), w, Math.ceil(sliceH) + 1);
    }

    // Horizon glow
    g.fillStyle(0xC8A951, 0.08);
    g.fillRect(0, h - 320, w, 320);

    // Static stars (25 instead of 40)
    for (i = 0; i < 25; i++) {
      var sx = Math.random() * w;
      var sy = Math.random() * (h * 0.55);
      var size = 0.5 + Math.random() * 1.5;
      var alpha = 0.15 + Math.random() * 0.4;
      g.fillStyle(0xFFFFFF, alpha);
      g.fillCircle(sx, sy, size);
    }

    // Moon
    var moonX = w * 0.82;
    var moonY = h * 0.15;
    g.fillStyle(0xFFF8E0, 0.05);
    g.fillCircle(moonX, moonY, 90);
    g.fillStyle(0xFFF8E0, 0.95);
    g.fillCircle(moonX, moonY, 36);
    g.fillStyle(0x060E1A, 1);
    g.fillCircle(moonX - 36 * 0.55, moonY - 36 * 0.1, 36 * 0.85);

    // Back skyline
    var baseY = h - 240;
    g.fillStyle(0x0D1B30, 0.7);
    var backBuildings = [
      { x: 0, bw: 80, bh: 90 }, { x: 140, bw: 90, bh: 75 },
      { x: 310, bw: 70, bh: 95 }, { x: 470, bw: 85, bh: 80 },
      { x: 650, bw: 75, bh: 100 }, { x: 810, bw: 90, bh: 85 },
      { x: 1000, bw: 80, bh: 90 }, { x: 1170, bw: 70, bh: 100 },
      { x: 1360, bw: 60, bh: 125 }, { x: 1530, bw: 50, bh: 110 },
      { x: 1700, bw: 65, bh: 130 }, { x: 1860, bw: 60, bh: 105 }
    ];
    for (i = 0; i < backBuildings.length; i++) {
      var b = backBuildings[i];
      g.fillRect(b.x, baseY - b.bh, b.bw, b.bh);
    }
    g.fillRect(0, baseY, w, h - baseY);

    // Front skyline (simplified — fewer buildings, no per-window random loops)
    var dark = 0x080F1C;
    baseY = h - 200;
    g.fillStyle(dark, 1);

    // Kingdom Tower
    var ktX = w * 0.30;
    g.fillRect(ktX - 42, baseY - 240, 84, 240);
    g.fillStyle(0x0F1E35, 1);
    g.fillEllipse(ktX, baseY - 202, 34, 26);
    g.fillStyle(dark, 1);
    g.fillRect(ktX - 2, baseY - 260, 4, 20);

    // Kingdom Tower windows (single batch, no random)
    g.fillStyle(0xC8A951, 0.12);
    for (var ky = baseY - 180; ky < baseY - 20; ky += 18) {
      g.fillRect(ktX - 30, ky, 60, 3);
    }

    // Al Faisaliah Tower
    g.fillStyle(dark, 1);
    var ftX = w * 0.65;
    g.beginPath();
    g.moveTo(ftX - 32, baseY);
    g.lineTo(ftX - 5, baseY - 210);
    g.lineTo(ftX + 5, baseY - 210);
    g.lineTo(ftX + 32, baseY);
    g.closePath();
    g.fillPath();
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(ftX, baseY - 212, 10);
    g.fillStyle(dark, 1);
    g.fillRect(ftX - 1.5, baseY - 240, 3, 16);

    // Faisaliah windows (horizontal lines, no random)
    g.fillStyle(0xC8A951, 0.1);
    for (var fy = baseY - 180; fy < baseY - 15; fy += 20) {
      var progress = (baseY - fy) / 210;
      var rowW = 32 * (1 - progress * 0.85) * 2;
      g.fillRect(ftX - rowW / 2, fy, rowW, 2);
    }

    // Mosque (simplified — ellipse instead of path loop)
    g.fillStyle(dark, 1);
    var mosqueX = w * 0.12;
    g.fillRect(mosqueX - 50, baseY - 70, 100, 70);
    g.fillEllipse(mosqueX, baseY - 70, 70, 45);
    // Minarets
    g.fillRect(mosqueX - 58, baseY - 130, 12, 130);
    g.fillCircle(mosqueX - 52, baseY - 130, 7);
    g.fillRect(mosqueX + 46, baseY - 120, 12, 120);
    g.fillCircle(mosqueX + 52, baseY - 120, 7);
    // Crescent finials
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(mosqueX - 52, baseY - 140, 3);
    g.fillCircle(mosqueX + 52, baseY - 130, 3);

    // Second mosque cluster (right side — simplified)
    g.fillStyle(dark, 1);
    var m2X = w * 0.88;
    g.fillRect(m2X - 26, baseY - 110, 12, 110);
    g.fillRect(m2X + 14, baseY - 95, 12, 95);
    g.fillRect(m2X - 25, baseY - 55, 50, 55);
    g.fillEllipse(m2X, baseY - 55, 44, 30);

    // Generic foreground buildings (fewer, no per-window random)
    g.fillStyle(dark, 1);
    var fgBuildings = [
      { x: w * 0.02, bw: 65, bh: 95 }, { x: w * 0.19, bw: 55, bh: 85 },
      { x: w * 0.25, bw: 35, bh: 65 }, { x: w * 0.42, bw: 70, bh: 80 },
      { x: w * 0.52, bw: 60, bh: 90 }, { x: w * 0.60, bw: 40, bh: 55 },
      { x: w * 0.74, bw: 70, bh: 80 }, { x: w * 0.82, bw: 60, bh: 65 },
      { x: w * 0.97, bw: 65, bh: 75 }
    ];
    for (i = 0; i < fgBuildings.length; i++) {
      var fb = fgBuildings[i];
      g.fillRect(fb.x, baseY - fb.bh, fb.bw, fb.bh);
      // Window glow lines instead of per-pixel random
      g.fillStyle(0xC8A951, 0.08);
      for (var wy = baseY - fb.bh + 10; wy < baseY - 6; wy += 16) {
        g.fillRect(fb.x + 5, wy, fb.bw - 10, 2);
      }
      g.fillStyle(dark, 1);
    }

    // Ground fill
    g.fillStyle(dark, 1);
    g.fillRect(0, baseY, w, h - baseY);

    // Sand dunes (2 layers instead of 3, larger step)
    var duneBaseY = h - 50;
    var duneColors = [0x1A150C, 0x241E14];
    for (var layer = 0; layer < duneColors.length; layer++) {
      var offset = layer * 20;
      g.fillStyle(duneColors[layer], 1);
      g.beginPath();
      g.moveTo(0, h);
      for (var dx = 0; dx <= w; dx += 8) {
        var duneY = duneBaseY + offset
          + Math.sin(dx * 0.003 + layer * 0.8) * 12
          + Math.sin(dx * 0.007 + layer * 1.5) * 6;
        g.lineTo(dx, duneY);
      }
      g.lineTo(w, h);
      g.closePath();
      g.fillPath();
    }

    // Convert entire static scene to texture, replace with single sprite
    g.generateTexture('_menuBg', w, h);
    g.destroy();
    this.add.image(w / 2, h / 2, '_menuBg').setDepth(0);
  },

  // ================================================================
  // ANIMATED ELEMENTS — minimal count for ambiance
  // ================================================================
  createAnimatedElements: function(w, h) {
    // 3 twinkling stars (down from 8)
    for (var j = 0; j < 3; j++) {
      var tstar = this.add.graphics();
      tstar.setDepth(1);
      tstar.fillStyle(0xFFF8E0, 1);
      tstar.fillCircle(0, 0, 1.5);
      tstar.setPosition(Math.random() * w, Math.random() * (h * 0.5));
      tstar.setAlpha(0.5);
      this.tweens.add({
        targets: tstar,
        alpha: 0.05,
        duration: 2500 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Math.random() * 2000
      });
    }

    // 2 clouds (down from 4)
    var cloudData = [
      { x: w * 0.25, y: h * 0.12, scaleX: 1.0, alpha: 0.025, drift: 60 },
      { x: w * 0.70, y: h * 0.18, scaleX: 1.2, alpha: 0.02, drift: 50 },
    ];
    for (var i = 0; i < cloudData.length; i++) {
      var cd = cloudData[i];
      var cloud = this.add.graphics();
      cloud.setDepth(3);
      cloud.fillStyle(0xF5E6C8, 1);
      cloud.fillEllipse(0, 0, 200 * cd.scaleX, 25);
      cloud.fillEllipse(50 * cd.scaleX, -3, 140 * cd.scaleX, 18);
      cloud.setPosition(cd.x, cd.y);
      cloud.setAlpha(cd.alpha);
      this.tweens.add({
        targets: cloud,
        x: cd.x + cd.drift,
        duration: 30000 + i * 8000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // 3 gold dust particles (down from 8)
    for (var pi = 0; pi < 3; pi++) {
      var particle = this.add.graphics();
      particle.setDepth(7);
      particle.fillStyle(0xC8A951, 1);
      particle.fillCircle(0, 0, 1 + Math.random() * 2);
      particle.setPosition(Math.random() * w, h + 20);
      particle.setAlpha(0);
      this.createDustTween(particle, w, h, pi);
    }
  },

  createDustTween: function(particle, w, h, index) {
    var self = this;
    var startX = Math.random() * w;
    var startY = h + 20;
    var endY = h * 0.3 + Math.random() * (h * 0.4);
    var driftX = (Math.random() - 0.5) * 100;
    var riseDuration = 10000 + Math.random() * 6000;
    var peakAlpha = 0.2 + Math.random() * 0.2;

    particle.setPosition(startX, startY);
    particle.setAlpha(0);

    self.time.delayedCall(index * 800, function() {
      self.tweens.add({
        targets: particle,
        y: endY,
        x: startX + driftX,
        alpha: { from: 0, to: peakAlpha },
        duration: riseDuration * 0.3,
        ease: 'Sine.easeOut',
      });
      self.tweens.add({
        targets: particle,
        y: endY - 80,
        alpha: 0,
        delay: riseDuration * 0.3,
        duration: riseDuration * 0.7,
        ease: 'Sine.easeIn',
        onComplete: function() {
          self.time.delayedCall(200, function() {
            self.createDustTween(particle, w, h, 0);
          });
        }
      });
    });
  },

  // ================================================================
  // UI — Title, prompts
  // ================================================================
  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
    InputManager.clear();
  },

  createUI: function(w, h) {
    var uiContainer = this.add.container(0, 0);
    uiContainer.setDepth(10);

    var titleY = h * 0.20;
    var titleAr = this.add.text(w / 2, titleY, '\u0623\u0628\u0631\u0627\u062C \u0627\u0644\u0631\u064A\u0627\u0636', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '96px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 8,
      shadow: { offsetX: 0, offsetY: 4, color: '#000000', blur: 12, fill: true }
    }).setOrigin(0.5);
    uiContainer.add(titleAr);

    this.tweens.add({
      targets: titleAr,
      alpha: { from: 1, to: 0.78 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    var subY = titleY + 80;
    uiContainer.add(this.add.text(w / 2, subY, 'RIYADHTOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '42px',
      color: COLORS.warmSand,
      stroke: '#0A1628',
      strokeThickness: 4,
      letterSpacing: 6
    }).setOrigin(0.5));

    // Gold line separator (single graphics)
    var lineY = subY + 45;
    var lineGfx = this.add.graphics();
    lineGfx.lineStyle(2, 0xC8A951, 0.6);
    lineGfx.lineBetween(w / 2 - 200, lineY, w / 2 + 200, lineY);
    lineGfx.fillStyle(0xC8A951, 0.8);
    lineGfx.fillCircle(w / 2, lineY, 4);
    uiContainer.add(lineGfx);

    var promptY = h * 0.62;
    var promptAr = this.add.text(w / 2, promptY, '\u0627\u0636\u063A\u0637 Enter \u0644\u0644\u0628\u062F\u0621', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '40px',
      fontStyle: '700',
      color: COLORS.accent,
      stroke: '#0A1628',
      strokeThickness: 3
    }).setOrigin(0.5);
    uiContainer.add(promptAr);

    var promptEn = this.add.text(w / 2, promptY + 48, 'Press Enter to Start', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '26px',
      color: COLORS.textSecondary,
      stroke: '#0A1628',
      strokeThickness: 2
    }).setOrigin(0.5);
    uiContainer.add(promptEn);

    this.tweens.add({
      targets: [promptAr, promptEn],
      alpha: { from: 1, to: 0.25 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    uiContainer.add(this.add.text(w / 2, h - 40, 'A Saudi-themed Monopoly Experience | D-Pad + Enter', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setAlpha(0.3));
  }
});
