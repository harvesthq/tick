Tick
====

Tick is a JavaScript plugin that makes visualizing dynamically changing numbers a breeze.



Attributes
----------

* `running` _boolean_
  indicates whether the ticker is active

* `options` _object_
  all runtime options

* `element` _object_
  the element that is used for this ticker

* `value` _int_
  whatever value you pass in to the ticker

* `separators` _array_
  a list of all separators


Options
-------

* `incremental` _int_
  the amount by which the target value is to be increased

* `delay` _int_
  the time in milliseconds after which the target value is being increased

* `separators` _boolean_
  if true, all arbitrary characters inbetween digits are wrapped in seperated elements. if false, these characters are stripped out

* `autostart` _boolean_
  whether or not to start the ticker when instantiated


Events
------

* onStart

* onTick

* onStop







