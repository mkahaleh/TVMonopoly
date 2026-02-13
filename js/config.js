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
