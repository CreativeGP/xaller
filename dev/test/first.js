$(function() {
	function foo(s) {
		return ('ss +  '3333);
	}
	var btn = '';
	var btn$_web = '';
	var btn$text = '';
	var btn$name = '';
	function btn$__init() {
		btn$text = 'Button from xaller.';
		$('#btn').html(btn$text);
		btn$_web = 'Button';
	}
	btn$text = 'きよみ';
	$('#btn').html(btn$text);
	$('#btn').hover(function () {
		btn$text = 'きよみが押しました';
		$('#btn').html(btn$text);
	});
	return;
});
