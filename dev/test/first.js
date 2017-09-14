$(function() {
	function foo(s) {
		return (s + 33);
	}
	var btn$_web = '';
	var btn$text = '';
	function btn$__init() {var btn = '';
		$('body').append("<button type='button' id='btn'></button>");
		btn$text = 'Button from xaller.';
		$('#btn').html('Button from xaller.');
		btn$_web = 'Button';
		var i = 0;
		while (true) {
			if ((i == 10)) {
				break;
			}
			i = (i + 1);
		}
		return;
	});
