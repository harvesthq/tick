// used for bounce animation
// http://gsgd.co.uk/sandbox/jquery/easing/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

(function() {
  var $, Tick, Tick_Flip, Tick_Scroll,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  $.fn.ticker = function(options) {
    var el, _i, _len, _results;
    if (typeof String.prototype.trim === 'function') {
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
    }
  };

  /*
    The acutal Ticker logic. The stored value is
    represented by a span/element per digit (and separator).
  
    Attributes
  
      options     object    all runtime options
      element     object    the element that is used for this ticker
      value     int     whatever value you pass in to the ticker
      separators    array   a list of the all separators that were found inbetween all digits
                    all digits are represented by an empty element

    Options

      incremental   int     the amount by which the target value is to be increased
      delay (ms)    int     the time after which the target value is being increased
      separators    boolean   if true, all arbitrary characters inbetween digits are wrapped in seperated elements
                    if false, these characters are stripped out
      autostart   boolean   whether or not to start the ticker when instantiated
  
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
        separators: options.separators != null ? options.separators : false,
        autostart: options.autostart != null ? options.autostart : true
      };
      this.value = Number(this.element.html().replace(/[^\d.]/g, ''));
      this.separators = this.element.html().trim().split(/[\d]/i);
      this.element.addClass('tick-active');
      if (this.options.autostart) this.start();
    }

    Tick.prototype.render = function() {
      var container, containers, digits, i, _len, _ref, _results;
      digits = String(this.value).split('');
      containers = this.element.children(':not(.tick-separator)');
      if (digits.length !== containers.length) {
        for (i = 0, _ref = digits.length - containers.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          if (this.options.separators && this.separators[i]) {
            this.build_separator(this.separators[i]);
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

    Tick.prototype.build_separator = function(content) {
      return $("<span class='tick-separator'>" + content + "</span>").appendTo(this.element);
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
      return $("<span class='tick-wrapper'>        <span class='tick-old'>" + val + "</span>        <span class='tick-old-move'>" + val + "</span>        <span class='tick-new'></span>        <span class='tick-new-move'>" + val + "</span>      </span>").appendTo(this.element);
    };

    Tick_Flip.prototype.flip = function(target, digit, scale, duration, onComplete) {
      var _this = this;
      target.css({
        borderSpacing: 100
      });
      return target.stop(true, true).addClass('tick-moving').animate({
        borderSpacing: 0
      }, {
        duration: duration,
        easing: 'easeInCubic',
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
          }).removeClass('tick-moving');
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
      var parts;
      parts = $(container).children();
      if (this.running && parts.eq(2).html() !== digit) {
        this.flip(parts.eq(1), digit, this.upper, this.options.delay / 4, function() {});
        this.flip(parts.eq(3).html(digit), digit, this.lower, this.options.delay / 3, function() {
          return parts.eq(0).html(digit);
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
      return $('<span class="tick-wheel"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span>').appendTo(this.element);
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
