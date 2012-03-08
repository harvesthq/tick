$( document ).ready( function()
{
  $( '.tick' ).ticker(
  {
    delay       : 10,
    incremental : 100,
    seperators  : true,
    autostart   : true
  });
});