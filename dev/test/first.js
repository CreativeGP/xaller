$(function() {
	function foo(s) {
		return (s + 33);
	}
	var i = 0;
	var btn = '';
	var btn$_web = '';
	var btn$text = '';
	var btn$name = '';
	
	btn$text = 'Button from xaller.';
	$('#btn').html(btn$text);
	btn$_web = 'Button';
	$('body').append("<button type='button' id='btn'></button>");
	btn$text = 'きよみ';
	$('#btn').html(btn$text);
	$('#btn').hover(function () {
		btn$text = 'きよみが押しました';
		$('#btn').html(btn$text);
	});
	return;
});
