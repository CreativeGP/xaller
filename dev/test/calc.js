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
	$('body').append("<button type='button' id='plus_btn'></button>");
	var s = '';
	plus_btn$text = strrep$(' calc c  d  ','c','C');
	$('#plus_btn').html(plus_btn$text);;
	var cb1 = '';
	var cb1$_web = '';
	var cb1$accesskey = '';
	var cb1$class = '';
	var cb1$contextmenu = '';
	var cb1$dir = '';
	var cb1$dropzone = '';
	var cb1$id = '';
	var cb1$itemid = '';
	var cb1$itemprop = '';
	var cb1$itemref = '';
	var cb1$itemscope = '';
	var cb1$itemtype = '';
	var cb1$lang = '';
	var cb1$style = '';
	var cb1$title = '';
	var cb1$translate = '';
	var cb1$contenteditable = false;
	var cb1$draggable = false;
	var cb1$hidden = false;
	var cb1$spellcheck = false;
	var cb1$tabindex = 0;
	var cb1$type = '';
	var cb1$autocomplete = '';
	var cb1$autofocus = false;
	var cb1$capture = false;
	var cb1$disabled = false;
	var cb1$form = '';
	var cb1$formaction = '';
	var cb1$formactype = '';
	var cb1$formmethod = '';
	var cb1$formnovalidate = false;
	var cb1$formtarget = '';
	var cb1$height = 0;
	var cb1$inputmode = '';
	var cb1$list = '';
	var cb1$max = 0;
	var cb1$maxlength = 0;
	var cb1$min = 0;
	var cb1$minlength = 0;
	var cb1$multiple = false;
	var cb1$name = '';
	var cb1$pattern = '';
	var cb1$placeholder = '';
	var cb1$readonly = false;
	var cb1$required = false;
	var cb1$selectionDirection = '';
	var cb1$selectionStart = 0;
	var cb1$selectionEnd = 0;
	var cb1$size = 0;
	var cb1$spellcheck = '';
	var cb1$src = '';
	var cb1$step = '';
	var cb1$value = '';
	var cb1$width = 0;
	{
		cb1$_web = 'Input';
		;
	}
	$('body').append("<input id='cb1'>");
	{
		cb1$_web = 'Time_Input';
		;
		cb1$type = 'time';
		$('#cb1').get(0).type = cb1$type;
		;
	}
	return;
});
