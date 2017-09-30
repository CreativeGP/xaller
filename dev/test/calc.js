function strlen$(str) { return str.length; }
function substr$(str, start, length=-1) { if (length == -1) { length = str.length - start;	} return str.substr(start, length); }

function strtrim$(str, char) {
	    res = ''
	    for (var i = 0; i < str.length; i++) {
		        if (str[i] != char) { res += str[i]; 		}
		    	}
	    return res;
}


function strtriml$(str, char) {
	    res = ''
	    if (str[0] != char) { return str; 	}
	    for (var i = 0; i < str.length; i++) {
		        if (str[i] != char) { res = str.substr(i); break; 		}
		    	}
	    return res;
}


function strtrimr$(str, char) {
	    res = ''
	    if (str[str.length-1] != char) { return str; 	}
	    for (var i = str.length-1; i >= 0; i--) {
		        if (str[i] != char) { res = str.substr(0, i+1); break; 		}
		    	}
	    return res;
}

function stridx$(cmpstr, string) { return cmpstr.indexOf(string); }
function strridx$(cmpstr, string) { return cmpstr.lastIndexOf(string); }
function strrep$(src, pattern, replacement) {
	var regExp = new RegExp(pattern, "g");
	return src.replace(regExp, replacement); }
$(function() {
	var i = 0;
	function negative(i) {
		return (0 - i);
	}
	var mode = 0;
	var using_operation = '';
	var num = 0;
	var test = '';
	var test$_web = '';
	var test$accesskey = '';
	var test$class = '';
	var test$contextmenu = '';
	var test$dir = '';
	var test$dropzone = '';
	var test$id = '';
	var test$itemid = '';
	var test$itemprop = '';
	var test$itemref = '';
	var test$itemscope = '';
	var test$itemtype = '';
	var test$lang = '';
	var test$style = '';
	var test$title = '';
	var test$translate = '';
	var test$contenteditable = false;
	var test$draggable = false;
	var test$hidden = false;
	var test$spellcheck = false;
	var test$tabindex = 0;
	var test$text = '';
	var test$type = '';
	var test$autocomplete = '';
	var test$autofocus = false;
	var test$capture = false;
	var test$disabled = false;
	var test$form = '';
	var test$formaction = '';
	var test$formactype = '';
	var test$formmethod = '';
	var test$formnovalidate = false;
	var test$formtarget = '';
	var test$height = 0;
	var test$inputmode = '';
	var test$list = '';
	var test$max = 0;
	var test$maxlength = 0;
	var test$min = 0;
	var test$minlength = 0;
	var test$multiple = false;
	var test$name = '';
	var test$pattern = '';
	var test$placeholder = '';
	var test$readonly = false;
	var test$required = false;
	var test$selectionDirection = '';
	var test$selectionStart = 0;
	var test$selectionEnd = 0;
	var test$size = 0;
	var test$spellcheck = '';
	var test$src = '';
	var test$step = '';
	var test$value = '';
	var test$width = 0;
	{
		test$_web = 'Input';
		;
	}
	$('body').append("<input id='test'></input>");var main = '';
	var main$_web = '';
	var main$accesskey = '';
	var main$class = '';
	var main$contextmenu = '';
	var main$dir = '';
	var main$dropzone = '';
	var main$id = '';
	var main$itemid = '';
	var main$itemprop = '';
	var main$itemref = '';
	var main$itemscope = '';
	var main$itemtype = '';
	var main$lang = '';
	var main$style = '';
	var main$title = '';
	var main$translate = '';
	var main$contenteditable = false;
	var main$draggable = false;
	var main$hidden = false;
	var main$spellcheck = false;
	var main$tabindex = 0;
	{
		main$_web = 'Div';
		;
	}
	$('body').append("<div id='main'></div>");var view = '';
	var view$_web = '';
	var view$accesskey = '';
	var view$class = '';
	var view$contextmenu = '';
	var view$dir = '';
	var view$dropzone = '';
	var view$id = '';
	var view$itemid = '';
	var view$itemprop = '';
	var view$itemref = '';
	var view$itemscope = '';
	var view$itemtype = '';
	var view$lang = '';
	var view$style = '';
	var view$title = '';
	var view$translate = '';
	var view$contenteditable = false;
	var view$draggable = false;
	var view$hidden = false;
	var view$spellcheck = false;
	var view$tabindex = 0;
	var view$rows = 0;
	var view$cols = 0;
	var view$maxlength = 0;
	var view$minlength = 0;
	var view$text = '';
	var view$autocapitalize = false;
	var view$autocomplete = false;
	var view$autofocus = false;
	var view$disabled = false;
	var view$spellcheck = false;
	var view$readonly = false;
	var view$selectionDirection = '';
	var view$selectionEnd = 0;
	var view$selectionStart = 0;
	var view$form = '';
	var view$placeholder = '';
	var view$wrap = '';
	{
		view$_web = 'Textbox';
		;
	}
	$('#main').append("<textarea id='view'></textarea>");var num1 = '';
	var num1$_web = '';
	var num1$accesskey = '';
	var num1$class = '';
	var num1$contextmenu = '';
	var num1$dir = '';
	var num1$dropzone = '';
	var num1$id = '';
	var num1$itemid = '';
	var num1$itemprop = '';
	var num1$itemref = '';
	var num1$itemscope = '';
	var num1$itemtype = '';
	var num1$lang = '';
	var num1$style = '';
	var num1$title = '';
	var num1$translate = '';
	var num1$contenteditable = false;
	var num1$draggable = false;
	var num1$hidden = false;
	var num1$spellcheck = false;
	var num1$tabindex = 0;
	{
		num1$_web = 'Div';
		;
	}
	$('body').append("<div id='num1'></div>");var num2 = '';
	var num2$_web = '';
	var num2$accesskey = '';
	var num2$class = '';
	var num2$contextmenu = '';
	var num2$dir = '';
	var num2$dropzone = '';
	var num2$id = '';
	var num2$itemid = '';
	var num2$itemprop = '';
	var num2$itemref = '';
	var num2$itemscope = '';
	var num2$itemtype = '';
	var num2$lang = '';
	var num2$style = '';
	var num2$title = '';
	var num2$translate = '';
	var num2$contenteditable = false;
	var num2$draggable = false;
	var num2$hidden = false;
	var num2$spellcheck = false;
	var num2$tabindex = 0;
	{
		num2$_web = 'Div';
		;
	}
	$('body').append("<div id='num2'></div>");var num3 = '';
	var num3$_web = '';
	var num3$accesskey = '';
	var num3$class = '';
	var num3$contextmenu = '';
	var num3$dir = '';
	var num3$dropzone = '';
	var num3$id = '';
	var num3$itemid = '';
	var num3$itemprop = '';
	var num3$itemref = '';
	var num3$itemscope = '';
	var num3$itemtype = '';
	var num3$lang = '';
	var num3$style = '';
	var num3$title = '';
	var num3$translate = '';
	var num3$contenteditable = false;
	var num3$draggable = false;
	var num3$hidden = false;
	var num3$spellcheck = false;
	var num3$tabindex = 0;
	{
		num3$_web = 'Div';
		;
	}
	$('body').append("<div id='num3'></div>");var operators = '';
	var operators$_web = '';
	var operators$accesskey = '';
	var operators$class = '';
	var operators$contextmenu = '';
	var operators$dir = '';
	var operators$dropzone = '';
	var operators$id = '';
	var operators$itemid = '';
	var operators$itemprop = '';
	var operators$itemref = '';
	var operators$itemscope = '';
	var operators$itemtype = '';
	var operators$lang = '';
	var operators$style = '';
	var operators$title = '';
	var operators$translate = '';
	var operators$contenteditable = false;
	var operators$draggable = false;
	var operators$hidden = false;
	var operators$spellcheck = false;
	var operators$tabindex = 0;
	{
		operators$_web = 'Div';
		;
	}
	$('body').append("<div id='operators'></div>");var button9 = '';
	var button9$_web = '';
	var button9$accesskey = '';
	var button9$class = '';
	var button9$contextmenu = '';
	var button9$dir = '';
	var button9$dropzone = '';
	var button9$id = '';
	var button9$itemid = '';
	var button9$itemprop = '';
	var button9$itemref = '';
	var button9$itemscope = '';
	var button9$itemtype = '';
	var button9$lang = '';
	var button9$style = '';
	var button9$title = '';
	var button9$translate = '';
	var button9$contenteditable = false;
	var button9$draggable = false;
	var button9$hidden = false;
	var button9$spellcheck = false;
	var button9$tabindex = 0;
	var button9$text = '';
	var button9$autofocus = false;
	var button9$autocomlete = '';
	var button9$disabled = false;
	var button9$form = '';
	var button9$formaction = '';
	var button9$formenctype = '';
	var button9$formmethod = '';
	var button9$formnovalidate = false;
	var button9$formtarget = '';
	var button9$name = '';
	var button9$type = '';
	var button9$value = '';
	var button9$num = 0;
	{
		button9$_web = 'Button';
		;
	}
	$('#num1').append("<button id='button9'></button>");var num = 0;
	function button9$set_num(num) {
		button9$num = num;
		;
		button9$text = String(num);
		$('#button9').html(button9$text);;
	}
	$('#button9').click(function () {
		view$text = ($('#view').html() + String((button9$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button9$set_num(9);
	var button8 = '';
	var button8$_web = '';
	var button8$accesskey = '';
	var button8$class = '';
	var button8$contextmenu = '';
	var button8$dir = '';
	var button8$dropzone = '';
	var button8$id = '';
	var button8$itemid = '';
	var button8$itemprop = '';
	var button8$itemref = '';
	var button8$itemscope = '';
	var button8$itemtype = '';
	var button8$lang = '';
	var button8$style = '';
	var button8$title = '';
	var button8$translate = '';
	var button8$contenteditable = false;
	var button8$draggable = false;
	var button8$hidden = false;
	var button8$spellcheck = false;
	var button8$tabindex = 0;
	var button8$text = '';
	var button8$autofocus = false;
	var button8$autocomlete = '';
	var button8$disabled = false;
	var button8$form = '';
	var button8$formaction = '';
	var button8$formenctype = '';
	var button8$formmethod = '';
	var button8$formnovalidate = false;
	var button8$formtarget = '';
	var button8$name = '';
	var button8$type = '';
	var button8$value = '';
	var button8$num = 0;
	{
		button8$_web = 'Button';
		;
	}
	$('#num1').append("<button id='button8'></button>");var num = 0;
	function button8$set_num(num) {
		button8$num = num;
		;
		button8$text = String(num);
		$('#button8').html(button8$text);;
	}
	$('#button8').click(function () {
		view$text = ($('#view').html() + String((button8$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button8$set_num(8);
	var button7 = '';
	var button7$_web = '';
	var button7$accesskey = '';
	var button7$class = '';
	var button7$contextmenu = '';
	var button7$dir = '';
	var button7$dropzone = '';
	var button7$id = '';
	var button7$itemid = '';
	var button7$itemprop = '';
	var button7$itemref = '';
	var button7$itemscope = '';
	var button7$itemtype = '';
	var button7$lang = '';
	var button7$style = '';
	var button7$title = '';
	var button7$translate = '';
	var button7$contenteditable = false;
	var button7$draggable = false;
	var button7$hidden = false;
	var button7$spellcheck = false;
	var button7$tabindex = 0;
	var button7$text = '';
	var button7$autofocus = false;
	var button7$autocomlete = '';
	var button7$disabled = false;
	var button7$form = '';
	var button7$formaction = '';
	var button7$formenctype = '';
	var button7$formmethod = '';
	var button7$formnovalidate = false;
	var button7$formtarget = '';
	var button7$name = '';
	var button7$type = '';
	var button7$value = '';
	var button7$num = 0;
	{
		button7$_web = 'Button';
		;
	}
	$('#num1').append("<button id='button7'></button>");var num = 0;
	function button7$set_num(num) {
		button7$num = num;
		;
		button7$text = String(num);
		$('#button7').html(button7$text);;
	}
	$('#button7').click(function () {
		view$text = ($('#view').html() + String((button7$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button7$set_num(7);
	var button6 = '';
	var button6$_web = '';
	var button6$accesskey = '';
	var button6$class = '';
	var button6$contextmenu = '';
	var button6$dir = '';
	var button6$dropzone = '';
	var button6$id = '';
	var button6$itemid = '';
	var button6$itemprop = '';
	var button6$itemref = '';
	var button6$itemscope = '';
	var button6$itemtype = '';
	var button6$lang = '';
	var button6$style = '';
	var button6$title = '';
	var button6$translate = '';
	var button6$contenteditable = false;
	var button6$draggable = false;
	var button6$hidden = false;
	var button6$spellcheck = false;
	var button6$tabindex = 0;
	var button6$text = '';
	var button6$autofocus = false;
	var button6$autocomlete = '';
	var button6$disabled = false;
	var button6$form = '';
	var button6$formaction = '';
	var button6$formenctype = '';
	var button6$formmethod = '';
	var button6$formnovalidate = false;
	var button6$formtarget = '';
	var button6$name = '';
	var button6$type = '';
	var button6$value = '';
	var button6$num = 0;
	{
		button6$_web = 'Button';
		;
	}
	$('#num2').append("<button id='button6'></button>");var num = 0;
	function button6$set_num(num) {
		button6$num = num;
		;
		button6$text = String(num);
		$('#button6').html(button6$text);;
	}
	$('#button6').click(function () {
		view$text = ($('#view').html() + String((button6$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button6$set_num(6);
	var button5 = '';
	var button5$_web = '';
	var button5$accesskey = '';
	var button5$class = '';
	var button5$contextmenu = '';
	var button5$dir = '';
	var button5$dropzone = '';
	var button5$id = '';
	var button5$itemid = '';
	var button5$itemprop = '';
	var button5$itemref = '';
	var button5$itemscope = '';
	var button5$itemtype = '';
	var button5$lang = '';
	var button5$style = '';
	var button5$title = '';
	var button5$translate = '';
	var button5$contenteditable = false;
	var button5$draggable = false;
	var button5$hidden = false;
	var button5$spellcheck = false;
	var button5$tabindex = 0;
	var button5$text = '';
	var button5$autofocus = false;
	var button5$autocomlete = '';
	var button5$disabled = false;
	var button5$form = '';
	var button5$formaction = '';
	var button5$formenctype = '';
	var button5$formmethod = '';
	var button5$formnovalidate = false;
	var button5$formtarget = '';
	var button5$name = '';
	var button5$type = '';
	var button5$value = '';
	var button5$num = 0;
	{
		button5$_web = 'Button';
		;
	}
	$('#num2').append("<button id='button5'></button>");var num = 0;
	function button5$set_num(num) {
		button5$num = num;
		;
		button5$text = String(num);
		$('#button5').html(button5$text);;
	}
	$('#button5').click(function () {
		view$text = ($('#view').html() + String((button5$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button5$set_num(5);
	var button4 = '';
	var button4$_web = '';
	var button4$accesskey = '';
	var button4$class = '';
	var button4$contextmenu = '';
	var button4$dir = '';
	var button4$dropzone = '';
	var button4$id = '';
	var button4$itemid = '';
	var button4$itemprop = '';
	var button4$itemref = '';
	var button4$itemscope = '';
	var button4$itemtype = '';
	var button4$lang = '';
	var button4$style = '';
	var button4$title = '';
	var button4$translate = '';
	var button4$contenteditable = false;
	var button4$draggable = false;
	var button4$hidden = false;
	var button4$spellcheck = false;
	var button4$tabindex = 0;
	var button4$text = '';
	var button4$autofocus = false;
	var button4$autocomlete = '';
	var button4$disabled = false;
	var button4$form = '';
	var button4$formaction = '';
	var button4$formenctype = '';
	var button4$formmethod = '';
	var button4$formnovalidate = false;
	var button4$formtarget = '';
	var button4$name = '';
	var button4$type = '';
	var button4$value = '';
	var button4$num = 0;
	{
		button4$_web = 'Button';
		;
	}
	$('#num2').append("<button id='button4'></button>");var num = 0;
	function button4$set_num(num) {
		button4$num = num;
		;
		button4$text = String(num);
		$('#button4').html(button4$text);;
	}
	$('#button4').click(function () {
		view$text = ($('#view').html() + String((button4$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button4$set_num(4);
	var button3 = '';
	var button3$_web = '';
	var button3$accesskey = '';
	var button3$class = '';
	var button3$contextmenu = '';
	var button3$dir = '';
	var button3$dropzone = '';
	var button3$id = '';
	var button3$itemid = '';
	var button3$itemprop = '';
	var button3$itemref = '';
	var button3$itemscope = '';
	var button3$itemtype = '';
	var button3$lang = '';
	var button3$style = '';
	var button3$title = '';
	var button3$translate = '';
	var button3$contenteditable = false;
	var button3$draggable = false;
	var button3$hidden = false;
	var button3$spellcheck = false;
	var button3$tabindex = 0;
	var button3$text = '';
	var button3$autofocus = false;
	var button3$autocomlete = '';
	var button3$disabled = false;
	var button3$form = '';
	var button3$formaction = '';
	var button3$formenctype = '';
	var button3$formmethod = '';
	var button3$formnovalidate = false;
	var button3$formtarget = '';
	var button3$name = '';
	var button3$type = '';
	var button3$value = '';
	var button3$num = 0;
	{
		button3$_web = 'Button';
		;
	}
	$('#num3').append("<button id='button3'></button>");var num = 0;
	function button3$set_num(num) {
		button3$num = num;
		;
		button3$text = String(num);
		$('#button3').html(button3$text);;
	}
	$('#button3').click(function () {
		view$text = ($('#view').html() + String((button3$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button3$set_num(3);
	var button2 = '';
	var button2$_web = '';
	var button2$accesskey = '';
	var button2$class = '';
	var button2$contextmenu = '';
	var button2$dir = '';
	var button2$dropzone = '';
	var button2$id = '';
	var button2$itemid = '';
	var button2$itemprop = '';
	var button2$itemref = '';
	var button2$itemscope = '';
	var button2$itemtype = '';
	var button2$lang = '';
	var button2$style = '';
	var button2$title = '';
	var button2$translate = '';
	var button2$contenteditable = false;
	var button2$draggable = false;
	var button2$hidden = false;
	var button2$spellcheck = false;
	var button2$tabindex = 0;
	var button2$text = '';
	var button2$autofocus = false;
	var button2$autocomlete = '';
	var button2$disabled = false;
	var button2$form = '';
	var button2$formaction = '';
	var button2$formenctype = '';
	var button2$formmethod = '';
	var button2$formnovalidate = false;
	var button2$formtarget = '';
	var button2$name = '';
	var button2$type = '';
	var button2$value = '';
	var button2$num = 0;
	{
		button2$_web = 'Button';
		;
	}
	$('#num3').append("<button id='button2'></button>");var num = 0;
	function button2$set_num(num) {
		button2$num = num;
		;
		button2$text = String(num);
		$('#button2').html(button2$text);;
	}
	$('#button2').click(function () {
		view$text = ($('#view').html() + String((button2$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button2$set_num(2);
	var button1 = '';
	var button1$_web = '';
	var button1$accesskey = '';
	var button1$class = '';
	var button1$contextmenu = '';
	var button1$dir = '';
	var button1$dropzone = '';
	var button1$id = '';
	var button1$itemid = '';
	var button1$itemprop = '';
	var button1$itemref = '';
	var button1$itemscope = '';
	var button1$itemtype = '';
	var button1$lang = '';
	var button1$style = '';
	var button1$title = '';
	var button1$translate = '';
	var button1$contenteditable = false;
	var button1$draggable = false;
	var button1$hidden = false;
	var button1$spellcheck = false;
	var button1$tabindex = 0;
	var button1$text = '';
	var button1$autofocus = false;
	var button1$autocomlete = '';
	var button1$disabled = false;
	var button1$form = '';
	var button1$formaction = '';
	var button1$formenctype = '';
	var button1$formmethod = '';
	var button1$formnovalidate = false;
	var button1$formtarget = '';
	var button1$name = '';
	var button1$type = '';
	var button1$value = '';
	var button1$num = 0;
	{
		button1$_web = 'Button';
		;
	}
	$('#num3').append("<button id='button1'></button>");var num = 0;
	function button1$set_num(num) {
		button1$num = num;
		;
		button1$text = String(num);
		$('#button1').html(button1$text);;
	}
	$('#button1').click(function () {
		view$text = ($('#view').html() + String((button1$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button1$set_num(1);
	var button0 = '';
	var button0$_web = '';
	var button0$accesskey = '';
	var button0$class = '';
	var button0$contextmenu = '';
	var button0$dir = '';
	var button0$dropzone = '';
	var button0$id = '';
	var button0$itemid = '';
	var button0$itemprop = '';
	var button0$itemref = '';
	var button0$itemscope = '';
	var button0$itemtype = '';
	var button0$lang = '';
	var button0$style = '';
	var button0$title = '';
	var button0$translate = '';
	var button0$contenteditable = false;
	var button0$draggable = false;
	var button0$hidden = false;
	var button0$spellcheck = false;
	var button0$tabindex = 0;
	var button0$text = '';
	var button0$autofocus = false;
	var button0$autocomlete = '';
	var button0$disabled = false;
	var button0$form = '';
	var button0$formaction = '';
	var button0$formenctype = '';
	var button0$formmethod = '';
	var button0$formnovalidate = false;
	var button0$formtarget = '';
	var button0$name = '';
	var button0$type = '';
	var button0$value = '';
	var button0$num = 0;
	{
		button0$_web = 'Button';
		;
	}
	$('#num3').append("<button id='button0'></button>");var num = 0;
	function button0$set_num(num) {
		button0$num = num;
		;
		button0$text = String(num);
		$('#button0').html(button0$text);;
	}
	$('#button0').click(function () {
		view$text = ($('#view').html() + String((button0$num)));
		$('#view').html(view$text);;
		mode = 1;
		;
	});
	button0$set_num(0);
	var plus_btn = '';
	var plus_btn$_web = '';
	var plus_btn$accesskey = '';
	var plus_btn$class = '';
	var plus_btn$contextmenu = '';
	var plus_btn$dir = '';
	var plus_btn$dropzone = '';
	var plus_btn$id = '';
	var plus_btn$itemid = '';
	var plus_btn$itemprop = '';
	var plus_btn$itemref = '';
	var plus_btn$itemscope = '';
	var plus_btn$itemtype = '';
	var plus_btn$lang = '';
	var plus_btn$style = '';
	var plus_btn$title = '';
	var plus_btn$translate = '';
	var plus_btn$contenteditable = false;
	var plus_btn$draggable = false;
	var plus_btn$hidden = false;
	var plus_btn$spellcheck = false;
	var plus_btn$tabindex = 0;
	var plus_btn$text = '';
	var plus_btn$autofocus = false;
	var plus_btn$autocomlete = '';
	var plus_btn$disabled = false;
	var plus_btn$form = '';
	var plus_btn$formaction = '';
	var plus_btn$formenctype = '';
	var plus_btn$formmethod = '';
	var plus_btn$formnovalidate = false;
	var plus_btn$formtarget = '';
	var plus_btn$name = '';
	var plus_btn$type = '';
	var plus_btn$value = '';
	{
		plus_btn$_web = 'Button';
		;
	}
	$('#operators').append("<button id='plus_btn'></button>");plus_btn$text = '+';
	$('#plus_btn').html(plus_btn$text);;
	$('#plus_btn').click(function () {
		if ((mode == 1)) {
			view$text = ($('#view').html() + '+');
			$('#view').html(view$text);;
			mode = 0;
			;
			using_operation = '+';
			;
		}
	});
	var product_btn = '';
	var product_btn$_web = '';
	var product_btn$accesskey = '';
	var product_btn$class = '';
	var product_btn$contextmenu = '';
	var product_btn$dir = '';
	var product_btn$dropzone = '';
	var product_btn$id = '';
	var product_btn$itemid = '';
	var product_btn$itemprop = '';
	var product_btn$itemref = '';
	var product_btn$itemscope = '';
	var product_btn$itemtype = '';
	var product_btn$lang = '';
	var product_btn$style = '';
	var product_btn$title = '';
	var product_btn$translate = '';
	var product_btn$contenteditable = false;
	var product_btn$draggable = false;
	var product_btn$hidden = false;
	var product_btn$spellcheck = false;
	var product_btn$tabindex = 0;
	var product_btn$text = '';
	var product_btn$autofocus = false;
	var product_btn$autocomlete = '';
	var product_btn$disabled = false;
	var product_btn$form = '';
	var product_btn$formaction = '';
	var product_btn$formenctype = '';
	var product_btn$formmethod = '';
	var product_btn$formnovalidate = false;
	var product_btn$formtarget = '';
	var product_btn$name = '';
	var product_btn$type = '';
	var product_btn$value = '';
	{
		product_btn$_web = 'Button';
		;
	}
	$('#operators').append("<button id='product_btn'></button>");product_btn$text = '*';
	$('#product_btn').html(product_btn$text);;
	$('#product_btn').click(function () {
		if (p,(mode == 1)) {
			view$text = ($('#view').html() + '*');
			$('#view').html(view$text);;
			mode = 0;
			;
			using_operation = '*';
			;
		}
	});
	var mi_btn = '';
	var mi_btn$_web = '';
	var mi_btn$accesskey = '';
	var mi_btn$class = '';
	var mi_btn$contextmenu = '';
	var mi_btn$dir = '';
	var mi_btn$dropzone = '';
	var mi_btn$id = '';
	var mi_btn$itemid = '';
	var mi_btn$itemprop = '';
	var mi_btn$itemref = '';
	var mi_btn$itemscope = '';
	var mi_btn$itemtype = '';
	var mi_btn$lang = '';
	var mi_btn$style = '';
	var mi_btn$title = '';
	var mi_btn$translate = '';
	var mi_btn$contenteditable = false;
	var mi_btn$draggable = false;
	var mi_btn$hidden = false;
	var mi_btn$spellcheck = false;
	var mi_btn$tabindex = 0;
	var mi_btn$text = '';
	var mi_btn$autofocus = false;
	var mi_btn$autocomlete = '';
	var mi_btn$disabled = false;
	var mi_btn$form = '';
	var mi_btn$formaction = '';
	var mi_btn$formenctype = '';
	var mi_btn$formmethod = '';
	var mi_btn$formnovalidate = false;
	var mi_btn$formtarget = '';
	var mi_btn$name = '';
	var mi_btn$type = '';
	var mi_btn$value = '';
	{
		mi_btn$_web = 'Button';
		;
	}
	$('#operators').append("<button id='mi_btn'></button>");mi_btn$text = '-';
	$('#mi_btn').html(mi_btn$text);;
	$('#mi_btn').click(function () {
		if ((mode == 1)) {
			view$text = ($('#view').html() + '-');
			$('#view').html(view$text);;
			mode = 0;
			;
			using_operation = '-';
			;
		}
	});
	var divid_btn = '';
	var divid_btn$_web = '';
	var divid_btn$accesskey = '';
	var divid_btn$class = '';
	var divid_btn$contextmenu = '';
	var divid_btn$dir = '';
	var divid_btn$dropzone = '';
	var divid_btn$id = '';
	var divid_btn$itemid = '';
	var divid_btn$itemprop = '';
	var divid_btn$itemref = '';
	var divid_btn$itemscope = '';
	var divid_btn$itemtype = '';
	var divid_btn$lang = '';
	var divid_btn$style = '';
	var divid_btn$title = '';
	var divid_btn$translate = '';
	var divid_btn$contenteditable = false;
	var divid_btn$draggable = false;
	var divid_btn$hidden = false;
	var divid_btn$spellcheck = false;
	var divid_btn$tabindex = 0;
	var divid_btn$text = '';
	var divid_btn$autofocus = false;
	var divid_btn$autocomlete = '';
	var divid_btn$disabled = false;
	var divid_btn$form = '';
	var divid_btn$formaction = '';
	var divid_btn$formenctype = '';
	var divid_btn$formmethod = '';
	var divid_btn$formnovalidate = false;
	var divid_btn$formtarget = '';
	var divid_btn$name = '';
	var divid_btn$type = '';
	var divid_btn$value = '';
	{
		divid_btn$_web = 'Button';
		;
	}
	$('#operators').append("<button id='divid_btn'></button>");divid_btn$text = '/';
	$('#divid_btn').html(divid_btn$text);;
	$('#divid_btn').click(function () {
		if ((mode == 1)) {
			view$text = ($('#view').html() + '/');
			$('#view').html(view$text);;
			mode = 0;
			;
			using_operation = '/';
			;
		}
	});
	var eq_btn = '';
	var eq_btn$_web = '';
	var eq_btn$accesskey = '';
	var eq_btn$class = '';
	var eq_btn$contextmenu = '';
	var eq_btn$dir = '';
	var eq_btn$dropzone = '';
	var eq_btn$id = '';
	var eq_btn$itemid = '';
	var eq_btn$itemprop = '';
	var eq_btn$itemref = '';
	var eq_btn$itemscope = '';
	var eq_btn$itemtype = '';
	var eq_btn$lang = '';
	var eq_btn$style = '';
	var eq_btn$title = '';
	var eq_btn$translate = '';
	var eq_btn$contenteditable = false;
	var eq_btn$draggable = false;
	var eq_btn$hidden = false;
	var eq_btn$spellcheck = false;
	var eq_btn$tabindex = 0;
	var eq_btn$text = '';
	var eq_btn$autofocus = false;
	var eq_btn$autocomlete = '';
	var eq_btn$disabled = false;
	var eq_btn$form = '';
	var eq_btn$formaction = '';
	var eq_btn$formenctype = '';
	var eq_btn$formmethod = '';
	var eq_btn$formnovalidate = false;
	var eq_btn$formtarget = '';
	var eq_btn$name = '';
	var eq_btn$type = '';
	var eq_btn$value = '';
	{
		eq_btn$_web = 'Button';
		;
	}
	$('#operators').append("<button id='eq_btn'></button>");eq_btn$text = '=';
	$('#eq_btn').html(eq_btn$text);;
	$('#eq_btn').click(function () {
		if ((mode == 1)) {
			var ans = 0;
			var a = 0;
			var b = 0;
			a = Number(substr$($('#view').html(),0,stridx$($('#view').html(),using_operation)));
			;
			b = Number(substr$($('#view').html(),(2 + stridx$($('#view').html(),using_operation)) +  negative(1)));
			;
			if ((using_operation == '+')) {
				ans = (a + b);
				;
			}
			else if ((using_operation == '-')) {
				ans = (a - b);
				;
			}
			else if ((using_operation == '*')) {
				ans = (a * b);
				;
			}
			else if ((using_operation == '/')) {
				ans = (a / b);
				;
			}
			view$text = ($('#view').html() + '=' + String((ans)));
			$('#view').html(view$text);;
			mode = 0;
			;
		}
	});
	return;
});
