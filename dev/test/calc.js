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
	{
		plus_btn$_web = 'Button';
		;
	}
	$('body').append("<button type='button' id='plus_btn'></button>");
	var s = '';
	plus_btn$text = strrep$(' calc c  d  ','c','C');
	$('#plus_btn').html(plus_btn$text);;
	return;
});
