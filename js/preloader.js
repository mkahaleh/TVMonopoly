// ============================================================
// RiyadhTowers — Premium Preloader Scene
// Samsung TV optimized — minimal draw calls, limited particles
// ============================================================

var PreloaderScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function PreloaderScene() {
    Phaser.Scene.call(this, { key: 'PreloaderScene' });
  },

  create: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;

    // ── Deep navy background ──────────────────────────────
    this.cameras.main.setBackgroundColor(0x060E1A);

    // ── Islamic geometric star pattern (single graphics, low opacity) ──
    this.patternGraphics = this.drawIslamicPattern();

    // ── Ambient gold particles (capped at 15 for TV) ─────
    this.particles = [];
    this.createAmbientParticles();

    // ── Decorative crescent moon and star ─────────────────
    this.drawCrescentMoon(w / 2, h * 0.18);

    // ── Game title: Arabic ────────────────────────────────
    var titleAr = this.add.text(w / 2, h * 0.32, '\u0623\u0628\u0631\u0627\u062C \u0627\u0644\u0631\u064A\u0627\u0636', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '88px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 6,
    }).setOrigin(0.5);

    // ── Game title: English ───────────────────────────────
    var titleEn = this.add.text(w / 2, h * 0.32 + 72, 'RIYADHTOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '36px',
      color: COLORS.warmSand,
      letterSpacing: 8,
      stroke: '#0A1628',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // ── Decorative gold divider below title ───────────────
    var divider = this.add.graphics();
    divider.lineStyle(2, COLORS_INT.desertGold, 0.5);
    divider.lineBetween(w / 2 - 180, h * 0.32 + 108, w / 2 + 180, h * 0.32 + 108);
    // Diamond accent in center of divider
    var dy = h * 0.32 + 108;
    divider.fillStyle(COLORS_INT.desertGold, 0.6);
    divider.fillRect(w / 2 - 4, dy - 4, 8, 8);

    // ── Shimmer effect on Arabic title ────────────────────
    this.tweens.add({
      targets: titleAr,
      alpha: 0.75,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // ── Loading bar ───────────────────────────────────────
    var barWidth = 520;
    var barHeight = 14;
    var barX = w / 2 - barWidth / 2;
    var barY = h * 0.58;
    var barRadius = 7;

    // Bar track (dark inset)
    var barTrack = this.add.graphics();
    barTrack.fillStyle(0x0A1628, 1);
    barTrack.fillRoundedRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4, barRadius + 1);
    barTrack.fillStyle(0x162340, 1);
    barTrack.fillRoundedRect(barX, barY, barWidth, barHeight, barRadius);

    // Bar glow (drawn behind fill, updated each frame)
    var barGlow = this.add.graphics();

    // Bar fill (gold gradient — drawn via two overlapping rects for gradient feel)
    var barFill = this.add.graphics();

    // Bar highlight (subtle shine on top half)
    var barHighlight = this.add.graphics();

    // ── Percentage counter ────────────────────────────────
    var percentText = this.add.text(w / 2, barY + 38, '0%', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '30px',
      color: COLORS.desertGold,
    }).setOrigin(0.5);

    // ── Loading status text (Arabic) ──────────────────────
    var loadingAr = this.add.text(w / 2, barY - 36, '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      fontStyle: '700',
      color: COLORS.warmSand,
    }).setOrigin(0.5);

    // Subtle pulse on loading text
    this.tweens.add({
      targets: loadingAr,
      alpha: 0.5,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // ── Loading tips ──────────────────────────────────────
    var tips = [
      { ar: '\u0627\u0634\u062A\u0631\u0650 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062A \u0628\u0630\u0643\u0627\u0621 \u0648\u0627\u0628\u0646\u0650 \u0623\u0628\u0631\u0627\u062C\u0643!', en: 'Buy properties wisely and build your towers!' },
      { ar: '\u0627\u062C\u0645\u0639 \u0645\u062C\u0645\u0648\u0639\u0629 \u0623\u0644\u0648\u0627\u0646 \u0643\u0627\u0645\u0644\u0629 \u0644\u0645\u0636\u0627\u0639\u0641\u0629 \u0627\u0644\u0625\u064A\u062C\u0627\u0631', en: 'Collect a full color set to double the rent' },
      { ar: '\u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0645\u062A\u0631\u0648 \u0645\u0641\u062A\u0627\u062D \u0627\u0644\u0646\u062C\u0627\u062D', en: 'Metro stations are the key to success' },
      { ar: '\u0627\u062D\u0630\u0631 \u0645\u0646 \u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0641\u062E\u0627\u0645\u0629!', en: 'Beware of the Luxury Tax!' },
      { ar: '\u062A\u0641\u0627\u0648\u0636 \u0645\u0639 \u0627\u0644\u0644\u0627\u0639\u0628\u064A\u0646 \u0644\u0644\u0641\u0648\u0632', en: 'Negotiate with players to win' },
    ];
    var currentTip = Math.floor(Math.random() * tips.length);

    var tipAr = this.add.text(w / 2, h * 0.72, tips[currentTip].ar, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: '700',
      color: COLORS.textSecondary,
    }).setOrigin(0.5).setAlpha(0.7);

    var tipEn = this.add.text(w / 2, h * 0.72 + 34, tips[currentTip].en, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5).setAlpha(0.5);

    // Cycle tips every 1.2 seconds
    var tipIndex = 0;
    this.time.addEvent({
      delay: 1200,
      callback: function() {
        tipIndex = (tipIndex + 1) % tips.length;
        tipAr.setText(tips[tipIndex].ar);
        tipEn.setText(tips[tipIndex].en);
      },
      loop: true
    });

    // ── Simulated loading progress (~2 seconds) ──────────
    var progress = 0;
    var displayProgress = 0;
    var loadComplete = false;

    var timer = this.time.addEvent({
      delay: 30,
      callback: function() {
        // Accelerate progress with a slight random jitter
        progress += 0.012 + Math.random() * 0.02;
        if (progress >= 1) {
          progress = 1;
          if (!loadComplete) {
            loadComplete = true;
            timer.remove();
            self.time.delayedCall(500, function() {
              // Fade out then transition
              self.cameras.main.fadeOut(400, 6, 14, 26);
              self.time.delayedCall(400, function() {
                self.scene.start('MenuScene');
              });
            });
          }
        }
      },
      loop: true
    });

    // ── Render loop for bar (throttled to ~20fps for TV) ──
    var lastPct = -1;
    this.time.addEvent({
      delay: 50, // ~20fps is enough for a loading bar
      callback: function() {
        displayProgress += (progress - displayProgress) * 0.15;
        if (progress >= 1 && displayProgress > 0.995) {
          displayProgress = 1;
        }

        var pct = Math.floor(displayProgress * 100);
        // Only redraw when percentage actually changes
        if (pct === lastPct) return;
        lastPct = pct;

        var fillWidth = Math.max(0, barWidth * displayProgress);
        percentText.setText(pct + '%');

        // Redraw bar fill
        barFill.clear();
        if (fillWidth > 2) {
          barFill.fillStyle(COLORS_INT.gold2, 1);
          barFill.fillRoundedRect(barX, barY, fillWidth, barHeight, barRadius);
        }
      },
      loop: true
    });

    // ── Bottom branding line ──────────────────────────────
    this.add.text(w / 2, h - 40, 'A Premium Saudi Board Game Experience', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5).setAlpha(0.3);
  },

  // ================================================================
  // Islamic Geometric Pattern — 8-pointed stars on 80px grid
  // Single graphics object, drawn once, animated via alpha tween
  // ================================================================
  drawIslamicPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.05);
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var size = 120;
    var r = size * 0.28;
    var PI2 = Math.PI * 2;

    g.lineStyle(1, COLORS_INT.desertGold, 1);

    for (var x = 0; x < w; x += size) {
      for (var y = 0; y < h; y += size) {
        var cx = x + size / 2;
        var cy = y + size / 2;

        // 8-pointed star: connect every 3rd vertex of an octagon
        for (var i = 0; i < 8; i++) {
          var a1 = (i / 8) * PI2;
          var a2 = ((i + 3) / 8) * PI2;
          g.lineBetween(
            cx + Math.cos(a1) * r, cy + Math.sin(a1) * r,
            cx + Math.cos(a2) * r, cy + Math.sin(a2) * r
          );
        }
      }
    }

    // Subtle breathing animation
    this.tweens.add({
      targets: g,
      alpha: 0.09,
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return g;
  },

  // ================================================================
  // Crescent Moon & Star — decorative element above the title
  // Drawn once into a single graphics object
  // ================================================================
  drawCrescentMoon: function(cx, cy) {
    var g = this.add.graphics();
    var moonRadius = 30;
    var cutoutOffset = 12;

    // Outer moon circle (gold, semi-transparent)
    g.fillStyle(COLORS_INT.desertGold, 0.85);
    g.fillCircle(cx, cy, moonRadius);

    // Inner cutout circle (background color) to form crescent
    g.fillStyle(0x060E1A, 1);
    g.fillCircle(cx + cutoutOffset, cy - 6, moonRadius - 3);

    // Five-pointed star to the right of crescent
    var starCx = cx + moonRadius + 16;
    var starCy = cy - 8;
    var outerR = 10;
    var innerR = 4;

    g.fillStyle(COLORS_INT.desertGold, 0.85);
    g.beginPath();
    for (var i = 0; i < 10; i++) {
      var angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      var rad = (i % 2 === 0) ? outerR : innerR;
      if (i === 0) {
        g.moveTo(starCx + Math.cos(angle) * rad, starCy + Math.sin(angle) * rad);
      } else {
        g.lineTo(starCx + Math.cos(angle) * rad, starCy + Math.sin(angle) * rad);
      }
    }
    g.closePath();
    g.fillPath();

    // Subtle glow behind crescent
    var glow = this.add.graphics();
    glow.fillStyle(COLORS_INT.desertGold, 0.06);
    glow.fillCircle(cx, cy, moonRadius + 30);
    glow.setDepth(-1);

    // Gentle float animation on the crescent group
    this.tweens.add({
      targets: [g, glow],
      y: -6,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return g;
  },

  // ================================================================
  // Ambient Gold Particles — 15 max, reused via repositioning
  // Each particle is a small graphics circle, animated upward
  // ================================================================
  createAmbientParticles: function() {
    var self = this;
    var count = 6;

    for (var i = 0; i < count; i++) {
      var p = this.add.graphics();
      var size = 1.5 + Math.random() * 2.5;
      p.fillStyle(COLORS_INT.desertGold, 0.3 + Math.random() * 0.3);
      p.fillCircle(0, 0, size);

      // Random starting position
      p.x = Math.random() * GAME_WIDTH;
      p.y = GAME_HEIGHT + Math.random() * 100;
      p.setAlpha(0);

      self.particles.push(p);
      self.launchParticle(p, 500 + Math.random() * 2000);
    }
  },

  launchParticle: function(p, delay) {
    var self = this;

    this.time.delayedCall(delay, function() {
      // Reset to bottom with random X
      p.x = 100 + Math.random() * (GAME_WIDTH - 200);
      p.y = GAME_HEIGHT + 20;
      p.setAlpha(0);

      var duration = 3000 + Math.random() * 3000;
      var targetY = -40 - Math.random() * 60;
      var drift = -60 + Math.random() * 120;

      // Fade in, float up, fade out
      self.tweens.add({
        targets: p,
        y: targetY,
        x: p.x + drift,
        duration: duration,
        ease: 'Sine.easeOut',
      });

      self.tweens.add({
        targets: p,
        alpha: { from: 0, to: 0.5 + Math.random() * 0.3 },
        duration: duration * 0.3,
        ease: 'Sine.easeIn',
        onComplete: function() {
          self.tweens.add({
            targets: p,
            alpha: 0,
            duration: duration * 0.5,
            ease: 'Sine.easeOut',
            onComplete: function() {
              // Relaunch the same particle
              self.launchParticle(p, 200 + Math.random() * 800);
            }
          });
        }
      });
    });
  }
});
