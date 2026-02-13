// ============================================================
// Riyadh Tycoon — Main Board Scene
// ============================================================

var BoardScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BoardScene() {
    Phaser.Scene.call(this, { key: 'BoardScene' });
  },

  create: function() {
    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var self = this;

    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);
    this.cameras.main.fadeIn(500);

    // Board layout constants
    this.boardSize = 720;
    this.boardX = 80;
    this.boardY = (h - this.boardSize) / 2;
    this.cornerSize = 90;
    this.spaceWidth = (this.boardSize - this.cornerSize * 2) / 9;
    this.spaceHeight = 70;

    // Compute space positions for all 40 spaces
    this.spacePositions = this.computeSpacePositions();

    // Draw background pattern
    this.drawBackgroundPattern();

    // Draw the board
    this.boardContainer = this.add.container(0, 0);
    this.drawBoard();

    // Draw center area
    this.drawBoardCenter();

    // Create player tokens
    this.tokenSprites = [];
    this.createTokenSprites();

    // Create dice
    DiceManager.create(this, w / 2 + 200, h / 2);

    // HUD panel on right side
    this.hudContainer = this.add.container(0, 0);
    this.createHUD();

    // Action panel (overlay for property cards, cards, etc.)
    this.actionContainer = this.add.container(0, 0);
    this.actionContainer.setDepth(200);

    // Message display
    this.messageContainer = this.add.container(0, 0);
    this.messageContainer.setDepth(150);

    // Setup input
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);

    // Start game flow
    this.isAnimating = false;
    this.turnState = 'waitRoll';
    this.showTurnStart();
  },

  // -------------------------------------------------------
  // Board Position Computation
  // -------------------------------------------------------
  computeSpacePositions: function() {
    var positions = [];
    var bx = this.boardX;
    var by = this.boardY;
    var bs = this.boardSize;
    var cs = this.cornerSize;
    var sw = this.spaceWidth;
    var sh = this.spaceHeight;

    // Bottom row (right to left): spaces 0-10
    // Space 0 = GO (bottom-right corner)
    positions[0] = { x: bx + bs - cs / 2, y: by + bs - cs / 2, w: cs, h: cs, side: 'corner' };
    for (var i = 1; i <= 9; i++) {
      positions[i] = {
        x: bx + bs - cs - sw * i + sw / 2,
        y: by + bs - sh / 2,
        w: sw, h: sh, side: 'bottom'
      };
    }
    positions[10] = { x: bx + cs / 2, y: by + bs - cs / 2, w: cs, h: cs, side: 'corner' };

    // Left column (bottom to top): spaces 11-19
    for (var i = 1; i <= 9; i++) {
      positions[10 + i] = {
        x: bx + sh / 2,
        y: by + bs - cs - sw * i + sw / 2,
        w: sh, h: sw, side: 'left'
      };
    }
    positions[20] = { x: bx + cs / 2, y: by + cs / 2, w: cs, h: cs, side: 'corner' };

    // Top row (left to right): spaces 21-29
    for (var i = 1; i <= 9; i++) {
      positions[20 + i] = {
        x: bx + cs + sw * (i - 1) + sw / 2,
        y: by + sh / 2,
        w: sw, h: sh, side: 'top'
      };
    }
    positions[30] = { x: bx + bs - cs / 2, y: by + cs / 2, w: cs, h: cs, side: 'corner' };

    // Right column (top to bottom): spaces 31-39
    for (var i = 1; i <= 9; i++) {
      positions[30 + i] = {
        x: bx + bs - sh / 2,
        y: by + cs + sw * (i - 1) + sw / 2,
        w: sh, h: sw, side: 'right'
      };
    }

    return positions;
  },

  // -------------------------------------------------------
  // Board Drawing
  // -------------------------------------------------------
  drawBackgroundPattern: function() {
    var g = this.add.graphics();
    g.setAlpha(0.03);
    var size = 60;
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

  drawBoard: function() {
    var g = this.add.graphics();
    this.boardContainer.add(g);
    var bx = this.boardX;
    var by = this.boardY;
    var bs = this.boardSize;
    var cs = this.cornerSize;
    var sw = this.spaceWidth;
    var sh = this.spaceHeight;

    // Board background
    g.fillStyle(0x0F1E38, 1);
    g.fillRoundedRect(bx, by, bs, bs, 8);

    // Board border (gold)
    g.lineStyle(3, 0xC8A951, 0.8);
    g.strokeRoundedRect(bx, by, bs, bs, 8);

    // Inner border
    g.lineStyle(1, 0x2A3F6B, 0.5);
    g.strokeRect(bx + sh, by + sh, bs - sh * 2, bs - sh * 2);

    // Draw all spaces
    for (var i = 0; i < 40; i++) {
      this.drawSpace(g, i);
    }

    // Animated gold border shimmer
    var shimmer = this.add.graphics();
    this.boardContainer.add(shimmer);
    this.tweens.add({
      targets: shimmer,
      alpha: { from: 0.3, to: 0.8 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      onUpdate: function() {
        shimmer.clear();
        shimmer.lineStyle(2, 0xC8A951, shimmer.alpha);
        shimmer.strokeRoundedRect(bx - 1, by - 1, bs + 2, bs + 2, 9);
      }
    });
  },

  drawSpace: function(g, index) {
    var pos = this.spacePositions[index];
    var space = BOARD[index];
    var x = pos.x;
    var y = pos.y;
    var pw = pos.w;
    var ph = pos.h;

    // Draw space background
    g.fillStyle(0x0F1E38, 1);

    if (pos.side === 'corner') {
      g.fillStyle(0x0F1E38, 1);
      g.fillRect(x - pw/2, y - ph/2, pw, ph);
      g.lineStyle(1, 0x2A3F6B, 0.5);
      g.strokeRect(x - pw/2, y - ph/2, pw, ph);
    } else {
      g.lineStyle(1, 0x2A3F6B, 0.3);
      if (pos.side === 'bottom' || pos.side === 'top') {
        g.strokeRect(x - pw/2, y - ph/2, pw, ph);
      } else {
        g.strokeRect(x - pw/2, y - ph/2, pw, ph);
      }
    }

    // Color bar for properties
    if (space.type === 'property' && space.colorInt) {
      var barH = 10;
      if (pos.side === 'bottom') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x - pw/2 + 1, y - ph/2 + 1, pw - 2, barH);
      } else if (pos.side === 'top') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x - pw/2 + 1, y + ph/2 - barH - 1, pw - 2, barH);
      } else if (pos.side === 'left') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x + pw/2 - barH - 1, y - ph/2 + 1, barH, ph - 2);
      } else if (pos.side === 'right') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x - pw/2 + 1, y - ph/2 + 1, barH, ph - 2);
      }
    }

    // Text labels
    var fontSize, textX, textY, textAngle = 0;

    if (pos.side === 'corner') {
      this.drawCornerText(index, x, y, pw, ph);
    } else {
      this.drawSpaceText(index, x, y, pos.side);
    }
  },

  drawCornerText: function(index, x, y, pw, ph) {
    var space = BOARD[index];
    var label, sublabel;

    switch (space.type) {
      case 'go':
        label = this.add.text(x, y - 10, 'إنطلق!', {
          fontFamily: 'Tajawal, sans-serif', fontSize: '16px', fontStyle: 'bold', color: COLORS.success,
        }).setOrigin(0.5);
        sublabel = this.add.text(x, y + 12, 'GO →', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '12px', color: COLORS.success, alpha: 0.7,
        }).setOrigin(0.5);
        var arrow = this.add.text(x, y + 30, '200 SAR', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '11px', color: COLORS.desertGold,
        }).setOrigin(0.5);
        this.boardContainer.add([label, sublabel, arrow]);
        break;
      case 'jail':
        label = this.add.text(x, y - 10, 'السجن', {
          fontFamily: 'Tajawal, sans-serif', fontSize: '16px', fontStyle: 'bold', color: COLORS.danger,
        }).setOrigin(0.5);
        sublabel = this.add.text(x, y + 12, 'JAIL', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '12px', color: COLORS.danger, alpha: 0.7,
        }).setOrigin(0.5);
        this.boardContainer.add([label, sublabel]);
        break;
      case 'free':
        label = this.add.text(x, y - 12, 'استراحة', {
          fontFamily: 'Tajawal, sans-serif', fontSize: '14px', fontStyle: 'bold', color: COLORS.desertGold,
        }).setOrigin(0.5);
        sublabel = this.add.text(x, y + 8, 'FREE', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '11px', color: COLORS.desertGold, alpha: 0.7,
        }).setOrigin(0.5);
        var parkText = this.add.text(x, y + 25, '🅿️', { fontSize: '18px' }).setOrigin(0.5);
        this.boardContainer.add([label, sublabel, parkText]);
        break;
      case 'gotojail':
        label = this.add.text(x, y - 12, 'إذهب', {
          fontFamily: 'Tajawal, sans-serif', fontSize: '14px', fontStyle: 'bold', color: COLORS.danger,
        }).setOrigin(0.5);
        sublabel = this.add.text(x, y + 6, 'للسجن', {
          fontFamily: 'Tajawal, sans-serif', fontSize: '14px', fontStyle: 'bold', color: COLORS.danger,
        }).setOrigin(0.5);
        var goText = this.add.text(x, y + 26, 'GO TO JAIL', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '9px', color: COLORS.danger, alpha: 0.7,
        }).setOrigin(0.5);
        this.boardContainer.add([label, sublabel, goText]);
        break;
    }
  },

  drawSpaceText: function(index, x, y, side) {
    var space = BOARD[index];
    var nameText, priceText;
    var isVertical = (side === 'left' || side === 'right');
    var maxW = isVertical ? this.spaceHeight - 6 : this.spaceWidth - 4;

    // Short label
    var shortName = space.nameEn;
    if (shortName && shortName.length > 10) {
      shortName = shortName.substring(0, 9) + '.';
    }

    var textStyle = {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '9px',
      color: COLORS.warmSand,
      align: 'center',
      wordWrap: { width: maxW }
    };

    if (space.type === 'property' || space.type === 'station' || space.type === 'utility') {
      var yOff = (side === 'bottom') ? 8 : (side === 'top') ? -3 : 0;
      nameText = this.add.text(x, y + yOff, shortName, textStyle).setOrigin(0.5);
      if (isVertical) nameText.setRotation(side === 'left' ? -Math.PI/2 : Math.PI/2);

      if (space.price) {
        var priceStyle = {
          fontFamily: '"Fredoka One", sans-serif',
          fontSize: '8px',
          color: COLORS.desertGold,
        };
        var pOff = (side === 'bottom') ? 22 : (side === 'top') ? -17 : 0;
        priceText = this.add.text(x, y + yOff + (isVertical ? 0 : pOff), space.price + '', priceStyle).setOrigin(0.5);
        if (isVertical) {
          priceText.setRotation(side === 'left' ? -Math.PI/2 : Math.PI/2);
          priceText.setPosition(x + (side === 'left' ? -15 : 15), y);
        }
        this.boardContainer.add(priceText);
      }
    } else if (space.type === 'chance') {
      nameText = this.add.text(x, y, '?', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '18px', color: COLORS.accent,
      }).setOrigin(0.5);
      if (isVertical) nameText.setRotation(side === 'left' ? -Math.PI/2 : Math.PI/2);
    } else if (space.type === 'community') {
      nameText = this.add.text(x, y, '📦', { fontSize: '16px' }).setOrigin(0.5);
    } else if (space.type === 'tax') {
      nameText = this.add.text(x, y - 5, '💰', { fontSize: '14px' }).setOrigin(0.5);
      var taxAmount = this.add.text(x, y + 12, space.amount + '', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '8px', color: COLORS.danger,
      }).setOrigin(0.5);
      if (isVertical) {
        nameText.setRotation(side === 'left' ? -Math.PI/2 : Math.PI/2);
        taxAmount.setRotation(side === 'left' ? -Math.PI/2 : Math.PI/2);
      }
      this.boardContainer.add(taxAmount);
    }

    if (nameText) this.boardContainer.add(nameText);
  },

  drawBoardCenter: function() {
    var cx = this.boardX + this.boardSize / 2;
    var cy = this.boardY + this.boardSize / 2;
    var centerContainer = this.add.container(0, 0);
    this.boardContainer.add(centerContainer);

    // Game logo in center
    var title = this.add.text(cx, cy - 60, 'ريادة الرياض', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '32px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 3,
    }).setOrigin(0.5);
    centerContainer.add(title);

    var subtitle = this.add.text(cx, cy - 25, 'RIYADH TYCOON', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    centerContainer.add(subtitle);

    // Decorative line
    var line = this.add.graphics();
    line.lineStyle(1, 0xC8A951, 0.4);
    line.lineBetween(cx - 80, cy - 5, cx + 80, cy - 5);
    centerContainer.add(line);

    // Card deck visuals
    var chanceLabel = this.add.text(cx - 60, cy + 20, '? فرصة', {
      fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: COLORS.accent,
    }).setOrigin(0.5);
    centerContainer.add(chanceLabel);

    var communityLabel = this.add.text(cx + 60, cy + 20, '📦 مجتمع', {
      fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: COLORS.warmSand,
    }).setOrigin(0.5);
    centerContainer.add(communityLabel);

    // Mini skyline silhouette
    var skyline = this.add.graphics();
    skyline.fillStyle(0x1A2744, 0.5);
    // Kingdom Tower
    skyline.fillRect(cx - 5, cy + 50, 10, 50);
    skyline.fillCircle(cx, cy + 48, 4);
    // Al Faisaliah
    skyline.beginPath();
    skyline.moveTo(cx + 30, cy + 100);
    skyline.lineTo(cx + 33, cy + 55);
    skyline.lineTo(cx + 37, cy + 55);
    skyline.lineTo(cx + 40, cy + 100);
    skyline.closePath();
    skyline.fillPath();
    // Small buildings
    for (var i = -80; i < 80; i += 15) {
      var bh = 10 + Math.random() * 25;
      skyline.fillRect(cx + i, cy + 100 - bh, 10, bh);
    }
    centerContainer.add(skyline);
  },

  // -------------------------------------------------------
  // Player Token Sprites
  // -------------------------------------------------------
  createTokenSprites: function() {
    for (var i = 0; i < GameState.players.length; i++) {
      var player = GameState.players[i];
      var token = null;
      for (var j = 0; j < TOKENS.length; j++) {
        if (TOKENS[j].id === player.token) { token = TOKENS[j]; break; }
      }

      var pos = this.spacePositions[player.position];
      var offset = this.getTokenOffset(i, GameState.players.length);

      var container = this.add.container(pos.x + offset.x, pos.y + offset.y);
      container.setDepth(50 + i);

      // Token circle
      var circle = this.add.graphics();
      circle.fillStyle(player.color, 1);
      circle.fillCircle(0, 0, 14);
      circle.lineStyle(2, 0xFFFFFF, 0.8);
      circle.strokeCircle(0, 0, 14);
      container.add(circle);

      // Token emoji
      var emoji = this.add.text(0, 0, token ? token.emoji : '?', {
        fontSize: '16px',
      }).setOrigin(0.5);
      container.add(emoji);

      this.tokenSprites.push({
        container: container,
        playerIndex: i,
      });
    }
  },

  getTokenOffset: function(playerIdx, totalPlayers) {
    var offsets = [
      { x: -10, y: -10 },
      { x: 10, y: -10 },
      { x: -10, y: 10 },
      { x: 10, y: 10 },
    ];
    return offsets[playerIdx] || { x: 0, y: 0 };
  },

  moveTokenAnimated: function(playerIndex, fromPos, toPos, callback) {
    var self = this;
    var token = this.tokenSprites[playerIndex];
    var steps = [];

    // Calculate path
    var current = fromPos;
    while (current !== toPos) {
      current = (current + 1) % 40;
      steps.push(current);
    }

    if (steps.length === 0) {
      if (callback) callback();
      return;
    }

    var stepIdx = 0;
    var moveNext = function() {
      if (stepIdx >= steps.length) {
        AudioManager.tokenLand();
        if (callback) callback();
        return;
      }

      var target = steps[stepIdx];
      var tPos = self.spacePositions[target];
      var offset = self.getTokenOffset(playerIndex, GameState.players.length);

      AudioManager.tokenMove();

      self.tweens.add({
        targets: token.container,
        x: tPos.x + offset.x,
        y: tPos.y + offset.y - 8, // hop up
        duration: 80,
        ease: 'Quad.easeOut',
        onComplete: function() {
          self.tweens.add({
            targets: token.container,
            y: tPos.y + offset.y,
            duration: 60,
            ease: 'Bounce.easeOut',
            onComplete: function() {
              stepIdx++;
              moveNext();
            }
          });
        }
      });
    };

    moveNext();
  },

  teleportToken: function(playerIndex, toPos) {
    var token = this.tokenSprites[playerIndex];
    var tPos = this.spacePositions[toPos];
    var offset = this.getTokenOffset(playerIndex, GameState.players.length);
    token.container.setPosition(tPos.x + offset.x, tPos.y + offset.y);
  },

  // -------------------------------------------------------
  // HUD
  // -------------------------------------------------------
  createHUD: function() {
    var startX = this.boardX + this.boardSize + 30;
    var w = GAME_WIDTH - startX - 20;
    var y = 20;

    // Player panels
    this.playerPanels = [];
    for (var i = 0; i < GameState.players.length; i++) {
      var panel = this.createPlayerPanel(startX, y + i * 135, w, 125, i);
      this.playerPanels.push(panel);
    }

    // Turn info at bottom
    this.turnInfoText = this.add.text(startX + w / 2, GAME_HEIGHT - 160, '', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
      align: 'center',
    }).setOrigin(0.5);

    this.turnInfoSubtext = this.add.text(startX + w / 2, GAME_HEIGHT - 130, '', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
      align: 'center',
    }).setOrigin(0.5);

    // Action hints at bottom
    this.actionHintText = this.add.text(startX + w / 2, GAME_HEIGHT - 80, '', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '20px',
      color: COLORS.accent,
      align: 'center',
    }).setOrigin(0.5);

    this.actionHintSubtext = this.add.text(startX + w / 2, GAME_HEIGHT - 55, '', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '14px',
      color: COLORS.textSecondary,
      align: 'center',
    }).setOrigin(0.5);

    // Color key hints
    this.colorKeyHints = this.add.text(startX + w / 2, GAME_HEIGHT - 25, '🔴Buy  🟢Trade  🟡Build  🔵Mortgage', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '12px',
      color: COLORS.textSecondary,
      alpha: 0.4,
    }).setOrigin(0.5);
  },

  createPlayerPanel: function(x, y, w, h, playerIdx) {
    var player = GameState.players[playerIdx];
    var token = null;
    for (var j = 0; j < TOKENS.length; j++) {
      if (TOKENS[j].id === player.token) { token = TOKENS[j]; break; }
    }

    var container = this.add.container(x, y);
    this.hudContainer.add(container);

    // Panel background
    var bg = this.add.graphics();
    bg.fillStyle(0x1A2744, 0.9);
    bg.fillRoundedRect(0, 0, w, h, 10);
    container.add(bg);

    // Border (player color)
    var border = this.add.graphics();
    border.lineStyle(2, player.color, 0.6);
    border.strokeRoundedRect(0, 0, w, h, 10);
    container.add(border);

    // Active glow (hidden by default)
    var glow = this.add.graphics();
    glow.lineStyle(3, player.color, 1);
    glow.strokeRoundedRect(-2, -2, w + 4, h + 4, 12);
    glow.setVisible(false);
    container.add(glow);

    // Token emoji + name
    var emojiText = this.add.text(15, 15, token ? token.emoji : '?', {
      fontSize: '28px',
    });
    container.add(emojiText);

    var nameText = this.add.text(50, 12, player.name, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: player.colorStr,
    });
    container.add(nameText);

    // Money
    var moneyText = this.add.text(50, 38, '💰 ' + player.money + ' SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.desertGold,
    });
    container.add(moneyText);

    // Properties count
    var propsText = this.add.text(15, 68, '🏠 0 properties', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '14px',
      color: COLORS.textSecondary,
    });
    container.add(propsText);

    // Net worth
    var worthText = this.add.text(15, 90, 'Net: 1500 SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '13px',
      color: COLORS.textSecondary,
      alpha: 0.7,
    });
    container.add(worthText);

    // Property color dots
    var dotsContainer = this.add.container(w - 15, 70);
    container.add(dotsContainer);

    return {
      container: container,
      bg: bg,
      border: border,
      glow: glow,
      moneyText: moneyText,
      propsText: propsText,
      worthText: worthText,
      dotsContainer: dotsContainer,
      playerIdx: playerIdx,
    };
  },

  updateHUD: function() {
    for (var i = 0; i < this.playerPanels.length; i++) {
      var panel = this.playerPanels[i];
      var player = GameState.players[i];

      // Update money
      panel.moneyText.setText('💰 ' + player.money + ' SAR');
      if (player.money < 0) {
        panel.moneyText.setColor(COLORS.danger);
      } else {
        panel.moneyText.setColor(COLORS.desertGold);
      }

      // Update properties
      panel.propsText.setText('🏠 ' + player.properties.length + ' properties');

      // Update net worth
      var worth = GameState.getPlayerNetWorth(player);
      panel.worthText.setText('Net: ' + worth + ' SAR');

      // Active player glow
      panel.glow.setVisible(i === GameState.currentPlayerIndex && !player.bankrupt);

      // Bankrupt visual
      if (player.bankrupt) {
        panel.container.setAlpha(0.3);
      }

      // Update property color dots
      panel.dotsContainer.removeAll(true);
      var dotX = 0;
      var shownColors = {};
      for (var j = 0; j < player.properties.length; j++) {
        var si = player.properties[j];
        var space = BOARD[si];
        if (space.colorInt && !shownColors[space.color]) {
          shownColors[space.color] = true;
          var dot = this.add.graphics();
          dot.fillStyle(space.colorInt, 1);
          dot.fillCircle(dotX, 0, 5);
          panel.dotsContainer.add(dot);
          dotX -= 14;
        }
      }
    }
  },

  // -------------------------------------------------------
  // Ownership markers on board
  // -------------------------------------------------------
  updateBoardOwnership: function() {
    // Remove old markers
    if (this.ownershipMarkers) {
      for (var i = 0; i < this.ownershipMarkers.length; i++) {
        this.ownershipMarkers[i].destroy();
      }
    }
    this.ownershipMarkers = [];

    for (var j = 0; j < 40; j++) {
      var pd = GameState.properties[j];
      if (pd.owner >= 0) {
        var pos = this.spacePositions[j];
        var player = GameState.players[pd.owner];

        // Small ownership dot
        var marker = this.add.graphics();
        marker.fillStyle(player.color, 0.8);

        if (pos.side === 'bottom') {
          marker.fillCircle(pos.x, pos.y + pos.h/2 - 6, 4);
        } else if (pos.side === 'top') {
          marker.fillCircle(pos.x, pos.y - pos.h/2 + 6, 4);
        } else if (pos.side === 'left') {
          marker.fillCircle(pos.x - pos.w/2 + 6, pos.y, 4);
        } else if (pos.side === 'right') {
          marker.fillCircle(pos.x + pos.w/2 - 6, pos.y, 4);
        }

        // House indicators
        if (pd.hotel) {
          marker.fillStyle(0xFF0000, 1);
          marker.fillRect(pos.x - 5, pos.y - (pos.side === 'bottom' ? pos.h/2 + 2 : -pos.h/2 - 8), 10, 6);
        } else if (pd.houses > 0) {
          for (var k = 0; k < pd.houses; k++) {
            marker.fillStyle(0x00AA00, 1);
            var hx = pos.x - 10 + k * 7;
            marker.fillRect(hx, pos.y - (pos.side === 'bottom' ? pos.h/2 + 2 : -pos.h/2 - 6), 5, 4);
          }
        }

        marker.setDepth(30);
        this.ownershipMarkers.push(marker);
      }
    }
  },

  // -------------------------------------------------------
  // Turn Flow
  // -------------------------------------------------------
  showTurnStart: function() {
    var player = GameState.currentPlayer();
    this.updateHUD();
    this.updateBoardOwnership();

    // Highlight current player
    this.turnInfoText.setText('دور: ' + player.name);
    this.turnInfoSubtext.setText("Turn: " + player.name);

    if (player.inJail) {
      this.showJailOptions();
    } else {
      this.turnState = 'waitRoll';
      this.showRollPrompt();
    }
  },

  showRollPrompt: function() {
    var self = this;
    this.actionHintText.setText('اضغط Enter لرمي النرد');
    this.actionHintSubtext.setText('Press Enter to Roll Dice');

    // Pulsing hint
    this.tweens.add({
      targets: this.actionHintText,
      alpha: 0.4,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('enter', function() {
      if (self.turnState !== 'waitRoll') return;
      self.turnState = 'rolling';
      self.tweens.killTweensOf(self.actionHintText);
      self.actionHintText.setAlpha(1).setText('');
      self.actionHintSubtext.setText('');
      self.doRoll();
    });

    // Build houses shortcut
    InputManager.on('yellow', function() {
      self.showBuildMenu();
    });

    // Mortgage shortcut
    InputManager.on('blue', function() {
      self.showMortgageMenu();
    });
  },

  doRoll: function() {
    var self = this;
    var player = GameState.currentPlayer();
    var dice = GameState.rollDice();

    // Show dice in board center
    var cx = this.boardX + this.boardSize / 2;
    var cy = this.boardY + this.boardSize / 2 + 80;
    DiceManager.setPosition(cx, cy);

    DiceManager.roll(dice.d1, dice.d2, function(result) {
      // Check triple doubles
      if (result.isDoubles) {
        GameState.doublesCount++;
        if (GameState.doublesCount >= 3) {
          self.actionHintText.setText('ثلاث مرات متتالية! اذهب للسجن');
          self.actionHintSubtext.setText('Triple doubles! Go to Jail!');
          AudioManager.goToJail();
          GameState.sendToJail(player);
          self.teleportToken(player.index, 10);
          self.time.delayedCall(1500, function() {
            DiceManager.hide();
            self.endTurn(false);
          });
          return;
        }
      } else {
        GameState.doublesCount = 0;
      }

      // Move player
      var oldPos = player.position;
      var moveResult = GameState.movePlayer(player, result.total);

      // Passed GO
      if (moveResult.passedGo) {
        player.money += 200;
        self.showMessage('مررت بإنطلق! +200 SAR', 'Passed GO! +200 SAR', COLORS.success);
        AudioManager.collect();
      }

      // Animate movement
      self.moveTokenAnimated(player.index, oldPos, moveResult.newPos, function() {
        DiceManager.hide();
        self.handleLanding(result.isDoubles);
      });
    });
  },

  handleLanding: function(rolledDoubles) {
    var self = this;
    var player = GameState.currentPlayer();
    var action = GameState.getLandingAction(player);
    var space = BOARD[player.position];

    this.updateHUD();

    switch (action.type) {
      case 'go':
        this.showMessage('إنطلق!', 'GO!', COLORS.success);
        this.time.delayedCall(1000, function() { self.endTurn(rolledDoubles); });
        break;

      case 'unowned':
        this.showPropertyCard(action.spaceIndex, function(bought) {
          self.updateHUD();
          self.updateBoardOwnership();
          self.endTurn(rolledDoubles);
        });
        break;

      case 'payrent':
        var owner = GameState.players[action.owner];
        this.showMessage(
          'ادفع ' + action.rent + ' ريال لـ ' + owner.name,
          'Pay ' + action.rent + ' SAR rent to ' + owner.name,
          COLORS.danger
        );
        AudioManager.payRent();
        player.money -= action.rent;
        owner.money += action.rent;
        this.updateHUD();

        if (GameState.checkBankruptcy(player)) {
          this.time.delayedCall(1500, function() {
            self.handleBankruptcy(player, action.owner);
          });
        } else {
          this.time.delayedCall(1500, function() { self.endTurn(rolledDoubles); });
        }
        break;

      case 'tax':
        this.showMessage(
          space.name + ' - ادفع ' + action.amount + ' ريال',
          space.nameEn + ' - Pay ' + action.amount + ' SAR',
          COLORS.danger
        );
        AudioManager.payRent();
        player.money -= action.amount;
        this.updateHUD();

        if (GameState.checkBankruptcy(player)) {
          this.time.delayedCall(1500, function() {
            self.handleBankruptcy(player, -1);
          });
        } else {
          this.time.delayedCall(1500, function() { self.endTurn(rolledDoubles); });
        }
        break;

      case 'chance':
        this.handleCard('chance', rolledDoubles);
        break;

      case 'community':
        this.handleCard('community', rolledDoubles);
        break;

      case 'gotojail':
        this.showMessage('اذهب للسجن!', 'Go to Jail!', COLORS.danger);
        AudioManager.goToJail();
        GameState.sendToJail(player);
        this.teleportToken(player.index, 10);
        this.time.delayedCall(1500, function() { self.endTurn(false); });
        break;

      case 'freeparking':
        if (action.amount > 0) {
          this.showMessage(
            'استراحة حرة! اجمع ' + action.amount + ' ريال',
            'Free Parking! Collect ' + action.amount + ' SAR',
            COLORS.success
          );
          AudioManager.collect();
          player.money += action.amount;
          this.updateHUD();
        } else {
          this.showMessage('استراحة حرة', 'Free Parking', COLORS.textSecondary);
        }
        this.time.delayedCall(1200, function() { self.endTurn(rolledDoubles); });
        break;

      case 'visiting':
        this.showMessage('زيارة فقط', 'Just Visiting', COLORS.textSecondary);
        this.time.delayedCall(800, function() { self.endTurn(rolledDoubles); });
        break;

      case 'own':
      case 'mortgaged':
        this.time.delayedCall(400, function() { self.endTurn(rolledDoubles); });
        break;

      default:
        this.time.delayedCall(400, function() { self.endTurn(rolledDoubles); });
    }
  },

  handleCard: function(type, rolledDoubles) {
    var self = this;
    var player = GameState.currentPlayer();
    var card = type === 'chance' ? GameState.drawChance() : GameState.drawCommunity();

    AudioManager.cardDraw();
    this.showCardReveal(card, type, function() {
      var result = GameState.applyCardEffect(player, card);

      if (result.type === 'move') {
        var oldPos = player.position;
        self.moveTokenAnimated(player.index, oldPos, player.position, function() {
          self.updateHUD();
          // Check if landing on new space triggers action
          var newAction = GameState.getLandingAction(player);
          if (newAction.type === 'unowned') {
            self.showPropertyCard(newAction.spaceIndex, function() {
              self.updateHUD();
              self.updateBoardOwnership();
              self.endTurn(rolledDoubles);
            });
          } else if (newAction.type === 'payrent') {
            var owner = GameState.players[newAction.owner];
            player.money -= newAction.rent;
            owner.money += newAction.rent;
            self.showMessage('ادفع ' + newAction.rent + ' SAR', 'Pay ' + newAction.rent + ' SAR rent', COLORS.danger);
            self.updateHUD();
            self.time.delayedCall(1200, function() { self.endTurn(rolledDoubles); });
          } else {
            self.endTurn(rolledDoubles);
          }
        });
      } else if (result.type === 'jail') {
        self.teleportToken(player.index, 10);
        self.updateHUD();
        self.time.delayedCall(800, function() { self.endTurn(false); });
      } else if (result.type === 'back') {
        self.teleportToken(player.index, player.position);
        self.updateHUD();
        var newAction2 = GameState.getLandingAction(player);
        if (newAction2.type === 'unowned') {
          self.showPropertyCard(newAction2.spaceIndex, function() {
            self.updateHUD();
            self.updateBoardOwnership();
            self.endTurn(rolledDoubles);
          });
        } else {
          self.time.delayedCall(800, function() { self.endTurn(rolledDoubles); });
        }
      } else {
        self.updateHUD();
        self.time.delayedCall(1000, function() { self.endTurn(rolledDoubles); });
      }
    });
  },

  endTurn: function(rolledDoubles) {
    var self = this;
    DiceManager.hide();
    this.clearAction();

    // Check for game over
    var active = GameState.getActivePlayers();
    if (active.length <= 1) {
      this.time.delayedCall(500, function() {
        self.scene.start('GameOverScene', { winner: active[0] });
      });
      return;
    }

    if (rolledDoubles && !GameState.currentPlayer().inJail) {
      // Roll again
      this.showMessage('مرة أخرى!', 'Doubles! Roll again!', COLORS.accent);
      this.time.delayedCall(1000, function() {
        self.turnState = 'waitRoll';
        self.showRollPrompt();
      });
    } else {
      GameState.nextTurn();
      if (GameState.gameOver) {
        this.time.delayedCall(500, function() {
          self.scene.start('GameOverScene', { winner: GameState.winner });
        });
      } else {
        this.time.delayedCall(600, function() {
          self.showTurnStart();
        });
      }
    }
  },

  // -------------------------------------------------------
  // Jail Options
  // -------------------------------------------------------
  showJailOptions: function() {
    var self = this;
    var player = GameState.currentPlayer();

    this.actionHintText.setText('في السجن - اختر خيار');
    this.actionHintSubtext.setText('In Jail — Choose an option');

    var options = [];
    var optionLabels = [];

    // Roll for doubles
    options.push('roll');
    optionLabels.push('🎲 Roll for Doubles');

    // Pay 50
    if (player.money >= 50) {
      options.push('pay');
      optionLabels.push('💰 Pay 50 SAR');
    }

    // Use card
    if (player.jailFreeCards > 0) {
      options.push('card');
      optionLabels.push('🃏 Use Jail Free Card');
    }

    this.showSimpleMenu(optionLabels, function(idx) {
      var choice = options[idx];
      if (choice === 'roll') {
        var dice = GameState.rollDice();
        var cx = self.boardX + self.boardSize / 2;
        var cy = self.boardY + self.boardSize / 2 + 80;
        DiceManager.setPosition(cx, cy);
        DiceManager.roll(dice.d1, dice.d2, function(result) {
          if (GameState.tryJailRoll(player, result)) {
            self.showMessage('خرجت من السجن!', 'Out of Jail!', COLORS.success);
            AudioManager.collect();
            if (result.isDoubles) {
              var oldPos = player.position;
              var moveResult = GameState.movePlayer(player, result.total);
              self.moveTokenAnimated(player.index, oldPos, moveResult.newPos, function() {
                DiceManager.hide();
                self.handleLanding(false);
              });
            } else {
              var oldPos2 = player.position;
              var moveResult2 = GameState.movePlayer(player, result.total);
              self.moveTokenAnimated(player.index, oldPos2, moveResult2.newPos, function() {
                DiceManager.hide();
                self.handleLanding(false);
              });
            }
          } else {
            self.showMessage('لم تحصل على مزدوج', 'No doubles — still in jail', COLORS.danger);
            DiceManager.hide();
            self.time.delayedCall(1200, function() { self.endTurn(false); });
          }
        });
      } else if (choice === 'pay') {
        GameState.payJailFine(player);
        self.showMessage('دفعت 50 ريال - خرجت!', 'Paid 50 SAR — Free!', COLORS.success);
        self.updateHUD();
        self.time.delayedCall(800, function() {
          self.turnState = 'waitRoll';
          self.showRollPrompt();
        });
      } else if (choice === 'card') {
        GameState.useJailFreeCard(player);
        self.showMessage('استخدمت بطاقة الحرية!', 'Used Jail Free Card!', COLORS.success);
        self.updateHUD();
        self.time.delayedCall(800, function() {
          self.turnState = 'waitRoll';
          self.showRollPrompt();
        });
      }
    });
  },

  // -------------------------------------------------------
  // Property Card Overlay
  // -------------------------------------------------------
  showPropertyCard: function(spaceIndex, callback) {
    var self = this;
    var space = BOARD[spaceIndex];
    var player = GameState.currentPlayer();
    this.clearAction();

    var w = 420;
    var h = 520;
    var x = GAME_WIDTH - w - 40;
    var y = (GAME_HEIGHT - h) / 2;

    var container = this.add.container(x + w, y); // start off-screen right
    this.actionContainer.add(container);

    // Card background
    var bg = this.add.graphics();
    bg.fillStyle(0x1A2744, 0.98);
    bg.fillRoundedRect(0, 0, w, h, 16);
    container.add(bg);

    // Color bar
    if (space.colorInt) {
      var bar = this.add.graphics();
      bar.fillStyle(space.colorInt, 1);
      bar.fillRoundedRect(0, 0, w, 50, { tl: 16, tr: 16, bl: 0, br: 0 });
      container.add(bar);
    }

    // Border
    var border = this.add.graphics();
    border.lineStyle(2, space.colorInt || 0xC8A951, 0.8);
    border.strokeRoundedRect(0, 0, w, h, 16);
    container.add(border);

    // Property name (Arabic)
    var nameAr = this.add.text(w / 2, 75, space.name, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '32px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(nameAr);

    // Property name (English)
    var nameEn = this.add.text(w / 2, 110, space.nameEn, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '22px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    container.add(nameEn);

    // District
    if (space.district) {
      var district = this.add.text(w / 2, 138, '📍 ' + space.district, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '14px',
        color: COLORS.textSecondary,
        alpha: 0.7,
      }).setOrigin(0.5);
      container.add(district);
    }

    // Price
    var priceText = this.add.text(w / 2, 170, '💰 ' + space.price + ' SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.desertGold,
    }).setOrigin(0.5);
    container.add(priceText);

    // Rent table
    if (space.rent) {
      var rentY = 210;
      var rentLabels = ['Base Rent', 'With 1 House', 'With 2 Houses', 'With 3 Houses', 'With 4 Houses', 'With Hotel'];
      for (var i = 0; i < space.rent.length; i++) {
        var rlabel = this.add.text(30, rentY + i * 24, rentLabels[i], {
          fontFamily: '"Fredoka One", sans-serif',
          fontSize: '14px',
          color: COLORS.textSecondary,
        });
        var rval = this.add.text(w - 30, rentY + i * 24, space.rent[i] + ' SAR', {
          fontFamily: '"Fredoka One", sans-serif',
          fontSize: '14px',
          color: COLORS.warmSand,
        }).setOrigin(1, 0);
        container.add([rlabel, rval]);
      }

      // House cost
      if (space.house) {
        var houseText = this.add.text(w / 2, rentY + 160, 'House cost: ' + space.house + ' SAR', {
          fontFamily: '"Fredoka One", sans-serif',
          fontSize: '14px',
          color: COLORS.success,
        }).setOrigin(0.5);
        container.add(houseText);
      }
    } else if (space.type === 'station') {
      var sRentY = 210;
      var sRents = [[1, 25], [2, 50], [3, 100], [4, 200]];
      for (var j = 0; j < sRents.length; j++) {
        var sl = this.add.text(30, sRentY + j * 26, sRents[j][0] + ' station(s)', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '15px', color: COLORS.textSecondary,
        });
        var sv = this.add.text(w - 30, sRentY + j * 26, sRents[j][1] + ' SAR', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '15px', color: COLORS.warmSand,
        }).setOrigin(1, 0);
        container.add([sl, sv]);
      }
    } else if (space.type === 'utility') {
      var uText = this.add.text(w / 2, 220, '1 utility: 4x dice\n2 utilities: 10x dice', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '16px', color: COLORS.textSecondary, align: 'center',
      }).setOrigin(0.5);
      container.add(uText);
    }

    // Buy / Pass buttons
    var canBuy = player.money >= space.price;
    var buyBtnY = h - 60;

    // Buy button
    var buyBg = this.add.graphics();
    buyBg.fillStyle(canBuy ? 0x006C35 : 0x333333, 1);
    buyBg.fillRoundedRect(20, buyBtnY, w / 2 - 30, 44, 8);
    container.add(buyBg);

    var buyLabel = this.add.text(20 + (w / 2 - 30) / 2, buyBtnY + 22, 'شراء | Buy', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: canBuy ? '#FFFFFF' : '#666666',
    }).setOrigin(0.5);
    container.add(buyLabel);

    // Pass button
    var passBg = this.add.graphics();
    passBg.fillStyle(0x2A3F6B, 1);
    passBg.fillRoundedRect(w / 2 + 10, buyBtnY, w / 2 - 30, 44, 8);
    container.add(passBg);

    var passLabel = this.add.text(w / 2 + 10 + (w / 2 - 30) / 2, buyBtnY + 22, 'تجاوز | Pass', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(passLabel);

    // Focus indicator
    var focusIdx = canBuy ? 0 : 1;
    var buyGlow = this.add.graphics();
    buyGlow.lineStyle(2, 0xE8B931, 1);
    buyGlow.strokeRoundedRect(18, buyBtnY - 2, w / 2 - 26, 48, 10);
    container.add(buyGlow);

    var passGlow = this.add.graphics();
    passGlow.lineStyle(2, 0xE8B931, 1);
    passGlow.strokeRoundedRect(w / 2 + 8, buyBtnY - 2, w / 2 - 26, 48, 10);
    container.add(passGlow);

    var updateFocus = function() {
      buyGlow.setVisible(focusIdx === 0);
      passGlow.setVisible(focusIdx === 1);
    };
    updateFocus();

    // Slide in animation
    this.tweens.add({
      targets: container,
      x: x,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // Input
    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('left', function() {
      if (canBuy) { focusIdx = 0; AudioManager.navigate(); updateFocus(); }
    });
    InputManager.on('right', function() {
      focusIdx = 1; AudioManager.navigate(); updateFocus();
    });
    InputManager.on('enter', function() {
      if (focusIdx === 0 && canBuy) {
        GameState.buyProperty(player.index, spaceIndex);
        AudioManager.buyProperty();
        self.showMessage('تم الشراء!', 'Property Purchased!', COLORS.success);
      }
      self.clearAction();
      if (callback) callback(focusIdx === 0 && canBuy);
    });
    InputManager.on('red', function() {
      if (canBuy) {
        GameState.buyProperty(player.index, spaceIndex);
        AudioManager.buyProperty();
        self.showMessage('تم الشراء!', 'Property Purchased!', COLORS.success);
        self.clearAction();
        if (callback) callback(true);
      }
    });
  },

  // -------------------------------------------------------
  // Card Reveal Overlay
  // -------------------------------------------------------
  showCardReveal: function(card, type, callback) {
    var self = this;
    this.clearAction();

    var w = 440;
    var h = 280;
    var x = (GAME_WIDTH - w) / 2;
    var y = (GAME_HEIGHT - h) / 2;

    var container = this.add.container(x, y);
    container.setScale(0.5);
    container.setAlpha(0);
    this.actionContainer.add(container);

    // Card background
    var bg = this.add.graphics();
    bg.fillStyle(type === 'chance' ? 0x2A1A44 : 0x1A3744, 0.98);
    bg.fillRoundedRect(0, 0, w, h, 16);
    container.add(bg);

    var border = this.add.graphics();
    border.lineStyle(2, type === 'chance' ? 0xE8B931 : 0x87CEEB, 0.8);
    border.strokeRoundedRect(0, 0, w, h, 16);
    container.add(border);

    // Type header
    var header = this.add.text(w / 2, 30, type === 'chance' ? '🎯 فرصة | Chance' : '📦 صندوق المجتمع | Community Chest', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: type === 'chance' ? COLORS.accent : COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(header);

    // Card text (Arabic)
    var textAr = this.add.text(w / 2, 90, card.text, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
      align: 'center',
      wordWrap: { width: w - 40 },
      direction: 'rtl',
    }).setOrigin(0.5);
    container.add(textAr);

    // Card text (English)
    var textEn = this.add.text(w / 2, 160, card.textEn, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.textSecondary,
      align: 'center',
      wordWrap: { width: w - 40 },
    }).setOrigin(0.5);
    container.add(textEn);

    // OK prompt
    var ok = this.add.text(w / 2, h - 30, 'Enter ✓', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.accent,
    }).setOrigin(0.5);
    container.add(ok);

    // Flip-in animation
    this.tweens.add({
      targets: container,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 400,
      ease: 'Back.easeOut',
    });

    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('enter', function() {
      self.clearAction();
      if (callback) callback();
    });
  },

  // -------------------------------------------------------
  // Build Houses Menu
  // -------------------------------------------------------
  showBuildMenu: function() {
    var self = this;
    var player = GameState.currentPlayer();
    var buildable = GameState.getPlayerBuildableProperties(player.index);

    if (buildable.length === 0) {
      this.showMessage('لا يمكنك البناء حالياً', 'Cannot build right now', COLORS.textSecondary);
      return;
    }

    var labels = [];
    for (var i = 0; i < buildable.length; i++) {
      var sp = BOARD[buildable[i]];
      var pd = GameState.properties[buildable[i]];
      var level = pd.hotel ? 'Hotel' : pd.houses + ' houses';
      labels.push(sp.nameEn + ' (' + level + ') - ' + sp.house + ' SAR');
    }
    labels.push('Cancel');

    this.showSimpleMenu(labels, function(idx) {
      if (idx < buildable.length) {
        if (GameState.buildHouse(player.index, buildable[idx])) {
          AudioManager.buildHouse();
          self.showMessage('تم البناء!', 'House Built!', COLORS.success);
          self.updateHUD();
          self.updateBoardOwnership();
        }
      }
      // Return to roll prompt if still waiting
      if (self.turnState === 'waitRoll') {
        self.showRollPrompt();
      }
    });
  },

  // -------------------------------------------------------
  // Mortgage Menu
  // -------------------------------------------------------
  showMortgageMenu: function() {
    var self = this;
    var player = GameState.currentPlayer();
    var mortgageable = GameState.getPlayerMortgageable(player.index);
    var unmortgageable = GameState.getPlayerUnmortgageable(player.index);

    var labels = [];
    var actions = [];

    for (var i = 0; i < mortgageable.length; i++) {
      var sp = BOARD[mortgageable[i]];
      labels.push('Mortgage ' + sp.nameEn + ' (+' + Math.floor(sp.price / 2) + ')');
      actions.push({ type: 'mortgage', idx: mortgageable[i] });
    }
    for (var j = 0; j < unmortgageable.length; j++) {
      var sp2 = BOARD[unmortgageable[j]];
      var cost = Math.floor(sp2.price * 0.55);
      labels.push('Unmortgage ' + sp2.nameEn + ' (-' + cost + ')');
      actions.push({ type: 'unmortgage', idx: unmortgageable[j] });
    }

    if (labels.length === 0) {
      this.showMessage('لا عقارات للرهن', 'No properties to mortgage', COLORS.textSecondary);
      return;
    }

    labels.push('Cancel');
    actions.push({ type: 'cancel' });

    this.showSimpleMenu(labels, function(idx) {
      var action = actions[idx];
      if (action && action.type === 'mortgage') {
        GameState.mortgageProperty(player.index, action.idx);
        AudioManager.payRent();
        self.showMessage('تم الرهن', 'Property Mortgaged', COLORS.textSecondary);
        self.updateHUD();
        self.updateBoardOwnership();
      } else if (action && action.type === 'unmortgage') {
        GameState.unmortgageProperty(player.index, action.idx);
        AudioManager.buyProperty();
        self.showMessage('تم فك الرهن', 'Property Unmortgaged', COLORS.success);
        self.updateHUD();
        self.updateBoardOwnership();
      }
      if (self.turnState === 'waitRoll') {
        self.showRollPrompt();
      }
    });
  },

  // -------------------------------------------------------
  // Simple Menu (for jail, build, mortgage, etc.)
  // -------------------------------------------------------
  showSimpleMenu: function(labels, callback) {
    var self = this;
    this.clearAction();

    var w = 400;
    var itemH = 48;
    var h = labels.length * itemH + 40;
    var x = (GAME_WIDTH - w) / 2;
    var y = (GAME_HEIGHT - h) / 2;

    var container = this.add.container(x, y);
    this.actionContainer.add(container);

    var bg = this.add.graphics();
    bg.fillStyle(0x1A2744, 0.98);
    bg.fillRoundedRect(0, 0, w, h, 12);
    bg.lineStyle(2, 0xC8A951, 0.5);
    bg.strokeRoundedRect(0, 0, w, h, 12);
    container.add(bg);

    var items = [];
    var focusIdx = 0;

    for (var i = 0; i < labels.length; i++) {
      var itemBg = this.add.graphics();
      itemBg.fillStyle(0x2A3F6B, 0);
      itemBg.fillRoundedRect(10, 20 + i * itemH, w - 20, itemH - 4, 6);
      container.add(itemBg);

      var itemText = this.add.text(w / 2, 20 + i * itemH + itemH / 2 - 2, labels[i], {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '17px',
        color: COLORS.warmSand,
      }).setOrigin(0.5);
      container.add(itemText);

      var itemGlow = this.add.graphics();
      itemGlow.lineStyle(2, 0xE8B931, 1);
      itemGlow.strokeRoundedRect(8, 18 + i * itemH, w - 16, itemH, 8);
      itemGlow.setVisible(false);
      container.add(itemGlow);

      items.push({ text: itemText, glow: itemGlow, bg: itemBg });
    }

    var updateFocus = function() {
      for (var j = 0; j < items.length; j++) {
        items[j].glow.setVisible(j === focusIdx);
        items[j].text.setColor(j === focusIdx ? COLORS.accent : COLORS.warmSand);
      }
    };
    updateFocus();

    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('up', function() {
      focusIdx = (focusIdx - 1 + labels.length) % labels.length;
      AudioManager.navigate();
      updateFocus();
    });
    InputManager.on('down', function() {
      focusIdx = (focusIdx + 1) % labels.length;
      AudioManager.navigate();
      updateFocus();
    });
    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      self.clearAction();
      if (callback) callback(focusIdx);
    });
    InputManager.on('back', function() {
      self.clearAction();
      if (callback) callback(labels.length - 1); // Cancel
    });
  },

  // -------------------------------------------------------
  // Bankruptcy handling
  // -------------------------------------------------------
  handleBankruptcy: function(player, creditorIdx) {
    var self = this;
    AudioManager.bankruptcy();
    GameState.bankruptPlayer(player.index, creditorIdx);

    this.showMessage(
      player.name + ' أفلس!',
      player.name + ' is Bankrupt!',
      COLORS.danger
    );

    // Hide token
    this.tokenSprites[player.index].container.setVisible(false);

    this.updateHUD();
    this.updateBoardOwnership();

    this.time.delayedCall(2000, function() {
      self.endTurn(false);
    });
  },

  // -------------------------------------------------------
  // Message Display
  // -------------------------------------------------------
  showMessage: function(textAr, textEn, color) {
    this.messageContainer.removeAll(true);
    color = color || COLORS.warmSand;

    var w = 500;
    var h = 80;
    var x = this.boardX + this.boardSize / 2 - w / 2;
    var y = 10;

    var bg = this.add.graphics();
    bg.fillStyle(0x0A1628, 0.9);
    bg.fillRoundedRect(x, y, w, h, 10);
    bg.lineStyle(2, hexToInt(color), 0.6);
    bg.strokeRoundedRect(x, y, w, h, 10);
    this.messageContainer.add(bg);

    var msgAr = this.add.text(x + w / 2, y + 22, textAr, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: color,
    }).setOrigin(0.5);
    this.messageContainer.add(msgAr);

    var msgEn = this.add.text(x + w / 2, y + 52, textEn, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.messageContainer.add(msgEn);

    var self = this;
    this.time.delayedCall(3000, function() {
      self.messageContainer.removeAll(true);
    });
  },

  clearAction: function() {
    this.actionContainer.removeAll(true);
  },
});
