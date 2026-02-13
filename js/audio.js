// ============================================================
// Riyadh Tycoon — Audio System (Web Audio API Synthesis)
// ============================================================

var AudioManager = {
  ctx: null,
  enabled: true,
  masterVolume: 0.3,

  init: function() {
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
    if (!this.enabled || !this.ctx) return;
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
    if (!this.enabled || !this.ctx) return;
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
    if (!this.enabled || !this.ctx) return;
    this.resume();
    var intervalSec = (interval || 120) / 1000;
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      this.playToneAt(n.freq, n.dur || 0.2, n.type || 'sine', n.vol || 0.5, i * intervalSec);
    }
  },

  // Sound effects — all use Web Audio scheduling (no setTimeout leaks)
  diceRoll: function() {
    if (!this.enabled || !this.ctx) return;
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
