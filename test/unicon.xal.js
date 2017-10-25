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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
		me.value = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			this._web = 'Input';
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
			$("#" + me.id).get(0).type = me.type;
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
	var div = new Div("div");
	div._web = 'Div';
	$('body').append("<div id='div'></div>");
	var srcbit = new Input("srcbit");
	srcbit._web = 'Input';
	$('#div').append("<input id='srcbit'></input>");
	var src = new Combobox("src");
	src._web = 'Combobox';
	$('#div').append("<select id='src'></select>");
	var dst = new Combobox("dst");
	dst._web = 'Combobox';
	$('body').append("<select id='dst'></select>");
	var testmap = '';
	testmap = mapcon(testmap,'Alice','6');
	testmap = mapcon(testmap,'Bob','14');
	testmap = mapcon(testmap,'Alex','23');
	src.add_choice('ビット(bit)');
	src.add_choice('バイト(byte)');
	src.add_choice(testmap);
	src.add_choice(String(maplen(testmap)));
	src.add_choice(mapat(testmap,'Alice'));
	testmap = mapdel(testmap,'Bob');
	src.add_choice(testmap);
	testmap = mapalt(testmap,'Alex','32');
	src.add_choice(testmap);
	src.add_choice('(bit)');
	src.add_choice('ビット(bit)');
	var go_button = new Button("go_button");
	go_button._web = 'Button';
	$('body').append("<button id='go_button'></button>");
	go_button.text = '変換';
	$('#go_button').html(go_button.text);
	$('#go_button').click(function () {
		console.log(String(src.selected_choice()));;
	});
	return;
});
