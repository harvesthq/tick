$( document ).ready( function()
{
  $( '.tick' ).ticker(
  {
    delay       : 700,
    incremental : 1,
    seperators  : true,
    autostart   : true
  });
});