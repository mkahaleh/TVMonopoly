// ============================================================
// Riyadh Tycoon — Game Over Scene & UI Helpers
// ============================================================

var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GameOverScene() {
    Phaser.Scene.call(this, { key: 'GameOverScene' });
  },

  init: function(data) {
    this.winnerData = data ? data.winner : null;
  },

  create: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;

    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);
    this.cameras.main.fadeIn(500);

    // Background pattern
    this.drawPattern();

    // Fireworks particles
    this.createFireworks();

    // Winner announcement
    var winner = this.winnerData;
    var winnerName = winner ? winner.name : 'Winner';
    var winnerColor = winner ? winner.colorStr : COLORS.desertGold;
    var token = null;
    if (winner) {
      for (var i = 0; i < TOKENS.length; i++) {
        if (TOKENS[i].id === winner.token) { token = TOKENS[i]; break; }
      }
    }

    // Trophy
    var trophy = this.add.text(w / 2, h * 0.15, '🏆', {
      fontSize: '100px',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: trophy,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Winner title
    this.add.text(w / 2, h * 0.35, 'الفائز!', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '64px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(w / 2, h * 0.35 + 60, 'WINNER!', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '36px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);

    // Winner name + token
    var winnerTokenText = token ? token.emoji + ' ' : '';
    this.add.text(w / 2, h * 0.55, winnerTokenText + winnerName, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '48px',
      color: winnerColor,
      stroke: '#0A1628',
      strokeThickness: 3,
    }).setOrigin(0.5);

    // Final wealth
    var finalWealth = winner ? GameState.getPlayerNetWorth(winner) : 0;
    var wealthText = this.add.text(w / 2, h * 0.55 + 60, '💰 ' + finalWealth + ' SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '36px',
      color: COLORS.desertGold,
    }).setOrigin(0.5);

    // Animate wealth counter
    var displayWealth = { val: 0 };
    this.tweens.add({
      targets: displayWealth,
      val: finalWealth,
      duration: 2000,
      ease: 'Quad.easeOut',
      onUpdate: function() {
        wealthText.setText('💰 ' + Math.floor(displayWealth.val) + ' SAR');
      }
    });

    // Player rankings
    var rankings = this.getRankings();
    var rankY = h * 0.72;
    var medals = ['🥇', '🥈', '🥉', '4th'];

    for (var j = 0; j < rankings.length; j++) {
      var rPlayer = rankings[j];
      var rNetWorth = GameState.getPlayerNetWorth(rPlayer);
      var rankColor = j === 0 ? COLORS.desertGold : COLORS.textSecondary;

      this.add.text(w / 2 - 200, rankY + j * 36, medals[j] + ' ' + rPlayer.name, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '22px',
        color: rPlayer.colorStr,
      });

      this.add.text(w / 2 + 200, rankY + j * 36, rNetWorth + ' SAR', {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '22px',
        color: rankColor,
      }).setOrigin(1, 0);
    }

    // Play sound
    AudioManager.win();

    // Buttons
    var btnY = h - 80;
    var playAgainText = this.add.text(w / 2 - 120, btnY, 'العب مرة أخرى', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      fontStyle: 'bold',
      color: COLORS.accent,
    }).setOrigin(0.5);

    var menuText = this.add.text(w / 2 + 120, btnY, 'القائمة الرئيسية', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      fontStyle: 'bold',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);

    var focusIdx = 0;
    var playAgainGlow = this.add.graphics();
    var menuGlow = this.add.graphics();

    var updateBtnFocus = function() {
      playAgainGlow.clear();
      menuGlow.clear();
      if (focusIdx === 0) {
        playAgainGlow.lineStyle(2, 0xE8B931, 1);
        playAgainGlow.strokeRoundedRect(w / 2 - 240, btnY - 22, 240, 44, 8);
        playAgainText.setColor(COLORS.accent);
        menuText.setColor(COLORS.textSecondary);
      } else {
        menuGlow.lineStyle(2, 0xE8B931, 1);
        menuGlow.strokeRoundedRect(w / 2, btnY - 22, 240, 44, 8);
        playAgainText.setColor(COLORS.textSecondary);
        menuText.setColor(COLORS.accent);
      }
    };
    updateBtnFocus();

    // Pulsing
    this.tweens.add({
      targets: [playAgainText, menuText],
      alpha: 0.6,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('left', function() { focusIdx = 0; AudioManager.navigate(); updateBtnFocus(); });
    InputManager.on('right', function() { focusIdx = 1; AudioManager.navigate(); updateBtnFocus(); });
    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      if (focusIdx === 0) {
        self.scene.start('PlayerSetupScene');
      } else {
        self.scene.start('MenuScene');
      }
    });
  },

  getRankings: function() {
    var players = GameState.players.slice();
    players.sort(function(a, b) {
      if (a.bankrupt && !b.bankrupt) return 1;
      if (!a.bankrupt && b.bankrupt) return -1;
      return GameState.getPlayerNetWorth(b) - GameState.getPlayerNetWorth(a);
    });
    return players;
  },

  drawPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.05);
    var size = 70;
    for (var x = 0; x < GAME_WIDTH; x += size) {
      for (var y = 0; y < GAME_HEIGHT; y += size) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        var r = size * 0.3;
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

  createFireworks: function() {
    var self = this;
    // Simple firework bursts using graphics
    var createBurst = function() {
      var bx = 200 + Math.random() * (GAME_WIDTH - 400);
      var by = 100 + Math.random() * 300;
      var color = [0xE74C3C, 0x3498DB, 0xF39C12, 0x9B59B6, 0xE8B931, 0x27AE60][Math.floor(Math.random() * 6)];

      for (var i = 0; i < 12; i++) {
        var angle = (i / 12) * Math.PI * 2;
        var particle = self.add.graphics();
        particle.fillStyle(color, 1);
        particle.fillCircle(0, 0, 3);
        particle.setPosition(bx, by);
        particle.setDepth(300);

        var dist = 50 + Math.random() * 80;
        self.tweens.add({
          targets: particle,
          x: bx + Math.cos(angle) * dist,
          y: by + Math.sin(angle) * dist,
          alpha: 0,
          duration: 800 + Math.random() * 400,
          ease: 'Quad.easeOut',
          onComplete: function() { particle.destroy(); }
        });
      }
    };

    // Launch fireworks periodically
    this.time.addEvent({
      delay: 600,
      callback: createBurst,
      loop: true
    });

    // Initial burst
    createBurst();
  }
});
