// ============================================================
// RiyadhTowers — Premium Main Menu Scene
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

    // ── Layer 0: Sky gradient background (static) ──────────
    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);
    this.drawSkyGradient(w, h);

    // ── Layer 1: Stars (animated twinkle) ──────────────────
    this.createStars(w, h);

    // ── Layer 2: Moon with halo ────────────────────────────
    this.drawMoon(w, h);

    // ── Layer 3: Clouds (slow drift) ───────────────────────
    this.createClouds(w, h);

    // ── Layer 4: Background skyline (lighter, farther) ─────
    this.drawBackSkyline(w, h);

    // ── Layer 5: Foreground skyline (darker, closer) ───────
    this.drawFrontSkyline(w, h);

    // ── Layer 6: Sand dunes at bottom ──────────────────────
    this.drawSandDunes(w, h);

    // ── Layer 7: Gold dust particles ───────────────────────
    this.createGoldDust(w, h);

    // ── Layer 8: UI — Title, prompts, credits ──────────────
    this.createUI(w, h);

    // ── Input ──────────────────────────────────────────────
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      self.cameras.main.fadeOut(500, 6, 14, 26);
      self.time.delayedCall(500, function() {
        self.scene.start('PlayerSetupScene');
      });
    });
  },

  // ================================================================
  // SKY GRADIENT — deep navy top to warm dark amber at horizon
  // ================================================================
  drawSkyGradient: function(w, h) {
    var sky = this.add.graphics();
    sky.setDepth(0);

    // Main sky: deep navy to dark blue-gray
    var slices = 12;
    var sliceH = h / slices;
    var topColor = 0x060E1A;       // deepNavy
    var midColor = 0x0F1E35;       // dark blue
    var horizonColor = 0x2A1F10;   // warm dark amber

    var i, t, c;
    for (i = 0; i < slices; i++) {
      t = i / (slices - 1);
      if (t < 0.6) {
        c = blendColors(topColor, midColor, t / 0.6);
      } else {
        c = blendColors(midColor, horizonColor, (t - 0.6) / 0.4);
      }
      sky.fillStyle(c, 1);
      sky.fillRect(0, Math.floor(i * sliceH), w, Math.ceil(sliceH) + 1);
    }

    // Horizon glow band
    var glow = this.add.graphics();
    glow.setDepth(0);
    glow.fillStyle(0xC8A951, 0.08);
    glow.fillRect(0, h - 320, w, 320);
    glow.fillStyle(0xC8A951, 0.05);
    glow.fillRect(0, h - 400, w, 80);
  },

  // ================================================================
  // STARS — 50 twinkling points, varied size/alpha/speed
  // ================================================================
  createStars: function(w, h) {
    // Draw ALL stars into a single static graphics object for performance
    var staticStars = this.add.graphics();
    staticStars.setDepth(1);

    for (var i = 0; i < 40; i++) {
      var sx = Math.random() * w;
      var sy = Math.random() * (h * 0.55);
      var size = 0.5 + Math.random() * 1.5;
      var alpha = 0.15 + Math.random() * 0.4;
      staticStars.fillStyle(0xFFFFFF, alpha);
      staticStars.fillCircle(sx, sy, size);
    }

    // Only 8 animated twinkle stars (separate objects for tween)
    for (var j = 0; j < 8; j++) {
      var tx = Math.random() * w;
      var ty = Math.random() * (h * 0.5);
      var tstar = this.add.graphics();
      tstar.setDepth(1);
      tstar.fillStyle(0xFFF8E0, 1);
      tstar.fillCircle(0, 0, 1.5);
      tstar.setPosition(tx, ty);
      tstar.setAlpha(0.3 + Math.random() * 0.4);

      this.tweens.add({
        targets: tstar,
        alpha: 0.05,
        duration: 2000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Math.random() * 2000
      });
    }
  },

  // ================================================================
  // CRESCENT MOON with subtle halo
  // ================================================================
  drawMoon: function(w, h) {
    var moonX = w * 0.82;
    var moonY = h * 0.15;
    var moonR = 36;

    var moonContainer = this.add.container(moonX, moonY);
    moonContainer.setDepth(2);

    // Outer halo (large, very subtle)
    var halo = this.add.graphics();
    halo.fillStyle(0xFFF8E0, 0.03);
    halo.fillCircle(0, 0, moonR * 4);
    halo.fillStyle(0xFFF8E0, 0.05);
    halo.fillCircle(0, 0, moonR * 2.5);
    halo.fillStyle(0xFFF8E0, 0.07);
    halo.fillCircle(0, 0, moonR * 1.6);
    moonContainer.add(halo);

    // Moon body (bright crescent)
    var moon = this.add.graphics();
    // Full moon disc
    moon.fillStyle(0xFFF8E0, 0.95);
    moon.fillCircle(0, 0, moonR);
    // Cutout for crescent (shift to left to create right-facing crescent)
    moon.fillStyle(0x060E1A, 1);
    moon.fillCircle(-moonR * 0.55, -moonR * 0.1, moonR * 0.85);
    moonContainer.add(moon);

    // Subtle pulse on halo
    this.tweens.add({
      targets: halo,
      alpha: 0.7,
      duration: 4000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  },

  // ================================================================
  // CLOUDS — 4 slow-drifting atmospheric wisps
  // ================================================================
  createClouds: function(w, h) {
    var cloudData = [
      { x: w * 0.15, y: h * 0.12, scaleX: 1.0, alpha: 0.025, drift: 80 },
      { x: w * 0.55, y: h * 0.20, scaleX: 1.3, alpha: 0.02,  drift: 60 },
      { x: w * 0.80, y: h * 0.08, scaleX: 0.8, alpha: 0.03,  drift: 70 },
      { x: w * 0.35, y: h * 0.25, scaleX: 1.1, alpha: 0.018, drift: 90 }
    ];

    for (var i = 0; i < cloudData.length; i++) {
      var cd = cloudData[i];
      var cloud = this.add.graphics();
      cloud.setDepth(3);
      cloud.fillStyle(0xF5E6C8, cd.alpha * 40); // multiply since graphics alpha stacks
      cloud.setAlpha(1);

      // Cloud shape: overlapping ellipses
      cloud.fillStyle(0xF5E6C8, 1);
      cloud.fillEllipse(0, 0, 200 * cd.scaleX, 25);
      cloud.fillEllipse(-40 * cd.scaleX, -5, 120 * cd.scaleX, 20);
      cloud.fillEllipse(50 * cd.scaleX, -3, 140 * cd.scaleX, 18);
      cloud.setPosition(cd.x, cd.y);
      cloud.setAlpha(cd.alpha);

      this.tweens.add({
        targets: cloud,
        x: cd.x + cd.drift,
        duration: 25000 + i * 5000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  },

  // ================================================================
  // BACKGROUND SKYLINE — lighter silhouettes for depth
  // ================================================================
  drawBackSkyline: function(w, h) {
    var g = this.add.graphics();
    g.setDepth(4);

    var baseY = h - 240;
    var silColor = 0x0D1B30;

    g.fillStyle(silColor, 0.7);

    // Distant generic buildings — varied heights
    var backBuildings = [
      { x: 0,   bw: 80,  bh: 90 },
      { x: 70,  bw: 60,  bh: 110 },
      { x: 140, bw: 90,  bh: 75 },
      { x: 250, bw: 50,  bh: 130 },
      { x: 310, bw: 70,  bh: 95 },
      { x: 400, bw: 55,  bh: 105 },
      { x: 470, bw: 85,  bh: 80 },
      { x: 570, bw: 60,  bh: 120 },
      { x: 650, bw: 75,  bh: 100 },
      { x: 740, bw: 50,  bh: 140 },
      { x: 810, bw: 90,  bh: 85 },
      { x: 920, bw: 65,  bh: 115 },
      { x: 1000, bw: 80, bh: 90 },
      { x: 1100, bw: 55, bh: 135 },
      { x: 1170, bw: 70, bh: 100 },
      { x: 1260, bw: 85, bh: 80 },
      { x: 1360, bw: 60, bh: 125 },
      { x: 1440, bw: 75, bh: 95 },
      { x: 1530, bw: 50, bh: 110 },
      { x: 1600, bw: 90, bh: 75 },
      { x: 1700, bw: 65, bh: 130 },
      { x: 1780, bw: 80, bh: 90 },
      { x: 1860, bw: 60, bh: 105 }
    ];

    for (var i = 0; i < backBuildings.length; i++) {
      var b = backBuildings[i];
      g.fillRect(b.x, baseY - b.bh, b.bw, b.bh);
    }

    // Fill below back skyline to base
    g.fillRect(0, baseY, w, h - baseY);
  },

  // ================================================================
  // FOREGROUND SKYLINE — Kingdom Tower, Al Faisaliah, minarets, etc.
  // ================================================================
  drawFrontSkyline: function(w, h) {
    var g = this.add.graphics();
    g.setDepth(5);

    var baseY = h - 200;
    var dark = 0x080F1C;
    var windowColor = 0xC8A951;

    g.fillStyle(dark, 1);

    // ── Kingdom Tower (center-left) — distinctive parabolic arch ──
    var ktX = w * 0.30;
    var ktW = 42;
    var ktH = 240;

    // Main tower body
    g.fillRect(ktX - ktW, baseY - ktH, ktW * 2, ktH);

    // Tapered top edges
    g.beginPath();
    g.moveTo(ktX - ktW - 8, baseY);
    g.lineTo(ktX - ktW, baseY - ktH);
    g.lineTo(ktX - ktW, baseY);
    g.closePath();
    g.fillPath();

    g.beginPath();
    g.moveTo(ktX + ktW + 8, baseY);
    g.lineTo(ktX + ktW, baseY - ktH);
    g.lineTo(ktX + ktW, baseY);
    g.closePath();
    g.fillPath();

    // Sky bridge / arch at top — cut out an ellipse
    g.fillStyle(0x0F1E35, 1); // slightly lighter than pure bg for depth
    g.fillEllipse(ktX, baseY - ktH + 38, 34, 26);

    // Antenna spire
    g.fillStyle(dark, 1);
    g.fillRect(ktX - 2, baseY - ktH - 20, 4, 20);

    // Windows on Kingdom Tower
    g.fillStyle(windowColor, 0.15);
    for (var ky = baseY - ktH + 60; ky < baseY - 20; ky += 12) {
      for (var kx = ktX - ktW + 8; kx < ktX + ktW - 8; kx += 10) {
        if (Math.random() > 0.35) {
          g.fillRect(kx, ky, 3, 5);
        }
      }
    }

    // ── Al Faisaliah Tower (center-right) — tapering with golden sphere ──
    g.fillStyle(dark, 1);
    var ftX = w * 0.65;
    var ftW = 32;
    var ftH = 210;

    // Tapering body
    g.beginPath();
    g.moveTo(ftX - ftW, baseY);
    g.lineTo(ftX - ftW * 0.15, baseY - ftH);
    g.lineTo(ftX + ftW * 0.15, baseY - ftH);
    g.lineTo(ftX + ftW, baseY);
    g.closePath();
    g.fillPath();

    // Golden sphere at top
    g.fillStyle(0xC8A951, 0.35);
    g.fillCircle(ftX, baseY - ftH - 2, 10);
    g.fillStyle(0xC8A951, 0.15);
    g.fillCircle(ftX, baseY - ftH - 2, 14);

    // Spire above sphere
    g.fillStyle(dark, 1);
    g.fillRect(ftX - 1.5, baseY - ftH - 30, 3, 16);

    // Windows on Faisaliah
    g.fillStyle(windowColor, 0.12);
    for (var fy = baseY - ftH + 30; fy < baseY - 15; fy += 14) {
      // Width narrows as we go up
      var progress = (baseY - fy) / ftH;
      var rowHalfW = ftW * (1 - progress * 0.85);
      for (var fx = ftX - rowHalfW + 5; fx < ftX + rowHalfW - 5; fx += 9) {
        if (Math.random() > 0.4) {
          g.fillRect(fx, fy, 2, 5);
        }
      }
    }

    // ── Mosque with dome and minarets (left side) ──
    g.fillStyle(dark, 1);
    var mosqueX = w * 0.12;
    var mosqueBaseW = 100;
    var mosqueH = 70;

    // Mosque body
    g.fillRect(mosqueX - mosqueBaseW / 2, baseY - mosqueH, mosqueBaseW, mosqueH);

    // Main dome
    g.fillStyle(dark, 1);
    g.beginPath();
    var domeR = mosqueBaseW * 0.35;
    // Draw dome as half-ellipse
    for (var da = 0; da <= Math.PI; da += 0.05) {
      var dx = mosqueX + Math.cos(da + Math.PI) * domeR;
      var dy = (baseY - mosqueH) - Math.sin(da) * domeR * 0.8;
      if (da === 0) {
        g.moveTo(dx, dy);
      } else {
        g.lineTo(dx, dy);
      }
    }
    g.closePath();
    g.fillPath();

    // Crescent finial on dome
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(mosqueX, baseY - mosqueH - domeR * 0.8 - 8, 4);
    g.fillStyle(dark, 1);
    g.fillCircle(mosqueX - 2, baseY - mosqueH - domeR * 0.8 - 9, 3.5);

    // Left minaret
    g.fillStyle(dark, 1);
    var minLX = mosqueX - mosqueBaseW / 2 - 8;
    var minH = 130;
    g.fillRect(minLX - 6, baseY - minH, 12, minH);
    // Minaret dome
    g.fillCircle(minLX, baseY - minH, 7);
    // Crescent finial
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(minLX, baseY - minH - 10, 3);
    g.fillStyle(dark, 1);
    g.fillCircle(minLX - 1.5, baseY - minH - 10.5, 2.5);

    // Right minaret
    g.fillStyle(dark, 1);
    var minRX = mosqueX + mosqueBaseW / 2 + 8;
    g.fillRect(minRX - 6, baseY - minH + 10, 12, minH - 10);
    g.fillCircle(minRX, baseY - minH + 10, 7);
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(minRX, baseY - minH, 3);
    g.fillStyle(dark, 1);
    g.fillCircle(minRX - 1.5, baseY - minH - 0.5, 2.5);

    // Mosque windows
    g.fillStyle(windowColor, 0.12);
    for (var my = baseY - mosqueH + 15; my < baseY - 8; my += 14) {
      for (var mx = mosqueX - mosqueBaseW / 2 + 10; mx < mosqueX + mosqueBaseW / 2 - 10; mx += 14) {
        if (Math.random() > 0.5) {
          g.fillRect(mx, my, 3, 6);
        }
      }
    }

    // ── Second mosque / minaret cluster (right side) ──
    g.fillStyle(dark, 1);
    var m2X = w * 0.88;

    // Two minarets
    g.fillRect(m2X - 20 - 6, baseY - 110, 12, 110);
    g.fillCircle(m2X - 20, baseY - 110, 7);
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(m2X - 20, baseY - 120, 3);
    g.fillStyle(dark, 1);
    g.fillCircle(m2X - 21.5, baseY - 120.5, 2.5);

    g.fillStyle(dark, 1);
    g.fillRect(m2X + 20 - 6, baseY - 95, 12, 95);
    g.fillCircle(m2X + 20, baseY - 95, 7);
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(m2X + 20, baseY - 105, 3);
    g.fillStyle(dark, 1);
    g.fillCircle(m2X + 18.5, baseY - 105.5, 2.5);

    // Small dome between minarets
    g.fillStyle(dark, 1);
    g.fillRect(m2X - 25, baseY - 55, 50, 55);
    g.beginPath();
    for (var d2a = 0; d2a <= Math.PI; d2a += 0.05) {
      var d2x = m2X + Math.cos(d2a + Math.PI) * 22;
      var d2y = (baseY - 55) - Math.sin(d2a) * 18;
      if (d2a === 0) {
        g.moveTo(d2x, d2y);
      } else {
        g.lineTo(d2x, d2y);
      }
    }
    g.closePath();
    g.fillPath();

    // ── Generic foreground buildings filling gaps ──
    g.fillStyle(dark, 1);
    var fgBuildings = [
      { x: w * 0.02, bw: 65, bh: 95 },
      { x: w * 0.06, bw: 45, bh: 75 },
      { x: w * 0.19, bw: 55, bh: 85 },
      { x: w * 0.22, bw: 40, bh: 110 },
      { x: w * 0.25, bw: 35, bh: 65 },
      { x: w * 0.38, bw: 50, bh: 100 },
      { x: w * 0.42, bw: 70, bh: 80 },
      { x: w * 0.47, bw: 45, bh: 130 },
      { x: w * 0.52, bw: 60, bh: 90 },
      { x: w * 0.56, bw: 35, bh: 70 },
      { x: w * 0.60, bw: 40, bh: 55 },
      { x: w * 0.70, bw: 55, bh: 105 },
      { x: w * 0.74, bw: 70, bh: 80 },
      { x: w * 0.78, bw: 45, bh: 120 },
      { x: w * 0.82, bw: 60, bh: 65 },
      { x: w * 0.93, bw: 50, bh: 90 },
      { x: w * 0.97, bw: 65, bh: 75 }
    ];

    for (var fi = 0; fi < fgBuildings.length; fi++) {
      var fb = fgBuildings[fi];
      g.fillRect(fb.x, baseY - fb.bh, fb.bw, fb.bh);

      // Window dots
      g.fillStyle(windowColor, 0.1);
      for (var wy = baseY - fb.bh + 8; wy < baseY - 6; wy += 11) {
        for (var wx = fb.x + 6; wx < fb.x + fb.bw - 6; wx += 10) {
          if (Math.random() > 0.5) {
            g.fillRect(wx, wy, 3, 4);
          }
        }
      }
      g.fillStyle(dark, 1);
    }

    // Ground fill below foreground skyline
    g.fillStyle(dark, 1);
    g.fillRect(0, baseY, w, h - baseY);
  },

  // ================================================================
  // SAND DUNES — gentle curves at the very bottom
  // ================================================================
  drawSandDunes: function(w, h) {
    var g = this.add.graphics();
    g.setDepth(6);

    var duneBaseY = h - 50;

    // Dune gradient: dark sand at top, slightly warmer at bottom
    var duneColors = [
      { color: 0x1A150C, alpha: 1 },
      { color: 0x1F1A10, alpha: 1 },
      { color: 0x241E14, alpha: 1 }
    ];

    // Draw gentle dune curve using path
    for (var layer = 0; layer < duneColors.length; layer++) {
      var dc = duneColors[layer];
      var offset = layer * 15;

      g.fillStyle(dc.color, dc.alpha);
      g.beginPath();
      g.moveTo(0, h);

      // Sine-wave dune contour
      for (var dx = 0; dx <= w; dx += 4) {
        var duneY = duneBaseY + offset
          + Math.sin(dx * 0.003 + layer * 0.8) * 12
          + Math.sin(dx * 0.007 + layer * 1.5) * 6
          + Math.sin(dx * 0.001 + layer * 0.3) * 8;
        g.lineTo(dx, duneY);
      }

      g.lineTo(w, h);
      g.closePath();
      g.fillPath();
    }
  },

  // ================================================================
  // GOLD DUST PARTICLES — 20 max, slowly rising from bottom
  // ================================================================
  createGoldDust: function(w, h) {
    var dustContainer = this.add.container(0, 0);
    dustContainer.setDepth(7);

    var particleCount = 8;

    for (var i = 0; i < particleCount; i++) {
      var px = Math.random() * w;
      var py = h + Math.random() * 200; // start below or at bottom
      var pSize = 1 + Math.random() * 2;

      var particle = this.add.graphics();
      particle.fillStyle(0xC8A951, 1);
      particle.fillCircle(0, 0, pSize);
      particle.setPosition(px, py);
      particle.setAlpha(0);

      dustContainer.add(particle);

      // Animate: rise from bottom, fade in then out, drift sideways
      this.createDustTween(particle, w, h, i);
    }
  },

  createDustTween: function(particle, w, h, index) {
    var self = this;
    var startDelay = index * 600 + Math.random() * 2000;

    var startX = Math.random() * w;
    var startY = h + 20 + Math.random() * 60;
    var endY = h * 0.3 + Math.random() * (h * 0.4);
    var driftX = (Math.random() - 0.5) * 120;
    var riseDuration = 8000 + Math.random() * 6000;
    var peakAlpha = 0.25 + Math.random() * 0.25;

    particle.setPosition(startX, startY);
    particle.setAlpha(0);

    // Use a single chained tween with onComplete restart (non-recursive via delayedCall)
    self.time.delayedCall(startDelay, function() {
      // Phase 1: rise and fade in
      self.tweens.add({
        targets: particle,
        y: endY,
        x: startX + driftX,
        alpha: { from: 0, to: peakAlpha },
        duration: riseDuration * 0.3,
        ease: 'Sine.easeOut',
      });

      // Phase 2: continue rising and fade out (delayed start)
      self.tweens.add({
        targets: particle,
        y: endY - 80 - Math.random() * 60,
        x: startX + driftX + (Math.random() - 0.5) * 40,
        alpha: 0,
        delay: riseDuration * 0.3,
        duration: riseDuration * 0.7,
        ease: 'Sine.easeIn',
        onComplete: function() {
          // Use delayedCall to break recursion chain and allow GC
          self.time.delayedCall(100, function() {
            self.createDustTween(particle, w, h, 0);
          });
        }
      });
    });
  },

  // ================================================================
  // UI — Title, ornaments, prompts, credits
  // ================================================================
  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
    InputManager.clear();
  },

  createUI: function(w, h) {
    var uiContainer = this.add.container(0, 0);
    uiContainer.setDepth(10);

    // ── Arabic Title ──
    var titleY = h * 0.20;
    var titleAr = this.add.text(w / 2, titleY, '\u0623\u0628\u0631\u0627\u062C \u0627\u0644\u0631\u064A\u0627\u0636', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '96px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 8,
      shadow: {
        offsetX: 0,
        offsetY: 4,
        color: '#000000',
        blur: 12,
        fill: true
      }
    }).setOrigin(0.5);
    uiContainer.add(titleAr);

    // Gold shimmer — subtle alpha oscillation
    this.tweens.add({
      targets: titleAr,
      alpha: { from: 1, to: 0.78 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // ── English Subtitle ──
    var subY = titleY + 80;
    var titleEn = this.add.text(w / 2, subY, 'RIYADHTOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '42px',
      color: COLORS.warmSand,
      stroke: '#0A1628',
      strokeThickness: 4,
      letterSpacing: 6
    }).setOrigin(0.5);
    uiContainer.add(titleEn);

    // ── Decorative gold line separator with diamond ornaments ──
    var lineY = subY + 45;
    var lineGfx = this.add.graphics();
    lineGfx.setDepth(10);

    var lineHalfW = 220;
    var lineThickness = 2;

    // Center diamond
    lineGfx.fillStyle(0xC8A951, 0.8);
    lineGfx.beginPath();
    lineGfx.moveTo(w / 2, lineY - 6);
    lineGfx.lineTo(w / 2 + 6, lineY);
    lineGfx.lineTo(w / 2, lineY + 6);
    lineGfx.lineTo(w / 2 - 6, lineY);
    lineGfx.closePath();
    lineGfx.fillPath();

    // Left diamond
    lineGfx.beginPath();
    lineGfx.moveTo(w / 2 - lineHalfW + 20, lineY - 4);
    lineGfx.lineTo(w / 2 - lineHalfW + 24, lineY);
    lineGfx.lineTo(w / 2 - lineHalfW + 20, lineY + 4);
    lineGfx.lineTo(w / 2 - lineHalfW + 16, lineY);
    lineGfx.closePath();
    lineGfx.fillPath();

    // Right diamond
    lineGfx.beginPath();
    lineGfx.moveTo(w / 2 + lineHalfW - 20, lineY - 4);
    lineGfx.lineTo(w / 2 + lineHalfW - 16, lineY);
    lineGfx.lineTo(w / 2 + lineHalfW - 20, lineY + 4);
    lineGfx.lineTo(w / 2 + lineHalfW - 24, lineY);
    lineGfx.closePath();
    lineGfx.fillPath();

    // Lines between diamonds
    lineGfx.lineStyle(lineThickness, 0xC8A951, 0.6);
    lineGfx.lineBetween(w / 2 - lineHalfW + 28, lineY, w / 2 - 10, lineY);
    lineGfx.lineBetween(w / 2 + 10, lineY, w / 2 + lineHalfW - 28, lineY);

    // Outer line stubs
    lineGfx.lineStyle(1, 0xC8A951, 0.3);
    lineGfx.lineBetween(w / 2 - lineHalfW, lineY, w / 2 - lineHalfW + 12, lineY);
    lineGfx.lineBetween(w / 2 + lineHalfW - 12, lineY, w / 2 + lineHalfW, lineY);

    uiContainer.add(lineGfx);

    // ── Press Enter prompt — Arabic ──
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

    // ── Press Enter prompt — English ──
    var promptEn = this.add.text(w / 2, promptY + 48, 'Press Enter to Start', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '26px',
      color: COLORS.textSecondary,
      stroke: '#0A1628',
      strokeThickness: 2
    }).setOrigin(0.5);
    uiContainer.add(promptEn);

    // Pulsing animation for prompts
    this.tweens.add({
      targets: [promptAr, promptEn],
      alpha: { from: 1, to: 0.25 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // ── Bottom credits ──
    var creditText = this.add.text(w / 2, h - 58, 'A Saudi-themed Monopoly Experience', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setAlpha(0.45);
    uiContainer.add(creditText);

    // ── D-Pad hint ──
    var hintText = this.add.text(w / 2, h - 28, 'D-Pad + Enter', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setAlpha(0.3);
    uiContainer.add(hintText);
  }
});
