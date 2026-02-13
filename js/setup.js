// ============================================================
// RiyadhTowers — Player Setup Scene (Polished)
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

    // Phase tracking
    this.setupPhase = 'count'; // count | tokens | ready
    this.playerCount = 2;
    this.selectedTokens = [];
    this.playerNames = [];
    this.currentSetupPlayer = 0;
    this.defaultNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

    // Draw static background
    this.drawPattern();

    // Decorative separator beneath title
    var sep = this.add.graphics();
    sep.lineStyle(2, COLORS_INT.desertGold, 0.35);
    sep.lineBetween(w / 2 - 240, 130, w / 2 + 240, 130);
    sep.setDepth(1);

    // Title — Arabic
    this.titleAr = this.add.text(w / 2, 52, '\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0644\u0639\u0628\u0629', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '52px',
      fontStyle: 'bold',
      color: COLORS.desertGold
    }).setOrigin(0.5).setDepth(2);

    // Title — English
    this.titleEn = this.add.text(w / 2, 106, 'Game Setup', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setDepth(2);

    // Main content container — reused across phases
    this.contentContainer = this.add.container(0, 0).setDepth(3);

    // Instruction container — persistent at bottom
    this.instrContainer = this.add.container(0, 0).setDepth(3);

    // Setup input system
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);

    // Launch first phase
    this.showPlayerCountSelection();
  },

  // ===========================================================
  // Islamic 8-pointed star pattern — gold on navy at low opacity
  // ===========================================================
  drawPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.04);
    g.setDepth(0);
    var size = 140;
    var cols = Math.ceil(GAME_WIDTH / size);
    var rows = Math.ceil(GAME_HEIGHT / size);

    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        var cx = col * size + size / 2;
        var cy = row * size + size / 2;
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

  // ===========================================================
  // Utility: set bilingual instruction text at bottom
  // ===========================================================
  setInstruction: function(arText, enText) {
    this.instrContainer.removeAll(true);
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;

    var instrAr = this.add.text(w / 2, h - 75, arText, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '26px',
      color: COLORS.textSecondary
    }).setOrigin(0.5);
    this.instrContainer.add(instrAr);

    var instrEn = this.add.text(w / 2, h - 42, enText, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.textSecondary,
      alpha: 0.6
    }).setOrigin(0.5);
    this.instrContainer.add(instrEn);
  },

  // ===========================================================
  // Smooth transition helper — fade out content, run callback, fade in
  // ===========================================================
  transitionTo: function(buildFn) {
    var self = this;
    var dur = 180;

    // Fade out existing content
    this.tweens.add({
      targets: self.contentContainer,
      alpha: 0,
      duration: dur,
      ease: 'Power2',
      onComplete: function() {
        self.contentContainer.removeAll(true);
        self.contentContainer.setAlpha(1);
        buildFn.call(self);
      }
    });
  },

  // ===========================================================
  // PHASE 1 — Player Count Selection (2 / 3 / 4)
  // ===========================================================
  showPlayerCountSelection: function() {
    var self = this;
    this.setupPhase = 'count';

    var build = function() {
      var w = GAME_WIDTH;
      var h = GAME_HEIGHT;

      // Section heading
      var headAr = self.add.text(w / 2, 195, '\u0639\u062F\u062F \u0627\u0644\u0644\u0627\u0639\u0628\u064A\u0646', {
        fontFamily: 'Tajawal, sans-serif',
        fontSize: '40px',
        fontStyle: 'bold',
        color: COLORS.warmSand
      }).setOrigin(0.5);
      self.contentContainer.add(headAr);

      var headEn = self.add.text(w / 2, 244, 'Number of Players', {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '24px',
        color: COLORS.textSecondary
      }).setOrigin(0.5);
      self.contentContainer.add(headEn);

      // Three large number cards
      var options = [2, 3, 4];
      var cardW = 160;
      var cardH = 180;
      var gap = 50;
      var totalW = options.length * cardW + (options.length - 1) * gap;
      var startX = w / 2 - totalW / 2 + cardW / 2;
      var cy = 420;
      var items = [];

      for (var i = 0; i < options.length; i++) {
        var px = startX + i * (cardW + gap);
        var item = self.createCountCard(px, cy, cardW, cardH, options[i]);
        self.contentContainer.add(item.container);
        items.push(item);
      }

      // Descriptive sub-labels (Arabic player word)
      var descrAr = ['\u0644\u0627\u0639\u0628\u0627\u0646', '\u0644\u0627\u0639\u0628\u064A\u0646', '\u0644\u0627\u0639\u0628\u064A\u0646']; // dual/plural
      for (var j = 0; j < options.length; j++) {
        var dx = startX + j * (cardW + gap);
        var descr = self.add.text(dx, cy + cardH / 2 + 24, descrAr[j], {
          fontFamily: 'Tajawal, sans-serif',
          fontSize: '22px',
          color: COLORS.textSecondary,
          alpha: 0.7
        }).setOrigin(0.5);
        self.contentContainer.add(descr);
      }

      // Focus & input
      var selectedIdx = self.playerCount - 2;
      FocusManager.init(self, items, 'horizontal');
      FocusManager.currentIndex = selectedIdx;
      FocusManager.updateFocus();

      InputManager.clear();
      InputManager.setupKeyboard(self);
      FocusManager.setupInput();

      FocusManager.onSelect = function(idx) {
        self.playerCount = options[idx];
        self.selectedTokens = [];
        self.currentSetupPlayer = 0;
        self.transitionTo(function() { self.buildTokenSelection(0); });
      };

      self.setInstruction(
        '\u25C4 \u25BA \u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u062F\u062F \u062B\u0645 \u0627\u0636\u063A\u0637 Enter',
        'Select count with \u25C4 \u25BA then press Enter'
      );
    };

    // First entry — build directly; subsequent — transition
    if (this.contentContainer.length === 0) {
      build();
    } else {
      this.transitionTo(build);
    }
  },

  createCountCard: function(x, y, cw, ch, num) {
    var container = this.add.container(x, y);

    // Shadow
    var shadow = this.add.graphics();
    shadow.fillStyle(COLORS_INT.shadow, 0.5);
    shadow.fillRoundedRect(-cw / 2 + 4, -ch / 2 + 4, cw, ch, 16);
    container.add(shadow);

    // Card background
    var bg = this.add.graphics();
    bg.fillStyle(COLORS_INT.cardBg, 1);
    bg.fillRoundedRect(-cw / 2, -ch / 2, cw, ch, 16);
    container.add(bg);

    // Gold border
    var border = this.add.graphics();
    border.lineStyle(2, COLORS_INT.desertGold, 0.5);
    border.strokeRoundedRect(-cw / 2, -ch / 2, cw, ch, 16);
    container.add(border);

    // Large number
    var numText = this.add.text(0, -8, num.toString(), {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '72px',
      fontStyle: 'bold',
      color: COLORS.desertGold
    }).setOrigin(0.5);
    container.add(numText);

    // Focus glow ring
    var glow = this.add.graphics();
    glow.lineStyle(3, COLORS_INT.accent, 1);
    glow.strokeRoundedRect(-cw / 2 - 4, -ch / 2 - 4, cw + 8, ch + 8, 18);
    glow.setVisible(false);
    container.add(glow);

    // Outer shimmer
    var shimmer = this.add.graphics();
    shimmer.lineStyle(1, COLORS_INT.accentLight, 0.4);
    shimmer.strokeRoundedRect(-cw / 2 - 8, -ch / 2 - 8, cw + 16, ch + 16, 20);
    shimmer.setVisible(false);
    container.add(shimmer);

    return {
      container: container,
      glow: glow,
      shimmer: shimmer,
      numText: numText,
      setFocused: function(focused) {
        glow.setVisible(focused);
        shimmer.setVisible(focused);
        container.setScale(focused ? 1.08 : 1.0);
        numText.setColor(focused ? COLORS.accent : COLORS.desertGold);
      }
    };
  },

  // ===========================================================
  // PHASE 2 — Token Selection (per player)
  // ===========================================================
  buildTokenSelection: function(playerIdx) {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;
    this.setupPhase = 'tokens';
    this.currentSetupPlayer = playerIdx;

    var playerColor = PLAYER_COLORS[playerIdx];
    var playerColorStr = PLAYER_COLOR_NAMES[playerIdx];

    // Player indicator line
    var indicator = this.add.graphics();
    indicator.fillStyle(playerColor, 0.15);
    indicator.fillRect(0, 160, w, 110);
    this.contentContainer.add(indicator);

    // Heading — which player is choosing
    var headAr = this.add.text(w / 2, 190, '\u0627\u0644\u0644\u0627\u0639\u0628 ' + (playerIdx + 1) + ' \u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0637\u0639\u0629', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '38px',
      fontStyle: 'bold',
      color: playerColorStr
    }).setOrigin(0.5);
    this.contentContainer.add(headAr);

    var headEn = this.add.text(w / 2, 237, 'Player ' + (playerIdx + 1) + ' \u2014 Choose Token', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '22px',
      color: COLORS.textSecondary
    }).setOrigin(0.5);
    this.contentContainer.add(headEn);

    // Step dots: show progress (filled dot per selected, hollow for remaining)
    var dotY = 290;
    var dotGap = 28;
    var dotsStartX = w / 2 - ((self.playerCount - 1) * dotGap) / 2;
    for (var d = 0; d < self.playerCount; d++) {
      var dotG = this.add.graphics();
      var dx = dotsStartX + d * dotGap;
      if (d < playerIdx) {
        dotG.fillStyle(PLAYER_COLORS[d], 1);
        dotG.fillCircle(dx, dotY, 6);
      } else if (d === playerIdx) {
        dotG.fillStyle(playerColor, 1);
        dotG.fillCircle(dx, dotY, 8);
      } else {
        dotG.lineStyle(2, COLORS_INT.cardBorder, 1);
        dotG.strokeCircle(dx, dotY, 6);
      }
      this.contentContainer.add(dotG);
    }

    // Filter available tokens
    var availableTokens = [];
    for (var i = 0; i < TOKENS.length; i++) {
      var taken = false;
      for (var j = 0; j < self.selectedTokens.length; j++) {
        if (self.selectedTokens[j] === TOKENS[i].id) { taken = true; break; }
      }
      if (!taken) availableTokens.push(i);
    }

    // Token cards
    var cardW = 160;
    var cardH = 200;
    var gap = 30;
    var totalW = availableTokens.length * cardW + (availableTokens.length - 1) * gap;
    var startX = w / 2 - totalW / 2 + cardW / 2;
    var cy = 460;
    var items = [];

    for (var k = 0; k < availableTokens.length; k++) {
      var tIdx = availableTokens[k];
      var token = TOKENS[tIdx];
      var px = startX + k * (cardW + gap);
      var item = self.createTokenCard(px, cy, cardW, cardH, token, playerColor);
      self.contentContainer.add(item.container);
      items.push(item);
    }

    // Focus & input
    FocusManager.init(self, items, 'horizontal');
    FocusManager.updateFocus();

    InputManager.clear();
    InputManager.setupKeyboard(self);
    FocusManager.setupInput();

    FocusManager.onSelect = function(idx) {
      var tokenId = TOKENS[availableTokens[idx]].id;
      self.selectedTokens.push(tokenId);

      if (self.selectedTokens.length < self.playerCount) {
        self.transitionTo(function() {
          self.buildTokenSelection(self.selectedTokens.length);
        });
      } else {
        // Assign default names and go to ready
        self.playerNames = [];
        for (var n = 0; n < self.playerCount; n++) {
          self.playerNames.push(self.defaultNames[n]);
        }
        self.transitionTo(function() { self.buildReadyScreen(); });
      }
    };

    // Back button logic
    InputManager.on('back', function() {
      if (self.selectedTokens.length > 0) {
        self.selectedTokens.pop();
        self.transitionTo(function() {
          self.buildTokenSelection(self.selectedTokens.length);
        });
      } else {
        self.transitionTo(function() {
          self.contentContainer.removeAll(true);
          self.showPlayerCountSelection();
        });
      }
    });

    self.setInstruction(
      '\u25C4 \u25BA \u0627\u062E\u062A\u0631 \u062B\u0645 Enter  |  Esc \u0644\u0644\u0631\u062C\u0648\u0639',
      'Select with \u25C4 \u25BA then Enter  |  Esc to go back'
    );
  },

  createTokenCard: function(x, y, cw, ch, token, borderColor) {
    var container = this.add.container(x, y);

    // Shadow
    var shadow = this.add.graphics();
    shadow.fillStyle(COLORS_INT.shadow, 0.45);
    shadow.fillRoundedRect(-cw / 2 + 5, -ch / 2 + 5, cw, ch, 14);
    container.add(shadow);

    // Card background
    var bg = this.add.graphics();
    bg.fillStyle(COLORS_INT.cardBg, 1);
    bg.fillRoundedRect(-cw / 2, -ch / 2, cw, ch, 14);
    container.add(bg);

    // Colored top accent bar
    var accent = this.add.graphics();
    accent.fillStyle(borderColor, 0.25);
    accent.fillRoundedRect(-cw / 2, -ch / 2, cw, 6, { tl: 14, tr: 14, bl: 0, br: 0 });
    container.add(accent);

    // Border — player-colored
    var border = this.add.graphics();
    border.lineStyle(2, borderColor, 0.5);
    border.strokeRoundedRect(-cw / 2, -ch / 2, cw, ch, 14);
    container.add(border);

    // Emoji — large
    var emoji = this.add.text(0, -35, token.emoji, {
      fontSize: '56px'
    }).setOrigin(0.5);
    container.add(emoji);

    // Arabic name
    var nameAr = this.add.text(0, 30, token.nameAr, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: COLORS.warmSand
    }).setOrigin(0.5);
    container.add(nameAr);

    // English name
    var nameEn = this.add.text(0, 60, token.nameEn, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary
    }).setOrigin(0.5);
    container.add(nameEn);

    // Focus glow
    var glow = this.add.graphics();
    glow.lineStyle(3, COLORS_INT.accent, 1);
    glow.strokeRoundedRect(-cw / 2 - 4, -ch / 2 - 4, cw + 8, ch + 8, 16);
    glow.setVisible(false);
    container.add(glow);

    return {
      container: container,
      glow: glow,
      setFocused: function(focused) {
        glow.setVisible(focused);
        container.setScale(focused ? 1.07 : 1.0);
        emoji.setScale(focused ? 1.15 : 1.0);
      }
    };
  },

  // ===========================================================
  // PHASE 3 — Ready Screen
  // ===========================================================
  buildReadyScreen: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;
    this.setupPhase = 'ready';

    // Heading
    var headAr = this.add.text(w / 2, 185, '\u0645\u0633\u062A\u0639\u062F\u0648\u0646 \u0644\u0644\u0639\u0628!', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: COLORS.desertGold
    }).setOrigin(0.5);
    this.contentContainer.add(headAr);

    var headEn = this.add.text(w / 2, 240, 'Ready to Play!', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.textSecondary
    }).setOrigin(0.5);
    this.contentContainer.add(headEn);

    // Player summary cards
    var cardW = 200;
    var cardH = 260;
    var gap = 30;
    var totalW = this.playerCount * cardW + (this.playerCount - 1) * gap;
    var startX = w / 2 - totalW / 2 + cardW / 2;
    var cy = 440;

    for (var i = 0; i < this.playerCount; i++) {
      var token = null;
      for (var j = 0; j < TOKENS.length; j++) {
        if (TOKENS[j].id === this.selectedTokens[i]) { token = TOKENS[j]; break; }
      }

      var px = startX + i * (cardW + gap);
      var playerColor = PLAYER_COLORS[i];
      var playerColorStr = PLAYER_COLOR_NAMES[i];

      var card = this.createPlayerSummaryCard(px, cy, cardW, cardH, {
        name: this.playerNames[i],
        token: token,
        color: playerColor,
        colorStr: playerColorStr,
        index: i
      });
      this.contentContainer.add(card);

      // Staggered entrance
      card.setAlpha(0);
      card.setScale(0.85);
      this.tweens.add({
        targets: card,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 350,
        delay: i * 120,
        ease: 'Back.easeOut'
      });
    }

    // Start Game button
    var btnW = 320;
    var btnH = 64;
    var btnY = h - 150;
    var startBtn = this.createStartButton(w / 2, btnY, btnW, btnH);
    this.contentContainer.add(startBtn.container);

    // Focus
    var items = [startBtn];
    FocusManager.init(self, items, 'vertical');
    FocusManager.updateFocus();

    InputManager.clear();
    InputManager.setupKeyboard(self);
    FocusManager.setupInput();

    FocusManager.onSelect = function() {
      self.startGame();
    };

    InputManager.on('back', function() {
      self.selectedTokens = [];
      self.currentSetupPlayer = 0;
      self.transitionTo(function() { self.buildTokenSelection(0); });
    });

    self.setInstruction(
      'Enter \u0644\u0628\u062F\u0621 \u0627\u0644\u0644\u0639\u0628  |  Esc \u0644\u0644\u0631\u062C\u0648\u0639',
      'Press Enter to start  |  Esc to go back'
    );
  },

  createPlayerSummaryCard: function(x, y, cw, ch, data) {
    var container = this.add.container(x, y);
    var pc = data.color;
    var pcStr = data.colorStr;

    // Shadow
    var shadow = this.add.graphics();
    shadow.fillStyle(COLORS_INT.shadow, 0.5);
    shadow.fillRoundedRect(-cw / 2 + 5, -ch / 2 + 5, cw, ch, 16);
    container.add(shadow);

    // Card BG with subtle gradient (darker at top, lighter at bottom)
    var bg = this.add.graphics();
    bg.fillStyle(COLORS_INT.cardBgLight, 1);
    bg.fillRoundedRect(-cw / 2, -ch / 2, cw, ch, 16);
    container.add(bg);

    // Top gradient overlay — player color at low opacity
    var topGrad = this.add.graphics();
    topGrad.fillStyle(pc, 0.12);
    topGrad.fillRoundedRect(-cw / 2, -ch / 2, cw, 70, { tl: 16, tr: 16, bl: 0, br: 0 });
    container.add(topGrad);

    // Player color accent bar at very top
    var accentBar = this.add.graphics();
    accentBar.fillStyle(pc, 0.8);
    accentBar.fillRoundedRect(-cw / 2, -ch / 2, cw, 5, { tl: 16, tr: 16, bl: 0, br: 0 });
    container.add(accentBar);

    // Border — player color
    var border = this.add.graphics();
    border.lineStyle(2, pc, 0.6);
    border.strokeRoundedRect(-cw / 2, -ch / 2, cw, ch, 16);
    container.add(border);

    // Emoji
    var emoji = this.add.text(0, -55, data.token ? data.token.emoji : '?', {
      fontSize: '52px'
    }).setOrigin(0.5);
    container.add(emoji);

    // Player name
    var nameText = this.add.text(0, 10, data.name, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '24px',
      color: pcStr
    }).setOrigin(0.5);
    container.add(nameText);

    // Token Arabic name
    var tokenAr = this.add.text(0, 50, data.token ? data.token.nameAr : '', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: COLORS.warmSand
    }).setOrigin(0.5);
    container.add(tokenAr);

    // Token English name
    var tokenEn = this.add.text(0, 78, data.token ? data.token.nameEn : '', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary
    }).setOrigin(0.5);
    container.add(tokenEn);

    // Player number badge
    var badge = this.add.graphics();
    badge.fillStyle(pc, 0.9);
    badge.fillCircle(cw / 2 - 6, -ch / 2 + 6, 16);
    container.add(badge);

    var badgeNum = this.add.text(cw / 2 - 6, -ch / 2 + 6, (data.index + 1).toString(), {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    container.add(badgeNum);

    return container;
  },

  createStartButton: function(x, y, bw, bh) {
    var container = this.add.container(x, y);

    // Shadow
    var shadow = this.add.graphics();
    shadow.fillStyle(COLORS_INT.shadow, 0.5);
    shadow.fillRoundedRect(-bw / 2 + 3, -bh / 2 + 3, bw, bh, 14);
    container.add(shadow);

    // Green background
    var bg = this.add.graphics();
    bg.fillStyle(COLORS_INT.saudiGreen, 1);
    bg.fillRoundedRect(-bw / 2, -bh / 2, bw, bh, 14);
    container.add(bg);

    // Lighter green top highlight
    var highlight = this.add.graphics();
    highlight.fillStyle(lightenColor(COLORS_INT.saudiGreen, 0.15), 0.4);
    highlight.fillRoundedRect(-bw / 2, -bh / 2, bw, bh / 2, { tl: 14, tr: 14, bl: 0, br: 0 });
    container.add(highlight);

    // Subtle gold border
    var border = this.add.graphics();
    border.lineStyle(2, COLORS_INT.desertGold, 0.4);
    border.strokeRoundedRect(-bw / 2, -bh / 2, bw, bh, 14);
    container.add(border);

    // Arabic text
    var labelAr = this.add.text(0, -11, '\u0627\u0628\u062F\u0623 \u0627\u0644\u0644\u0639\u0628', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '30px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    container.add(labelAr);

    // English text
    var labelEn = this.add.text(0, 18, 'Start Game', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.warmSand
    }).setOrigin(0.5);
    container.add(labelEn);

    // Focus glow
    var glow = this.add.graphics();
    glow.lineStyle(3, COLORS_INT.accent, 1);
    glow.strokeRoundedRect(-bw / 2 - 4, -bh / 2 - 4, bw + 8, bh + 8, 16);
    glow.setVisible(false);
    container.add(glow);

    return {
      container: container,
      glow: glow,
      setFocused: function(focused) {
        glow.setVisible(focused);
        container.setScale(focused ? 1.06 : 1.0);
      }
    };
  },

  // ===========================================================
  // Start the game — init state and transition to BoardScene
  // ===========================================================
  startGame: function() {
    var self = this;
    AudioManager.menuConfirm();

    // Disable further input
    InputManager.clear();

    // Initialize game state
    GameState.init(this.playerNames, this.selectedTokens);

    // Fade out and start board
    this.cameras.main.fadeOut(500, 10, 22, 40);
    this.time.delayedCall(500, function() {
      self.scene.start('BoardScene');
    });
  }
});
