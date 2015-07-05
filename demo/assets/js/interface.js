$( document ).ready( function()
{
  $( '.tick' ).ticker(
  {
    delay       : [50, 1000],  // will take random number in between 50 and 1000 ms
    separators  : true
  });
});
