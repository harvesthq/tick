
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
class DefaultTicker

	constructor: (@element, options={}) ->

		@running = no

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
		clearTimeout( @timer );
		@options.delay = new_delay
		this.set_timer()


	set_timer: () ->

		# setInterval can cause problems in inactive tabs (see: http://goo.gl/pToBS)
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






class Ticker extends DefaultTicker

	build_container: (i) ->
		val = String( @value ).split( '' )[ i ]
		$( "<span class='wrapper'>
				<span class='old'>#{val}</span>
				<span class='old-move'>#{val}</span>
				<span class='new'></span>
				<span class='new-move'>#{val}</span>
			</span>"
		)
		.appendTo( @element )


	update_container: (container, digit) ->

		nw = $( container ).children( '.new' )

		if( nw.html() != digit )

			move = $( container ).children( '.old-move' ).css({ zIndex: 1099 })

			move.stop(true, true).addClass( 'moving' ).animate(
				{ zIndex: 999 },
				{ duration: @options.delay / 4, step: (now, fx) =>
					move.css( '-webkit-transform', "scaleY(#{(now-998)/100})" )

				complete: =>
					move.html( digit )
						.removeClass( 'moving' )

					nw.css( 'z-index', 1098 )
					new_move = $( container ).children( '.new-move' ).html( digit ).css({ zIndex: 1097 })

					new_move.stop(true, true).addClass( 'moving' ).animate(
						{ zIndex: 997 },
						{ duration: @options.delay / 4, step: (now, fx) =>
							new_move.css( '-webkit-transform', "scaleY(#{1-((now-997)/100)})" )

						complete: =>
							new_move.html( digit )
								.removeClass( 'moving' )

							$( container ).children( '.old' ).html( digit )
							nw.css( 'z-index', '' )


						}, 'linear' )
				})

		nw.html( digit )





class ScrollTicker extends DefaultTicker

	build_container: () ->
		$( '<span class="wheel"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span>' ).appendTo( @element )

	update_container: (container, digit) ->
		$( container ).animate({ top: digit * -96 }, @options.delay )





class SlidingTicker extends Ticker

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













