(function() {
  var $, Tick, Tick_Flip, Tick_Scroll,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  $.fn.ticker = function(options) {
    var el, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el = $(el);
      if (el.hasClass('tick-flip')) {
        _results.push(new Tick_Flip($(el), options));
      } else if (el.hasClass('tick-scroll')) {
        _results.push(new Tick_Scroll($(el), options));
      } else {
        _results.push(new Tick(el, options));
      }
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

  Tick = (function() {

    function Tick(element, options) {
      this.element = element;
      if (options == null) options = {};
      this.running = false;
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

    Tick.prototype.render = function() {
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

    Tick.prototype.build_container = function(i) {
      return $('<span></span>').appendTo(this.element);
    };

    Tick.prototype.build_seperator = function(content) {
      return $("<span class='seperator'>" + content + "</span>").appendTo(this.element);
    };

    Tick.prototype.update_container = function(container, digit) {
      return $(container).html(digit);
    };

    Tick.prototype.refresh_delay = function(new_delay) {
      clearTimeout(this.timer);
      this.options.delay = new_delay;
      return this.set_timer();
    };

    Tick.prototype.set_timer = function() {
      var _this = this;
      if (this.running) {
        return this.timer = setTimeout(function() {
          return _this.tick();
        }, this.options.delay);
      }
    };

    /*
    		Events
    */

    Tick.prototype.tick = function() {
      this.value += this.options.incremental;
      this.render();
      return this.set_timer();
    };

    /*
    		Controls for the ticker
    */

    Tick.prototype.start = function() {
      this.element.empty();
      this.render();
      this.running = true;
      return this.set_timer();
    };

    Tick.prototype.stop = function() {
      clearTimeout(this.timer);
      return this.running = false;
    };

    return Tick;

  })();

  /*
  	CSS3 Transforms browser support:
  	https://developer.mozilla.org/en/CSS/transform#Browser_compatibility
  */

  Tick_Flip = (function(_super) {

    __extends(Tick_Flip, _super);

    function Tick_Flip() {
      this.lower = __bind(this.lower, this);
      Tick_Flip.__super__.constructor.apply(this, arguments);
    }

    Tick_Flip.prototype.build_container = function(i) {
      var val;
      val = String(this.value).split('')[i];
      return $("<span class='wrapper'>				<span class='old'>" + val + "</span>				<span class='old-move'>" + val + "</span>				<span class='new'></span>				<span class='new-move'>" + val + "</span>			</span>").appendTo(this.element);
    };

    Tick_Flip.prototype.flip = function(target, digit, scale, onComplete) {
      var _this = this;
      target.css({
        borderSpacing: 100
      });
      return target.stop(true, true).addClass('moving').animate({
        borderSpacing: 0
      }, {
        duration: this.options.delay / 4,
        step: function(now, fx) {
          var val;
          val = scale(now);
          return target.css({
            '-webkit-transform': "scaleY(" + val + ")",
            '-moz-transform': "scaleY(" + val + ")",
            '-ms-transform': "scaleY(" + val + ")",
            '-o-transform': "scaleY(" + val + ")",
            'transform': "scaleY(" + val + ")"
          });
        },
        complete: function() {
          target.html(digit).css({
            borderSpacing: '',
            '-webkit-transform': '',
            '-moz-transform': '',
            '-ms-transform': '',
            '-o-transform': '',
            'transform': ''
          }).removeClass('moving');
          return onComplete();
        }
      });
    };

    Tick_Flip.prototype.upper = function(now) {
      return now / 100;
    };

    Tick_Flip.prototype.lower = function(now) {
      return 1 - this.upper(now);
    };

    Tick_Flip.prototype.update_container = function(container, digit) {
      var parts,
        _this = this;
      parts = $(container).children();
      if (this.running && parts.eq(2).html() !== digit) {
        this.flip(parts.eq(1), digit, this.upper, function() {
          return _this.flip(parts.eq(3).html(digit), digit, _this.lower, function() {
            return parts.eq(0).html(digit);
          });
        });
      }
      return parts.eq(2).html(digit);
    };

    return Tick_Flip;

  })(Tick);

  Tick_Scroll = (function(_super) {

    __extends(Tick_Scroll, _super);

    function Tick_Scroll() {
      Tick_Scroll.__super__.constructor.apply(this, arguments);
    }

    Tick_Scroll.prototype.build_container = function(i) {
      return $('<span class="wheel"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span>').appendTo(this.element);
    };

    Tick_Scroll.prototype.update_container = function(container, digit) {
      if (this.running) {
        return $(container).animate({
          top: digit * -96
        }, this.options.delay);
      } else {
        return $(container).css({
          top: digit * -96
        });
      }
    };

    return Tick_Scroll;

  })(Tick);

}).call(this);
