// ============================================================
// Riyadh Tycoon — Monopoly Rules Engine
// ============================================================

var GameState = {
  players: [],
  currentPlayerIndex: 0,
  board: BOARD,
  chanceDeck: [],
  communityDeck: [],
  houses: 32,
  hotels: 12,
  freeParking: 0,
  doublesCount: 0,
  lastDice: [0, 0],
  turnPhase: 'roll', // roll, action, endturn
  gameOver: false,
  winner: null,
  properties: [], // ownership data: { owner: playerIndex, houses: 0, hotel: false, mortgaged: false }

  init: function(playerNames, tokenIds) {
    this.players = [];
    for (var i = 0; i < playerNames.length; i++) {
      this.players.push({
        index: i,
        name: playerNames[i],
        token: tokenIds[i],
        position: 0,
        money: 1500,
        properties: [],
        inJail: false,
        jailTurns: 0,
        jailFreeCards: 0,
        bankrupt: false,
        color: PLAYER_COLORS[i],
        colorStr: PLAYER_COLOR_NAMES[i],
      });
    }
    this.currentPlayerIndex = 0;
    this.chanceDeck = shuffleArray(CHANCE_CARDS.slice());
    this.communityDeck = shuffleArray(COMMUNITY_CARDS.slice());
    this.houses = 32;
    this.hotels = 12;
    this.freeParking = 0;
    this.doublesCount = 0;
    this.gameOver = false;
    this.winner = null;
    this.turnPhase = 'roll';

    // Initialize property ownership
    this.properties = [];
    for (var j = 0; j < BOARD.length; j++) {
      this.properties.push({
        owner: -1,
        houses: 0,
        hotel: false,
        mortgaged: false,
      });
    }
  },

  currentPlayer: function() {
    return this.players[this.currentPlayerIndex];
  },

  rollDice: function() {
    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    this.lastDice = [d1, d2];
    return { d1: d1, d2: d2, total: d1 + d2, isDoubles: d1 === d2 };
  },

  movePlayer: function(player, spaces) {
    var oldPos = player.position;
    var newPos = (player.position + spaces) % 40;
    // Check if passed GO
    var passedGo = false;
    if (newPos < oldPos && spaces > 0) {
      passedGo = true;
    }
    player.position = newPos;
    return { oldPos: oldPos, newPos: newPos, passedGo: passedGo };
  },

  movePlayerTo: function(player, target, collectGo) {
    var oldPos = player.position;
    var passedGo = false;
    if (target <= oldPos && target !== oldPos) {
      passedGo = true;
    }
    player.position = target;
    if (passedGo && collectGo !== false) {
      player.money += 200;
    }
    return { oldPos: oldPos, newPos: target, passedGo: passedGo && collectGo !== false };
  },

  // Check what happens when landing on a space
  getLandingAction: function(player) {
    var space = BOARD[player.position];
    var propData = this.properties[player.position];

    switch (space.type) {
      case 'go':
        return { type: 'go', message: 'إنطلق! Collect 200 SAR' };

      case 'property':
        if (propData.owner === -1) {
          return { type: 'unowned', spaceIndex: player.position, space: space };
        } else if (propData.owner === player.index) {
          return { type: 'own', message: 'You own this property' };
        } else if (propData.mortgaged) {
          return { type: 'mortgaged', message: 'Property is mortgaged' };
        } else {
          var rent = this.calculateRent(player.position);
          return { type: 'payrent', owner: propData.owner, rent: rent, space: space };
        }

      case 'station':
        if (propData.owner === -1) {
          return { type: 'unowned', spaceIndex: player.position, space: space };
        } else if (propData.owner === player.index) {
          return { type: 'own', message: 'You own this station' };
        } else if (propData.mortgaged) {
          return { type: 'mortgaged', message: 'Station is mortgaged' };
        } else {
          var sRent = this.calculateStationRent(propData.owner);
          return { type: 'payrent', owner: propData.owner, rent: sRent, space: space };
        }

      case 'utility':
        if (propData.owner === -1) {
          return { type: 'unowned', spaceIndex: player.position, space: space };
        } else if (propData.owner === player.index) {
          return { type: 'own', message: 'You own this utility' };
        } else if (propData.mortgaged) {
          return { type: 'mortgaged', message: 'Utility is mortgaged' };
        } else {
          var uRent = this.calculateUtilityRent(propData.owner);
          return { type: 'payrent', owner: propData.owner, rent: uRent, space: space };
        }

      case 'tax':
        this.freeParking += space.amount;
        return { type: 'tax', amount: space.amount, space: space };

      case 'chance':
        return { type: 'chance' };

      case 'community':
        return { type: 'community' };

      case 'jail':
        return { type: 'visiting', message: 'Just visiting' };

      case 'gotojail':
        return { type: 'gotojail' };

      case 'free':
        var amount = this.freeParking;
        this.freeParking = 0;
        return { type: 'freeparking', amount: amount };

      default:
        return { type: 'nothing' };
    }
  },

  calculateRent: function(spaceIndex) {
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];

    if (propData.hotel) {
      return space.rent[5];
    }
    if (propData.houses > 0) {
      return space.rent[propData.houses];
    }

    // Base rent, doubled if owner has full set
    var baseRent = space.rent[0];
    if (this.ownsFullGroup(propData.owner, space.group)) {
      baseRent *= 2;
    }
    return baseRent;
  },

  calculateStationRent: function(ownerIndex) {
    var count = 0;
    for (var i = 0; i < BOARD.length; i++) {
      if (BOARD[i].type === 'station' && this.properties[i].owner === ownerIndex && !this.properties[i].mortgaged) {
        count++;
      }
    }
    return 25 * Math.pow(2, count - 1);
  },

  calculateUtilityRent: function(ownerIndex) {
    var count = 0;
    for (var i = 0; i < BOARD.length; i++) {
      if (BOARD[i].type === 'utility' && this.properties[i].owner === ownerIndex && !this.properties[i].mortgaged) {
        count++;
      }
    }
    var diceTotal = this.lastDice[0] + this.lastDice[1];
    return count === 1 ? 4 * diceTotal : 10 * diceTotal;
  },

  ownsFullGroup: function(playerIndex, group) {
    if (group === undefined) return false;
    var groupSpaces = PROPERTY_GROUPS[group];
    if (!groupSpaces) return false;
    for (var i = 0; i < groupSpaces.length; i++) {
      if (this.properties[groupSpaces[i]].owner !== playerIndex) return false;
    }
    return true;
  },

  buyProperty: function(playerIndex, spaceIndex) {
    var space = BOARD[spaceIndex];
    var player = this.players[playerIndex];
    if (player.money < space.price) return false;
    player.money -= space.price;
    this.properties[spaceIndex].owner = playerIndex;
    player.properties.push(spaceIndex);
    return true;
  },

  canBuildHouse: function(playerIndex, spaceIndex) {
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];
    if (space.type !== 'property') return false;
    if (propData.owner !== playerIndex) return false;
    if (propData.mortgaged) return false;
    if (propData.hotel) return false;
    if (!this.ownsFullGroup(playerIndex, space.group)) return false;
    if (this.houses <= 0 && propData.houses < 4) return false;
    if (this.hotels <= 0 && propData.houses === 4) return false;
    if (this.players[playerIndex].money < space.house) return false;

    // Check even building rule
    var groupSpaces = PROPERTY_GROUPS[space.group];
    var minHouses = 999;
    for (var i = 0; i < groupSpaces.length; i++) {
      var gp = this.properties[groupSpaces[i]];
      var h = gp.hotel ? 5 : gp.houses;
      if (h < minHouses) minHouses = h;
    }
    var myHouses = propData.houses;
    return myHouses <= minHouses;
  },

  buildHouse: function(playerIndex, spaceIndex) {
    if (!this.canBuildHouse(playerIndex, spaceIndex)) return false;
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];
    var player = this.players[playerIndex];

    player.money -= space.house;
    if (propData.houses === 4) {
      propData.houses = 0;
      propData.hotel = true;
      this.houses += 4;
      this.hotels--;
    } else {
      propData.houses++;
      this.houses--;
    }
    return true;
  },

  canSellHouse: function(playerIndex, spaceIndex) {
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];
    if (space.type !== 'property') return false;
    if (propData.owner !== playerIndex) return false;
    if (propData.houses === 0 && !propData.hotel) return false;

    // Check even building rule for selling
    var groupSpaces = PROPERTY_GROUPS[space.group];
    var maxHouses = 0;
    for (var i = 0; i < groupSpaces.length; i++) {
      var gp = this.properties[groupSpaces[i]];
      var h = gp.hotel ? 5 : gp.houses;
      if (h > maxHouses) maxHouses = h;
    }
    var myHouses = propData.hotel ? 5 : propData.houses;
    return myHouses >= maxHouses;
  },

  sellHouse: function(playerIndex, spaceIndex) {
    if (!this.canSellHouse(playerIndex, spaceIndex)) return false;
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];
    var player = this.players[playerIndex];

    player.money += Math.floor(space.house / 2);
    if (propData.hotel) {
      propData.hotel = false;
      propData.houses = 4;
      this.hotels++;
      this.houses -= 4;
    } else {
      propData.houses--;
      this.houses++;
    }
    return true;
  },

  mortgageProperty: function(playerIndex, spaceIndex) {
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];
    if (propData.owner !== playerIndex) return false;
    if (propData.mortgaged) return false;
    if (propData.houses > 0 || propData.hotel) return false;

    propData.mortgaged = true;
    this.players[playerIndex].money += Math.floor(space.price / 2);
    return true;
  },

  unmortgageProperty: function(playerIndex, spaceIndex) {
    var space = BOARD[spaceIndex];
    var propData = this.properties[spaceIndex];
    if (propData.owner !== playerIndex) return false;
    if (!propData.mortgaged) return false;

    var cost = Math.floor(space.price * 0.55);
    if (this.players[playerIndex].money < cost) return false;

    propData.mortgaged = false;
    this.players[playerIndex].money -= cost;
    return true;
  },

  sendToJail: function(player) {
    player.position = 10; // Jail space
    player.inJail = true;
    player.jailTurns = 0;
  },

  tryJailRoll: function(player, dice) {
    player.jailTurns++;
    if (dice.isDoubles) {
      player.inJail = false;
      player.jailTurns = 0;
      return true;
    }
    if (player.jailTurns >= 3) {
      player.money -= 50;
      player.inJail = false;
      player.jailTurns = 0;
      return true;
    }
    return false;
  },

  payJailFine: function(player) {
    if (player.money >= 50) {
      player.money -= 50;
      player.inJail = false;
      player.jailTurns = 0;
      return true;
    }
    return false;
  },

  useJailFreeCard: function(player) {
    if (player.jailFreeCards > 0) {
      player.jailFreeCards--;
      player.inJail = false;
      player.jailTurns = 0;
      return true;
    }
    return false;
  },

  drawChance: function() {
    if (this.chanceDeck.length === 0) {
      this.chanceDeck = shuffleArray(CHANCE_CARDS.slice());
    }
    return this.chanceDeck.pop();
  },

  drawCommunity: function() {
    if (this.communityDeck.length === 0) {
      this.communityDeck = shuffleArray(COMMUNITY_CARDS.slice());
    }
    return this.communityDeck.pop();
  },

  applyCardEffect: function(player, card) {
    var effect = card.effect;
    var result = { type: effect.type };

    switch (effect.type) {
      case 'collect':
        player.money += effect.amount;
        result.amount = effect.amount;
        break;

      case 'pay':
        player.money -= effect.amount;
        result.amount = effect.amount;
        break;

      case 'move':
        result.moveResult = this.movePlayerTo(player, effect.to, effect.collectGo);
        result.to = effect.to;
        break;

      case 'jail':
        this.sendToJail(player);
        break;

      case 'jailfree':
        player.jailFreeCards++;
        break;

      case 'back':
        var newPos = (player.position - effect.spaces + 40) % 40;
        player.position = newPos;
        result.newPos = newPos;
        break;

      case 'maintenance':
        var total = 0;
        for (var i = 0; i < player.properties.length; i++) {
          var pd = this.properties[player.properties[i]];
          if (pd.hotel) total += effect.perHotel;
          else total += pd.houses * effect.perHouse;
        }
        player.money -= total;
        result.amount = total;
        break;

      case 'collectFromAll':
        var collected = 0;
        for (var j = 0; j < this.players.length; j++) {
          if (j !== player.index && !this.players[j].bankrupt) {
            this.players[j].money -= effect.amount;
            collected += effect.amount;
          }
        }
        player.money += collected;
        result.amount = collected;
        break;
    }

    return result;
  },

  getPlayerNetWorth: function(player) {
    var worth = player.money;
    for (var i = 0; i < player.properties.length; i++) {
      var si = player.properties[i];
      var space = BOARD[si];
      var pd = this.properties[si];
      if (pd.mortgaged) {
        worth += Math.floor(space.price / 2);
      } else {
        worth += space.price;
      }
      if (pd.hotel) {
        worth += space.house * 5;
      } else {
        worth += pd.houses * space.house;
      }
    }
    return worth;
  },

  checkBankruptcy: function(player) {
    if (player.money < 0) {
      // Try to raise money
      var netWorth = this.getPlayerNetWorth(player);
      if (netWorth < 0 || player.money < -5000) {
        return true; // bankrupt
      }
    }
    return false;
  },

  bankruptPlayer: function(playerIndex, creditorIndex) {
    var player = this.players[playerIndex];
    player.bankrupt = true;

    if (creditorIndex >= 0) {
      // Transfer properties to creditor
      for (var i = 0; i < player.properties.length; i++) {
        var si = player.properties[i];
        this.properties[si].owner = creditorIndex;
        this.players[creditorIndex].properties.push(si);
      }
      this.players[creditorIndex].money += Math.max(0, player.money);
    } else {
      // Return to bank - auction (simplified: just return to bank)
      for (var j = 0; j < player.properties.length; j++) {
        var sj = player.properties[j];
        this.properties[sj].owner = -1;
        this.properties[sj].houses = 0;
        this.properties[sj].hotel = false;
        this.properties[sj].mortgaged = false;
      }
    }
    player.properties = [];
    player.money = 0;
    player.jailFreeCards = 0;
  },

  nextTurn: function() {
    var activePlayers = this.getActivePlayers();
    if (activePlayers.length <= 1) {
      this.gameOver = true;
      this.winner = activePlayers[0];
      return;
    }

    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    } while (this.players[this.currentPlayerIndex].bankrupt);

    this.doublesCount = 0;
    this.turnPhase = 'roll';
  },

  getActivePlayers: function() {
    var active = [];
    for (var i = 0; i < this.players.length; i++) {
      if (!this.players[i].bankrupt) active.push(this.players[i]);
    }
    return active;
  },

  getPlayerBuildableProperties: function(playerIndex) {
    var result = [];
    var player = this.players[playerIndex];
    for (var i = 0; i < player.properties.length; i++) {
      var si = player.properties[i];
      if (this.canBuildHouse(playerIndex, si)) {
        result.push(si);
      }
    }
    return result;
  },

  getPlayerMortgageable: function(playerIndex) {
    var result = [];
    var player = this.players[playerIndex];
    for (var i = 0; i < player.properties.length; i++) {
      var si = player.properties[i];
      var pd = this.properties[si];
      if (!pd.mortgaged && pd.houses === 0 && !pd.hotel) {
        result.push(si);
      }
    }
    return result;
  },

  getPlayerUnmortgageable: function(playerIndex) {
    var result = [];
    var player = this.players[playerIndex];
    for (var i = 0; i < player.properties.length; i++) {
      var si = player.properties[i];
      if (this.properties[si].mortgaged) {
        result.push(si);
      }
    }
    return result;
  }
};
