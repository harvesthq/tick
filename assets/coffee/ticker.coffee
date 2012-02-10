
# jQuery must have been initialized by now!
$ = jQuery



# Create the plugin within the jQuery context
$.fn.ticker = (options) ->

	new Ticker( $( el ), options ) for el in this



###
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
###
class StandardTicker

	constructor: (@element, options={}) ->

		@options =
			incremental: options.incremental or 1
			delay:		 options.delay		 or 1000

			seperators:	 if options.seperators	then true else false
			autostart:	 if options.autostart	then true else false


		# extract the actual integer value without seperators
		@value = Number( @element.html().replace( /[^\d.]/g, '' ))

		# retrieve all seperators (digits are stored as empty elements for reference)
		@seperators = @element.html().trim().split( /[\d]/i )


		this.start() if @options.autostart



	render: () ->

		digits		= String( @value ).split( '' )
		containers	= @element.children( ':not(.seperator)' )

		# add new containers for each digit that doesnt exist (if they do, just update them)
		if digits.length isnt containers.length

			for i in [0...(digits.length - containers.length)]

				# insert the seperators at their designated position
				this.build_seperator( @seperators[ i ]) if @options.seperators and @seperators[ i ]

				containers.push( this.build_container( i ))


		# insert/update the corresponding digit into each container
		this.update_container( container, digits[ i ]) for container, i in containers



	###
		These methods will create all visible elements and manipulate the output
	###

	# override to change element type etc.
	build_container: (i) ->
		$( '<span></span>' ).appendTo( @element )


	# override to implement individual handling of seperators
	build_seperator: (content) ->
		$( "<span class='seperator'>#{content}</span>" ).appendTo( @element )


	# override to add animation logic etc.
	update_container: (container, digit) ->
		$( container ).html( digit )


	# dynamically reset the delay during runtime
	refresh_delay: (new_delay) ->
		clearInterval( @periodic );
		@options.delay = new_delay

		# call the tick() method inside this object's context
		@periodic = setInterval( () =>
			this.tick()
		, @options.delay );


	###
		Events
	###
	tick: () ->
		@value += @options.incremental
		this.render()


	###
		Controls for the ticker
	###
	start: () ->

		@element.empty();
		this.render()

		# call the tick() method inside this object's context
		@periodic = setInterval( () =>
			this.tick()
		, @options.delay );


	stop: () ->
		clearInterval( @periodic );






class Ticker extends StandardTicker

	update_container: (container, digit) ->
		super






class ScrollingTicker extends StandardTicker

	build_container: () ->
		$( '<span class="wheel"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span>' ).appendTo( @element )

	update_container: (container, digit) ->
		$( container ).animate({ top: digit * -96 }, @options.delay )


	# Just for testing... Useful later in combination with live data streamed from a server
	tick: () -> super this.refresh_delay( 200 ) if @value == 162007012






class SlidingTicker extends StandardTicker

	build_container: () ->

		super.bind( 'updateDigit', (e, target, old, digit) =>

			target.animate(
					{ backgroundPositionY: digit * -65 },
					{ duration: 500 })
		)

	update_container: (container, digit) ->
		target	= $( container )
		old		= target.html()

		super.triggerHandler( 'updateDigit', [target, old, digit])













