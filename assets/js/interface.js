
$( document ).ready( function()
{

	$( '.tracked' ).ticker(
	{
		delay: 800,
		incremental: 1,
		seperators: true,
		autostart: true
	});

	$( '.time' ).ticker(
	{
		delay: 1000,
		incremental: 1,
		seperators: true,
		autostart: true
	});

});