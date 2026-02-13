// ============================================================
// RiyadhTowers — Fast Splash Screen (replaces slow fake preloader)
// Samsung TV optimized — minimal work, instant transition
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

    // ── Simple crescent moon (single graphics object) ───────
    var g = this.add.graphics();
    g.fillStyle(COLORS_INT.desertGold, 0.85);
    g.fillCircle(w / 2, h * 0.18, 30);
    g.fillStyle(0x060E1A, 1);
    g.fillCircle(w / 2 + 12, h * 0.18 - 6, 27);

    // ── Game title: Arabic ────────────────────────────────
    this.add.text(w / 2, h * 0.36, '\u0623\u0628\u0631\u0627\u062C \u0627\u0644\u0631\u064A\u0627\u0636', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '88px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 6,
    }).setOrigin(0.5);

    // ── Game title: English ───────────────────────────────
    this.add.text(w / 2, h * 0.36 + 72, 'RIYADHTOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '36px',
      color: COLORS.warmSand,
      letterSpacing: 8,
      stroke: '#0A1628',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // ── Simple gold divider ─────────────────────────────
    var divider = this.add.graphics();
    divider.lineStyle(2, COLORS_INT.desertGold, 0.5);
    divider.lineBetween(w / 2 - 180, h * 0.36 + 108, w / 2 + 180, h * 0.36 + 108);

    // ── Loading indicator (simple dots animation) ────────
    this.add.text(w / 2, h * 0.62, '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      fontStyle: '700',
      color: COLORS.warmSand,
    }).setOrigin(0.5);

    // ── Bottom branding ─────────────────────────────────
    this.add.text(w / 2, h - 40, 'A Premium Saudi Board Game Experience', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5).setAlpha(0.3);

    // ── Transition to menu after a brief splash (no fake loading) ──
    // Just enough time to see the title and let the GPU warm up
    self.time.delayedCall(600, function() {
      self.cameras.main.fadeOut(250, 6, 14, 26);
      self.time.delayedCall(250, function() {
        self.scene.start('MenuScene');
      });
    });
  },

  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
  }
});
