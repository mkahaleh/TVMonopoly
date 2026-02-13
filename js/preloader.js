// ============================================================
// Riyadh Tycoon — Preloader Scene
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

    // Dark background
    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);

    // Islamic geometric pattern (animated)
    this.drawIslamicPattern();

    // Loading text
    var loadingAr = this.add.text(w / 2, h / 2 - 60, 'جاري التحميل...', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);

    var loadingEn = this.add.text(w / 2, h / 2, 'Loading...', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '32px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);

    // Progress bar background
    var barWidth = 500;
    var barHeight = 12;
    var barX = w / 2 - barWidth / 2;
    var barY = h / 2 + 60;

    var barBg = this.add.graphics();
    barBg.fillStyle(0x2A3F6B, 1);
    barBg.fillRoundedRect(barX, barY, barWidth, barHeight, 6);

    var barFill = this.add.graphics();
    var percentText = this.add.text(w / 2, barY + 40, '0%', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.desertGold,
    }).setOrigin(0.5);

    // Simulate loading progress
    var progress = 0;
    var timer = this.time.addEvent({
      delay: 30,
      callback: function() {
        progress += 0.02 + Math.random() * 0.03;
        if (progress >= 1) {
          progress = 1;
          timer.remove();
          self.time.delayedCall(400, function() {
            self.scene.start('MenuScene');
          });
        }
        barFill.clear();
        barFill.fillStyle(0xC8A951, 1);
        barFill.fillRoundedRect(barX, barY, barWidth * progress, barHeight, 6);
        percentText.setText(Math.floor(progress * 100) + '%');
      },
      loop: true
    });

    // Subtle pulsing on loading text
    this.tweens.add({
      targets: loadingAr,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  },

  drawIslamicPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.06);
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var size = 60;

    for (var x = 0; x < w; x += size) {
      for (var y = 0; y < h; y += size) {
        g.lineStyle(1, 0xC8A951, 1);
        // 8-pointed star pattern
        var cx = x + size / 2;
        var cy = y + size / 2;
        var r = size * 0.35;
        for (var i = 0; i < 8; i++) {
          var a1 = (i / 8) * Math.PI * 2;
          var a2 = ((i + 3) / 8) * Math.PI * 2;
          g.lineBetween(
            cx + Math.cos(a1) * r, cy + Math.sin(a1) * r,
            cx + Math.cos(a2) * r, cy + Math.sin(a2) * r
          );
        }
      }
    }

    // Subtle animation — slowly rotate the pattern overlay
    this.tweens.add({
      targets: g,
      alpha: 0.1,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
});
