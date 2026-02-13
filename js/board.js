// ============================================================
// RiyadhTowers — Premium Main Board Scene
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
  // Premium Board Drawing
  // -------------------------------------------------------
  drawBackgroundPattern: function() {
    // Simplified pattern - fewer draw calls for TV performance
    var g = this.add.graphics();
    g.setAlpha(0.02);
    g.lineStyle(1, 0xC8A951, 1);
    var size = 120; // larger grid = fewer cells
    for (var x = 0; x < GAME_WIDTH; x += size) {
      for (var y = 0; y < GAME_HEIGHT; y += size) {
        var cx = x + size / 2;
        var cy = y + size / 2;
        var r = size * 0.25;
        // Simple 4-pointed star (half the draw calls)
        g.lineBetween(cx - r, cy, cx + r, cy);
        g.lineBetween(cx, cy - r, cx, cy + r);
        g.lineBetween(cx - r * 0.7, cy - r * 0.7, cx + r * 0.7, cy + r * 0.7);
        g.lineBetween(cx + r * 0.7, cy - r * 0.7, cx - r * 0.7, cy + r * 0.7);
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

    // Outer drop shadow
    g.fillStyle(0x000000, 0.4);
    g.fillRoundedRect(bx + 4, by + 4, bs, bs, 10);
    g.fillStyle(0x000000, 0.2);
    g.fillRoundedRect(bx + 8, by + 8, bs, bs, 10);

    // Board background - layered for depth
    g.fillStyle(0x0B1A2D, 1);
    g.fillRoundedRect(bx, by, bs, bs, 8);
    g.fillStyle(0x0F1E38, 0.7);
    g.fillRoundedRect(bx + 2, by + 2, bs - 4, bs - 4, 7);

    // Outer gold border (thick)
    g.lineStyle(3, 0xC8A951, 0.9);
    g.strokeRoundedRect(bx, by, bs, bs, 8);

    // Inner gold border (thin)
    g.lineStyle(1, 0xC8A951, 0.3);
    g.strokeRoundedRect(bx + 4, by + 4, bs - 8, bs - 8, 6);

    // Inner playing area border
    g.lineStyle(2, 0x1E3355, 0.6);
    g.strokeRect(bx + sh, by + sh, bs - sh * 2, bs - sh * 2);
    g.lineStyle(1, 0xC8A951, 0.15);
    g.strokeRect(bx + sh + 1, by + sh + 1, bs - sh * 2 - 2, bs - sh * 2 - 2);

    // Draw all spaces
    for (var i = 0; i < 40; i++) {
      this.drawSpace(g, i);
    }

    // Animated gold border shimmer - pre-drawn, alpha tween only (no clear())
    var shimmer = this.add.graphics();
    shimmer.lineStyle(2, 0xFFD700, 1);
    shimmer.strokeRoundedRect(bx - 1, by - 1, bs + 2, bs + 2, 9);
    shimmer.lineStyle(1, 0xC8A951, 0.4);
    shimmer.strokeRoundedRect(bx - 3, by - 3, bs + 6, bs + 6, 11);
    this.boardContainer.add(shimmer);
    this.tweens.add({
      targets: shimmer,
      alpha: { from: 0.2, to: 0.7 },
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  },

  drawSpace: function(g, index) {
    var pos = this.spacePositions[index];
    var space = BOARD[index];
    var x = pos.x;
    var y = pos.y;
    var pw = pos.w;
    var ph = pos.h;

    if (pos.side === 'corner') {
      // Corner background with subtle gradient feel
      g.fillStyle(0x0A1525, 1);
      g.fillRect(x - pw / 2, y - ph / 2, pw, ph);
      g.fillStyle(0x0F1E38, 0.5);
      g.fillRect(x - pw / 2 + 2, y - ph / 2 + 2, pw - 4, ph - 4);
      g.lineStyle(1, 0x1E3355, 0.7);
      g.strokeRect(x - pw / 2, y - ph / 2, pw, ph);
      // Corner inner highlight
      g.lineStyle(1, 0xC8A951, 0.1);
      g.strokeRect(x - pw / 2 + 1, y - ph / 2 + 1, pw - 2, ph - 2);
    } else {
      // Regular space separator lines
      g.lineStyle(1, 0x1E3355, 0.4);
      g.strokeRect(x - pw / 2, y - ph / 2, pw, ph);
    }

    // Color bar for properties - enhanced with highlight strip
    if (space.type === 'property' && space.colorInt) {
      var barH = 12;
      var highlightH = 3;
      if (pos.side === 'bottom') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x - pw / 2 + 1, y - ph / 2 + 1, pw - 2, barH);
        // Highlight strip on top of color bar
        g.fillStyle(0xFFFFFF, 0.2);
        g.fillRect(x - pw / 2 + 1, y - ph / 2 + 1, pw - 2, highlightH);
      } else if (pos.side === 'top') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x - pw / 2 + 1, y + ph / 2 - barH - 1, pw - 2, barH);
        g.fillStyle(0xFFFFFF, 0.2);
        g.fillRect(x - pw / 2 + 1, y + ph / 2 - barH - 1, pw - 2, highlightH);
      } else if (pos.side === 'left') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x + pw / 2 - barH - 1, y - ph / 2 + 1, barH, ph - 2);
        g.fillStyle(0xFFFFFF, 0.2);
        g.fillRect(x + pw / 2 - highlightH - 1, y - ph / 2 + 1, highlightH, ph - 2);
      } else if (pos.side === 'right') {
        g.fillStyle(space.colorInt, 1);
        g.fillRect(x - pw / 2 + 1, y - ph / 2 + 1, barH, ph - 2);
        g.fillStyle(0xFFFFFF, 0.2);
        g.fillRect(x - pw / 2 + 1, y - ph / 2 + 1, highlightH, ph - 2);
      }
    }

    // Text labels
    if (pos.side === 'corner') {
      this.drawCornerContent(g, index, x, y, pw, ph);
    } else {
      this.drawSpaceText(index, x, y, pos.side);
    }
  },

  drawCornerContent: function(g, index, x, y, pw, ph) {
    var space = BOARD[index];

    switch (space.type) {
      case 'go':
        // Green arrow icon
        g.fillStyle(0x27AE60, 0.3);
        g.fillCircle(x, y - 18, 14);
        g.lineStyle(2, 0x27AE60, 0.7);
        g.strokeCircle(x, y - 18, 14);

        var label = this.add.text(x, y - 18, '>', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '16px', fontStyle: 'bold', color: COLORS.success,
        }).setOrigin(0.5);
        var arLabel = this.add.text(x, y + 4, 'GO', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '13px', fontStyle: 'bold', color: COLORS.success,
        }).setOrigin(0.5);
        var amount = this.add.text(x, y + 22, '200 SAR', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '10px', color: COLORS.desertGold,
        }).setOrigin(0.5);
        this.boardContainer.add([label, arLabel, amount]);
        break;

      case 'jail':
        // Jail bars icon
        g.lineStyle(2, 0xE74C3C, 0.5);
        for (var b = -8; b <= 8; b += 8) {
          g.lineBetween(x + b, y - 26, x + b, y - 6);
        }
        g.lineStyle(1, 0xE74C3C, 0.3);
        g.lineBetween(x - 12, y - 16, x + 12, y - 16);

        var jailAr = this.add.text(x, y + 6, 'JAIL', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '14px', fontStyle: 'bold', color: COLORS.danger,
        }).setOrigin(0.5);
        var jailEn = this.add.text(x, y + 24, 'Visit / Stay', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '9px', color: COLORS.textSecondary, alpha: 0.6,
        }).setOrigin(0.5);
        this.boardContainer.add([jailAr, jailEn]);
        break;

      case 'free':
        // Parking P icon
        g.fillStyle(0xC8A951, 0.15);
        g.fillCircle(x, y - 14, 16);
        g.lineStyle(2, 0xC8A951, 0.5);
        g.strokeCircle(x, y - 14, 16);

        var pLabel = this.add.text(x, y - 15, 'P', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '18px', fontStyle: 'bold', color: COLORS.desertGold,
        }).setOrigin(0.5);
        var freeLabel = this.add.text(x, y + 10, 'FREE', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '12px', color: COLORS.desertGold, alpha: 0.8,
        }).setOrigin(0.5);
        var parkLabel = this.add.text(x, y + 26, 'PARKING', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '8px', color: COLORS.textSecondary, alpha: 0.5,
        }).setOrigin(0.5);
        this.boardContainer.add([pLabel, freeLabel, parkLabel]);
        break;

      case 'gotojail':
        // Arrow pointing to bars
        g.lineStyle(2, 0xE74C3C, 0.6);
        g.lineBetween(x - 12, y - 14, x + 4, y - 14);
        g.lineBetween(x + 1, y - 20, x + 6, y - 14);
        g.lineBetween(x + 1, y - 8, x + 6, y - 14);
        // Mini bars
        for (var mb = 8; mb <= 16; mb += 4) {
          g.lineBetween(x + mb, y - 22, x + mb, y - 6);
        }

        var goAr = this.add.text(x, y + 4, 'GO TO', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '11px', fontStyle: 'bold', color: COLORS.danger,
        }).setOrigin(0.5);
        var goJailLabel = this.add.text(x, y + 18, 'JAIL', {
          fontFamily: '"Fredoka One", sans-serif', fontSize: '14px', fontStyle: 'bold', color: COLORS.danger,
        }).setOrigin(0.5);
        this.boardContainer.add([goAr, goJailLabel]);
        break;
    }
  },

  drawSpaceText: function(index, x, y, side) {
    var space = BOARD[index];
    var nameText, priceText;
    var isVertical = (side === 'left' || side === 'right');
    var maxW = isVertical ? this.spaceHeight - 6 : this.spaceWidth - 4;

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
      if (isVertical) nameText.setRotation(side === 'left' ? -Math.PI / 2 : Math.PI / 2);

      if (space.price) {
        var priceStyle = {
          fontFamily: '"Fredoka One", sans-serif',
          fontSize: '8px',
          color: COLORS.desertGold,
        };
        var pOff = (side === 'bottom') ? 22 : (side === 'top') ? -17 : 0;
        priceText = this.add.text(x, y + yOff + (isVertical ? 0 : pOff), space.price + '', priceStyle).setOrigin(0.5);
        if (isVertical) {
          priceText.setRotation(side === 'left' ? -Math.PI / 2 : Math.PI / 2);
          priceText.setPosition(x + (side === 'left' ? -15 : 15), y);
        }
        this.boardContainer.add(priceText);
      }
    } else if (space.type === 'chance') {
      nameText = this.add.text(x, y, '?', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '18px', color: COLORS.accent,
      }).setOrigin(0.5);
      if (isVertical) nameText.setRotation(side === 'left' ? -Math.PI / 2 : Math.PI / 2);
    } else if (space.type === 'community') {
      nameText = this.add.text(x, y, 'CC', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '12px', color: COLORS.warmSand, alpha: 0.7,
      }).setOrigin(0.5);
      if (isVertical) nameText.setRotation(side === 'left' ? -Math.PI / 2 : Math.PI / 2);
    } else if (space.type === 'tax') {
      nameText = this.add.text(x, y - 5, 'TAX', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '10px', color: COLORS.danger,
      }).setOrigin(0.5);
      var taxAmount = this.add.text(x, y + 10, space.amount + '', {
        fontFamily: '"Fredoka One", sans-serif', fontSize: '8px', color: COLORS.danger, alpha: 0.8,
      }).setOrigin(0.5);
      if (isVertical) {
        nameText.setRotation(side === 'left' ? -Math.PI / 2 : Math.PI / 2);
        taxAmount.setRotation(side === 'left' ? -Math.PI / 2 : Math.PI / 2);
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

    // Decorative border frame around center
    var frame = this.add.graphics();
    frame.lineStyle(1, 0xC8A951, 0.2);
    frame.strokeRect(cx - 140, cy - 100, 280, 220);
    frame.lineStyle(1, 0xC8A951, 0.1);
    frame.strokeRect(cx - 143, cy - 103, 286, 226);
    // Corner diamond ornaments
    var corners = [
      { x: cx - 140, y: cy - 100 },
      { x: cx + 140, y: cy - 100 },
      { x: cx - 140, y: cy + 120 },
      { x: cx + 140, y: cy + 120 }
    ];
    for (var ci = 0; ci < corners.length; ci++) {
      frame.fillStyle(0xC8A951, 0.25);
      frame.fillCircle(corners[ci].x, corners[ci].y, 3);
    }
    centerContainer.add(frame);

    // Game title - Arabic
    var title = this.add.text(cx, cy - 65, 'أبراج الرياض', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '30px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#060E1A',
      strokeThickness: 3,
    }).setOrigin(0.5);
    centerContainer.add(title);

    // Pulsing glow on title
    this.tweens.add({
      targets: title,
      alpha: { from: 0.8, to: 1 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // English subtitle
    var subtitle = this.add.text(cx, cy - 32, 'RIYADH TOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '14px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    centerContainer.add(subtitle);

    // Decorative gold line with diamonds
    var dline = this.add.graphics();
    dline.lineStyle(1, 0xC8A951, 0.5);
    dline.lineBetween(cx - 90, cy - 12, cx + 90, cy - 12);
    dline.fillStyle(0xC8A951, 0.5);
    dline.fillCircle(cx - 90, cy - 12, 2);
    dline.fillCircle(cx, cy - 12, 3);
    dline.fillCircle(cx + 90, cy - 12, 2);
    centerContainer.add(dline);

    // Card deck areas
    var chanceCard = this.add.graphics();
    chanceCard.fillStyle(0x2A1A44, 0.6);
    chanceCard.fillRoundedRect(cx - 105, cy + 2, 80, 45, 5);
    chanceCard.lineStyle(1, 0xE8B931, 0.4);
    chanceCard.strokeRoundedRect(cx - 105, cy + 2, 80, 45, 5);
    centerContainer.add(chanceCard);

    var chanceLabel = this.add.text(cx - 65, cy + 14, '?', {
      fontFamily: '"Fredoka One", sans-serif', fontSize: '16px', color: COLORS.accent,
    }).setOrigin(0.5);
    var chanceSub = this.add.text(cx - 65, cy + 34, 'Chance', {
      fontFamily: '"Fredoka One", sans-serif', fontSize: '8px', color: COLORS.accent, alpha: 0.6,
    }).setOrigin(0.5);
    centerContainer.add([chanceLabel, chanceSub]);

    var commCard = this.add.graphics();
    commCard.fillStyle(0x1A3744, 0.6);
    commCard.fillRoundedRect(cx + 25, cy + 2, 80, 45, 5);
    commCard.lineStyle(1, 0x87CEEB, 0.4);
    commCard.strokeRoundedRect(cx + 25, cy + 2, 80, 45, 5);
    centerContainer.add(commCard);

    var commLabel = this.add.text(cx + 65, cy + 14, 'CC', {
      fontFamily: '"Fredoka One", sans-serif', fontSize: '12px', color: COLORS.warmSand,
    }).setOrigin(0.5);
    var commSub = this.add.text(cx + 65, cy + 34, 'Community', {
      fontFamily: '"Fredoka One", sans-serif', fontSize: '8px', color: COLORS.warmSand, alpha: 0.6,
    }).setOrigin(0.5);
    centerContainer.add([commLabel, commSub]);

    // Enhanced skyline silhouette
    var skyline = this.add.graphics();
    var skyBase = cy + 105;

    // Ground line
    skyline.fillStyle(0x1A2744, 0.4);
    skyline.fillRect(cx - 120, skyBase, 240, 3);

    // Background buildings
    skyline.fillStyle(0x0F1E38, 0.6);
    var bgBuildings = [
      { x: -100, w: 14, h: 25 }, { x: -75, w: 12, h: 35 },
      { x: -55, w: 10, h: 20 }, { x: -35, w: 16, h: 30 },
      { x: 40, w: 12, h: 28 }, { x: 60, w: 14, h: 22 },
      { x: 80, w: 10, h: 32 }, { x: 100, w: 12, h: 18 }
    ];
    for (var bi = 0; bi < bgBuildings.length; bi++) {
      var bb = bgBuildings[bi];
      skyline.fillRect(cx + bb.x - bb.w / 2, skyBase - bb.h, bb.w, bb.h);
    }

    // Kingdom Tower (arch shape)
    skyline.fillStyle(0x1A2744, 0.7);
    skyline.fillRect(cx - 6, skyBase - 55, 12, 55);
    // Arch cutout effect (lighter fill)
    skyline.fillStyle(0x0B1A2D, 0.8);
    skyline.fillCircle(cx, skyBase - 50, 4);

    // Al Faisaliah (tapering tower)
    skyline.fillStyle(0x1A2744, 0.7);
    skyline.beginPath();
    skyline.moveTo(cx + 28, skyBase);
    skyline.lineTo(cx + 31, skyBase - 48);
    skyline.lineTo(cx + 35, skyBase - 48);
    skyline.lineTo(cx + 38, skyBase);
    skyline.closePath();
    skyline.fillPath();
    // Golden sphere
    skyline.fillStyle(0xC8A951, 0.3);
    skyline.fillCircle(cx + 33, skyBase - 40, 3);

    // Mosque dome with minarets
    skyline.fillStyle(0x1A2744, 0.6);
    // Dome
    skyline.beginPath();
    skyline.moveTo(cx - 30, skyBase - 15);
    skyline.lineTo(cx - 28, skyBase - 28);
    skyline.lineTo(cx - 22, skyBase - 33);
    skyline.lineTo(cx - 16, skyBase - 28);
    skyline.lineTo(cx - 14, skyBase - 15);
    skyline.closePath();
    skyline.fillPath();
    // Minarets
    skyline.fillRect(cx - 34, skyBase - 35, 3, 35);
    skyline.fillRect(cx - 13, skyBase - 35, 3, 35);
    // Crescent finials
    skyline.fillStyle(0xC8A951, 0.2);
    skyline.fillCircle(cx - 33, skyBase - 37, 2);
    skyline.fillCircle(cx - 11, skyBase - 37, 2);

    centerContainer.add(skyline);
  },

  // -------------------------------------------------------
  // Premium Player Token Sprites
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

      // Drop shadow
      var shadow = this.add.graphics();
      shadow.fillStyle(0x000000, 0.3);
      shadow.fillEllipse(1, 3, 26, 18);
      container.add(shadow);

      // Token body
      var circle = this.add.graphics();
      circle.fillStyle(player.color, 1);
      circle.fillCircle(0, 0, 14);
      // Top bevel highlight
      circle.fillStyle(0xFFFFFF, 0.15);
      circle.fillCircle(0, -3, 10);
      // Border
      circle.lineStyle(2, 0xFFFFFF, 0.7);
      circle.strokeCircle(0, 0, 14);
      container.add(circle);

      // Token emoji
      var emoji = this.add.text(0, 0, token ? token.emoji : '?', {
        fontSize: '16px',
      }).setOrigin(0.5);
      container.add(emoji);

      // Active glow ring (hidden by default)
      var glowRing = this.add.graphics();
      glowRing.lineStyle(3, player.color, 0.6);
      glowRing.strokeCircle(0, 0, 18);
      glowRing.setVisible(false);
      container.add(glowRing);

      this.tokenSprites.push({
        container: container,
        playerIndex: i,
        glowRing: glowRing,
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
        y: tPos.y + offset.y - 8,
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
  // Premium HUD
  // -------------------------------------------------------
  createHUD: function() {
    var startX = this.boardX + this.boardSize + 30;
    var w = GAME_WIDTH - startX - 20;
    var y = 20;

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

    // Action hints
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
    this.colorKeyHints = this.add.text(startX + w / 2, GAME_HEIGHT - 25, 'RED:Buy  GRN:Trade  YLW:Build  BLU:Mortgage', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '11px',
      color: COLORS.textSecondary,
      alpha: 0.35,
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

    // Panel shadow
    var panelShadow = this.add.graphics();
    panelShadow.fillStyle(0x000000, 0.2);
    panelShadow.fillRoundedRect(3, 3, w, h, 10);
    container.add(panelShadow);

    // Panel background - glass-morphism layers
    var bg = this.add.graphics();
    bg.fillStyle(0x0C1729, 0.95);
    bg.fillRoundedRect(0, 0, w, h, 10);
    bg.fillStyle(0x162340, 0.3);
    bg.fillRoundedRect(0, 0, w, h / 2, { tl: 10, tr: 10, bl: 0, br: 0 });
    container.add(bg);

    // Player color accent bar on left edge
    var accentBar = this.add.graphics();
    accentBar.fillStyle(player.color, 0.9);
    accentBar.fillRoundedRect(0, 4, 4, h - 8, 2);
    container.add(accentBar);

    // Border (player color)
    var border = this.add.graphics();
    border.lineStyle(1, player.color, 0.3);
    border.strokeRoundedRect(0, 0, w, h, 10);
    container.add(border);

    // Active glow (hidden by default)
    var glow = this.add.graphics();
    glow.lineStyle(2, player.color, 0.8);
    glow.strokeRoundedRect(-2, -2, w + 4, h + 4, 12);
    glow.fillStyle(player.color, 0.04);
    glow.fillRoundedRect(-2, -2, w + 4, h + 4, 12);
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

    // Money with icon
    var moneyText = this.add.text(50, 38, 'SAR ' + player.money, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.desertGold,
    });
    container.add(moneyText);

    // Properties count
    var propsText = this.add.text(15, 68, '0 properties', {
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

      panel.moneyText.setText('SAR ' + player.money);
      if (player.money < 0) {
        panel.moneyText.setColor(COLORS.danger);
      } else {
        panel.moneyText.setColor(COLORS.desertGold);
      }

      panel.propsText.setText(player.properties.length + ' properties');

      var worth = GameState.getPlayerNetWorth(player);
      panel.worthText.setText('Net: ' + worth + ' SAR');

      // Active player glow
      var isActive = (i === GameState.currentPlayerIndex && !player.bankrupt);
      panel.glow.setVisible(isActive);

      // Show glow ring on active player's token
      if (this.tokenSprites[i] && this.tokenSprites[i].glowRing) {
        this.tokenSprites[i].glowRing.setVisible(isActive);
      }

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
          dot.lineStyle(1, 0xFFFFFF, 0.3);
          dot.strokeCircle(dotX, 0, 5);
          panel.dotsContainer.add(dot);
          dotX -= 14;
        }
      }
    }
  },

  // -------------------------------------------------------
  // Premium Ownership Markers
  // -------------------------------------------------------
  updateBoardOwnership: function() {
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

        var marker = this.add.graphics();
        // Ownership ring instead of dot
        marker.lineStyle(2, player.color, 0.8);

        if (pos.side === 'bottom') {
          marker.strokeCircle(pos.x, pos.y + pos.h / 2 - 6, 4);
          marker.fillStyle(player.color, 0.4);
          marker.fillCircle(pos.x, pos.y + pos.h / 2 - 6, 3);
        } else if (pos.side === 'top') {
          marker.strokeCircle(pos.x, pos.y - pos.h / 2 + 6, 4);
          marker.fillStyle(player.color, 0.4);
          marker.fillCircle(pos.x, pos.y - pos.h / 2 + 6, 3);
        } else if (pos.side === 'left') {
          marker.strokeCircle(pos.x - pos.w / 2 + 6, pos.y, 4);
          marker.fillStyle(player.color, 0.4);
          marker.fillCircle(pos.x - pos.w / 2 + 6, pos.y, 3);
        } else if (pos.side === 'right') {
          marker.strokeCircle(pos.x + pos.w / 2 - 6, pos.y, 4);
          marker.fillStyle(player.color, 0.4);
          marker.fillCircle(pos.x + pos.w / 2 - 6, pos.y, 3);
        }

        // Hotel indicator - red with highlight
        if (pd.hotel) {
          marker.fillStyle(0xFF0000, 1);
          marker.fillRect(pos.x - 5, pos.y - (pos.side === 'bottom' ? pos.h / 2 + 2 : -pos.h / 2 - 8), 10, 6);
          marker.fillStyle(0xFFFFFF, 0.25);
          marker.fillRect(pos.x - 5, pos.y - (pos.side === 'bottom' ? pos.h / 2 + 2 : -pos.h / 2 - 8), 10, 2);
        } else if (pd.houses > 0) {
          // House indicators - green with highlight
          for (var k = 0; k < pd.houses; k++) {
            marker.fillStyle(0x00AA00, 1);
            var hx = pos.x - 10 + k * 7;
            var hy = pos.y - (pos.side === 'bottom' ? pos.h / 2 + 2 : -pos.h / 2 - 6);
            marker.fillRect(hx, hy, 5, 4);
            marker.fillStyle(0xFFFFFF, 0.2);
            marker.fillRect(hx, hy, 5, 1);
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

    this.turnInfoText.setText(player.name);
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
    this.actionHintText.setText('Press Enter to Roll');
    this.actionHintSubtext.setText('اضغط Enter لرمي النرد');

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

    InputManager.on('yellow', function() {
      self.showBuildMenu();
    });

    InputManager.on('blue', function() {
      self.showMortgageMenu();
    });
  },

  doRoll: function() {
    var self = this;
    var player = GameState.currentPlayer();
    var dice = GameState.rollDice();

    var cx = this.boardX + this.boardSize / 2;
    var cy = this.boardY + this.boardSize / 2 + 80;
    DiceManager.setPosition(cx, cy);

    DiceManager.roll(dice.d1, dice.d2, function(result) {
      if (result.isDoubles) {
        GameState.doublesCount++;
        if (GameState.doublesCount >= 3) {
          self.actionHintText.setText('Triple doubles! Go to Jail!');
          self.actionHintSubtext.setText('ثلاث مرات متتالية! اذهب للسجن');
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

      var oldPos = player.position;
      var moveResult = GameState.movePlayer(player, result.total);

      if (moveResult.passedGo) {
        player.money += 200;
        self.showMessage('مررت بإنطلق! +200 SAR', 'Passed GO! +200 SAR', COLORS.success);
        AudioManager.collect();
      }

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

    var active = GameState.getActivePlayers();
    if (active.length <= 1) {
      this.time.delayedCall(500, function() {
        self.scene.start('GameOverScene', { winner: active[0] });
      });
      return;
    }

    if (rolledDoubles && !GameState.currentPlayer().inJail) {
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

    this.actionHintText.setText('In Jail - Choose');
    this.actionHintSubtext.setText('في السجن - اختر خيار');

    var options = [];
    var optionLabels = [];

    options.push('roll');
    optionLabels.push('Roll for Doubles');

    if (player.money >= 50) {
      options.push('pay');
      optionLabels.push('Pay 50 SAR');
    }

    if (player.jailFreeCards > 0) {
      options.push('card');
      optionLabels.push('Use Jail Free Card');
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
            self.showMessage('لم تحصل على مزدوج', 'No doubles - still in jail', COLORS.danger);
            DiceManager.hide();
            self.time.delayedCall(1200, function() { self.endTurn(false); });
          }
        });
      } else if (choice === 'pay') {
        GameState.payJailFine(player);
        self.showMessage('دفعت 50 ريال - خرجت!', 'Paid 50 SAR - Free!', COLORS.success);
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
  // Premium Property Card Overlay
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

    var container = this.add.container(x + w, y);
    this.actionContainer.add(container);

    // Shadow backdrop
    var cardShadow = this.add.graphics();
    cardShadow.fillStyle(0x000000, 0.4);
    cardShadow.fillRoundedRect(5, 5, w, h, 16);
    container.add(cardShadow);

    // Card background
    var bg = this.add.graphics();
    bg.fillStyle(0x0C1729, 0.98);
    bg.fillRoundedRect(0, 0, w, h, 16);
    // Upper highlight
    bg.fillStyle(0x162340, 0.3);
    bg.fillRoundedRect(0, 0, w, h / 3, { tl: 16, tr: 16, bl: 0, br: 0 });
    container.add(bg);

    // Color bar header with gradient feel
    if (space.colorInt) {
      var bar = this.add.graphics();
      bar.fillStyle(space.colorInt, 1);
      bar.fillRoundedRect(0, 0, w, 50, { tl: 16, tr: 16, bl: 0, br: 0 });
      // Highlight on top of color bar
      bar.fillStyle(0xFFFFFF, 0.15);
      bar.fillRoundedRect(0, 0, w, 15, { tl: 16, tr: 16, bl: 0, br: 0 });
      container.add(bar);
    }

    // Border
    var border = this.add.graphics();
    border.lineStyle(2, space.colorInt || 0xC8A951, 0.7);
    border.strokeRoundedRect(0, 0, w, h, 16);
    container.add(border);

    // Subtle shine effect
    var shine = this.add.graphics();
    shine.fillStyle(0xFFFFFF, 0.02);
    shine.fillRoundedRect(10, 10, w - 20, h / 4, 10);
    container.add(shine);

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
      var district = this.add.text(w / 2, 138, space.district, {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '14px',
        color: COLORS.textSecondary,
        alpha: 0.7,
      }).setOrigin(0.5);
      container.add(district);
    }

    // Price
    var priceText = this.add.text(w / 2, 170, space.price + ' SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '28px',
      color: COLORS.desertGold,
    }).setOrigin(0.5);
    container.add(priceText);

    // Divider line
    var divider = this.add.graphics();
    divider.lineStyle(1, 0xC8A951, 0.2);
    divider.lineBetween(30, 195, w - 30, 195);
    container.add(divider);

    // Rent table
    if (space.rent) {
      var rentY = 210;
      var rentLabels = ['Base Rent', '1 House', '2 Houses', '3 Houses', '4 Houses', 'Hotel'];
      for (var i = 0; i < space.rent.length; i++) {
        // Alternating row backgrounds
        if (i % 2 === 0) {
          var rowBg = this.add.graphics();
          rowBg.fillStyle(0xFFFFFF, 0.02);
          rowBg.fillRect(20, rentY + i * 24 - 2, w - 40, 22);
          container.add(rowBg);
        }

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

      // Divider before house cost
      var div2 = this.add.graphics();
      div2.lineStyle(1, 0xC8A951, 0.15);
      div2.lineBetween(30, rentY + 150, w - 30, rentY + 150);
      container.add(div2);

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
    if (canBuy) {
      buyBg.fillStyle(0x006C35, 1);
      buyBg.fillRoundedRect(20, buyBtnY, w / 2 - 30, 44, 8);
      buyBg.fillStyle(0xFFFFFF, 0.08);
      buyBg.fillRoundedRect(20, buyBtnY, w / 2 - 30, 20, { tl: 8, tr: 8, bl: 0, br: 0 });
    } else {
      buyBg.fillStyle(0x333333, 1);
      buyBg.fillRoundedRect(20, buyBtnY, w / 2 - 30, 44, 8);
    }
    container.add(buyBg);

    var buyLabel = this.add.text(20 + (w / 2 - 30) / 2, buyBtnY + 22, 'Buy', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: canBuy ? '#FFFFFF' : '#666666',
    }).setOrigin(0.5);
    container.add(buyLabel);

    // Pass button
    var passBg = this.add.graphics();
    passBg.fillStyle(0x2A3F6B, 1);
    passBg.fillRoundedRect(w / 2 + 10, buyBtnY, w / 2 - 30, 44, 8);
    passBg.fillStyle(0xFFFFFF, 0.05);
    passBg.fillRoundedRect(w / 2 + 10, buyBtnY, w / 2 - 30, 20, { tl: 8, tr: 8, bl: 0, br: 0 });
    container.add(passBg);

    var passLabel = this.add.text(w / 2 + 10 + (w / 2 - 30) / 2, buyBtnY + 22, 'Pass', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(passLabel);

    // Focus indicators
    var focusIdx = canBuy ? 0 : 1;
    var buyGlow = this.add.graphics();
    buyGlow.lineStyle(2, 0xFFD700, 1);
    buyGlow.strokeRoundedRect(18, buyBtnY - 2, w / 2 - 26, 48, 10);
    container.add(buyGlow);

    var passGlow = this.add.graphics();
    passGlow.lineStyle(2, 0xFFD700, 1);
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
  // Premium Card Reveal Overlay
  // -------------------------------------------------------
  showCardReveal: function(card, type, callback) {
    var self = this;
    this.clearAction();

    var w = 440;
    var h = 280;
    var x = (GAME_WIDTH - w) / 2;
    var y = (GAME_HEIGHT - h) / 2;

    var container = this.add.container(x, y);
    container.setScale(0.3);
    container.setAlpha(0);
    this.actionContainer.add(container);

    var isChance = (type === 'chance');
    var bgColor = isChance ? 0x2A1A44 : 0x1A3744;
    var borderColor = isChance ? 0xE8B931 : 0x87CEEB;

    // Card shadow
    var cardShadow = this.add.graphics();
    cardShadow.fillStyle(0x000000, 0.3);
    cardShadow.fillRoundedRect(4, 4, w, h, 16);
    container.add(cardShadow);

    // Card background
    var bg = this.add.graphics();
    bg.fillStyle(bgColor, 0.98);
    bg.fillRoundedRect(0, 0, w, h, 16);
    // Top highlight
    bg.fillStyle(0xFFFFFF, 0.03);
    bg.fillRoundedRect(0, 0, w, h / 3, { tl: 16, tr: 16, bl: 0, br: 0 });
    container.add(bg);

    // Decorative border
    var border = this.add.graphics();
    border.lineStyle(2, borderColor, 0.8);
    border.strokeRoundedRect(0, 0, w, h, 16);
    // Inner decorative border
    border.lineStyle(1, borderColor, 0.2);
    border.strokeRoundedRect(8, 8, w - 16, h - 16, 12);
    container.add(border);

    // Type header
    var headerText = isChance ? 'Chance' : 'Community Chest';
    var header = this.add.text(w / 2, 30, headerText, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: isChance ? COLORS.accent : COLORS.warmSand,
    }).setOrigin(0.5);
    container.add(header);

    // Decorative line under header
    var hLine = this.add.graphics();
    hLine.lineStyle(1, borderColor, 0.3);
    hLine.lineBetween(40, 50, w - 40, 50);
    container.add(hLine);

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
    var ok = this.add.text(w / 2, h - 30, 'Press Enter', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: isChance ? COLORS.accent : '#87CEEB',
    }).setOrigin(0.5);
    container.add(ok);

    // Flip-in animation
    this.tweens.add({
      targets: container,
      scaleX: 1,
      scaleY: 1,
      alpha: 1,
      duration: 350,
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
  // Premium Simple Menu
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
    container.setAlpha(0);
    this.actionContainer.add(container);

    // Shadow
    var menuShadow = this.add.graphics();
    menuShadow.fillStyle(0x000000, 0.3);
    menuShadow.fillRoundedRect(4, 4, w, h, 12);
    container.add(menuShadow);

    // Background
    var bg = this.add.graphics();
    bg.fillStyle(0x0C1729, 0.98);
    bg.fillRoundedRect(0, 0, w, h, 12);
    bg.fillStyle(0x162340, 0.2);
    bg.fillRoundedRect(0, 0, w, 30, { tl: 12, tr: 12, bl: 0, br: 0 });
    bg.lineStyle(2, 0xC8A951, 0.4);
    bg.strokeRoundedRect(0, 0, w, h, 12);
    container.add(bg);

    var items = [];
    var focusIdx = 0;

    for (var i = 0; i < labels.length; i++) {
      var itemBg = this.add.graphics();
      itemBg.fillStyle(0x1E3355, 0);
      itemBg.fillRoundedRect(10, 20 + i * itemH, w - 20, itemH - 4, 6);
      container.add(itemBg);

      var itemText = this.add.text(w / 2, 20 + i * itemH + itemH / 2 - 2, labels[i], {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '17px',
        color: COLORS.warmSand,
      }).setOrigin(0.5);
      container.add(itemText);

      var itemGlow = this.add.graphics();
      itemGlow.fillStyle(0xC8A951, 0.08);
      itemGlow.fillRoundedRect(10, 20 + i * itemH, w - 20, itemH - 4, 6);
      itemGlow.lineStyle(2, 0xFFD700, 0.8);
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

    // Fade in
    this.tweens.add({
      targets: container,
      alpha: 1,
      duration: 200,
      ease: 'Quad.easeOut',
    });

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
      if (callback) callback(labels.length - 1);
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

    this.tokenSprites[player.index].container.setVisible(false);

    this.updateHUD();
    this.updateBoardOwnership();

    this.time.delayedCall(2000, function() {
      self.endTurn(false);
    });
  },

  // -------------------------------------------------------
  // Premium Message Display
  // -------------------------------------------------------
  showMessage: function(textAr, textEn, color) {
    this.messageContainer.removeAll(true);
    color = color || COLORS.warmSand;

    var w = 500;
    var h = 80;
    var x = this.boardX + this.boardSize / 2 - w / 2;
    var y = -h; // start above screen

    var msgContainer = this.add.container(x, y);
    this.messageContainer.add(msgContainer);

    // Shadow
    var shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.3);
    shadow.fillRoundedRect(3, 3, w, h, 10);
    msgContainer.add(shadow);

    // Background with gradient feel
    var bg = this.add.graphics();
    bg.fillStyle(0x060E1A, 0.95);
    bg.fillRoundedRect(0, 0, w, h, 10);
    bg.fillStyle(0x0F1B2E, 0.4);
    bg.fillRoundedRect(0, 0, w, h / 2, { tl: 10, tr: 10, bl: 0, br: 0 });
    // Color accent line on left
    bg.fillStyle(hexToInt(color), 0.8);
    bg.fillRoundedRect(0, 5, 4, h - 10, 2);
    bg.lineStyle(2, hexToInt(color), 0.5);
    bg.strokeRoundedRect(0, 0, w, h, 10);
    msgContainer.add(bg);

    var msgAr = this.add.text(w / 2, 22, textAr, {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: color,
    }).setOrigin(0.5);
    msgContainer.add(msgAr);

    var msgEn = this.add.text(w / 2, 52, textEn, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    msgContainer.add(msgEn);

    // Slide in from top
    var self = this;
    this.tweens.add({
      targets: msgContainer,
      y: 10,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // Auto-hide with slide out
    this.time.delayedCall(2500, function() {
      self.tweens.add({
        targets: msgContainer,
        y: -h - 10,
        duration: 250,
        ease: 'Quad.easeIn',
        onComplete: function() {
          self.messageContainer.removeAll(true);
        }
      });
    });
  },

  clearAction: function() {
    this.actionContainer.removeAll(true);
  },
});
