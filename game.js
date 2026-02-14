// ============================================================
// RiyadhTowers — Configuration & Game Data
// ============================================================

var GAME_WIDTH = 1920;
var GAME_HEIGHT = 1080;

// Premium color palette
var COLORS = {
  saudiGreen:    '#006C35',
  desertGold:    '#C8A951',
  deepNavy:      '#060E1A',
  warmSand:      '#F5E6C8',
  cardBg:        '#0F1B2E',
  cardBgLight:   '#162340',
  cardBorder:    '#1E3355',
  panelBg:       '#0C1729',
  textPrimary:   '#F5E6C8',
  textSecondary: '#7B93B8',
  accent:        '#E8B931',
  accentLight:   '#F5D060',
  danger:        '#E74C3C',
  success:       '#27AE60',
  player1:       '#E74C3C',
  player2:       '#3498DB',
  player3:       '#F39C12',
  player4:       '#9B59B6',
  gold1:         '#FFD700',
  gold2:         '#C8A951',
  gold3:         '#8B7332',
  boardFelt:     '#0B1A2D',
  boardBorder:   '#8B7332',
  shadow:        '#040810',
};

var COLORS_INT = {
  saudiGreen:    0x006C35,
  desertGold:    0xC8A951,
  deepNavy:      0x060E1A,
  warmSand:      0xF5E6C8,
  cardBg:        0x0F1B2E,
  cardBgLight:   0x162340,
  cardBorder:    0x1E3355,
  panelBg:       0x0C1729,
  textPrimary:   0xF5E6C8,
  textSecondary: 0x7B93B8,
  accent:        0xE8B931,
  accentLight:   0xF5D060,
  danger:        0xE74C3C,
  success:       0x27AE60,
  player1:       0xE74C3C,
  player2:       0x3498DB,
  player3:       0xF39C12,
  player4:       0x9B59B6,
  gold1:         0xFFD700,
  gold2:         0xC8A951,
  gold3:         0x8B7332,
  boardFelt:     0x0B1A2D,
  boardBorder:   0x8B7332,
  shadow:        0x040810,
};

var PLAYER_COLORS = [0xE74C3C, 0x3498DB, 0xF39C12, 0x9B59B6];
var PLAYER_COLOR_NAMES = ['#E74C3C', '#3498DB', '#F39C12', '#9B59B6'];

var TOKENS = [
  { id: 'dallah',  nameAr: 'دلة',    nameEn: 'Dallah',     emoji: '☕', description: 'Arabic coffee pot' },
  { id: 'falcon',  nameAr: 'صقر',    nameEn: 'Falcon',     emoji: '🦅', description: 'Saudi falcon' },
  { id: 'palm',    nameAr: 'نخلة',   nameEn: 'Palm Tree',  emoji: '🌴', description: 'Date palm' },
  { id: 'car',     nameAr: 'سيارة',  nameEn: 'Car',        emoji: '🚗', description: 'Luxury car' },
];

var BOARD = [
  // CORNER - GO
  { type: 'go', name: 'إنطلق!', nameEn: 'GO', description: 'Collect 200 SAR' },

  // BROWN
  { type: 'property', name: 'المنفوحة', nameEn: 'Manfuhah', color: '#8B4513', colorInt: 0x8B4513, price: 60, rent: [2,10,30,90,160,250], house: 50, district: 'South', group: 0 },
  { type: 'community', name: 'صندوق المجتمع', nameEn: 'Community Chest' },
  { type: 'property', name: 'البطحاء', nameEn: 'Al Batha', color: '#8B4513', colorInt: 0x8B4513, price: 60, rent: [4,20,60,180,320,450], house: 50, district: 'Central', group: 0 },
  { type: 'tax', name: 'ضريبة القيمة المضافة', nameEn: 'VAT Tax', amount: 200 },

  // STATION 1
  { type: 'station', name: 'محطة مترو العليا', nameEn: 'Olaya Metro', price: 200 },

  // LIGHT BLUE
  { type: 'property', name: 'الملز', nameEn: 'Al Malaz', color: '#87CEEB', colorInt: 0x87CEEB, price: 100, rent: [6,30,90,270,400,550], house: 50, district: 'Central', group: 1 },
  { type: 'chance', name: 'فرصة', nameEn: 'Chance' },
  { type: 'property', name: 'السويدي', nameEn: 'Al Suwaidi', color: '#87CEEB', colorInt: 0x87CEEB, price: 100, rent: [6,30,90,270,400,550], house: 50, district: 'West', group: 1 },
  { type: 'property', name: 'النسيم', nameEn: 'Al Naseem', color: '#87CEEB', colorInt: 0x87CEEB, price: 120, rent: [8,40,100,300,450,600], house: 50, district: 'East', group: 1 },

  // CORNER - JAIL
  { type: 'jail', name: 'السجن', nameEn: 'Jail', description: 'Just Visiting' },

  // PINK
  { type: 'property', name: 'الياسمين', nameEn: 'Al Yasmin', color: '#FF69B4', colorInt: 0xFF69B4, price: 140, rent: [10,50,150,450,625,750], house: 100, district: 'North', group: 2 },
  { type: 'utility', name: 'شركة المياه الوطنية', nameEn: 'NWC Water', price: 150 },
  { type: 'property', name: 'الصحافة', nameEn: 'Al Sahafa', color: '#FF69B4', colorInt: 0xFF69B4, price: 140, rent: [10,50,150,450,625,750], house: 100, district: 'North', group: 2 },
  { type: 'property', name: 'النرجس', nameEn: 'Al Narjis', color: '#FF69B4', colorInt: 0xFF69B4, price: 160, rent: [12,60,180,500,700,900], house: 100, district: 'North', group: 2 },

  // STATION 2
  { type: 'station', name: 'محطة مترو قصر الحكم', nameEn: 'Qasr Al Hokm Metro', price: 200 },

  // ORANGE
  { type: 'property', name: 'الربوة', nameEn: 'Al Rabwah', color: '#FFA500', colorInt: 0xFFA500, price: 180, rent: [14,70,200,550,750,950], house: 100, district: 'Central', group: 3 },
  { type: 'community', name: 'صندوق المجتمع', nameEn: 'Community Chest' },
  { type: 'property', name: 'الورود', nameEn: 'Al Wurud', color: '#FFA500', colorInt: 0xFFA500, price: 180, rent: [14,70,200,550,750,950], house: 100, district: 'Central', group: 3 },
  { type: 'property', name: 'السليمانية', nameEn: 'Al Sulaimaniyah', color: '#FFA500', colorInt: 0xFFA500, price: 200, rent: [16,80,220,600,800,1000], house: 100, district: 'Central', group: 3 },

  // CORNER - FREE PARKING
  { type: 'free', name: 'استراحة حرة', nameEn: 'Free Parking' },

  // RED
  { type: 'property', name: 'الحمراء', nameEn: 'Al Hamra', color: '#FF0000', colorInt: 0xFF0000, price: 220, rent: [18,90,250,700,875,1050], house: 150, district: 'Central', group: 4 },
  { type: 'chance', name: 'فرصة', nameEn: 'Chance' },
  { type: 'property', name: 'حطين', nameEn: 'Hittin', color: '#FF0000', colorInt: 0xFF0000, price: 220, rent: [18,90,250,700,875,1050], house: 150, district: 'North', group: 4 },
  { type: 'property', name: 'الملقا', nameEn: 'Al Malqa', color: '#FF0000', colorInt: 0xFF0000, price: 240, rent: [20,100,300,750,925,1100], house: 150, district: 'North', group: 4 },

  // STATION 3
  { type: 'station', name: 'محطة مترو المطار', nameEn: 'Airport Metro', price: 200 },

  // YELLOW
  { type: 'property', name: 'العرقة', nameEn: 'Irqah', color: '#FFD700', colorInt: 0xFFD700, price: 260, rent: [22,110,330,800,975,1150], house: 150, district: 'West', group: 5 },
  { type: 'property', name: 'الحي الدبلوماسي', nameEn: 'Diplomatic Quarter', color: '#FFD700', colorInt: 0xFFD700, price: 260, rent: [22,110,330,800,975,1150], house: 150, district: 'West', group: 5 },
  { type: 'utility', name: 'شركة الكهرباء', nameEn: 'SEC Electricity', price: 150 },
  { type: 'property', name: 'غرناطة', nameEn: 'Granada', color: '#FFD700', colorInt: 0xFFD700, price: 280, rent: [24,120,360,850,1025,1200], house: 150, district: 'East', group: 5 },

  // CORNER - GO TO JAIL
  { type: 'gotojail', name: 'إذهب للسجن', nameEn: 'Go To Jail' },

  // GREEN
  { type: 'property', name: 'شارع التحلية', nameEn: 'Tahlia Street', color: '#00AA00', colorInt: 0x00AA00, price: 300, rent: [26,130,390,900,1100,1275], house: 200, district: 'Central', group: 6 },
  { type: 'property', name: 'شارع العليا', nameEn: 'Olaya Street', color: '#00AA00', colorInt: 0x00AA00, price: 300, rent: [26,130,390,900,1100,1275], house: 200, district: 'Central', group: 6 },
  { type: 'community', name: 'صندوق المجتمع', nameEn: 'Community Chest' },
  { type: 'property', name: 'طريق الملك فهد', nameEn: 'King Fahd Road', color: '#00AA00', colorInt: 0x00AA00, price: 320, rent: [28,150,450,1000,1200,1400], house: 200, district: 'Central', group: 6 },

  // STATION 4
  { type: 'station', name: 'محطة مترو الدرعية', nameEn: 'Diriyah Metro', price: 200 },

  // CHANCE
  { type: 'chance', name: 'فرصة', nameEn: 'Chance' },

  // DARK BLUE
  { type: 'property', name: 'برج المملكة', nameEn: 'Kingdom Tower', color: '#000080', colorInt: 0x000080, price: 350, rent: [35,175,500,1100,1300,1500], house: 200, district: 'Al Olaya', group: 7, landmark: true },
  { type: 'tax', name: 'ضريبة الفخامة', nameEn: 'Luxury Tax', amount: 100 },
  { type: 'property', name: 'برج الفيصلية', nameEn: 'Al Faisaliah Tower', color: '#000080', colorInt: 0x000080, price: 400, rent: [50,200,600,1400,1700,2000], house: 200, district: 'Al Olaya', group: 7, landmark: true },
];

// Property groups: which board indices belong to each color group
var PROPERTY_GROUPS = {};
(function() {
  for (var i = 0; i < BOARD.length; i++) {
    var space = BOARD[i];
    if (space.type === 'property' && space.group !== undefined) {
      if (!PROPERTY_GROUPS[space.group]) PROPERTY_GROUPS[space.group] = [];
      PROPERTY_GROUPS[space.group].push(i);
    }
  }
})();

var CHANCE_CARDS = [
  { text: 'فزت بسباق الهجن في مهرجان الملك عبدالعزيز! اجمع 150 ريال', textEn: 'You won the camel race at King Abdulaziz Festival! Collect 150 SAR', effect: { type: 'collect', amount: 150 } },
  { text: 'تقدم إلى برج المملكة', textEn: 'Advance to Kingdom Tower', effect: { type: 'move', to: 37 } },
  { text: 'تقدم إلى إنطلق واجمع 200 ريال', textEn: 'Advance to GO, collect 200 SAR', effect: { type: 'move', to: 0, collectGo: true } },
  { text: 'ساهمت في تطوير حديقة الملك سلمان. ادفع 50 ريال', textEn: 'Contribute to King Salman Park development. Pay 50 SAR', effect: { type: 'pay', amount: 50 } },
  { text: 'مخالفة ساهر! ادفع 15 ريال', textEn: 'Saher speed camera fine! Pay 15 SAR', effect: { type: 'pay', amount: 15 } },
  { text: 'اذهب للسجن مباشرة. لا تمر على إنطلق', textEn: 'Go directly to Jail. Do not pass GO', effect: { type: 'jail' } },
  { text: 'استثمارك في موسم الرياض نجح! اجمع 100 ريال', textEn: 'Your Riyadh Season investment paid off! Collect 100 SAR', effect: { type: 'collect', amount: 100 } },
  { text: 'صيانة عقاراتك: ادفع 25 ريال لكل منزل و100 لكل فندق', textEn: 'Property maintenance: Pay 25 SAR per house, 100 per hotel', effect: { type: 'maintenance', perHouse: 25, perHotel: 100 } },
  { text: 'تقدم إلى شارع التحلية', textEn: 'Advance to Tahlia Street', effect: { type: 'move', to: 31 } },
  { text: 'بطاقة خروج من السجن - احتفظ بها', textEn: 'Get Out of Jail Free card — keep it', effect: { type: 'jailfree' } },
  { text: 'تأخرت بسبب زحمة طريق الملك فهد. ارجع 3 خطوات', textEn: 'Stuck in King Fahd Road traffic. Go back 3 spaces', effect: { type: 'back', spaces: 3 } },
  { text: 'كافأك ولي العهد على مشروعك. اجمع 200 ريال', textEn: 'Crown Prince rewards your Vision 2030 project. Collect 200 SAR', effect: { type: 'collect', amount: 200 } },
];

var COMMUNITY_CARDS = [
  { text: 'خطأ مصرفي لصالحك. اجمع 200 ريال', textEn: 'Bank error in your favor. Collect 200 SAR', effect: { type: 'collect', amount: 200 } },
  { text: 'فاتورة المستشفى. ادفع 100 ريال', textEn: 'Hospital bill. Pay 100 SAR', effect: { type: 'pay', amount: 100 } },
  { text: 'فزت بمسابقة الخط العربي! اجمع 50 ريال', textEn: 'You won the Arabic calligraphy competition! Collect 50 SAR', effect: { type: 'collect', amount: 50 } },
  { text: 'استرداد ضريبي. اجمع 20 ريال', textEn: 'Tax refund. Collect 20 SAR', effect: { type: 'collect', amount: 20 } },
  { text: 'عيد ميلادك! اجمع 10 ريال من كل لاعب', textEn: "It's your birthday! Collect 10 SAR from each player", effect: { type: 'collectFromAll', amount: 10 } },
  { text: 'تقدم إلى إنطلق', textEn: 'Advance to GO', effect: { type: 'move', to: 0, collectGo: true } },
  { text: 'حصلت على تعويض تأمين. اجمع 100 ريال', textEn: 'Insurance payout. Collect 100 SAR', effect: { type: 'collect', amount: 100 } },
  { text: 'ادفع رسوم المدرسة. ادفع 50 ريال', textEn: 'School fees due. Pay 50 SAR', effect: { type: 'pay', amount: 50 } },
  { text: 'بعت تمور المزرعة! اجمع 45 ريال', textEn: 'Sold dates from your farm! Collect 45 SAR', effect: { type: 'collect', amount: 45 } },
  { text: 'اذهب للسجن مباشرة', textEn: 'Go directly to Jail', effect: { type: 'jail' } },
];

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function hexToInt(hex) {
  if (typeof hex === 'number') return hex;
  return parseInt(hex.replace('#', ''), 16);
}

function lightenColor(color, factor) {
  var r = (color >> 16) & 0xFF;
  var g = (color >> 8) & 0xFF;
  var b = color & 0xFF;
  r = Math.min(255, Math.floor(r + (255 - r) * factor));
  g = Math.min(255, Math.floor(g + (255 - g) * factor));
  b = Math.min(255, Math.floor(b + (255 - b) * factor));
  return (r << 16) | (g << 8) | b;
}

function darkenColor(color, factor) {
  var r = (color >> 16) & 0xFF;
  var g = (color >> 8) & 0xFF;
  var b = color & 0xFF;
  r = Math.floor(r * (1 - factor));
  g = Math.floor(g * (1 - factor));
  b = Math.floor(b * (1 - factor));
  return (r << 16) | (g << 8) | b;
}

function blendColors(c1, c2, t) {
  var r1 = (c1 >> 16) & 0xFF, g1 = (c1 >> 8) & 0xFF, b1 = c1 & 0xFF;
  var r2 = (c2 >> 16) & 0xFF, g2 = (c2 >> 8) & 0xFF, b2 = c2 & 0xFF;
  var r = Math.floor(r1 + (r2 - r1) * t);
  var g = Math.floor(g1 + (g2 - g1) * t);
  var b = Math.floor(b1 + (b2 - b1) * t);
  return (r << 16) | (g << 8) | b;
}
// ============================================================
// Riyadh Tycoon — Audio System (Web Audio API Synthesis)
// ============================================================

var AudioManager = {
  ctx: null,
  enabled: true,
  masterVolume: 0.3,
  _initAttempted: false,

  init: function() {
    // Lazy init: defer AudioContext creation to first user interaction
    // Tizen TV blocks audio context until user gesture anyway
    this._initAttempted = true;
  },

  _ensureContext: function() {
    if (this.ctx) return;
    if (!this._initAttempted) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  },

  resume: function() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playTone: function(frequency, duration, type, volume) {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;
    this.resume();
    type = type || 'sine';
    volume = (volume !== undefined ? volume : 1) * this.masterVolume;
    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  },

  // Schedule a tone at a specific time offset using Web Audio timing (no setTimeout)
  playToneAt: function(frequency, duration, type, volume, delaySeconds) {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;
    this.resume();
    type = type || 'sine';
    volume = (volume !== undefined ? volume : 1) * this.masterVolume;
    var startTime = this.ctx.currentTime + (delaySeconds || 0);
    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  },

  playNotes: function(notes, interval) {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;
    this.resume();
    var intervalSec = (interval || 120) / 1000;
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      this.playToneAt(n.freq, n.dur || 0.2, n.type || 'sine', n.vol || 0.5, i * intervalSec);
    }
  },

  // Sound effects — all use Web Audio scheduling (no setTimeout leaks)
  diceRoll: function() {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;
    this.resume();
    for (var i = 0; i < 6; i++) {
      this.playToneAt(200 + Math.random() * 400, 0.05, 'square', 0.3, i * 0.04);
    }
  },

  tokenMove: function() {
    this.playTone(600, 0.08, 'sine', 0.4);
  },

  tokenLand: function() {
    this.playToneAt(400, 0.15, 'sine', 0.5, 0);
    this.playToneAt(500, 0.1, 'sine', 0.3, 0.05);
  },

  buyProperty: function() {
    this.playNotes([
      { freq: 523, dur: 0.1 },
      { freq: 659, dur: 0.1 },
      { freq: 784, dur: 0.2 },
    ], 80);
  },

  payRent: function() {
    this.playNotes([
      { freq: 400, dur: 0.15, type: 'triangle' },
      { freq: 350, dur: 0.15, type: 'triangle' },
      { freq: 300, dur: 0.2, type: 'triangle' },
    ], 100);
  },

  goToJail: function() {
    this.playNotes([
      { freq: 300, dur: 0.2, type: 'square', vol: 0.4 },
      { freq: 200, dur: 0.3, type: 'square', vol: 0.4 },
      { freq: 150, dur: 0.5, type: 'sawtooth', vol: 0.3 },
    ], 200);
  },

  cardDraw: function() {
    this.playNotes([
      { freq: 800, dur: 0.05 },
      { freq: 1000, dur: 0.08 },
    ], 60);
  },

  doubles: function() {
    this.playNotes([
      { freq: 523, dur: 0.1 },
      { freq: 659, dur: 0.1 },
      { freq: 784, dur: 0.1 },
      { freq: 1047, dur: 0.25 },
    ], 100);
  },

  bankruptcy: function() {
    this.playNotes([
      { freq: 400, dur: 0.3, type: 'sawtooth', vol: 0.3 },
      { freq: 350, dur: 0.3, type: 'sawtooth', vol: 0.3 },
      { freq: 300, dur: 0.3, type: 'sawtooth', vol: 0.3 },
      { freq: 200, dur: 0.6, type: 'sawtooth', vol: 0.2 },
    ], 250);
  },

  win: function() {
    this.playNotes([
      { freq: 523, dur: 0.15 },
      { freq: 659, dur: 0.15 },
      { freq: 784, dur: 0.15 },
      { freq: 1047, dur: 0.15 },
      { freq: 784, dur: 0.1 },
      { freq: 1047, dur: 0.4 },
    ], 120);
  },

  menuSelect: function() {
    this.playTone(700, 0.06, 'sine', 0.3);
  },

  menuConfirm: function() {
    this.playToneAt(800, 0.08, 'sine', 0.4, 0);
    this.playToneAt(1000, 0.1, 'sine', 0.3, 0.06);
  },

  navigate: function() {
    this.playTone(500, 0.04, 'sine', 0.2);
  },

  collect: function() {
    this.playNotes([
      { freq: 600, dur: 0.08 },
      { freq: 800, dur: 0.08 },
      { freq: 1000, dur: 0.15 },
    ], 70);
  },

  error: function() {
    this.playTone(200, 0.3, 'square', 0.3);
  },

  buildHouse: function() {
    this.playNotes([
      { freq: 400, dur: 0.08, type: 'triangle' },
      { freq: 500, dur: 0.08, type: 'triangle' },
      { freq: 600, dur: 0.15, type: 'triangle' },
    ], 80);
  }
};
// ============================================================
// Riyadh Tycoon — TV Remote Input Manager
// ============================================================

var InputManager = {
  scene: null,
  callbacks: {},
  enabled: true,

  // Samsung TV remote key codes
  KEYS: {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    BACK: 27,
    BACK_TIZEN: 10009,
    RED: 403,
    GREEN: 404,
    YELLOW: 405,
    BLUE: 406,
  },

  init: function(scene) {
    this.scene = scene;
    this.callbacks = {};

    // Register Tizen TV keys if available
    if (typeof tizen !== 'undefined' && tizen.tvinputdevice) {
      try {
        tizen.tvinputdevice.registerKey('ColorF0Red');
        tizen.tvinputdevice.registerKey('ColorF1Green');
        tizen.tvinputdevice.registerKey('ColorF2Yellow');
        tizen.tvinputdevice.registerKey('ColorF3Blue');
      } catch (e) {}
    }
  },

  on: function(action, callback) {
    if (!this.callbacks[action]) this.callbacks[action] = [];
    this.callbacks[action].push(callback);
  },

  off: function(action) {
    delete this.callbacks[action];
  },

  clear: function() {
    this.callbacks = {};
  },

  fire: function(action) {
    if (!this.enabled) return;
    var cbs = this.callbacks[action];
    if (cbs) {
      for (var i = 0; i < cbs.length; i++) {
        cbs[i]();
      }
    }
  },

  setupKeyboard: function(scene) {
    var self = this;
    scene.input.keyboard.on('keydown', function(event) {
      if (!self.enabled) return;
      switch (event.keyCode) {
        case self.KEYS.UP:    self.fire('up'); break;
        case self.KEYS.DOWN:  self.fire('down'); break;
        case self.KEYS.LEFT:  self.fire('left'); break;
        case self.KEYS.RIGHT: self.fire('right'); break;
        case self.KEYS.ENTER: self.fire('enter'); break;
        case self.KEYS.BACK:
        case self.KEYS.BACK_TIZEN:
          self.fire('back'); break;
        case self.KEYS.RED:    self.fire('red'); break;
        case self.KEYS.GREEN:  self.fire('green'); break;
        case self.KEYS.YELLOW: self.fire('yellow'); break;
        case self.KEYS.BLUE:   self.fire('blue'); break;
      }
    });
  }
};

// Simple focus navigation system for menus
var FocusManager = {
  items: [],
  currentIndex: 0,
  scene: null,
  orientation: 'vertical', // or 'horizontal' or 'grid'
  columns: 1,
  onSelect: null,
  onFocusChange: null,

  init: function(scene, items, orientation, columns) {
    this.scene = scene;
    this.items = items || [];
    this.currentIndex = 0;
    this.orientation = orientation || 'vertical';
    this.columns = columns || 1;
    this.onSelect = null;
    this.onFocusChange = null;

    if (this.items.length > 0) {
      this.updateFocus();
    }
  },

  setupInput: function() {
    var self = this;
    InputManager.on('up', function() { self.navigate(-1, 'v'); });
    InputManager.on('down', function() { self.navigate(1, 'v'); });
    InputManager.on('left', function() { self.navigate(-1, 'h'); });
    InputManager.on('right', function() { self.navigate(1, 'h'); });
    InputManager.on('enter', function() { self.select(); });
  },

  navigate: function(dir, axis) {
    var prev = this.currentIndex;
    if (this.orientation === 'vertical' && axis === 'v') {
      this.currentIndex = (this.currentIndex + dir + this.items.length) % this.items.length;
    } else if (this.orientation === 'horizontal' && axis === 'h') {
      this.currentIndex = (this.currentIndex + dir + this.items.length) % this.items.length;
    } else if (this.orientation === 'grid') {
      if (axis === 'h') {
        this.currentIndex = (this.currentIndex + dir + this.items.length) % this.items.length;
      } else {
        var newIdx = this.currentIndex + dir * this.columns;
        if (newIdx >= 0 && newIdx < this.items.length) {
          this.currentIndex = newIdx;
        }
      }
    }
    if (prev !== this.currentIndex) {
      AudioManager.navigate();
      this.updateFocus();
    }
  },

  select: function() {
    AudioManager.menuConfirm();
    if (this.onSelect) {
      this.onSelect(this.currentIndex, this.items[this.currentIndex]);
    }
  },

  updateFocus: function() {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.setFocused) {
        item.setFocused(i === this.currentIndex);
      } else if (item.gameObject) {
        if (i === this.currentIndex) {
          item.gameObject.setAlpha(1);
          if (item.gameObject.setScale) item.gameObject.setScale(1.05);
        } else {
          item.gameObject.setAlpha(0.6);
          if (item.gameObject.setScale) item.gameObject.setScale(1.0);
        }
      }
    }
    if (this.onFocusChange) {
      this.onFocusChange(this.currentIndex, this.items[this.currentIndex]);
    }
  },

  setIndex: function(idx) {
    if (idx >= 0 && idx < this.items.length) {
      this.currentIndex = idx;
      this.updateFocus();
    }
  }
};
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
// ============================================================
// Riyadh Tycoon — Premium 3D Dice Animation System
// ============================================================

var DiceManager = (function() {

  // --- Constants ---
  var DIE_SIZE = 80;
  var DIE_HALF = DIE_SIZE / 2;
  var DIE_RADIUS = 12;
  var DOT_RADIUS = 7;
  var DOT_HIGHLIGHT_RADIUS = 3;
  var DOT_SHADOW_OFFSET = 1.5;
  var DIE_SPACING = 50;
  var SHADOW_OFFSET_Y = 8;

  // Colors
  var COL_BODY = 0xFCF5E5;
  var COL_BORDER = 0xC8A951;
  var COL_HIGHLIGHT = 0xFFFDF5;
  var COL_BEVEL_DARK = 0xD8CDB0;
  var COL_DOT = 0x1A2744;
  var COL_DOT_HIGHLIGHT = 0x3A4F6E;
  var COL_DOT_SHADOW = 0x0C1422;
  var COL_SHADOW = 0x040810;
  var COL_GLOW_DOUBLES = 0xE8B931;
  var COL_TOTAL_BG = 0x0F1B2E;
  var COL_TOTAL_BORDER = 0xC8A951;

  // Roll animation
  var ROLL_FRAMES = 8;
  var ROLL_INTERVAL = 80;
  var RESULT_HOLD_MS = 900;

  // --- Cached dot position lookup (value -> [{x,y}]) ---
  var DOT_POSITIONS_CACHE = null;

  function buildDotPositions() {
    if (DOT_POSITIONS_CACHE) return DOT_POSITIONS_CACHE;
    var off = DIE_SIZE * 0.25;
    var cx = 0;
    var cy = 0;
    DOT_POSITIONS_CACHE = {
      1: [{ x: cx, y: cy }],
      2: [{ x: cx - off, y: cy - off }, { x: cx + off, y: cy + off }],
      3: [{ x: cx - off, y: cy - off }, { x: cx, y: cy }, { x: cx + off, y: cy + off }],
      4: [
        { x: cx - off, y: cy - off }, { x: cx + off, y: cy - off },
        { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }
      ],
      5: [
        { x: cx - off, y: cy - off }, { x: cx + off, y: cy - off },
        { x: cx, y: cy },
        { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }
      ],
      6: [
        { x: cx - off, y: cy - off }, { x: cx + off, y: cy - off },
        { x: cx - off, y: cy },       { x: cx + off, y: cy },
        { x: cx - off, y: cy + off }, { x: cx + off, y: cy + off }
      ]
    };
    return DOT_POSITIONS_CACHE;
  }

  // --- Die factory ---
  function createDie(scene, x, y) {
    var dieContainer = scene.add.container(x, y);

    // 1) Drop shadow (dark ellipse underneath)
    var shadow = scene.add.graphics();
    shadow.fillStyle(COL_SHADOW, 0.35);
    shadow.fillEllipse(0, DIE_HALF + SHADOW_OFFSET_Y, DIE_SIZE * 0.85, 14);
    dieContainer.add(shadow);

    // 2) Main body
    var body = scene.add.graphics();
    body.fillStyle(COL_BODY, 1);
    body.fillRoundedRect(-DIE_HALF, -DIE_HALF, DIE_SIZE, DIE_SIZE, DIE_RADIUS);
    dieContainer.add(body);

    // 3) Gold border
    var border = scene.add.graphics();
    border.lineStyle(2.5, COL_BORDER, 1);
    border.strokeRoundedRect(-DIE_HALF, -DIE_HALF, DIE_SIZE, DIE_SIZE, DIE_RADIUS);
    dieContainer.add(border);

    // 4) Top bevel highlight — lighter stripe near top edge
    var bevelTop = scene.add.graphics();
    bevelTop.fillStyle(COL_HIGHLIGHT, 0.55);
    bevelTop.fillRoundedRect(
      -DIE_HALF + 4, -DIE_HALF + 2,
      DIE_SIZE - 8, 10,
      { tl: DIE_RADIUS - 2, tr: DIE_RADIUS - 2, bl: 0, br: 0 }
    );
    dieContainer.add(bevelTop);

    // 5) Bottom bevel shadow — darker stripe near bottom edge
    var bevelBottom = scene.add.graphics();
    bevelBottom.fillStyle(COL_BEVEL_DARK, 0.5);
    bevelBottom.fillRoundedRect(
      -DIE_HALF + 4, DIE_HALF - 12,
      DIE_SIZE - 8, 10,
      { tl: 0, tr: 0, bl: DIE_RADIUS - 2, br: DIE_RADIUS - 2 }
    );
    dieContainer.add(bevelBottom);

    // 6) Dots container (redrawn per face value)
    var dotsContainer = scene.add.container(0, 0);
    dieContainer.add(dotsContainer);

    // 7) Glow graphic (hidden by default, shown on doubles)
    var glow = scene.add.graphics();
    glow.fillStyle(COL_GLOW_DOUBLES, 0.25);
    glow.fillRoundedRect(
      -DIE_HALF - 4, -DIE_HALF - 4,
      DIE_SIZE + 8, DIE_SIZE + 8,
      DIE_RADIUS + 2
    );
    glow.setAlpha(0);
    dieContainer.add(glow);

    return {
      container: dieContainer,
      shadow: shadow,
      body: body,
      border: border,
      dotsContainer: dotsContainer,
      glow: glow
    };
  }

  // --- Pre-rendered dot textures for each face value (1-6) ---
  var DOT_TEXTURES_BUILT = false;

  function buildDotTextures(scene) {
    if (DOT_TEXTURES_BUILT) return;
    DOT_TEXTURES_BUILT = true;

    var positions = buildDotPositions();
    for (var val = 1; val <= 6; val++) {
      var texKey = '_diceDots' + val;
      var g = scene.add.graphics();
      var dots = positions[val];

      for (var i = 0; i < dots.length; i++) {
        var px = dots[i].x + DIE_HALF;
        var py = dots[i].y + DIE_HALF;
        g.fillStyle(COL_DOT_SHADOW, 0.5);
        g.fillCircle(px + DOT_SHADOW_OFFSET, py + DOT_SHADOW_OFFSET, DOT_RADIUS);
        g.fillStyle(COL_DOT, 1);
        g.fillCircle(px, py, DOT_RADIUS);
        g.fillStyle(COL_DOT_HIGHLIGHT, 0.7);
        g.fillCircle(px - 2, py - 2, DOT_HIGHLIGHT_RADIUS);
      }

      g.generateTexture(texKey, DIE_SIZE, DIE_SIZE);
      g.destroy();
    }
  }

  // --- Draw dots using pre-rendered textures (no graphics.clear() per frame) ---
  function drawDots(scene, die, value) {
    var texKey = '_diceDots' + value;

    if (!die.dotsImage) {
      die.dotsImage = scene.add.image(0, 0, texKey);
      die.dotsContainer.add(die.dotsImage);
    } else {
      die.dotsImage.setTexture(texKey);
    }
  }

  // --- The public manager object ---
  var manager = {
    scene: null,
    container: null,
    die1: null,
    die2: null,
    rolling: false,
    result: null,
    onComplete: null,
    totalText: null,
    totalBg: null,
    totalContainer: null,

    // Pre-generate dot textures during preloader (avoid stall in BoardScene)
    preload: function(scene) {
      buildDotPositions();
      buildDotTextures(scene);
    },

    create: function(scene, x, y) {
      this.scene = scene;
      buildDotPositions();
      buildDotTextures(scene);

      this.container = scene.add.container(x, y);
      this.container.setDepth(100);

      // Create two dice, spaced apart
      this.die1 = createDie(scene, -DIE_SPACING, 0);
      this.die2 = createDie(scene, DIE_SPACING, 0);
      this.container.add([this.die1.container, this.die2.container]);

      // Total indicator container (positioned below dice)
      this.totalContainer = scene.add.container(0, DIE_HALF + 32);

      // Total background pill
      this.totalBg = scene.add.graphics();
      this.totalBg.fillStyle(COL_TOTAL_BG, 0.9);
      this.totalBg.fillRoundedRect(-28, -14, 56, 28, 14);
      this.totalBg.lineStyle(1.5, COL_TOTAL_BORDER, 0.8);
      this.totalBg.strokeRoundedRect(-28, -14, 56, 28, 14);
      this.totalContainer.add(this.totalBg);

      // Total text
      this.totalText = scene.add.text(0, 0, '', {
        fontFamily: '"Fredoka One", sans-serif',
        fontSize: '20px',
        color: '#F5E6C8',
        stroke: '#0A1628',
        strokeThickness: 2
      }).setOrigin(0.5);
      this.totalContainer.add(this.totalText);

      this.totalContainer.setAlpha(0);
      this.totalContainer.setScale(0.5);
      this.container.add(this.totalContainer);

      // Start hidden
      this.container.setVisible(false);
      this.container.setAlpha(0);
      this.container.setScale(0.5);
    },

    roll: function(d1, d2, callback) {
      if (this.rolling) return;
      this.rolling = true;
      this.onComplete = callback;
      this.result = { d1: d1, d2: d2, total: d1 + d2, isDoubles: d1 === d2 };

      var self = this;
      var scene = this.scene;

      // Reset glow
      this.die1.glow.setAlpha(0);
      this.die2.glow.setAlpha(0);

      // Hide total indicator
      this.totalContainer.setAlpha(0);
      this.totalContainer.setScale(0.5);

      // Show container with scale+alpha entrance
      this.container.setVisible(true);
      this.container.setScale(0.5);
      this.container.setAlpha(0);

      scene.tweens.add({
        targets: this.container,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Back.easeOut'
      });

      // Play sound
      AudioManager.diceRoll();

      // Rolling animation using setInterval
      var frames = 0;

      var rollTimer = scene.time.addEvent({
        delay: ROLL_INTERVAL,
        repeat: ROLL_FRAMES - 1,
        callback: function() {
          var rv1 = Math.floor(Math.random() * 6) + 1;
          var rv2 = Math.floor(Math.random() * 6) + 1;
          drawDots(scene, self.die1, rv1);
          drawDots(scene, self.die2, rv2);

          // Dramatic rotation wobble (decreasing intensity)
          var progress = frames / ROLL_FRAMES;
          var intensity = (1 - progress) * 0.5;
          self.die1.container.setRotation((Math.random() - 0.5) * intensity);
          self.die2.container.setRotation((Math.random() - 0.5) * intensity);

          // Scale pulse during roll
          var pulse = 1 + Math.sin(frames * 1.2) * 0.08 * (1 - progress);
          self.die1.container.setScale(pulse);
          self.die2.container.setScale(pulse);

          frames++;
          if (frames >= ROLL_FRAMES) {
            self.showResult();
          }
        }
      });
    },

    showResult: function() {
      var self = this;
      var scene = this.scene;

      // Draw final face values
      drawDots(scene, this.die1, this.result.d1);
      drawDots(scene, this.die2, this.result.d2);

      // Reset rotation
      this.die1.container.setRotation(0);
      this.die2.container.setRotation(0);

      // Satisfying bounce scale effect on each die
      scene.tweens.add({
        targets: this.die1.container,
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 120,
        ease: 'Quad.easeOut',
        yoyo: true,
        onComplete: function() {
          self.die1.container.setScale(1);
        }
      });

      scene.tweens.add({
        targets: this.die2.container,
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 120,
        delay: 40,
        ease: 'Quad.easeOut',
        yoyo: true,
        onComplete: function() {
          self.die2.container.setScale(1);
        }
      });

      // Doubles: glow effect + sound
      if (this.result.isDoubles) {
        AudioManager.doubles();

        // Fade in glow on both dice
        scene.tweens.add({
          targets: this.die1.glow,
          alpha: 1,
          duration: 300,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: 1,
          hold: 200
        });
        scene.tweens.add({
          targets: this.die2.glow,
          alpha: 1,
          duration: 300,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: 1,
          hold: 200
        });
      }

      // Show total indicator below dice
      this.totalText.setText('' + this.result.total);
      scene.tweens.add({
        targets: this.totalContainer,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 250,
        delay: 180,
        ease: 'Back.easeOut'
      });

      // Hold for a moment then callback
      scene.time.delayedCall(RESULT_HOLD_MS, function() {
        self.rolling = false;
        if (self.onComplete) {
          self.onComplete(self.result);
        }
      });
    },

    hide: function() {
      if (!this.container) return;

      var self = this;
      var scene = this.scene;

      // Smooth hide with scale+alpha
      scene.tweens.add({
        targets: this.container,
        alpha: 0,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 200,
        ease: 'Quad.easeIn',
        onComplete: function() {
          self.container.setVisible(false);
          // Reset glow and total for next roll
          self.die1.glow.setAlpha(0);
          self.die2.glow.setAlpha(0);
          self.totalContainer.setAlpha(0);
          self.totalContainer.setScale(0.5);
        }
      });
    },

    setPosition: function(x, y) {
      if (this.container) {
        this.container.setPosition(x, y);
      }
    }
  };

  return manager;
})();
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

    // ── Dismiss CSS loading screen ──────────────────────────────
    var ls = document.getElementById('loading-screen');
    if (ls) {
      ls.classList.add('fade-out');
      setTimeout(function() { if (ls.parentNode) ls.parentNode.removeChild(ls); }, 400);
    }

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

    // ── Pre-generate all tile textures used by later scenes ────
    // This avoids stalls when those scenes first create()
    this.preGenerateTextures();

    // Give GPU 100ms to flush texture uploads before transitioning
    self.time.delayedCall(100, function() {
      self.cameras.main.fadeOut(80, 6, 14, 26);
      self.time.delayedCall(80, function() {
        self.scene.start('MenuScene');
      });
    });
  },

  preGenerateTextures: function() {
    var size = 160;
    var cx = size / 2;
    var cy = size / 2;
    var PI2 = Math.PI * 2;

    // Board pattern tile (cross pattern for BoardScene)
    if (!this.textures.exists('_boardPatternTile')) {
      var r = size * 0.25;
      var tg1 = this.add.graphics();
      tg1.lineStyle(1, 0xC8A951, 1);
      tg1.lineBetween(cx - r, cy, cx + r, cy);
      tg1.lineBetween(cx, cy - r, cx, cy + r);
      tg1.lineBetween(cx - r * 0.7, cy - r * 0.7, cx + r * 0.7, cy + r * 0.7);
      tg1.lineBetween(cx + r * 0.7, cy - r * 0.7, cx - r * 0.7, cy + r * 0.7);
      tg1.generateTexture('_boardPatternTile', size, size);
      tg1.destroy();
    }

    // Setup scene pattern tile (8-pointed star)
    if (!this.textures.exists('_setupPatternTile')) {
      var r2 = size * 0.35;
      var tg2 = this.add.graphics();
      tg2.lineStyle(1, 0xC8A951, 1);
      for (var i = 0; i < 8; i++) {
        var a1 = (i / 8) * PI2;
        var a2 = ((i + 3) / 8) * PI2;
        tg2.lineBetween(cx + Math.cos(a1) * r2, cy + Math.sin(a1) * r2,
                         cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2);
      }
      tg2.generateTexture('_setupPatternTile', size, size);
      tg2.destroy();
    }

    // GameOver pattern tile (smaller 8-pointed star)
    if (!this.textures.exists('_goPatternTile')) {
      var r3 = size * 0.28;
      var tg3 = this.add.graphics();
      tg3.lineStyle(1, 0xC8A951, 1);
      for (var j = 0; j < 8; j++) {
        var a1b = (j / 8) * PI2;
        var a2b = ((j + 3) / 8) * PI2;
        tg3.lineBetween(cx + Math.cos(a1b) * r3, cy + Math.sin(a1b) * r3,
                         cx + Math.cos(a2b) * r3, cy + Math.sin(a2b) * r3);
      }
      tg3.generateTexture('_goPatternTile', size, size);
      tg3.destroy();
    }

    // Pre-generate dice dot textures (avoids stall on first dice roll)
    DiceManager.preload(this);

    // Pre-generate MenuScene static background (avoids heavy draw in MenuScene.create)
    this.preGenerateMenuBackground();
  },

  preGenerateMenuBackground: function() {
    if (this.textures.exists('_menuBg')) return;

    var w = GAME_WIDTH;
    var h = GAME_HEIGHT;
    var g = this.add.graphics();
    var i;

    // Sky gradient (6 slices)
    var slices = 6;
    var sliceH = h / slices;
    var topColor = 0x060E1A;
    var midColor = 0x0F1E35;
    var horizonColor = 0x2A1F10;
    for (i = 0; i < slices; i++) {
      var t = i / (slices - 1);
      var c;
      if (t < 0.6) {
        c = blendColors(topColor, midColor, t / 0.6);
      } else {
        c = blendColors(midColor, horizonColor, (t - 0.6) / 0.4);
      }
      g.fillStyle(c, 1);
      g.fillRect(0, Math.floor(i * sliceH), w, Math.ceil(sliceH) + 1);
    }

    // Horizon glow
    g.fillStyle(0xC8A951, 0.08);
    g.fillRect(0, h - 320, w, 320);

    // Static stars (25)
    for (i = 0; i < 25; i++) {
      var sx = Math.random() * w;
      var sy = Math.random() * (h * 0.55);
      var size = 0.5 + Math.random() * 1.5;
      var alpha = 0.15 + Math.random() * 0.4;
      g.fillStyle(0xFFFFFF, alpha);
      g.fillCircle(sx, sy, size);
    }

    // Moon
    var moonX = w * 0.82;
    var moonY = h * 0.15;
    g.fillStyle(0xFFF8E0, 0.05);
    g.fillCircle(moonX, moonY, 90);
    g.fillStyle(0xFFF8E0, 0.95);
    g.fillCircle(moonX, moonY, 36);
    g.fillStyle(0x060E1A, 1);
    g.fillCircle(moonX - 36 * 0.55, moonY - 36 * 0.1, 36 * 0.85);

    // Back skyline
    var baseY = h - 240;
    g.fillStyle(0x0D1B30, 0.7);
    var backBuildings = [
      { x: 0, bw: 80, bh: 90 }, { x: 140, bw: 90, bh: 75 },
      { x: 310, bw: 70, bh: 95 }, { x: 470, bw: 85, bh: 80 },
      { x: 650, bw: 75, bh: 100 }, { x: 810, bw: 90, bh: 85 },
      { x: 1000, bw: 80, bh: 90 }, { x: 1170, bw: 70, bh: 100 },
      { x: 1360, bw: 60, bh: 125 }, { x: 1530, bw: 50, bh: 110 },
      { x: 1700, bw: 65, bh: 130 }, { x: 1860, bw: 60, bh: 105 }
    ];
    for (i = 0; i < backBuildings.length; i++) {
      var b = backBuildings[i];
      g.fillRect(b.x, baseY - b.bh, b.bw, b.bh);
    }
    g.fillRect(0, baseY, w, h - baseY);

    // Front skyline
    var dark = 0x080F1C;
    baseY = h - 200;
    g.fillStyle(dark, 1);

    // Kingdom Tower
    var ktX = w * 0.30;
    g.fillRect(ktX - 42, baseY - 240, 84, 240);
    g.fillStyle(0x0F1E35, 1);
    g.fillEllipse(ktX, baseY - 202, 34, 26);
    g.fillStyle(dark, 1);
    g.fillRect(ktX - 2, baseY - 260, 4, 20);
    g.fillStyle(0xC8A951, 0.12);
    for (var ky = baseY - 180; ky < baseY - 20; ky += 18) {
      g.fillRect(ktX - 30, ky, 60, 3);
    }

    // Al Faisaliah Tower
    g.fillStyle(dark, 1);
    var ftX = w * 0.65;
    g.beginPath();
    g.moveTo(ftX - 32, baseY);
    g.lineTo(ftX - 5, baseY - 210);
    g.lineTo(ftX + 5, baseY - 210);
    g.lineTo(ftX + 32, baseY);
    g.closePath();
    g.fillPath();
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(ftX, baseY - 212, 10);
    g.fillStyle(dark, 1);
    g.fillRect(ftX - 1.5, baseY - 240, 3, 16);
    g.fillStyle(0xC8A951, 0.1);
    for (var fy = baseY - 180; fy < baseY - 15; fy += 20) {
      var progress = (baseY - fy) / 210;
      var rowW = 32 * (1 - progress * 0.85) * 2;
      g.fillRect(ftX - rowW / 2, fy, rowW, 2);
    }

    // Mosque
    g.fillStyle(dark, 1);
    var mosqueX = w * 0.12;
    g.fillRect(mosqueX - 50, baseY - 70, 100, 70);
    g.fillEllipse(mosqueX, baseY - 70, 70, 45);
    g.fillRect(mosqueX - 58, baseY - 130, 12, 130);
    g.fillCircle(mosqueX - 52, baseY - 130, 7);
    g.fillRect(mosqueX + 46, baseY - 120, 12, 120);
    g.fillCircle(mosqueX + 52, baseY - 120, 7);
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(mosqueX - 52, baseY - 140, 3);
    g.fillCircle(mosqueX + 52, baseY - 130, 3);

    // Second mosque cluster
    g.fillStyle(dark, 1);
    var m2X = w * 0.88;
    g.fillRect(m2X - 26, baseY - 110, 12, 110);
    g.fillRect(m2X + 14, baseY - 95, 12, 95);
    g.fillRect(m2X - 25, baseY - 55, 50, 55);
    g.fillEllipse(m2X, baseY - 55, 44, 30);

    // Generic foreground buildings
    g.fillStyle(dark, 1);
    var fgBuildings = [
      { x: w * 0.02, bw: 65, bh: 95 }, { x: w * 0.19, bw: 55, bh: 85 },
      { x: w * 0.25, bw: 35, bh: 65 }, { x: w * 0.42, bw: 70, bh: 80 },
      { x: w * 0.52, bw: 60, bh: 90 }, { x: w * 0.60, bw: 40, bh: 55 },
      { x: w * 0.74, bw: 70, bh: 80 }, { x: w * 0.82, bw: 60, bh: 65 },
      { x: w * 0.97, bw: 65, bh: 75 }
    ];
    for (i = 0; i < fgBuildings.length; i++) {
      var fb = fgBuildings[i];
      g.fillRect(fb.x, baseY - fb.bh, fb.bw, fb.bh);
      g.fillStyle(0xC8A951, 0.08);
      for (var wy = baseY - fb.bh + 10; wy < baseY - 6; wy += 16) {
        g.fillRect(fb.x + 5, wy, fb.bw - 10, 2);
      }
      g.fillStyle(dark, 1);
    }

    // Ground fill
    g.fillStyle(dark, 1);
    g.fillRect(0, baseY, w, h - baseY);

    // Sand dunes
    var duneBaseY = h - 50;
    var duneColors = [0x1A150C, 0x241E14];
    for (var layer = 0; layer < duneColors.length; layer++) {
      var offset = layer * 20;
      g.fillStyle(duneColors[layer], 1);
      g.beginPath();
      g.moveTo(0, h);
      for (var dx = 0; dx <= w; dx += 8) {
        var duneY = duneBaseY + offset
          + Math.sin(dx * 0.003 + layer * 0.8) * 12
          + Math.sin(dx * 0.007 + layer * 1.5) * 6;
        g.lineTo(dx, duneY);
      }
      g.lineTo(w, h);
      g.closePath();
      g.fillPath();
    }

    g.generateTexture('_menuBg', w, h);
    g.destroy();
  },

  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
  }
});
// ============================================================
// RiyadhTowers — Main Menu Scene (Samsung TV Performance Optimized)
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

    this.cameras.main.setBackgroundColor(COLORS_INT.deepNavy);

    // ── All static elements rendered to a single texture ──────
    this.renderStaticBackground(w, h);

    // ── Minimal animated elements (3 tweens total) ────────────
    this.createAnimatedElements(w, h);

    // ── UI — Title, prompts ──────────────────────────────────
    this.createUI(w, h);

    // ── Input ────────────────────────────────────────────────
    InputManager.init(this);
    InputManager.clear();
    InputManager.setupKeyboard(this);
    InputManager.on('enter', function() {
      AudioManager.menuConfirm();
      self.cameras.main.fadeOut(400, 6, 14, 26);
      self.time.delayedCall(400, function() {
        self.scene.start('PlayerSetupScene');
      });
    });
  },

  // ================================================================
  // STATIC BACKGROUND — uses texture pre-generated in PreloaderScene
  // ================================================================
  renderStaticBackground: function(w, h) {
    // Texture already generated by PreloaderScene.preGenerateMenuBackground()
    this.add.image(w / 2, h / 2, '_menuBg').setDepth(0);
  },

  // ================================================================
  // ANIMATED ELEMENTS — minimal count for ambiance
  // ================================================================
  createAnimatedElements: function(w, h) {
    // 3 twinkling stars (down from 8)
    for (var j = 0; j < 3; j++) {
      var tstar = this.add.graphics();
      tstar.setDepth(1);
      tstar.fillStyle(0xFFF8E0, 1);
      tstar.fillCircle(0, 0, 1.5);
      tstar.setPosition(Math.random() * w, Math.random() * (h * 0.5));
      tstar.setAlpha(0.5);
      this.tweens.add({
        targets: tstar,
        alpha: 0.05,
        duration: 2500 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Math.random() * 2000
      });
    }

    // 2 clouds (down from 4)
    var cloudData = [
      { x: w * 0.25, y: h * 0.12, scaleX: 1.0, alpha: 0.025, drift: 60 },
      { x: w * 0.70, y: h * 0.18, scaleX: 1.2, alpha: 0.02, drift: 50 },
    ];
    for (var i = 0; i < cloudData.length; i++) {
      var cd = cloudData[i];
      var cloud = this.add.graphics();
      cloud.setDepth(3);
      cloud.fillStyle(0xF5E6C8, 1);
      cloud.fillEllipse(0, 0, 200 * cd.scaleX, 25);
      cloud.fillEllipse(50 * cd.scaleX, -3, 140 * cd.scaleX, 18);
      cloud.setPosition(cd.x, cd.y);
      cloud.setAlpha(cd.alpha);
      this.tweens.add({
        targets: cloud,
        x: cd.x + cd.drift,
        duration: 30000 + i * 8000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Dust particles removed — saves continuous tween overhead on Tizen TV
  },

  // ================================================================
  // UI — Title, prompts
  // ================================================================
  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
    InputManager.clear();
  },

  createUI: function(w, h) {
    var uiContainer = this.add.container(0, 0);
    uiContainer.setDepth(10);

    var titleY = h * 0.20;
    var titleAr = this.add.text(w / 2, titleY, '\u0623\u0628\u0631\u0627\u062C \u0627\u0644\u0631\u064A\u0627\u0636', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '96px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#0A1628',
      strokeThickness: 8,
      shadow: { offsetX: 0, offsetY: 4, color: '#000000', blur: 12, fill: true }
    }).setOrigin(0.5);
    uiContainer.add(titleAr);

    this.tweens.add({
      targets: titleAr,
      alpha: { from: 1, to: 0.78 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    var subY = titleY + 80;
    uiContainer.add(this.add.text(w / 2, subY, 'RIYADHTOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '42px',
      color: COLORS.warmSand,
      stroke: '#0A1628',
      strokeThickness: 4,
      letterSpacing: 6
    }).setOrigin(0.5));

    // Gold line separator (single graphics)
    var lineY = subY + 45;
    var lineGfx = this.add.graphics();
    lineGfx.lineStyle(2, 0xC8A951, 0.6);
    lineGfx.lineBetween(w / 2 - 200, lineY, w / 2 + 200, lineY);
    lineGfx.fillStyle(0xC8A951, 0.8);
    lineGfx.fillCircle(w / 2, lineY, 4);
    uiContainer.add(lineGfx);

    var promptY = h * 0.62;
    var promptAr = this.add.text(w / 2, promptY, '\u0627\u0636\u063A\u0637 Enter \u0644\u0644\u0628\u062F\u0621', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '40px',
      fontStyle: '700',
      color: COLORS.accent,
      stroke: '#0A1628',
      strokeThickness: 3
    }).setOrigin(0.5);
    uiContainer.add(promptAr);

    var promptEn = this.add.text(w / 2, promptY + 48, 'Press Enter to Start', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '26px',
      color: COLORS.textSecondary,
      stroke: '#0A1628',
      strokeThickness: 2
    }).setOrigin(0.5);
    uiContainer.add(promptEn);

    this.tweens.add({
      targets: [promptAr, promptEn],
      alpha: { from: 1, to: 0.25 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    uiContainer.add(this.add.text(w / 2, h - 40, 'A Saudi-themed Monopoly Experience | D-Pad + Enter', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary
    }).setOrigin(0.5).setAlpha(0.3));
  }
});
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
    var size = 160;
    var r = size * 0.35;
    var PI2 = Math.PI * 2;
    var texKey = '_setupPatternTile';

    // Only create tile texture once
    if (!this.textures.exists(texKey)) {
      var tileG = this.add.graphics();
      tileG.lineStyle(1, 0xC8A951, 1);
      var cx = size / 2;
      var cy = size / 2;
      for (var i = 0; i < 8; i++) {
        var a1 = (i / 8) * PI2;
        var a2 = ((i + 3) / 8) * PI2;
        tileG.lineBetween(
          cx + Math.cos(a1) * r, cy + Math.sin(a1) * r,
          cx + Math.cos(a2) * r, cy + Math.sin(a2) * r
        );
      }
      tileG.generateTexture(texKey, size, size);
      tileG.destroy();
    }

    var tile = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, texKey);
    tile.setOrigin(0, 0);
    tile.setAlpha(0.04);
    tile.setDepth(0);
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
  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
    InputManager.clear();
  },

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

    // ── Bake static board into a single RenderTexture ─────────
    // This collapses ~200 board objects into 1 draw call per frame
    this.bakeStaticBoard();

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
    // Texture already pre-generated in PreloaderScene; skip if exists
    if (!this.textures.exists('_boardPatternTile')) {
      var size = 160;
      var r = size * 0.25;
      var tileG = this.add.graphics();
      tileG.lineStyle(1, 0xC8A951, 1);
      var cx = size / 2;
      var cy = size / 2;
      tileG.lineBetween(cx - r, cy, cx + r, cy);
      tileG.lineBetween(cx, cy - r, cx, cy + r);
      tileG.lineBetween(cx - r * 0.7, cy - r * 0.7, cx + r * 0.7, cy + r * 0.7);
      tileG.lineBetween(cx + r * 0.7, cy - r * 0.7, cx - r * 0.7, cy + r * 0.7);
      tileG.generateTexture('_boardPatternTile', size, size);
      tileG.destroy();
    }

    var tile = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, '_boardPatternTile');
    tile.setOrigin(0, 0);
    tile.setAlpha(0.02);
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
    this._boardShimmer = this.add.graphics();
    this._boardShimmer.lineStyle(2, 0xFFD700, 1);
    this._boardShimmer.strokeRoundedRect(bx - 1, by - 1, bs + 2, bs + 2, 9);
    this._boardShimmer.lineStyle(1, 0xC8A951, 0.4);
    this._boardShimmer.strokeRoundedRect(bx - 3, by - 3, bs + 6, bs + 6, 11);
    this.boardContainer.add(this._boardShimmer);
    this.tweens.add({
      targets: this._boardShimmer,
      alpha: { from: 0.2, to: 0.6 },
      duration: 3500,
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

    // Single graphics object for ALL center decorations
    var g = this.add.graphics();

    // Frame
    g.lineStyle(1, 0xC8A951, 0.2);
    g.strokeRect(cx - 140, cy - 100, 280, 220);

    // Gold line
    g.lineStyle(1, 0xC8A951, 0.5);
    g.lineBetween(cx - 90, cy - 12, cx + 90, cy - 12);
    g.fillStyle(0xC8A951, 0.5);
    g.fillCircle(cx, cy - 12, 3);

    // Card deck areas
    g.fillStyle(0x2A1A44, 0.6);
    g.fillRoundedRect(cx - 105, cy + 2, 80, 45, 5);
    g.lineStyle(1, 0xE8B931, 0.4);
    g.strokeRoundedRect(cx - 105, cy + 2, 80, 45, 5);
    g.fillStyle(0x1A3744, 0.6);
    g.fillRoundedRect(cx + 25, cy + 2, 80, 45, 5);
    g.lineStyle(1, 0x87CEEB, 0.4);
    g.strokeRoundedRect(cx + 25, cy + 2, 80, 45, 5);

    // Mini skyline (simplified — single graphics, no separate object)
    var skyBase = cy + 105;
    g.fillStyle(0x1A2744, 0.4);
    g.fillRect(cx - 120, skyBase, 240, 3);
    g.fillStyle(0x1A2744, 0.7);
    g.fillRect(cx - 6, skyBase - 55, 12, 55);
    g.beginPath();
    g.moveTo(cx + 28, skyBase);
    g.lineTo(cx + 31, skyBase - 48);
    g.lineTo(cx + 35, skyBase - 48);
    g.lineTo(cx + 38, skyBase);
    g.closePath();
    g.fillPath();
    g.fillStyle(0xC8A951, 0.3);
    g.fillCircle(cx + 33, skyBase - 40, 3);

    this.boardContainer.add(g);

    // Title text (only 2 text objects instead of 6)
    var title = this.add.text(cx, cy - 55, 'أبراج الرياض', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '28px',
      fontStyle: '800',
      color: COLORS.desertGold,
      stroke: '#060E1A',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.boardContainer.add(title);

    var subtitle = this.add.text(cx, cy - 25, 'RIYADH TOWERS', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '13px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    this.boardContainer.add(subtitle);

    // Card labels (2 instead of 4)
    this.boardContainer.add(this.add.text(cx - 65, cy + 20, '?', {
      fontFamily: '"Fredoka One", sans-serif', fontSize: '18px', color: COLORS.accent,
    }).setOrigin(0.5));
    this.boardContainer.add(this.add.text(cx + 65, cy + 20, 'CC', {
      fontFamily: '"Fredoka One", sans-serif', fontSize: '14px', color: COLORS.warmSand,
    }).setOrigin(0.5));
  },

  // -------------------------------------------------------
  // Bake static board into single RenderTexture
  // Reduces per-frame draw calls from ~200 to ~10
  // -------------------------------------------------------
  bakeStaticBoard: function() {
    // Remove shimmer (it's animated, must stay separate)
    if (this._boardShimmer) {
      this.boardContainer.remove(this._boardShimmer);
    }

    // Create a RenderTexture the size of the full screen
    var rt = this.add.renderTexture(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw all static board children (graphics + text) onto it
    var children = this.boardContainer.getAll();
    for (var i = 0; i < children.length; i++) {
      rt.draw(children[i]);
    }

    // Destroy all the individual objects — they're now in the texture
    this.boardContainer.removeAll(true);

    // Add the single baked texture
    this.boardContainer.add(rt);

    // Re-add shimmer on top (animated, needs to stay separate)
    if (this._boardShimmer) {
      this.boardContainer.add(this._boardShimmer);
    }
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

    var offset = this.getTokenOffset(playerIndex, GameState.players.length);

    // For short moves (<=6), animate each step with hop. For longer, batch intermediate steps.
    var animSteps;
    if (steps.length <= 6) {
      animSteps = steps;
    } else {
      // Show first 2, skip middle (fast slide), then last 2 steps
      animSteps = [steps[0], steps[1]];
      animSteps.push({ batch: steps.slice(2, steps.length - 2) });
      animSteps.push(steps[steps.length - 2]);
      animSteps.push(steps[steps.length - 1]);
    }

    var stepIdx = 0;
    var moveNext = function() {
      if (stepIdx >= animSteps.length) {
        AudioManager.tokenLand();
        if (callback) callback();
        return;
      }

      var step = animSteps[stepIdx];

      // Batch step: slide directly to the end of the batch
      if (step && step.batch) {
        var lastInBatch = step.batch[step.batch.length - 1];
        var bPos = self.spacePositions[lastInBatch];
        self.tweens.add({
          targets: token.container,
          x: bPos.x + offset.x,
          y: bPos.y + offset.y,
          duration: Math.min(step.batch.length * 30, 400),
          ease: 'Sine.easeInOut',
          onComplete: function() {
            stepIdx++;
            moveNext();
          }
        });
        return;
      }

      var tPos = self.spacePositions[step];
      AudioManager.tokenMove();

      self.tweens.add({
        targets: token.container,
        x: tPos.x + offset.x,
        y: tPos.y + offset.y - 8,
        duration: 70,
        ease: 'Quad.easeOut',
        onComplete: function() {
          self.tweens.add({
            targets: token.container,
            y: tPos.y + offset.y,
            duration: 50,
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

    // Single graphics object for shadow + bg + accent + border (was 4 separate)
    var bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.2);
    bg.fillRoundedRect(3, 3, w, h, 10);
    bg.fillStyle(0x0C1729, 0.95);
    bg.fillRoundedRect(0, 0, w, h, 10);
    bg.fillStyle(0x162340, 0.3);
    bg.fillRoundedRect(0, 0, w, h / 2, { tl: 10, tr: 10, bl: 0, br: 0 });
    bg.fillStyle(player.color, 0.9);
    bg.fillRoundedRect(0, 4, 4, h - 8, 2);
    bg.lineStyle(1, player.color, 0.3);
    bg.strokeRoundedRect(0, 0, w, h, 10);
    container.add(bg);

    // Active glow (hidden by default)
    var glow = this.add.graphics();
    glow.lineStyle(2, player.color, 0.8);
    glow.strokeRoundedRect(-2, -2, w + 4, h + 4, 12);
    glow.setVisible(false);
    container.add(glow);

    // Combined emoji + name on one line
    var nameText = this.add.text(15, 15, (token ? token.emoji : '?') + ' ' + player.name, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '20px',
      color: player.colorStr,
    });
    container.add(nameText);

    // Money
    var moneyText = this.add.text(15, 42, 'SAR ' + player.money, {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '18px',
      color: COLORS.desertGold,
    });
    container.add(moneyText);

    // Combined props + worth on one line
    var propsText = this.add.text(15, 70, '0 props | Net: 1500 SAR', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '13px',
      color: COLORS.textSecondary,
    });
    container.add(propsText);

    // Property color dots
    var dotsContainer = this.add.container(w - 15, 95);
    container.add(dotsContainer);

    return {
      container: container,
      bg: bg,
      glow: glow,
      moneyText: moneyText,
      propsText: propsText,
      dotsContainer: dotsContainer,
      playerIdx: playerIdx,
    };
  },

  updateHUD: function() {
    for (var i = 0; i < this.playerPanels.length; i++) {
      var panel = this.playerPanels[i];
      var player = GameState.players[i];

      // Only update text when values actually changed
      var moneyStr = 'SAR ' + player.money;
      if (panel._lastMoney !== moneyStr) {
        panel._lastMoney = moneyStr;
        panel.moneyText.setText(moneyStr);
        panel.moneyText.setColor(player.money < 0 ? COLORS.danger : COLORS.desertGold);
      }

      var propsCount = player.properties.length;
      var worth = GameState.getPlayerNetWorth(player);
      var infoStr = propsCount + ' props | Net: ' + worth + ' SAR';
      if (panel._lastInfoStr !== infoStr) {
        panel._lastInfoStr = infoStr;
        panel.propsText.setText(infoStr);
      }

      // Active player glow
      var isActive = (i === GameState.currentPlayerIndex && !player.bankrupt);
      panel.glow.setVisible(isActive);

      if (this.tokenSprites[i] && this.tokenSprites[i].glowRing) {
        this.tokenSprites[i].glowRing.setVisible(isActive);
      }

      if (player.bankrupt) {
        panel.container.setAlpha(0.3);
      }

      // Only rebuild color dots when property count changes
      if (panel._lastPropsCount !== propsCount) {
        panel._lastPropsCount = propsCount;
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
    }
  },

  // -------------------------------------------------------
  // Premium Ownership Markers
  // -------------------------------------------------------
  updateBoardOwnership: function() {
    // Initialize marker cache on first call
    if (!this.ownershipMarkers) {
      this.ownershipMarkers = {};
      this._ownershipSnapshot = {};
    }

    for (var j = 0; j < 40; j++) {
      var pd = GameState.properties[j];
      // Build a snapshot key to detect changes: "owner:houses:hotel:mortgaged"
      var newKey = pd.owner + ':' + (pd.houses || 0) + ':' + (pd.hotel ? 1 : 0) + ':' + (pd.mortgaged ? 1 : 0);
      var oldKey = this._ownershipSnapshot[j];

      // Skip if unchanged
      if (newKey === oldKey) continue;
      this._ownershipSnapshot[j] = newKey;

      // Destroy old marker for this space if it exists
      if (this.ownershipMarkers[j]) {
        this.ownershipMarkers[j].destroy();
        delete this.ownershipMarkers[j];
      }

      if (pd.owner >= 0) {
        var pos = this.spacePositions[j];
        var player = GameState.players[pd.owner];

        var marker = this.add.graphics();
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

        if (pd.hotel) {
          marker.fillStyle(0xFF0000, 1);
          marker.fillRect(pos.x - 5, pos.y - (pos.side === 'bottom' ? pos.h / 2 + 2 : -pos.h / 2 - 8), 10, 6);
          marker.fillStyle(0xFFFFFF, 0.25);
          marker.fillRect(pos.x - 5, pos.y - (pos.side === 'bottom' ? pos.h / 2 + 2 : -pos.h / 2 - 8), 10, 2);
        } else if (pd.houses > 0) {
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
        this.ownershipMarkers[j] = marker;
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
  // Create persistent message elements once, then just update text/position
  _ensureMessageElements: function() {
    if (this._msgBuilt) return;
    this._msgBuilt = true;

    var w = 500;
    var h = 80;
    var x = this.boardX + this.boardSize / 2 - w / 2;

    this._msgW = w;
    this._msgH = h;
    this._msgX = x;

    var msgContainer = this.add.container(x, -h);
    this.messageContainer.add(msgContainer);
    this._msgInner = msgContainer;

    // Shadow
    var shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.3);
    shadow.fillRoundedRect(3, 3, w, h, 10);
    msgContainer.add(shadow);

    // Background (will be redrawn for color accent)
    this._msgBg = this.add.graphics();
    msgContainer.add(this._msgBg);

    this._msgArText = this.add.text(w / 2, 22, '', {
      fontFamily: 'Tajawal, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: COLORS.warmSand,
    }).setOrigin(0.5);
    msgContainer.add(this._msgArText);

    this._msgEnText = this.add.text(w / 2, 52, '', {
      fontFamily: '"Fredoka One", sans-serif',
      fontSize: '16px',
      color: COLORS.textSecondary,
    }).setOrigin(0.5);
    msgContainer.add(this._msgEnText);
  },

  showMessage: function(textAr, textEn, color) {
    color = color || COLORS.warmSand;
    this._ensureMessageElements();

    var w = this._msgW;
    var h = this._msgH;
    var msgContainer = this._msgInner;

    // Kill any existing message tweens
    this.tweens.killTweensOf(msgContainer);

    // Update text content
    this._msgArText.setText(textAr).setColor(color);
    this._msgEnText.setText(textEn);

    // Redraw background with new accent color
    var colorInt = hexToInt(color);
    this._msgBg.clear();
    this._msgBg.fillStyle(0x060E1A, 0.95);
    this._msgBg.fillRoundedRect(0, 0, w, h, 10);
    this._msgBg.fillStyle(0x0F1B2E, 0.4);
    this._msgBg.fillRoundedRect(0, 0, w, h / 2, { tl: 10, tr: 10, bl: 0, br: 0 });
    this._msgBg.fillStyle(colorInt, 0.8);
    this._msgBg.fillRoundedRect(0, 5, 4, h - 10, 2);
    this._msgBg.lineStyle(2, colorInt, 0.5);
    this._msgBg.strokeRoundedRect(0, 0, w, h, 10);

    // Reset position and slide in
    msgContainer.y = -h;
    var self = this;
    this.tweens.add({
      targets: msgContainer,
      y: 10,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // Auto-hide
    this.time.delayedCall(2500, function() {
      self.tweens.add({
        targets: msgContainer,
        y: -h - 10,
        duration: 250,
        ease: 'Quad.easeIn',
      });
    });
  },

  clearAction: function() {
    this.actionContainer.removeAll(true);
  },

  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
    InputManager.clear();
  },
});
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
    this.maxFireworkParticles = 16;  // reduced from 32 for Tizen TV
    this.maxConfetti = 6;             // reduced from 10
    this.maxAmbient = 3;              // reduced from 6
    this._frameCounter = 0;           // for update throttling
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
      delay: 2500,  // slower frequency for Tizen TV (was 1500)
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
    // Throttle: process particles every other frame to save CPU on Tizen TV
    this._frameCounter++;
    if (this._frameCounter % 2 !== 0) return;

    var dt = (delta * 2) / 1000; // compensate for skipped frame
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
    var size = 160;
    var r = size * 0.28;
    var PI2 = Math.PI * 2;
    var texKey = '_goPatternTile';

    if (!this.textures.exists(texKey)) {
      var tileG = this.add.graphics();
      tileG.lineStyle(1, 0xC8A951, 1);
      var cx = size / 2;
      var cy = size / 2;
      for (var i = 0; i < 8; i++) {
        var a1 = (i / 8) * PI2;
        var a2 = ((i + 3) / 8) * PI2;
        tileG.lineBetween(
          cx + Math.cos(a1) * r, cy + Math.sin(a1) * r,
          cx + Math.cos(a2) * r, cy + Math.sin(a2) * r
        );
      }
      tileG.generateTexture(texKey, size, size);
      tileG.destroy();
    }

    var tile = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, texKey);
    tile.setOrigin(0, 0);
    tile.setAlpha(0.04);
    tile.setDepth(0);
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
    var particleCount = 6;  // reduced from 8 for Tizen TV

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
  shutdown: function() {
    this.tweens.killAll();
    this.time.removeAllEvents();
    InputManager.clear();
    this.confettiPieces = [];
    this.ambientParticles = [];
    this.fireworkParticles = [];
  },

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
