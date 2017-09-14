$(function() {
	function foo(s) {
		return (s + 33);
	}
	var btn$_web = '';
	var btn$text = '';
	var btn = '';
	$('body').append("<button type='button' id='btn'></button>");
	btn$text = 'hello';
	$('#btn').html('hello');
	var btn2$_web = '';
	var btn2$text = '';
	var btn2 = '';
	$('#btn').before("<button type='button' id='btn2'></button>");
	btn2 = btn;
	btn2$_web = btn$_web;
	btn2$text = btn$text;
	;
	$('#btn2').html($('#btn').html());
	var i = 0;
	if (($('#btn').html() == 'hello')) {
		btn$text = 'txt';
		$('#btn').html('txt');
	}
	return;
});
