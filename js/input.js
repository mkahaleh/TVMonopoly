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
