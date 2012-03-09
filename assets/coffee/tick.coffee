
# jQuery must have been initialized by now!
$ = jQuery


# Create the plugin within the jQuery context
$.fn.ticker = (options) ->

  # IE8 doesn't support String.trim() and lots of other stuff
  if( typeof String.prototype.trim is 'function' )

    for el in this
      el = $( el )

      if el.hasClass( 'tick-flip' )
        new Tick_Flip( $( el ), options )
      else if el.hasClass( 'tick-scroll' )
        new Tick_Scroll( $( el ), options )
      else
        new Tick( el, options )





###
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
###
class Tick

  constructor: (@element, options={}) ->

    @running = no

    @options =
      incremental: options.incremental or 1
      delay      : options.delay       or 1000

      separators:  if options.separators? then options.separators else false
      autostart :  if options.autostart?  then options.autostart  else true


    # extract the actual integer value without separators
    @value = Number( @element.html().replace( /[^\d.]/g, '' ))

    # retrieve all separators (digits are stored as empty elements for reference)
    @separators = @element.html().trim().split( /[\d]/i )

    @element.addClass( 'tick-active' )
    this.start() if @options.autostart



  render: () ->

    digits      = String( @value ).split( '' )
    containers  = @element.children( ':not(.tick-separator)' )

    # add new containers for each digit that doesnt exist (if they do, just update them)
    if digits.length isnt containers.length

      for i in [0...(digits.length - containers.length)]

        # insert the separators at their designated position
        this.build_separator( @separators[ i ]) if @options.separators and @separators[ i ]

        containers.push( this.build_container( i ))


    # insert/update the corresponding digit into each container
    this.update_container( container, digits[ i ]) for container, i in containers



  ###
    These methods will create all visible elements and manipulate the output
  ###

  # override to change element type etc.
  build_container: (i) ->
    $( '<span></span>' ).appendTo( @element )


  # override to implement individual handling of separators
  build_separator: (content) ->
    $( "<span class='tick-separator'>#{content}</span>" ).appendTo( @element )


  # override to add animation logic etc.
  update_container: (container, digit) ->
    $( container ).html( digit )


  # dynamically reset the delay during runtime
  refresh_delay: (new_delay) ->
    clearTimeout( @timer );
    @options.delay = new_delay
    this.set_timer()


  set_timer: () ->

    # setInterval() can cause problems in inactive tabs (see: http://goo.gl/pToBS)
    @timer = setTimeout( () =>
      this.tick()
    , @options.delay ) if @running


  ###
    Events
  ###
  tick: () ->
    @value += @options.incremental
    this.render()
    this.set_timer()


  ###
    Controls for the ticker
  ###
  start: () ->
    @element.empty()
    this.render()

    @running = yes
    this.set_timer()


  stop: () ->
    clearTimeout( @timer );
    @running = no





###
  CSS3 Transforms browser support:
  https://developer.mozilla.org/en/CSS/transform#Browser_compatibility
###

class Tick_Flip extends Tick

  build_container: (i) ->
    val = String( @value ).split( '' )[ i ]
    $( "<span class='tick-wrapper'>
        <span class='tick-old'>#{val}</span>
        <span class='tick-old-move'>#{val}</span>
        <span class='tick-new'></span>
        <span class='tick-new-move'>#{val}</span>
      </span>"
    )
    .appendTo( @element )


  # provides the flip animation based on simple callbacks
  flip: (target, digit, scale, duration, onComplete) ->

    target.css({ borderSpacing: 100 })

    target.stop(true, true).addClass( 'tick-moving' ).animate(
      { borderSpacing: 0 },
      { duration: duration, easing: 'easeInCubic', step: (now, fx) =>
        val = scale(now)
        target.css({
          '-webkit-transform': "scaleY(#{val})",
          '-moz-transform': "scaleY(#{val})",
          '-ms-transform': "scaleY(#{val})",
          '-o-transform': "scaleY(#{val})",
          'transform': "scaleY(#{val})"
        })

      complete: () =>
        target.html( digit )
            .css({
              borderSpacing: '',
              '-webkit-transform': '',
              '-moz-transform': '',
              '-ms-transform': '',
              '-o-transform': '',
              'transform': ''
            })
            .removeClass( 'tick-moving' )

        onComplete()
      })


  # calculate the step value for the respective half of the flip card
  upper: (now) -> now / 100
  lower: (now) => 1 - this.upper( now )


  update_container: (container, digit) ->

    # reference build_container() for elements/indices
    parts = $( container ).children()

    if( @running and parts.eq( 2 ).html() != digit )

      this.flip( parts.eq( 1 ), digit, this.upper, @options.delay / 4, () ->
        )

      this.flip( parts.eq( 3 ).html( digit ), digit, this.lower, @options.delay / 3, () ->
        parts.eq( 0 ).html( digit ))


    parts.eq( 2 ).html( digit )





class Tick_Scroll extends Tick

  build_container: (i) ->
    $( '<span class="tick-wheel"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span>' ).appendTo( @element )

  update_container: (container, digit) ->
    if( @running )
      $( container ).animate({ top: digit * -96 }, @options.delay )
    else
      $( container ).css({ top: digit * -96 })





