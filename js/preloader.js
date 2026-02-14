// ============================================================
// RiyadhTowers — Instant Splash (Samsung TV optimized)
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

    this.cameras.main.setBackgroundColor(0x060E1A);

    // Single graphics object for all visuals
    var g = this.add.graphics();
    g.fillStyle(COLORS_INT.desertGold, 0.85);
    g.fillCircle(w / 2, h * 0.18, 30);
    g.fillStyle(0x060E1A, 1);
    g.fillCircle(w / 2 + 12, h * 0.18 - 6, 27);

    this.add.text(w / 2, h * 0.36, '\u0623\u0628\u0631\u0627\u062C \u0627\u0644\u0631\u064A\u0627\u0636', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '88px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(w / 2, h * 0.36 + 72, 'RIYADHTOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '36px',
      color: COLORS.warmSand,
      letterSpacing: 8,
      stroke: '#0A1628',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Instant transition — just 1 frame to let GPU init
    self.time.delayedCall(100, function() {
      self.cameras.main.fadeOut(150, 6, 14, 26);
      self.time.delayedCall(150, function() {
        self.scene.start('MenuScene');
      });
    });
  },

  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
  }
});
