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
    
function stridx$(cmpstr, string, start=0) { return cmpstr.indexOf(string, start); }
function strridx$(cmpstr, string, start=0) { return cmpstr.lastIndexOf(string, start); }
function strrep$(src, pattern, replacement) {
	//    var regExp = new RegExp(pattern, "g");
	        return src.split(pattern).join(replacement); }
$(function() {
	function strat(str, i) {
		return substr$(str,i,1);
	}
	function isnum(str) {
		var i = 0;
		var numbers = '';
		numbers = '0123456789';
		while (true) {
			var j = 0;
			while (true) {
				if ((strat(str,i) ==  strat(numbers,j))) {
					break;
				}
				else if (true) {
					if ((j == 9)) {
						return false;
					}
				}
				j = (j + 1);
			}
			i = (i + 1);
			if ((i == strlen$(str))) {
				break;
			}
		}
		return true;
	}
	function strdel(str, idx, len) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		var i = 0;
		while (true) {
			if (((idx <= i) &&  (i < (idx + len)))) {
			}
			else if (true) {
				res = (res + strat(str,i));
			}
			if ((i == strlen$(str))) {
				break;
			}
			i = (i + 1);
		}
		return res;
	}
	function strins(src, idx, dst) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		res = (substr$(src,0,idx) +  dst + substr$(src,idx));
		return res;
	}
	;
	function _li_is_colon(list, i) {
		if ((strlen$(list) >=  1)) {
			if ((strlen$(list) >  i)) {
				return (!(('%' == strat(list,(i - 1)))) &&  (':' == strat(list,i)));
			}
			else if (true) {
				console.log('Error(_li_is_colon): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function _li_is_bar(list, i) {
		if ((strlen$(list) >=  1)) {
			if ((strlen$(list) >  i)) {
				return (!(('%' == strat(list,(i - 1)))) &&  ('|' == strat(list,i)));
			}
			else if (true) {
				console.log('Error(_li_is_bar): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function lilen(list) {
		if ((strlen$(list) <=  1)) {
			return 0;
		}
		var res = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_li_is_colon(list,i)) {
				res = (res + 1);
			}
			i = (i + 1);
			if ((i == strlen$(list))) {
				break;
			}
		}
		return res;
	}
	function liat(list, idx) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(liat): Index error.');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		start_of_element = (1 + stridx$(list,':',start_of_element));
		var end_of_element = 0;
		end_of_element = stridx$(list,'|',start_of_element);
		var res = '';
		res = substr$(list,start_of_element,(end_of_element - start_of_element));
		var i = 0;
		i = 1;
		if ((i > 1)) {
			while (true) {
				i = (i + 1);
				if ((i == strlen$(res))) {
					break;
				}
			}
		}
		return res;
	}
	function licon(list, element) {
		if ((strlen$(element) ==  0)) {
			return ;
		}
		var escaped_str = '';
		var i = 0;
		while (true) {
			var char = '';
			char = strat(element,i);
			if ((char == ':')) {
				char = '%:';
			}
			if ((char == '|')) {
				char = '%|';
			}
			if ((char == '%')) {
				char = '%%';
			}
			escaped_str = (escaped_str + char);
			i = (i + 1);
			if ((i == strlen$(element))) {
				break;
			}
		}
		list = (list + lilen(list) +  ':' + escaped_str + '|');
		return list;
	}
	function lidel(list, idx) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(lidel) Index error');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		var end_of_element = 0;
		end_of_element = (1 + stridx$(list,'|',start_of_element));
		var res = '';
		res = (substr$(list,0,start_of_element) +  substr$(list,end_of_element));
		res = lireindex(res);
		return res;
	}
	function lireindex(list) {
		var count = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_li_is_colon(list,i)) {
				var bar_pos = 0;
				var j = 0;
				j = i;
				while (true) {
					if (_li_is_bar(list,j)) {
						bar_pos = (j + 1);
						break;
					}
					if ((j == 0)) {
						break;
					}
					j = (j - 1);
				}
				var figure_length = 0;
				figure_length = strlen$(String((count)));
				list = strdel(list,bar_pos,(i - bar_pos));
				list = strins(list,bar_pos,String((count)));
				count = (count + 1);
				i = (i + (figure_length - 1));
			}
			if ((i == (strlen$(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return list;
	}
	function lialt(list, idx, elm) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(lidel) Index error');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		var end_of_element = 0;
		end_of_element = stridx$(list,'|',start_of_element);
		var res = '';
		var figure_length = 0;
		figure_length = strlen$(String((idx)));
		res = (substr$(list,0,((1 + figure_length) +  start_of_element)) +  elm + substr$(list,end_of_element));
		return res;
	}
	function limatchstr(list, str) {
		var i = 0;
		while (true) {
			if ((liat(list,i) ==  str)) {
				return true;
			}
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return false;
	}
	function liidx(list, elm, start) {
		var i = 0;
		i = start;
		while (true) {
			if ((liat(list,i) ==  elm)) {
				return i;
			}
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return -1;
	}
	function lisub(list, start, length) {
		if ((length == 0)) {
			return '';
		}
		var res = '';
		var i = 0;
		i = start;
		while (true) {
			res = licon(res,liat(list,i));
			if ((i == ((start + length) -  1))) {
				break;
			}
			i = (i + 1);
		}
		res = lireindex(res);
		return res;
	}
	function liins(list, idx, elm) {
		return lireindex((lisub(list,0,(idx + 1)) +  licon('',elm) +  lisub(list,(idx + 1), (lilen(list) -  (idx + 1)))));
	}
	function li2str(list, sep) {
		var res = '';
		var i = 0;
		while (true) {
			res = (res + liat(list,i));
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
			res = (res + sep);
		}
		return res;
	}
	;
	;
	function strat(str, i) {
		return substr$(str,i,1);
	}
	function isnum(str) {
		var i = 0;
		var numbers = '';
		numbers = '0123456789';
		while (true) {
			var j = 0;
			while (true) {
				if ((strat(str,i) ==  strat(numbers,j))) {
					break;
				}
				else if (true) {
					if ((j == 9)) {
						return false;
					}
				}
				j = (j + 1);
			}
			i = (i + 1);
			if ((i == strlen$(str))) {
				break;
			}
		}
		return true;
	}
	function strdel(str, idx, len) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		var i = 0;
		while (true) {
			if (((idx <= i) &&  (i < (idx + len)))) {
			}
			else if (true) {
				res = (res + strat(str,i));
			}
			if ((i == strlen$(str))) {
				break;
			}
			i = (i + 1);
		}
		return res;
	}
	function strins(src, idx, dst) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		res = (substr$(src,0,idx) +  dst + substr$(src,idx));
		return res;
	}
	;
	function _li_is_colon(list, i) {
		if ((strlen$(list) >=  1)) {
			if ((strlen$(list) >  i)) {
				return (!(('%' == strat(list,(i - 1)))) &&  (':' == strat(list,i)));
			}
			else if (true) {
				console.log('Error(_li_is_colon): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function _li_is_bar(list, i) {
		if ((strlen$(list) >=  1)) {
			if ((strlen$(list) >  i)) {
				return (!(('%' == strat(list,(i - 1)))) &&  ('|' == strat(list,i)));
			}
			else if (true) {
				console.log('Error(_li_is_bar): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function lilen(list) {
		if ((strlen$(list) <=  1)) {
			return 0;
		}
		var res = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_li_is_colon(list,i)) {
				res = (res + 1);
			}
			i = (i + 1);
			if ((i == strlen$(list))) {
				break;
			}
		}
		return res;
	}
	function liat(list, idx) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(liat): Index error.');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		start_of_element = (1 + stridx$(list,':',start_of_element));
		var end_of_element = 0;
		end_of_element = stridx$(list,'|',start_of_element);
		var res = '';
		res = substr$(list,start_of_element,(end_of_element - start_of_element));
		var i = 0;
		i = 1;
		if ((i > 1)) {
			while (true) {
				i = (i + 1);
				if ((i == strlen$(res))) {
					break;
				}
			}
		}
		return res;
	}
	function licon(list, element) {
		if ((strlen$(element) ==  0)) {
			return ;
		}
		var escaped_str = '';
		var i = 0;
		while (true) {
			var char = '';
			char = strat(element,i);
			if ((char == ':')) {
				char = '%:';
			}
			if ((char == '|')) {
				char = '%|';
			}
			if ((char == '%')) {
				char = '%%';
			}
			escaped_str = (escaped_str + char);
			i = (i + 1);
			if ((i == strlen$(element))) {
				break;
			}
		}
		list = (list + lilen(list) +  ':' + escaped_str + '|');
		return list;
	}
	function lidel(list, idx) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(lidel) Index error');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		var end_of_element = 0;
		end_of_element = (1 + stridx$(list,'|',start_of_element));
		var res = '';
		res = (substr$(list,0,start_of_element) +  substr$(list,end_of_element));
		res = lireindex(res);
		return res;
	}
	function lireindex(list) {
		var count = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_li_is_colon(list,i)) {
				var bar_pos = 0;
				var j = 0;
				j = i;
				while (true) {
					if (_li_is_bar(list,j)) {
						bar_pos = (j + 1);
						break;
					}
					if ((j == 0)) {
						break;
					}
					j = (j - 1);
				}
				var figure_length = 0;
				figure_length = strlen$(String((count)));
				list = strdel(list,bar_pos,(i - bar_pos));
				list = strins(list,bar_pos,String((count)));
				count = (count + 1);
				i = (i + (figure_length - 1));
			}
			if ((i == (strlen$(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return list;
	}
	function lialt(list, idx, elm) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(lidel) Index error');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		var end_of_element = 0;
		end_of_element = stridx$(list,'|',start_of_element);
		var res = '';
		var figure_length = 0;
		figure_length = strlen$(String((idx)));
		res = (substr$(list,0,((1 + figure_length) +  start_of_element)) +  elm + substr$(list,end_of_element));
		return res;
	}
	function limatchstr(list, str) {
		var i = 0;
		while (true) {
			if ((liat(list,i) ==  str)) {
				return true;
			}
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return false;
	}
	function liidx(list, elm, start) {
		var i = 0;
		i = start;
		while (true) {
			if ((liat(list,i) ==  elm)) {
				return i;
			}
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return -1;
	}
	function lisub(list, start, length) {
		if ((length == 0)) {
			return '';
		}
		var res = '';
		var i = 0;
		i = start;
		while (true) {
			res = licon(res,liat(list,i));
			if ((i == ((start + length) -  1))) {
				break;
			}
			i = (i + 1);
		}
		res = lireindex(res);
		return res;
	}
	function liins(list, idx, elm) {
		return lireindex((lisub(list,0,(idx + 1)) +  licon('',elm) +  lisub(list,(idx + 1), (lilen(list) -  (idx + 1)))));
	}
	function li2str(list, sep) {
		var res = '';
		var i = 0;
		while (true) {
			res = (res + liat(list,i));
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
			res = (res + sep);
		}
		return res;
	}
	;
	function Web_Object (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.id = me.__name;
		
	}
	
	function Letter (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.color = '';
		me.backcolor = '';
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Letter';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.autofocus = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formenctype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.name = '';
		me.type = '';
		me.value = '';
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Button';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).prop('autofocus', me.autofocus);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).html(me.text);
		};
	}
	
	function Div (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Div';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Image (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.alt = '';
		me.crossorigin = '';
		me.longdesc = '';
		me.referrerpolicy = '';
		me.sizes = '';
		me.src = '';
		me.srcset = '';
		me.usemap = '';
		me.width = 0;
		me.height = 0;
		me.ismap = false;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Image';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('crossorigin', me.crossorigin);
			$("#" + me.id).prop('sizes', me.sizes);
			$("#" + me.id).attr('referrerpolicy', me.referrerpolicy);
			$("#" + me.id).prop('ismap', me.ismap);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).attr('usemap', me.usemap);
			$("#" + me.id).attr('alt', me.alt);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).attr('srcset', me.srcset);
			$("#" + me.id).attr('longdesc', me.longdesc);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Textbox (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.rows = 0;
		me.cols = 0;
		me.maxlength = 0;
		me.minlength = 0;
		me.text = '';
		me.autocapitalize = false;
		me.autocomplete = false;
		me.autofocus = false;
		me.disabled = false;
		me.spellcheck = false;
		me.readonly = false;
		me.selectionDirection = '';
		me.selectionEnd = 0;
		me.selectionStart = 0;
		me.form = '';
		me.placeholder = '';
		me.wrap = '';
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Textbox';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('rows', me.rows);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('cols', me.cols);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).attr('wrap', me.wrap);
			$("#" + me.id).attr('autocapitalize', me.autocapitalize);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Checkbox (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Checkbox';
			this.type = 'checkbox';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Color_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Color_Selector';
			this.type = 'color';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Date_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Date_Selector';
			this.type = 'date';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Email_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Email_Input';
			this.type = 'email';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function File_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'File_Selector';
			this.type = 'file';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Month_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Month_Selector';
			this.type = 'month';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Number_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Number_Selector';
			this.type = 'number';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Password (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Password';
			this.type = 'password';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Radio_Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Radio_Button';
			this.type = 'radio';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Range_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Range_Selector';
			this.type = 'range';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Reset_Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Reset_Button';
			this.type = 'reset';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Search_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Search_Input';
			this.type = 'search';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Submit_Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Submit_Button';
			this.type = 'submit';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function TEL_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'TEL_Input';
			this.type = 'tel';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function URL_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'URL_Input';
			this.type = 'url';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Time_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Time_Input';
			this.type = 'time';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Week_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
			this.maxlength = 40;
			this._web = 'Time_Input';
			this.type = 'time';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('height', me.height);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('selectionStart', me.selectionStart);
			$("#" + me.id).attr('selectionEnd', me.selectionEnd);
			$("#" + me.id).attr('autocomlete', me.autocomlete);
			$("#" + me.id).prop('capture', me.capture);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('min', me.min);
			$("#" + me.id).attr('minlength', me.minlength);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('width', me.width);
			$("#" + me.id).prop('readonly', me.readonly);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('pattern', me.pattern);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('max', me.max);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).attr('step', me.step);
			$("#" + me.id).attr('selectionDirection', me.selectionDirection);
			$("#" + me.id).attr('placeholder', me.placeholder);
			$("#" + me.id).attr('src', me.src);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).attr('list', me.list);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).attr('inputmode', me.inputmode);
			$("#" + me.id).attr('maxlength', me.maxlength);
			$("#" + me.id).html(me.text);
		};
	}
	
	function Combobox (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.autofocus = false;
		me.disabled = false;
		me.form = '';
		me.multiple = false;
		me.name = '';
		me.required = false;
		me.size = 0;
		me.choices = '';
		me.text = '';
		me.val = '';
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Combobox';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).prop('multiple', me.multiple);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).prop('required', me.required);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).prop('autofocus', me.autofocus);
			$("#" + me.id).attr('size', me.size);
			$("#" + me.id).html(me.text);
		};
	}
	Combobox.prototype.add_choice = function (choi) {
		this.text = (this.text + '<option value="' + choi + '">' + choi + '</option>`)');
		this.choices = licon(this.choices,choi);
		this.__update();
	};
	Combobox.prototype.selected_choice = function () {
		return $("#" + this.id).val();
		this.__update();
	};
	
	;
	;
	function strat(str, i) {
		return substr$(str,i,1);
	}
	function isnum(str) {
		var i = 0;
		var numbers = '';
		numbers = '0123456789';
		while (true) {
			var j = 0;
			while (true) {
				if ((strat(str,i) ==  strat(numbers,j))) {
					break;
				}
				else if (true) {
					if ((j == 9)) {
						return false;
					}
				}
				j = (j + 1);
			}
			i = (i + 1);
			if ((i == strlen$(str))) {
				break;
			}
		}
		return true;
	}
	function strdel(str, idx, len) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		var i = 0;
		while (true) {
			if (((idx <= i) &&  (i < (idx + len)))) {
			}
			else if (true) {
				res = (res + strat(str,i));
			}
			if ((i == strlen$(str))) {
				break;
			}
			i = (i + 1);
		}
		return res;
	}
	function strins(src, idx, dst) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		res = (substr$(src,0,idx) +  dst + substr$(src,idx));
		return res;
	}
	;
	function _map_is_colon(map, i) {
		if ((strlen$(map) >=  1)) {
			if ((strlen$(map) >  i)) {
				return (!(('%' == strat(map,(i - 1)))) &&  (':' == strat(map,i)));
			}
			else if (true) {
				console.log('Error(_map_is_colon): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function _map_is_bar(map, i) {
		if ((strlen$(map) >=  1)) {
			if ((strlen$(map) >  i)) {
				return (!(('%' == strat(map,(i - 1)))) &&  ('|' == strat(map,i)));
			}
			else if (true) {
				console.log('Error(_map_is_bar): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function maplen(map) {
		if ((strlen$(map) <=  1)) {
			return 0;
		}
		var res = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_map_is_colon(map,i)) {
				res = (res + 1);
			}
			i = (i + 1);
			if ((i == strlen$(map))) {
				break;
			}
		}
		return res;
	}
	function mapat(map, key) {
		var start_of_element = 0;
		start_of_element = stridx$(map,(key + ':'));
		if ((start_of_element == -1)) {
			console.log(('Error(mapat): "' + key + '" この名前のキーが見つかりませんでした。'));;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		start_of_element = (1 + stridx$(map,':',start_of_element));
		var end_of_element = 0;
		end_of_element = stridx$(map,'|',start_of_element);
		var res = '';
		res = substr$(map,start_of_element,(end_of_element - start_of_element));
		var i = 0;
		i = 1;
		if ((i > 1)) {
			while (true) {
				i = (i + 1);
				if ((i == strlen$(res))) {
					break;
				}
			}
		}
		return res;
	}
	function mapcon(map, key, value) {
		if ((strlen$(value) ==  0)) {
			return ;
		}
		var escaped_str = '';
		var i = 0;
		while (true) {
			var char = '';
			char = strat(value,i);
			if ((char == ':')) {
				char = '%:';
			}
			if ((char == '|')) {
				char = '%|';
			}
			if ((char == '%')) {
				char = '%%';
			}
			escaped_str = (escaped_str + char);
			i = (i + 1);
			if ((i == strlen$(value))) {
				break;
			}
		}
		map = (map + key + ':' + escaped_str + '|');
		return map;
	}
	function mapdel(map, key) {
		var start_of_element = 0;
		start_of_element = stridx$(map,(key + ':'));
		if ((start_of_element == -1)) {
			console.log(('Error(mapdel): "' + key + '" この名前のキーが見つかりませんでした。'));;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var end_of_element = 0;
		end_of_element = (1 + stridx$(map,'|',start_of_element));
		var res = '';
		res = (substr$(map,0,start_of_element) +  substr$(map,end_of_element));
		return res;
	}
	function mapalt(map, key, value) {
		var start_of_element = 0;
		start_of_element = stridx$(map,(key + ':'));
		if ((start_of_element == -1)) {
			console.log(('Error(mapalt): "' + key + '" この名前のキーが見つかりませんでした。'));;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var end_of_element = 0;
		end_of_element = stridx$(map,'|',start_of_element);
		var res = '';
		res = (substr$(map,0,((1 + strlen$(key)) +  start_of_element)) +  value + substr$(map,end_of_element));
		return res;
	}
	function mapmatchstr(map, str) {
		var i = 0;
		while (true) {
			if ((mapat(map,i) ==  str)) {
				return true;
			}
			if ((i == (maplen(map) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return false;
	}
	;
	;
	function category_btn (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.autofocus = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formenctype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.name = '';
		me.type = '';
		me.value = '';
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Button';
			this.class = 'category';
			this.style = 'border: none';
			this.__update();
		};
		me.__update = function () {
			$("#" + me.id).attr('accesskey', me.accesskey);
			$("#" + me.id).attr('class', me.class);
			$("#" + me.id).attr('contextmenu', me.contextmenu);
			$("#" + me.id).attr('dir', me.dir);
			$("#" + me.id).attr('dropzone', me.dropzone);
			$("#" + me.id).attr('id', me.id);
			$("#" + me.id).attr('itemid', me.itemid);
			$("#" + me.id).attr('itemprop', me.itemprop);
			$("#" + me.id).attr('itemref', me.itemref);
			$("#" + me.id).attr('itemscope', me.itemscope);
			$("#" + me.id).attr('itemtype', me.itemtype);
			$("#" + me.id).attr('lang', me.lang);
			$("#" + me.id).attr('style', me.style);
			$("#" + me.id).attr('title', me.title);
			$("#" + me.id).attr('translate', me.translate);
			$("#" + me.id).attr('contenteditable', me.contenteditable);
			$("#" + me.id).attr('draggable', me.draggable);
			$("#" + me.id).attr('hidden', me.hidden);
			$("#" + me.id).attr('spellcheck', me.spellcheck);
			$("#" + me.id).attr('tabindex', me.tabindex);
			$("#" + me.id).attr('formmethod', me.formmethod);
			$("#" + me.id).attr('name', me.name);
			$("#" + me.id).attr('form', me.form);
			$("#" + me.id).attr('formtarget', me.formtarget);
			$("#" + me.id).attr('formenctype', me.formenctype);
			$("#" + me.id).attr('formaction', me.formaction);
			$("#" + me.id).prop('disabled', me.disabled);
			$("#" + me.id).attr('value', me.value);
			$("#" + me.id).prop('formnovalidate', me.formnovalidate);
			$("#" + me.id).prop('autofocus', me.autofocus);
			if($("#" + me.id).get(0)) $("#" + me.id).get(0).type = me.type;
			$("#" + me.id).html(me.text);
		};
	}
	
	var categories = new Div("categories");
	categories._web = 'Div';
	$('body').append("<div id='categories'></div>");
	categories.__update();
	var L = new category_btn("L");
	L._web = 'Button';
	L.class = 'category';
	L.style = 'border: none';
	L._web = 'Button';
	L.class = 'category';
	L.style = 'border: none';
	$('body').append("<button id='L'></button>");
	L.__update();
	L.__update();
	L.text = 'length';
	$('#L').html(L.text);
	var S = new category_btn("S");
	S._web = 'Button';
	S.class = 'category';
	S.style = 'border: none';
	S._web = 'Button';
	S.class = 'category';
	S.style = 'border: none';
	$('body').append("<button id='S'></button>");
	S.__update();
	S.__update();
	S.text = 'scale';
	$('#S').html(S.text);
	var W = new category_btn("W");
	W._web = 'Button';
	W.class = 'category';
	W.style = 'border: none';
	W._web = 'Button';
	W.class = 'category';
	W.style = 'border: none';
	$('body').append("<button id='W'></button>");
	W.__update();
	W.__update();
	W.text = 'weight';
	$('#W').html(W.text);
	var Spd = new category_btn("Spd");
	Spd._web = 'Button';
	Spd.class = 'category';
	Spd.style = 'border: none';
	Spd._web = 'Button';
	Spd.class = 'category';
	Spd.style = 'border: none';
	$('body').append("<button id='Spd'></button>");
	Spd.__update();
	Spd.__update();
	Spd.text = 'speed';
	$('#Spd').html(Spd.text);
	var V = new category_btn("V");
	V._web = 'Button';
	V.class = 'category';
	V.style = 'border: none';
	V._web = 'Button';
	V.class = 'category';
	V.style = 'border: none';
	$('body').append("<button id='V'></button>");
	V.__update();
	V.__update();
	V.text = 'volume';
	$('#V').html(V.text);
	var D = new category_btn("D");
	D._web = 'Button';
	D.class = 'category';
	D.style = 'border: none';
	D._web = 'Button';
	D.class = 'category';
	D.style = 'border: none';
	$('body').append("<button id='D'></button>");
	D.__update();
	D.__update();
	D.text = 'data';
	$('#D').html(D.text);
	var F = new category_btn("F");
	F._web = 'Button';
	F.class = 'category';
	F.style = 'border: none';
	F._web = 'Button';
	F.class = 'category';
	F.style = 'border: none';
	$('body').append("<button id='F'></button>");
	F.__update();
	F.__update();
	F.text = 'force';
	$('#F').html(F.text);
	var src_set = new Div("src_set");
	src_set._web = 'Div';
	$('body').append("<div id='src_set'></div>");
	src_set.__update();
	var dst_set = new Div("dst_set");
	dst_set._web = 'Div';
	$('body').append("<div id='dst_set'></div>");
	dst_set.__update();
	var srcview = new Input("srcview");
	srcview._web = 'Input';
	srcview.maxlength = 40;
	$('#src_set').append("<input id='srcview'></input>");
	srcview.__update();
	var src = new Combobox("src");
	src._web = 'Combobox';
	$('#src_set').append("<select id='src'></select>");
	src.__update();
	var dstview = new Input("dstview");
	dstview._web = 'Input';
	dstview.maxlength = 40;
	$('#dst_set').append("<input id='dstview'></input>");
	dstview.__update();
	var dst = new Combobox("dst");
	dst._web = 'Combobox';
	$('#dst_set').append("<select id='dst'></select>");
	dst.__update();
	var units = '';
	units = mapcon(units,'メートル(m)','1');
	units = mapcon(units,'キロメートル(km)','0.001');
	units = mapcon(units,'センチメートル(cm)','100');
	units = mapcon(units,'ミリメートル(mm)','1000');
	units = mapcon(units,'マイクロメートル(μm)','1000000');
	units = mapcon(units,'ナノメートル(nm)','1000000000');
	units = mapcon(units,'インチ(in)','39.3701');
	units = mapcon(units,'フィート(ft)','3.28084');
	units = mapcon(units,'ヤード(yd)','1.09361');
	units = mapcon(units,'チェーン(ch)','0.0497097');
	units = mapcon(units,'ハロン(fur)','0.00497096');
	units = mapcon(units,'マイル(mile)','0.000621371');
	units = mapcon(units,'海里(M)','0.000539957');
	units = mapcon(units,'里（リ）','0.0002546304548209184');
	units = mapcon(units,'町（チョウ）','0.009166743056192134');
	units = mapcon(units,'間（ケン）','0.5500550055005501');
	units = mapcon(units,'丈（ジョウ）','0.33003300330033003');
	units = mapcon(units,'尺(シャク)','3.3000033000032998');
	units = mapcon(units,'寸（スン）','33.000033000033');
	units = mapcon(units,'分（ブ）','330.00033000033');
	units = mapcon(units,'厘（リン）','3300.3300330033003');
	units = mapcon(units,'東京タワー','0.0030066145520144315');
	units = mapcon(units,'東京スカイツリー','0.0015772870662460567');
	units = mapcon(units,'歩幅(78.45cm)','1.274697259');
	units = mapcon(units,'身体(170cm)','0.588235294');
	units = mapcon(units,'バイト(B)','1');
	units = mapcon(units,'ビット(Bit)','8');
	units = mapcon(units,'キロバイト(KB)','0.0009765625');
	units = mapcon(units,'メガバイト(MB)','0.00000095367431640625');
	units = mapcon(units,'ギガバイト(GB)','0.00000000093132257462');
	units = mapcon(units,'テラバイト(TB)','0.00000000000090949470');
	units = mapcon(units,'平方メートル(m2)','1');
	units = mapcon(units,'平方キロメートル(km2)','0.000001');
	units = mapcon(units,'平方センチメートル(cm2)','10000');
	units = mapcon(units,'平方インチ','1550.0031000062002');
	units = mapcon(units,'平方フィート','10.763910416709722');
	units = mapcon(units,'平方ヤード','1.1959900463010802');
	units = mapcon(units,'エーカー','0.0002460145640621925');
	units = mapcon(units,'アール(a)','0.01');
	units = mapcon(units,'ヘクタール(ha)','0.0001');
	units = mapcon(units,'町（チョウ）','0.00010083328627779973');
	units = mapcon(units,'段・反（タン）','0.0010083328627779973');
	units = mapcon(units,'畝（セ）','0.010083328627779975');
	units = mapcon(units,'坪（ツボ）','0.30249955381315813');
	units = mapcon(units,'尺坪（シャクツボ）','10.889687465969727');
	units = mapcon(units,'合（ゴウ）','3.024986387561256');
	units = mapcon(units,'勺（シャク）','30.248033877797944');
	units = mapcon(units,'畳','0.5494505494505494');
	units = mapcon(units,'東京ドーム','0.000021388086835632552');
	units = mapcon(units,'グラム(g)','1');
	units = mapcon(units,'キログラム(kg)','0.001');
	units = mapcon(units,'ミリグラム(mg)','1000');
	units = mapcon(units,'貫(カン)','0.0002666666666666667');
	units = mapcon(units,'斤(キン)','0.0016666666666666668');
	units = mapcon(units,'匁(モンメ)','0.26666666666666666');
	units = mapcon(units,'斤','0.0016666666666666668');
	units = mapcon(units,'両','0.0267');
	units = mapcon(units,'毛','266.6667');
	units = mapcon(units,'トン(t)','0.000001');
	units = mapcon(units,'グレイン','15.4324');
	units = mapcon(units,'カラット(ct)','5');
	units = mapcon(units,'オンス(oz)','0.353');
	units = mapcon(units,'薬用オンス(ozt)','0.322');
	units = mapcon(units,'ポンド(lb)','0.0022');
	units = mapcon(units,'リットル(L)','1');
	units = mapcon(units,'キロリットル(kL)','0.001');
	units = mapcon(units,'ミリリットル(mL)','1000');
	units = mapcon(units,'立方メートル(m3)','0.001');
	units = mapcon(units,'cc(cm3)','1000');
	units = mapcon(units,'石(コク)','0.005544466622310933');
	units = mapcon(units,'斗(ト)','0.05543544542380398');
	units = mapcon(units,'升(ショウ)','0.5543544542380398');
	units = mapcon(units,'合(ゴウ)','5.5432372505543235');
	units = mapcon(units,'勺(シャク)','55.55555555555556');
	units = mapcon(units,'立方坪','0.00016637550952499792');
	units = mapcon(units,'才(サイ)','0.035937612305038454');
	units = mapcon(units,'ガロン(英)','0.22');
	units = mapcon(units,'ガロン(米液用)','0.2642');
	units = mapcon(units,'ガロン(米穀用)','0.227');
	units = mapcon(units,'ガロン(計量法)','0.2642');
	units = mapcon(units,'キロメートル毎時(km/h)','1');
	units = mapcon(units,'メートル毎時(m/h)','1000');
	units = mapcon(units,'メートル毎分(m/min)','16.666666666666668');
	units = mapcon(units,'メートル毎秒(m/s)','0.2777777777777778');
	units = mapcon(units,'フィート毎時(fph)','3280.8398950131236');
	units = mapcon(units,'フィート毎秒(fps)','1.0972805000087782');
	units = mapcon(units,'マイル毎時(mph)','1.6093444978925633');
	units = mapcon(units,'ノット(kn)','1.8519993258722454');
	units = mapcon(units,'マッハ(M)','0.0008169934640522876');
	units = mapcon(units,'音速','0.0008162972105491721');
	$('#L').click(function () {
		src.text = '';
		$('#src').html(src.text);
		src.add_choice('メートル(m)');
		src.add_choice('キロメートル(km)');
		src.add_choice('センチメートル(cm)');
		src.add_choice('ミリメートル(mm)');
		src.add_choice('マイクロメートル(μm)');
		src.add_choice('ナノメートル(nm)');
		src.add_choice('インチ(in)');
		src.add_choice('フィート(ft)');
		src.add_choice('ヤード(yd)');
		src.add_choice('チェーン(ch)');
		src.add_choice('ハロン(fur)');
		src.add_choice('マイル(mile)');
		src.add_choice('海里(M)');
		src.add_choice('里（リ）');
		src.add_choice('町（チョウ）');
		src.add_choice('間（ケン）');
		src.add_choice('丈（ジョウ）');
		src.add_choice('尺(シャク)');
		src.add_choice('寸（スン）');
		src.add_choice('分（ブ）');
		src.add_choice('厘（リン）');
		src.add_choice('歩幅(78.45cm)');
		src.add_choice('身体(170cm)');
		dst.text = $('#src').html();
		$('#dst').html(dst.text);
	});
	$('#S').click(function () {
		src.text = '';
		$('#src').html(src.text);
		src.add_choice('平方メートル(m2)');
		src.add_choice('平方キロメートル(km2)');
		src.add_choice('平方センチメートル(cm2)');
		src.add_choice('平方インチ');
		src.add_choice('平方フィート');
		src.add_choice('平方ヤード');
		src.add_choice('エーカー');
		src.add_choice('アール(a)');
		src.add_choice('ヘクタール(ha)');
		src.add_choice('町（チョウ）');
		src.add_choice('段・反（タン）');
		src.add_choice('畝（セ）');
		src.add_choice('坪（ツボ）');
		src.add_choice('尺坪（シャクツボ）');
		src.add_choice('合（ゴウ）');
		src.add_choice('勺（シャク）');
		src.add_choice('畳');
		src.add_choice('東京ドーム');
		dst.text = $('#src').html();
		$('#dst').html(dst.text);
	});
	$('#W').click(function () {
		src.text = '';
		$('#src').html(src.text);
		src.add_choice('グラム(g)');
		src.add_choice('キログラム(kg)');
		src.add_choice('ミリグラム(mg)');
		src.add_choice('貫(カン)');
		src.add_choice('斤(キン)');
		src.add_choice('匁(モンメ)');
		src.add_choice('斤');
		src.add_choice('両');
		src.add_choice('毛');
		src.add_choice('トン(t)');
		src.add_choice('グレイン');
		src.add_choice('カラット(ct)');
		src.add_choice('オンス(oz)');
		src.add_choice('薬用オンス(ozt)');
		src.add_choice('ポンド(lb)');
		dst.text = $('#src').html();
		$('#dst').html(dst.text);
	});
	$('#V').click(function () {
		src.text = '';
		$('#src').html(src.text);
		src.add_choice('リットル(L)');
		src.add_choice('キロリットル(kL)');
		src.add_choice('ミリリットル(mL)');
		src.add_choice('立方メートル(m3)');
		src.add_choice('cc(cm3)');
		src.add_choice('石(コク)');
		src.add_choice('斗(ト)');
		src.add_choice('升(ショウ)');
		src.add_choice('合(ゴウ)');
		src.add_choice('勺(シャク)');
		src.add_choice('立方坪');
		src.add_choice('才(サイ)');
		src.add_choice('ガロン(英)');
		dst.text = $('#src').html();
		$('#dst').html(dst.text);
	});
	$('#Spd').click(function () {
		src.text = '';
		$('#src').html(src.text);
		src.add_choice('キロメートル毎時(km/h)');
		src.add_choice('メートル毎時(m/h)');
		src.add_choice('メートル毎分(m/min)');
		src.add_choice('メートル毎秒(m/s)');
		src.add_choice('フィート毎時(fph)');
		src.add_choice('フィート毎秒(fps)');
		src.add_choice('マイル毎時(mph)');
		src.add_choice('ノット(kn)');
		src.add_choice('マッハ(M)');
		src.add_choice('光速');
		src.add_choice('音速');
		dst.text = $('#src').html();
		$('#dst').html(dst.text);
	});
	$('#D').click(function () {
		src.text = '';
		$('#src').html(src.text);
		src.add_choice('バイト(B)');
		src.add_choice('ビット(Bit)');
		src.add_choice('キロバイト(KB)');
		src.add_choice('メガバイト(MB)');
		src.add_choice('ギガバイト(GB)');
		src.add_choice('テラバイト(TB)');
		dst.text = $('#src').html();
		$('#dst').html(dst.text);
	});
	var go_button = new Button("go_button");
	go_button._web = 'Button';
	$('body').append("<button id='go_button'></button>");
	go_button.__update();
	go_button.text = '変換';
	$('#go_button').html(go_button.text);
	$('#go_button').click(function () {
		var source = '';
		source = String(src.selected_choice());
		var destination = '';
		destination = String(dst.selected_choice());
		var magnif = 0;
		magnif = (Number(($('#srcview').val())) /  Number(mapat(units,source)));
		magnif = (magnif * Number(mapat(units,destination)));
		dstview.val = String(magnif);
		$('#dstview').val(dstview.val);
	});
	return;
});
