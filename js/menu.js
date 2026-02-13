// ============================================================
// Riyadh Tycoon — Menu Scene
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

    // Background gradient — deep navy to warm amber at horizon
    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);

    // Desert gradient overlay
    var gradient = this.add.graphics();
    gradient.fillGradientStyle(0x0A1628, 0x0A1628, 0x1A1A0F, 0x1A1A0F, 1);
    gradient.fillRect(0, 0, w, h);

    // Horizon glow
    var horizonGlow = this.add.graphics();
    horizonGlow.fillStyle(0xC8A951, 0.15);
    horizonGlow.fillRect(0, h - 250, w, 250);

    // Islamic pattern background
    this.drawMenuPattern();

    // Skyline silhouette
    this.drawSkyline(h - 200);

    // Parallax clouds
    this.createClouds();

    // Game title — Arabic
    var titleAr = this.add.text(w / 2, h * 0.22, 'ريادة الرياض', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '96px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 6,
    }).setOrigin(0.5);

    // Gold shimmer effect on title
    this.tweens.add({
      targets: titleAr,
      alpha: 0.8,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Game title — English subtitle
    var titleEn = this.add.text(w / 2, h * 0.22 + 75, 'RIYADH TYCOON', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '42px',
      color: COLORS.warmSand,
      stroke: '#0A1628',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Decorative line
    var line = this.add.graphics();
    line.lineStyle(2, 0xC8A951, 0.6);
    line.lineBetween(w / 2 - 200, h * 0.22 + 110, w / 2 + 200, h * 0.22 + 110);

    // Subtitle
    this.add.text(w / 2, h * 0.22 + 135, 'لعبة تاجر العقارات', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);

    // Press Enter to Start
    var startText = this.add.text(w / 2, h * 0.65, 'اضغط Enter للبدء', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '40px',
      fontStyle: 'bold',
      color: COLORS.accent,
    }).setOrigin(0.5);

    var startTextEn = this.add.text(w / 2, h * 0.65 + 50, 'Press Enter to Start', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);

    // Pulsing animation
    this.tweens.add({
      targets: [startText, startTextEn],
      alpha: 0.3,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Bouncing
    this.tweens.add({
      targets: startText,
      y: h * 0.65 - 5,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Credits
    this.add.text(w / 2, h - 60, 'A Saudi-themed Monopoly Experience', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: COLORS.textSecondary,
      alpha: 0.5,
    }).setOrigin(0.5);

    // Remote hints
    this.add.text(w / 2, h - 30, '🎮 D-Pad + Enter', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.textSecondary,
      alpha: 0.3,
    }).setOrigin(0.5);

    // Input
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      self.cameras.main.fadeOut(500, 10, 22, 40);
      self.time.delayedCall(500, function() {
        self.scene.start('PlayerSetupScene');
      });
    });
  },

  drawMenuPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.04);
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var size = 80;

    for (var x = 0; x < w; x += size) {
      for (var y = 0; y < h; y += size) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        var r = size * 0.35;
        g.lineStyle(1, 0xC8A951, 1);
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
  },

  drawSkyline: function(baseY) {
    var g = this.add.graphics();
    g.fillStyle(0x0D1B30, 1);

    var w = GAME_WIDTH;

    // Kingdom Tower silhouette (center-left)
    this.drawTower(g, w * 0.3, baseY, 35, 180, 'kingdom');
    // Al Faisaliah Tower (center-right)
    this.drawTower(g, w * 0.65, baseY, 30, 160, 'faisaliah');
    // Mosque minaret left
    this.drawTower(g, w * 0.15, baseY, 12, 120, 'minaret');
    // Mosque minaret right
    this.drawTower(g, w * 0.85, baseY, 12, 100, 'minaret');
    // Generic buildings
    for (var i = 0; i < 20; i++) {
      var bx = (i / 20) * w;
      var bw = 30 + Math.random() * 50;
      var bh = 40 + Math.random() * 80;
      g.fillRect(bx, baseY - bh, bw, bh);
    }
    // Ground
    g.fillRect(0, baseY, w, 300);
  },

  drawTower: function(g, x, baseY, halfW, height, type) {
    if (type === 'kingdom') {
      // Kingdom Tower — distinctive hole at top
      g.fillRect(x - halfW, baseY - height, halfW * 2, height);
      // Hole cutout (lighter)
      g.fillStyle(0x0A1628, 1);
      g.fillCircle(x, baseY - height + 25, 15);
      g.fillStyle(0x0D1B30, 1);
    } else if (type === 'faisaliah') {
      // Al Faisaliah — tapering tower with sphere
      g.beginPath();
      g.moveTo(x - halfW, baseY);
      g.lineTo(x - halfW * 0.3, baseY - height);
      g.lineTo(x + halfW * 0.3, baseY - height);
      g.lineTo(x + halfW, baseY);
      g.closePath();
      g.fillPath();
      // Sphere at top
      g.fillCircle(x, baseY - height - 10, 12);
    } else if (type === 'minaret') {
      g.fillRect(x - halfW, baseY - height, halfW * 2, height);
      // Dome top
      g.fillCircle(x, baseY - height, halfW);
      // Crescent
      g.fillStyle(0xC8A951, 0.3);
      g.fillCircle(x, baseY - height - halfW - 5, 5);
      g.fillStyle(0x0D1B30, 1);
    }
  },

  createClouds: function() {
    for (var i = 0; i < 5; i++) {
      var cloud = this.add.graphics();
      cloud.fillStyle(0xF5E6C8, 0.03);
      var cx = Math.random() * GAME_WIDTH;
      var cy = 100 + Math.random() * 200;
      cloud.fillEllipse(cx, cy, 150 + Math.random() * 100, 30 + Math.random() * 20);

      this.tweens.add({
        targets: cloud,
        x: 100 + Math.random() * 50,
        duration: 20000 + Math.random() * 15000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }
});
