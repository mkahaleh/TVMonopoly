// ============================================================
// Riyadh Tycoon — Player Setup Scene
// ============================================================

var PlayerSetupScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function PlayerSetupScene() {
    Phaser.Scene.call(this, { key: 'PlayerSetupScene' });
  },

  create: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;

    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);
    this.cameras.main.fadeIn(500);

    // Islamic pattern background
    this.drawPattern();

    // Phase tracking
    this.setupPhase = 'count'; // count, tokens, names, ready
    this.playerCount = 2;
    this.selectedTokens = [];
    this.playerNames = [];
    this.currentSetupPlayer = 0;

    // Default names
    this.defaultNames = ['لاعب ١', 'لاعب ٢', 'لاعب ٣', 'لاعب ٤'];
    this.defaultNamesEn = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

    // Title
    this.add.text(w / 2, 50, 'إعداد اللعبة', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '52px',
      fontStyle: 'bold',
      color: COLORS.desertGold,
    }).setOrigin(0.5);

    this.add.text(w / 2, 105, 'Game Setup', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);

    // Content container
    this.contentContainer = this.add.container(0, 0);

    // Setup input
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);

    // Start with player count selection
    this.showPlayerCountSelection();
  },

  drawPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.04);
    var size = 80;
    for (var x = 0; x < GAME_WIDTH; x += size) {
      for (var y = 0; y < GAME_HEIGHT; y += size) {
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

  showPlayerCountSelection: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;
    this.contentContainer.removeAll(true);

    var label = this.add.text(w / 2, 200, 'عدد اللاعبين', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '40px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    this.contentContainer.add(label);

    var labelEn = this.add.text(w / 2, 245, 'Number of Players', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '24px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.contentContainer.add(labelEn);

    // Player count options: 2, 3, 4
    var options = [2, 3, 4];
    var items = [];
    var startX = w / 2 - 150;

    for (var i = 0; i < options.length; i++) {
      var btn = this.createButton(startX + i * 150, 380, 120, 120, options[i].toString(), '', COLORS_INT.cardBg, i);
      this.contentContainer.add(btn.container);
      items.push(btn);
    }

    // Focus on current selection
    var selectedIdx = this.playerCount - 2;
    FocusManager.init(this, items, 'horizontal');
    FocusManager.currentIndex = selectedIdx;
    FocusManager.updateFocus();

    InputManager.clear();
    InputManager.setupKeyboard(this);
    FocusManager.setupInput();

    FocusManager.onSelect = function(idx) {
      self.playerCount = options[idx];
      self.showTokenSelection();
    };

    // Instruction
    var instr = this.add.text(w / 2, h - 80, '◄ ► اختر العدد ثم اضغط Enter', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.contentContainer.add(instr);

    var instrEn = this.add.text(w / 2, h - 45, 'Select count with ◄ ► then press Enter', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: COLORS.textSecondary,
      alpha: 0.6,
    }).setOrigin(0.5);
    this.contentContainer.add(instrEn);
  },

  showTokenSelection: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;
    this.contentContainer.removeAll(true);
    this.selectedTokens = [];
    this.currentSetupPlayer = 0;

    this.showTokenForPlayer(0);
  },

  showTokenForPlayer: function(playerIdx) {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;
    this.contentContainer.removeAll(true);

    var playerColor = PLAYER_COLOR_NAMES[playerIdx];

    var label = this.add.text(w / 2, 200, 'اللاعب ' + (playerIdx + 1) + ' - اختر القطعة', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '40px',
      fontStyle: 'bold',
      color: playerColor,
    }).setOrigin(0.5);
    this.contentContainer.add(label);

    var labelEn = this.add.text(w / 2, 250, 'Player ' + (playerIdx + 1) + ' — Choose Token', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '24px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.contentContainer.add(labelEn);

    var items = [];
    var availableTokens = [];
    for (var i = 0; i < TOKENS.length; i++) {
      var taken = false;
      for (var j = 0; j < self.selectedTokens.length; j++) {
        if (self.selectedTokens[j] === TOKENS[i].id) { taken = true; break; }
      }
      if (!taken) availableTokens.push(i);
    }

    var totalWidth = availableTokens.length * 200;
    var startX = w / 2 - totalWidth / 2 + 100;

    for (var k = 0; k < availableTokens.length; k++) {
      var tIdx = availableTokens[k];
      var token = TOKENS[tIdx];
      var btn = this.createTokenButton(startX + k * 200, 430, token, tIdx);
      this.contentContainer.add(btn.container);
      items.push(btn);
    }

    FocusManager.init(this, items, 'horizontal');
    FocusManager.updateFocus();

    InputManager.clear();
    InputManager.setupKeyboard(this);
    FocusManager.setupInput();

    FocusManager.onSelect = function(idx) {
      var tokenId = TOKENS[availableTokens[idx]].id;
      self.selectedTokens.push(tokenId);

      if (self.selectedTokens.length < self.playerCount) {
        self.showTokenForPlayer(self.selectedTokens.length);
      } else {
        self.showNameEntry();
      }
    };

    InputManager.on('back', function() {
      if (self.selectedTokens.length > 0) {
        self.selectedTokens.pop();
        self.showTokenForPlayer(self.selectedTokens.length);
      } else {
        self.showPlayerCountSelection();
      }
    });

    // Instruction
    var instr = this.add.text(w / 2, h - 60, '◄ ► اختر ثم Enter | Esc للرجوع', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.contentContainer.add(instr);
  },

  showNameEntry: function() {
    // Use default names and proceed
    var self = this;
    this.playerNames = [];
    for (var i = 0; i < this.playerCount; i++) {
      this.playerNames.push(this.defaultNamesEn[i]);
    }
    this.showReadyScreen();
  },

  showReadyScreen: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;
    this.contentContainer.removeAll(true);

    var label = this.add.text(w / 2, 180, 'مستعدون للعب!', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: COLORS.desertGold,
    }).setOrigin(0.5);
    this.contentContainer.add(label);

    var labelEn = this.add.text(w / 2, 235, 'Ready to Play!', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.contentContainer.add(labelEn);

    // Show player summary
    var totalWidth = this.playerCount * 250;
    var startX = w / 2 - totalWidth / 2 + 125;

    for (var i = 0; i < this.playerCount; i++) {
      var token = null;
      for (var j = 0; j < TOKENS.length; j++) {
        if (TOKENS[j].id === this.selectedTokens[i]) { token = TOKENS[j]; break; }
      }

      var py = 400;
      var px = startX + i * 250;
      var playerColor = PLAYER_COLORS[i];

      var card = this.add.graphics();
      card.fillStyle(0x1A2744, 1);
      card.fillRoundedRect(px - 90, py - 80, 180, 200, 12);
      card.lineStyle(2, playerColor, 1);
      card.strokeRoundedRect(px - 90, py - 80, 180, 200, 12);
      this.contentContainer.add(card);

      var emoji = this.add.text(px, py - 30, token ? token.emoji : '?', {
        fontSize: '52px',
      }).setOrigin(0.5);
      this.contentContainer.add(emoji);

      var nameText = this.add.text(px, py + 40, this.playerNames[i], {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '24px',
        color: PLAYER_COLOR_NAMES[i],
      }).setOrigin(0.5);
      this.contentContainer.add(nameText);

      var tokenNameText = this.add.text(px, py + 75, token ? token.nameAr : '', {
        fontFamily: 'Tajawal, sans-serif',
        fontSize: '22px',
        color: COLORS.textSecondary,
      }).setOrigin(0.5);
      this.contentContainer.add(tokenNameText);
    }

    // Start button
    var startBtn = this.createButton(w / 2, h - 140, 300, 60, 'ابدأ اللعب', 'Start Game', COLORS_INT.saudiGreen, 0);
    this.contentContainer.add(startBtn.container);

    var items = [startBtn];
    FocusManager.init(this, items, 'vertical');
    FocusManager.updateFocus();

    InputManager.clear();
    InputManager.setupKeyboard(this);
    FocusManager.setupInput();

    FocusManager.onSelect = function() {
      self.startGame();
    };

    InputManager.on('back', function() {
      self.showTokenSelection();
    });
  },

  startGame: function() {
    var self = this;
    AudioManager.menuConfirm();

    // Initialize game state
    GameState.init(this.playerNames, this.selectedTokens);

    this.cameras.main.fadeOut(500, 10, 22, 40);
    this.time.delayedCall(500, function() {
      self.scene.start('BoardScene');
    });
  },

  createButton: function(x, y, bw, bh, textAr, textEn, bgColor, index) {
    var container = this.add.container(x, y);

    var bg = this.add.graphics();
    bg.fillStyle(bgColor, 1);
    bg.fillRoundedRect(-bw/2, -bh/2, bw, bh, 10);

    var border = this.add.graphics();
    border.lineStyle(2, 0xC8A951, 0.5);
    border.strokeRoundedRect(-bw/2, -bh/2, bw, bh, 10);

    container.add([bg, border]);

    var label = this.add.text(0, textEn ? -12 : 0, textAr, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '32px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(label);

    if (textEn) {
      var labelEn = this.add.text(0, 16, textEn, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '18px',
        color: COLORS.textSecondary,
      }).setOrigin(0.5);
      container.add(labelEn);
    }

    // Glow for focus
    var glow = this.add.graphics();
    glow.lineStyle(3, 0xE8B931, 1);
    glow.strokeRoundedRect(-bw/2 - 3, -bh/2 - 3, bw + 6, bh + 6, 12);
    glow.setVisible(false);
    container.add(glow);

    return {
      container: container,
      glow: glow,
      index: index,
      setFocused: function(focused) {
        glow.setVisible(focused);
        container.setScale(focused ? 1.05 : 1.0);
      }
    };
  },

  createTokenButton: function(x, y, token, tokenIndex) {
    var container = this.add.container(x, y);
    var size = 140;

    var bg = this.add.graphics();
    bg.fillStyle(0x1A2744, 1);
    bg.fillRoundedRect(-size/2, -size/2, size, size + 40, 12);
    container.add(bg);

    var emoji = this.add.text(0, -15, token.emoji, {
      fontSize: '56px',
    }).setOrigin(0.5);
    container.add(emoji);

    var nameAr = this.add.text(0, 45, token.nameAr, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(nameAr);

    var nameEn = this.add.text(0, 70, token.nameEn, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    container.add(nameEn);

    var glow = this.add.graphics();
    glow.lineStyle(3, 0xE8B931, 1);
    glow.strokeRoundedRect(-size/2 - 3, -size/2 - 3, size + 6, size + 46, 14);
    glow.setVisible(false);
    container.add(glow);

    return {
      container: container,
      glow: glow,
      tokenIndex: tokenIndex,
      setFocused: function(focused) {
        glow.setVisible(focused);
        container.setScale(focused ? 1.08 : 1.0);
      }
    };
  }
});
