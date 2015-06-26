Tick
====

Tick is a JavaScript plugin that makes visualizing dynamically changing numbers a breeze.

Instance Methods
----------------

**Note:** `$().ticker` always returns an _array_ of `Tick` instances, so always
call these methods on that array’s element(s)!

* `start`
  Renders and starts the `Tick` instance. Returns the instance’s timer or
  `undefined` if it was already running.

* `stop`
  Stops the `Tick` instance and clears out the timer. Returns `false`.


Attributes
----------

* `running` _boolean_
  indicates whether the ticker has been started

* `options` _object_
  all runtime options

* `element` _object_
  the element that is used for this ticker

* `value` _int_
  whatever value you pass in to the ticker

* `separators` _array_
  a list of all separators

* `increment` _function_
  callback used to update @value on every tick


Options
-------

* `incremental` _mixed_
  can be either a fixed numeric value that gets added to the base value on each tick or a function that gets called with the current value and must return the updated number

* `delay` _int_
  the time in milliseconds after which the target value is being increased

* `separators` _boolean_
  if true, all arbitrary characters inbetween digits are wrapped in seperated elements. if false, these characters are stripped out

* `autostart` _boolean_
  whether or not to start the ticker when instantiated
