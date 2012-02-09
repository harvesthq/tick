(function() {
  var $, AbstractTicker, SlidingTicker, Ticker,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  $.fn.ticker = function(options) {
    var el, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      _results.push(new Ticker($(el), options));
    }
    return _results;
  };

  /*
  	The acutal Ticker logic. The stored value is
  	represented by a span/element per digit (and seperator).
  
  	Attributes
  
  		options			object		all runtime options
  		element			object		the element that is used for this ticker
  		value			int			whatever value you pass in to the ticker
  		seperators		array		a list of the all seperators that were found inbetween all digits
  									all digits are represented by an empty element
  
  	Options
  
  		incremental		int			the amount by which the target value is to be increased
  		delay (ms)		int			the time after which the target value is being increased
  		seperators		boolean		if true, all arbitrary characters inbetween digits are wrapped in seperated elements
  									if false, these characters are stripped out
  		autostart		boolean		whether or not to start the ticker when instantiated
  
  	Events
  
  		onStart			
  		onTick			
  		onStop
  */

  AbstractTicker = (function() {

    function AbstractTicker(element, options) {
      this.element = element;
      if (options == null) options = {};
      this.options = {
        incremental: options.incremental || 1,
        delay: options.delay || 1000,
        seperators: options.seperators ? true : false,
        autostart: options.autostart ? true : false
      };
      this.value = Number(this.element.html().replace(/[^\d.]/g, ''));
      this.seperators = this.element.html().trim().split(/[\d]/i);
      if (this.options.autostart) this.start();
    }

    AbstractTicker.prototype.render = function() {
      var container, containers, digits, i, _len, _ref, _results;
      digits = String(this.value).split('');
      containers = this.element.children(':not(.seperator)');
      if (digits.length !== containers.length) {
        for (i = 0, _ref = digits.length - containers.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          if (this.options.seperators && this.seperators[i]) {
            this.build_seperator(this.seperators[i]);
          }
          containers.push(this.build_container(i));
        }
      }
      _results = [];
      for (i = 0, _len = containers.length; i < _len; i++) {
        container = containers[i];
        _results.push(this.update_container(container, digits[i]));
      }
      return _results;
    };

    /*
    		These methods will create all visible elements and manipulate the output
    */

    AbstractTicker.prototype.build_container = function(i) {
      return $('<span></span>').appendTo(this.element);
    };

    AbstractTicker.prototype.build_seperator = function(content) {
      return $("<span class='seperator'>" + content + "</span>").appendTo(this.element);
    };

    AbstractTicker.prototype.update_container = function(container, digit) {
      return $(container).html(digit);
    };

    AbstractTicker.prototype.refresh_delay = function(new_delay) {
      var _this = this;
      clearInterval(this.periodic);
      this.options.delay = new_delay;
      return this.periodic = setInterval(function() {
        return _this.tick();
      }, this.options.delay);
    };

    /*
    		Events
    */

    AbstractTicker.prototype.tick = function() {
      this.value += this.options.incremental;
      return this.render();
    };

    /*
    		Controls for the ticker
    */

    AbstractTicker.prototype.start = function() {
      var _this = this;
      this.element.empty();
      this.render();
      return this.periodic = setInterval(function() {
        return _this.tick();
      }, this.options.delay);
    };

    AbstractTicker.prototype.stop = function() {
      return clearInterval(this.periodic);
    };

    return AbstractTicker;

  })();

  Ticker = (function(_super) {

    __extends(Ticker, _super);

    function Ticker() {
      Ticker.__super__.constructor.apply(this, arguments);
    }

    Ticker.prototype.build_container = function(i) {
      return $('<span class="wheel"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span>').appendTo(this.element);
    };

    Ticker.prototype.update_container = function(container, digit) {
      return $(container).animate({
        top: digit * -96
      }, this.options.delay);
    };

    /*
    		Just for testing... Useful in combination with live data streamed from a server
    */

    Ticker.prototype.tick = function() {
      Ticker.__super__.tick.apply(this, arguments);
      if (this.value === 162007005) this.refresh_delay(400);
      if (this.value === 162007030) return this.refresh_delay(2000);
    };

    return Ticker;

  })(AbstractTicker);

  SlidingTicker = (function(_super) {

    __extends(SlidingTicker, _super);

    function SlidingTicker() {
      SlidingTicker.__super__.constructor.apply(this, arguments);
    }

    SlidingTicker.prototype.build_container = function() {
      var _this = this;
      return SlidingTicker.__super__.build_container.apply(this, arguments).bind('updateDigit', function(e, target, old, digit) {
        return target.animate({
          backgroundPositionY: digit * -65
        }, {
          duration: 500
        });
      });
    };

    SlidingTicker.prototype.update_container = function(container, digit) {
      var old, target;
      target = $(container);
      old = target.html();
      return SlidingTicker.__super__.update_container.apply(this, arguments).triggerHandler('updateDigit', [target, old, digit]);
    };

    SlidingTicker.prototype.tick = function() {
      return SlidingTicker.__super__.tick.apply(this, arguments);
    };

    return SlidingTicker;

  })(AbstractTicker);

}).call(this);
