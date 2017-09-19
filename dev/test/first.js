$(function() {
	function foo(s) {
		return (s +  33);
	}
	var btn = '';
	var btn$_web = '';
	var btn$text = '';
	var btn$name = '';
	{
		btn$_web = 'Button';
	}
	$('body').append("<button type='button' id='btn'></button>");
	btn$text = 'きよみ';
	$('#btn').html(btn$text);
	$('#btn').hover(function () {
		btn$text = 'きよみが押しました';
		$('#btn').html(btn$text);
	});
	return;
});
