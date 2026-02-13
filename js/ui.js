// ============================================================
// RiyadhTowers — Game Over Scene & UI Helpers
// ============================================================

var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GameOverScene() {
    Phaser.Scene.call(this, { key: 'GameOverScene' });
  },

  init: function(data) {
    this.winnerData = data ? data.winner : null;
    this.focusIdx = 0;
    this.fireworkParticles = [];
    this.confettiPieces = [];
    this.ambientParticles = [];
    this.maxFireworkParticles = 128;
    this.maxConfetti = 20;
    this.maxAmbient = 15;
  },

  create: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;

    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);
    this.cameras.main.fadeIn(600);

    // ----------------------------------------------------------
    // 1. Background — Islamic geometric star pattern (8-pointed)
    // ----------------------------------------------------------
    this.drawPattern();

    // ----------------------------------------------------------
    // 11. Ambient gold particles floating upward (created first, behind everything)
    // ----------------------------------------------------------
    this.createAmbientParticles();

    // ----------------------------------------------------------
    // 2. Firework bursts — particle pools
    // ----------------------------------------------------------
    this.createFireworkPool();
    this.launchFirework();
    this.time.addEvent({
      delay: 800,
      callback: function() { self.launchFirework(); },
      loop: true
    });

    // ----------------------------------------------------------
    // 3. Confetti effect — recycled falling rectangles
    // ----------------------------------------------------------
    this.createConfetti();

    // ----------------------------------------------------------
    // Winner data resolution
    // ----------------------------------------------------------
    var winner = this.winnerData;
    var winnerName = winner ? winner.name : 'Winner';
    var winnerColor = winner ? winner.colorStr : COLORS.desertGold;
    var winnerColorInt = winner ? winner.color : COLORS_INT.desertGold;
    var token = null;
    if (winner) {
      for (var i = 0; i < TOKENS.length; i++) {
        if (TOKENS[i].id === winner.token) { token = TOKENS[i]; break; }
      }
    }
    var finalWealth = winner ? GameState.getPlayerNetWorth(winner) : 0;

    // ----------------------------------------------------------
    // 4. Trophy emoji — large, pulsing
    // ----------------------------------------------------------
    var trophy = this.add.text(w / 2, h * 0.10, '🏆', {
      fontSize: '120px'
    }).setOrigin(0.5).setDepth(10);

    this.tweens.add({
      targets: trophy,
      scaleX: 1.25,
      scaleY: 1.25,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // ----------------------------------------------------------
    // 5. "الفائز!" / "WINNER!" heading
    // ----------------------------------------------------------
    this.add.text(w / 2, h * 0.24, 'الفائز!', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '72px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 6
    }).setOrigin(0.5).setDepth(10);

    this.add.text(w / 2, h * 0.24 + 65, 'WINNER!', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '38px',
      color: COLORS.textSecondary,
      stroke: '#0A1628',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(10);

    // Decorative gold line under title
    var titleLine = this.add.graphics();
    titleLine.setDepth(10);
    titleLine.lineStyle(2, 0xC8A951, 0.6);
    titleLine.lineBetween(w / 2 - 180, h * 0.24 + 100, w / 2 + 180, h * 0.24 + 100);

    // ----------------------------------------------------------
    // 6. Winner name with token emoji in player color
    // ----------------------------------------------------------
    var winnerTokenText = token ? token.emoji + ' ' : '';
    this.add.text(w / 2, h * 0.42, winnerTokenText + winnerName, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '56px',
      color: winnerColor,
      stroke: '#0A1628',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(10);

    // ----------------------------------------------------------
    // 7. Animated wealth counter (counts up over 2 seconds)
    // ----------------------------------------------------------
    var wealthText = this.add.text(w / 2, h * 0.42 + 70, '💰 0 SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '40px',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(10);

    var displayWealth = { val: 0 };
    this.tweens.add({
      targets: displayWealth,
      val: finalWealth,
      duration: 2000,
      ease: 'Quad.easeOut',
      onUpdate: function() {
        wealthText.setText('💰 ' + Math.floor(displayWealth.val).toLocaleString() + ' SAR');
      }
    });

    // ----------------------------------------------------------
    // 8. Player rankings table
    // ----------------------------------------------------------
    var rankings = this.getRankings();
    var medals = ['🥇', '🥈', '🥉', '4th'];

    // Rankings panel background
    var panelX = w / 2 - 320;
    var panelY = h * 0.56;
    var panelW = 640;
    var panelH = 40 + rankings.length * 44;

    var rankPanel = this.add.graphics();
    rankPanel.setDepth(9);
    rankPanel.fillStyle(COLORS_INT.cardBg, 0.85);
    rankPanel.fillRoundedRect(panelX, panelY, panelW, panelH, 12);
    rankPanel.lineStyle(1, COLORS_INT.cardBorder, 0.6);
    rankPanel.strokeRoundedRect(panelX, panelY, panelW, panelH, 12);

    // Rankings header
    this.add.text(w / 2, panelY + 20, '🏅  الترتيب النهائي  —  Final Rankings', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setDepth(10);

    for (var j = 0; j < rankings.length; j++) {
      var rPlayer = rankings[j];
      var rNetWorth = GameState.getPlayerNetWorth(rPlayer);
      var rowY = panelY + 50 + j * 44;

      // Highlight row for winner
      if (j === 0) {
        var highlight = this.add.graphics();
        highlight.setDepth(9);
        highlight.fillStyle(COLORS_INT.cardBgLight, 0.7);
        highlight.fillRoundedRect(panelX + 10, rowY - 8, panelW - 20, 40, 6);
      }

      // Medal / rank
      var medalStr = j < medals.length ? medals[j] : (j + 1) + '';
      this.add.text(panelX + 30, rowY, medalStr, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '24px',
        color: '#FFFFFF'
      }).setOrigin(0, 0).setDepth(10);

      // Player color indicator dot
      var dotColor = rPlayer.color !== undefined ? rPlayer.color : COLORS_INT.textSecondary;
      var dot = this.add.graphics();
      dot.setDepth(10);
      dot.fillStyle(dotColor, 1);
      dot.fillCircle(panelX + 80, rowY + 12, 8);

      // Player name
      var rName = rPlayer.name || 'Player';
      this.add.text(panelX + 100, rowY, rName, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '24px',
        color: rPlayer.colorStr || COLORS.warmSand
      }).setOrigin(0, 0).setDepth(10);

      // Bankrupt indicator or SAR amount
      var amountColor = j === 0 ? COLORS.desertGold : COLORS.textSecondary;
      var amountStr = rPlayer.bankrupt ? '💀 مفلس' : rNetWorth.toLocaleString() + ' SAR';
      if (rPlayer.bankrupt) { amountColor = COLORS.danger; }

      this.add.text(panelX + panelW - 30, rowY, amountStr, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '24px',
        color: amountColor
      }).setOrigin(1, 0).setDepth(10);
    }

    // ----------------------------------------------------------
    // Play win sound
    // ----------------------------------------------------------
    AudioManager.win();

    // ----------------------------------------------------------
    // 9. Two navigation buttons at bottom
    // ----------------------------------------------------------
    var btnY = h - 75;
    var btnSpacing = 240;
    var btnW = 280;
    var btnH = 52;

    // Button backgrounds & glow graphics
    this.btnGlowLeft = this.add.graphics().setDepth(10);
    this.btnGlowRight = this.add.graphics().setDepth(10);
    this.btnBgLeft = this.add.graphics().setDepth(10);
    this.btnBgRight = this.add.graphics().setDepth(10);

    // "Play Again" button
    this.btnLeftX = w / 2 - btnSpacing;
    this.btnRightX = w / 2 + btnSpacing;
    this.btnY = btnY;
    this.btnW = btnW;
    this.btnH = btnH;

    // Button backgrounds
    this.btnBgLeft.fillStyle(COLORS_INT.cardBg, 0.9);
    this.btnBgLeft.fillRoundedRect(this.btnLeftX - btnW / 2, btnY - btnH / 2, btnW, btnH, 10);
    this.btnBgLeft.lineStyle(2, COLORS_INT.cardBorder, 0.8);
    this.btnBgLeft.strokeRoundedRect(this.btnLeftX - btnW / 2, btnY - btnH / 2, btnW, btnH, 10);

    this.btnBgRight.fillStyle(COLORS_INT.cardBg, 0.9);
    this.btnBgRight.fillRoundedRect(this.btnRightX - btnW / 2, btnY - btnH / 2, btnW, btnH, 10);
    this.btnBgRight.lineStyle(2, COLORS_INT.cardBorder, 0.8);
    this.btnBgRight.strokeRoundedRect(this.btnRightX - btnW / 2, btnY - btnH / 2, btnW, btnH, 10);

    this.playAgainText = this.add.text(this.btnLeftX, btnY, '🔄  العب مرة أخرى', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '26px',
      fontStyle: 'bold',
      color: COLORS.accent
    }).setOrigin(0.5).setDepth(11);

    this.menuText = this.add.text(this.btnRightX, btnY, '🏠  القائمة الرئيسية', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '26px',
      fontStyle: 'bold',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setDepth(11);

    // ----------------------------------------------------------
    // 10. Focus indicator with gold glow border
    // ----------------------------------------------------------
    this.updateButtonFocus();

    // ----------------------------------------------------------
    // Input handling
    // ----------------------------------------------------------
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);

    InputManager.on('left', function() {
      if (self.focusIdx !== 0) {
        self.focusIdx = 0;
        AudioManager.navigate();
        self.updateButtonFocus();
      }
    });

    InputManager.on('right', function() {
      if (self.focusIdx !== 1) {
        self.focusIdx = 1;
        AudioManager.navigate();
        self.updateButtonFocus();
      }
    });

    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      self.cameras.main.fadeOut(400, 6, 14, 26);
      self.time.delayedCall(400, function() {
        if (self.focusIdx === 0) {
          self.scene.start('PlayerSetupScene');
        } else {
          self.scene.start('MenuScene');
        }
      });
    });
  },

  // ============================================================
  // Update loop — animate confetti, ambient particles
  // ============================================================
  update: function(time, delta) {
    var dt = delta / 1000;
    var i, p;

    // Confetti animation
    for (i = 0; i < this.confettiPieces.length; i++) {
      p = this.confettiPieces[i];
      p.y += p.speedY * dt;
      p.x += p.drift * dt;
      p.angle += p.spin * dt;
      p.graphic.setPosition(p.x, p.y);
      p.graphic.setRotation(p.angle * Math.PI / 180);

      // Recycle when off screen
      if (p.y > GAME_HEIGHT + 30) {
        p.x = Math.random() * GAME_WIDTH;
        p.y = -20 - Math.random() * 40;
        p.speedY = 40 + Math.random() * 60;
        p.drift = -15 + Math.random() * 30;
        p.graphic.setPosition(p.x, p.y);
      }
    }

    // Ambient particles floating upward
    for (i = 0; i < this.ambientParticles.length; i++) {
      p = this.ambientParticles[i];
      p.y -= p.speedY * dt;
      p.x += Math.sin(time * 0.001 + p.phase) * 0.3;
      p.graphic.setPosition(p.x, p.y);
      p.graphic.setAlpha(p.alpha * (0.6 + 0.4 * Math.sin(time * 0.002 + p.phase)));

      // Recycle when off top
      if (p.y < -20) {
        p.x = Math.random() * GAME_WIDTH;
        p.y = GAME_HEIGHT + 10 + Math.random() * 40;
        p.graphic.setPosition(p.x, p.y);
      }
    }
  },

  // ============================================================
  // 10. Button focus — gold glow border
  // ============================================================
  updateButtonFocus: function() {
    var glowPad = 6;
    var bw = this.btnW;
    var bh = this.btnH;
    var by = this.btnY;

    this.btnGlowLeft.clear();
    this.btnGlowRight.clear();

    if (this.focusIdx === 0) {
      // Gold glow on left button
      this.btnGlowLeft.lineStyle(3, 0xE8B931, 1);
      this.btnGlowLeft.strokeRoundedRect(
        this.btnLeftX - bw / 2 - glowPad,
        by - bh / 2 - glowPad,
        bw + glowPad * 2,
        bh + glowPad * 2,
        12
      );
      // Outer softer glow
      this.btnGlowLeft.lineStyle(6, 0xE8B931, 0.25);
      this.btnGlowLeft.strokeRoundedRect(
        this.btnLeftX - bw / 2 - glowPad - 3,
        by - bh / 2 - glowPad - 3,
        bw + glowPad * 2 + 6,
        bh + glowPad * 2 + 6,
        14
      );

      this.playAgainText.setColor(COLORS.accent);
      this.menuText.setColor(COLORS.textSecondary);
    } else {
      // Gold glow on right button
      this.btnGlowRight.lineStyle(3, 0xE8B931, 1);
      this.btnGlowRight.strokeRoundedRect(
        this.btnRightX - bw / 2 - glowPad,
        by - bh / 2 - glowPad,
        bw + glowPad * 2,
        bh + glowPad * 2,
        12
      );
      this.btnGlowRight.lineStyle(6, 0xE8B931, 0.25);
      this.btnGlowRight.strokeRoundedRect(
        this.btnRightX - bw / 2 - glowPad - 3,
        by - bh / 2 - glowPad - 3,
        bw + glowPad * 2 + 6,
        bh + glowPad * 2 + 6,
        14
      );

      this.playAgainText.setColor(COLORS.textSecondary);
      this.menuText.setColor(COLORS.accent);
    }
  },

  // ============================================================
  // 1. Islamic geometric star pattern — 8-pointed stars
  // ============================================================
  drawPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.04);
    g.setDepth(0);
    var size = 80;
    var r = size * 0.35;

    for (var x = 0; x < GAME_WIDTH; x += size) {
      for (var y = 0; y < GAME_HEIGHT; y += size) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        g.lineStyle(1, 0xC8A951, 1);

        // Draw 8-pointed star by connecting every 3rd vertex of an octagon
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

  // ============================================================
  // 2. Fireworks — pooled particle system
  // ============================================================
  createFireworkPool: function() {
    this.fireworkParticles = [];
    for (var i = 0; i < this.maxFireworkParticles; i++) {
      var g = this.add.graphics();
      g.setDepth(300);
      g.setVisible(false);
      this.fireworkParticles.push({
        graphic: g,
        active: false
      });
    }
  },

  getFireworkParticle: function() {
    for (var i = 0; i < this.fireworkParticles.length; i++) {
      if (!this.fireworkParticles[i].active) {
        return this.fireworkParticles[i];
      }
    }
    return null;
  },

  launchFirework: function() {
    var self = this;
    var bx = 150 + Math.random() * (GAME_WIDTH - 300);
    var by = 80 + Math.random() * (GAME_HEIGHT * 0.35);
    var colors = [0xE74C3C, 0x3498DB, 0xF39C12, 0x9B59B6, 0xE8B931, 0x27AE60, 0xFF69B4, 0xFFD700];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var particleCount = 16;

    for (var i = 0; i < particleCount; i++) {
      var p = this.getFireworkParticle();
      if (!p) break;

      var angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      var dist = 60 + Math.random() * 100;
      var size = 2 + Math.random() * 3;

      p.graphic.clear();
      p.graphic.fillStyle(color, 1);
      p.graphic.fillCircle(0, 0, size);
      p.graphic.setPosition(bx, by);
      p.graphic.setAlpha(1);
      p.graphic.setVisible(true);
      p.active = true;

      (function(particle) {
        self.tweens.add({
          targets: particle.graphic,
          x: bx + Math.cos(angle) * dist,
          y: by + Math.sin(angle) * dist + 30,
          alpha: 0,
          duration: 700 + Math.random() * 500,
          ease: 'Quad.easeOut',
          onComplete: function() {
            particle.graphic.setVisible(false);
            particle.active = false;
          }
        });
      })(p);
    }
  },

  // ============================================================
  // 3. Confetti — recycled colored rectangles
  // ============================================================
  createConfetti: function() {
    var confettiColors = [0xFFD700, 0xE74C3C, 0x3498DB, 0x9B59B6, 0x27AE60];
    this.confettiPieces = [];

    for (var i = 0; i < this.maxConfetti; i++) {
      var color = confettiColors[i % confettiColors.length];
      var g = this.add.graphics();
      g.setDepth(200);
      g.fillStyle(color, 0.85);
      var cw = 6 + Math.random() * 8;
      var ch = 4 + Math.random() * 6;
      g.fillRect(-cw / 2, -ch / 2, cw, ch);

      var startX = Math.random() * GAME_WIDTH;
      var startY = -20 - Math.random() * GAME_HEIGHT;

      g.setPosition(startX, startY);

      this.confettiPieces.push({
        graphic: g,
        x: startX,
        y: startY,
        speedY: 40 + Math.random() * 60,
        drift: -15 + Math.random() * 30,
        spin: 60 + Math.random() * 180,
        angle: Math.random() * 360
      });
    }
  },

  // ============================================================
  // 11. Ambient gold particles — subtle upward floaters
  // ============================================================
  createAmbientParticles: function() {
    this.ambientParticles = [];

    for (var i = 0; i < this.maxAmbient; i++) {
      var g = this.add.graphics();
      g.setDepth(1);
      var size = 1 + Math.random() * 2.5;
      var baseAlpha = 0.15 + Math.random() * 0.25;
      g.fillStyle(0xC8A951, 1);
      g.fillCircle(0, 0, size);

      var startX = Math.random() * GAME_WIDTH;
      var startY = Math.random() * GAME_HEIGHT;

      g.setPosition(startX, startY);
      g.setAlpha(baseAlpha);

      this.ambientParticles.push({
        graphic: g,
        x: startX,
        y: startY,
        speedY: 12 + Math.random() * 20,
        alpha: baseAlpha,
        phase: Math.random() * Math.PI * 2
      });
    }
  },

  // ============================================================
  // Rankings — sort by bankrupt status then net worth descending
  // ============================================================
  getRankings: function() {
    var players = GameState.players.slice();
    players.sort(function(a, b) {
      if (a.bankrupt && !b.bankrupt) return 1;
      if (!a.bankrupt && b.bankrupt) return -1;
      return GameState.getPlayerNetWorth(b) - GameState.getPlayerNetWorth(a);
    });
    return players;
  }
});
