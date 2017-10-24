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
	
	;
	;
	function min(a, b) {
		if ((a < b)) {
			return a;
		}
		return b;
	}
	function max(a, b) {
		if ((a > b)) {
			return a;
		}
		return b;
	}
	function fact(n) {
		var m = 0;
		var i = 0;
		if ((n == 0)) {
			return 1;
		}
		else if (true) {
			m = fact((n - 1));
			return (n * m);
		}
	}
	function fib(n) {
		if (((n == 0) ||  (n == 1))) {
			return 1;
		}
		return (fib((n - 1)) +  fib((n - 2)));
	}
	;
	;
	var mode = 0;
	var using_operation = '';
	var lOperators = '';
	lOperators = licon(lOperators,'+');
	lOperators = licon(lOperators,'-');
	lOperators = licon(lOperators,'*');
	lOperators = licon(lOperators,'/');
	var lSeparators = '';
	lSeparators = lOperators;
	lSeparators = licon(lSeparators,'(');
	lSeparators = licon(lSeparators,')');
	var main = new Div("main");
	main._web = 'Div';
	$('body').append("<div id='main'></div>");
	var num1 = new Div("num1");
	num1._web = 'Div';
	$('body').append("<div id='num1'></div>");
	var num2 = new Div("num2");
	num2._web = 'Div';
	$('body').append("<div id='num2'></div>");
	var num3 = new Div("num3");
	num3._web = 'Div';
	$('body').append("<div id='num3'></div>");
	var operators = new Div("operators");
	operators._web = 'Div';
	$('body').append("<div id='operators'></div>");
	var view = new Textbox("view");
	view._web = 'Textbox';
	$('#main').append("<textarea id='view'></textarea>");
	view.text = '0';
	$('#view').val(view.text);
	mode = 0;
	function makelist(str) {
		var words = '';
		var ofs = 0;
		while (true) {
			var tmpofs = 0;
			tmpofs = ofs;
			ofs = 100000;
			var i = 0;
			while (true) {
				var opridx = 0;
				opridx = stridx$(str,liat(lSeparators,i) ,  tmpofs);
				if (!((opridx == -1))) {
					ofs = min(ofs,opridx);
				}
				i = (i + 1);
				if ((i == lilen(lSeparators))) {
					if ((ofs == 0)) {
						ofs = 1;
					}
					break;
				}
			}
			if ((ofs == 100000)) {
				words = licon(words,substr$(str,(tmpofs - 1)));
				break;
			}
			if ((tmpofs == 0)) {
				tmpofs = 0;
			}
			else if (true) {
				tmpofs = (tmpofs - 1);
			}
			words = licon(words,substr$(str,tmpofs,(ofs - tmpofs)));
			ofs = (1 + ofs);
		}
		i = 0;
		while (true) {
			if (((strat(liat(words,i), 0) ==  '(') &&  (strlen$(liat(words,i)) >  1))) {
				words = liins(words,i,substr$(liat(words,i) ,  1));
				words = lialt(words,i,'(');
			}
			if (((lilen(words) -  1) ==  i)) {
				break;
			}
			i = (i + 1);
		}
		return words;
	}
	function parse(words) {
		var i = 0;
		while (true) {
			if ((strat(liat(words,i), 0) ==  '(')) {
				var ans = '';
				var parsen = '';
				var indent = 0;
				var j = 0;
				j = i;
				while (true) {
					if ((liat(words,j) ==  '(')) {
						indent = (indent + 1);
					}
					parsen = (parsen + liat(words,j));
					if ((liat(words,j) ==  ')')) {
						indent = (indent - 1);
						if ((indent == 0)) {
							if ((strat(parsen,0) ==  '(')) {
								parsen = strdel(parsen,0,1);
								if ((strat(parsen,-1) ==  ')')) {
									parsen = strdel(parsen,-1,1);
								}
							}
							j = (j + 1);
							break;
						}
					}
					if (((lilen(words) -  1) ==  j)) {
						break;
					}
					j = (j + 1);
				}
				ans = parse(makelist(parsen));
				ans = substr$(ans,1);
				var b = 0;
				b = (liidx(words,')',i) +  1);
				words = (lisub(words,0,(i + 1)) +  lisub(words,j,(lilen(words) -  j)));
				words = lireindex(words);
				words = lialt(words,i,ans);
				words = lireindex(words);
				i = (i - 1);
			}
			i = (i + 1);
			if ((i >= lilen(words))) {
				break;
			}
		}
		words = lialt(words,0,(' ' + liat(words,0)));
		words = makelist(li2str(words,''));
		i = 0;
		while (true) {
			if ((strat(liat(words,i), 0) ==  '*')) {
				var a = 0;
				a = Number(substr$(liat(words,(i - 1)) ,  1));
				var b = 0;
				if ((strlen$(liat(words,i)) ==  1)) {
					b = Number(liat(words,(i + 1)));
					words = lidel(words,(i + 1));
				}
				else if (true) {
					b = Number(substr$(liat(words,i) ,  1));
				}
				var ans = 0;
				ans = (a * b);
				words = lidel(words,i);
				words = lialt(words,(i - 1), (strat(liat(words,(i - 1)), 0) +  String((ans))));
				i = (i - 1);
			}
			if ((strat(liat(words,i), 0) ==  '/')) {
				var a = 0;
				a = Number(substr$(liat(words,(i - 1)) ,  1));
				var b = 0;
				if ((strlen$(liat(words,i)) ==  1)) {
					b = Number(liat(words,(i + 1)));
					words = lidel(words,(i + 1));
				}
				else if (true) {
					b = Number(substr$(liat(words,i) ,  1));
				}
				var ans = 0;
				ans = (a / b);
				words = lidel(words,i);
				words = lialt(words,(i - 1), (strat(liat(words,(i - 1)), 0) +  String((ans))));
				i = (i - 1);
			}
			i = (i + 1);
			if ((i >= lilen(words))) {
				break;
			}
		}
		i = 0;
		while (true) {
			if ((strat(liat(words,i), 0) ==  '+')) {
				var a = 0;
				a = Number(substr$(liat(words,(i - 1)) ,  1));
				var b = 0;
				b = Number(substr$(liat(words,i) ,  1));
				var ans = 0;
				ans = (a + b);
				words = lidel(words,i);
				words = lialt(words,(i - 1), (strat(liat(words,(i - 1)), 0) +  String((ans))));
				i = (i - 1);
			}
			if ((strat(liat(words,i), 0) ==  '-')) {
				var a = 0;
				a = Number(substr$(liat(words,(i - 1)) ,  1));
				var b = 0;
				b = Number(substr$(liat(words,i) ,  1));
				var ans = 0;
				ans = (a - b);
				words = lidel(words,i);
				words = lialt(words,(i - 1), (strat(liat(words,(i - 1)), 0) +  String((ans))));
				i = (i - 1);
			}
			i = (i + 1);
			if ((i >= lilen(words))) {
				break;
			}
		}
		return String(liat(words,0));
	}
	var plus_btn = new Button("plus_btn");
	plus_btn._web = 'Button';
	$('#operators').append("<button id='plus_btn'></button>");
	plus_btn.text = '+';
	$('#plus_btn').html(plus_btn.text);
	plus_btn.disabled = true;
	$('#plus_btn').prop('disabled', plus_btn.disabled);
	var product_btn = new Button("product_btn");
	product_btn._web = 'Button';
	$('#operators').append("<button id='product_btn'></button>");
	product_btn.text = '*';
	$('#product_btn').html(product_btn.text);
	product_btn.disabled = true;
	$('#product_btn').prop('disabled', product_btn.disabled);
	var mi_btn = new Button("mi_btn");
	mi_btn._web = 'Button';
	$('#operators').append("<button id='mi_btn'></button>");
	mi_btn.text = '-';
	$('#mi_btn').html(mi_btn.text);
	var divid_btn = new Button("divid_btn");
	divid_btn._web = 'Button';
	$('#operators').append("<button id='divid_btn'></button>");
	divid_btn.text = '/';
	$('#divid_btn').html(divid_btn.text);
	divid_btn.disabled = true;
	$('#divid_btn').prop('disabled', divid_btn.disabled);
	var ac_btn = new Button("ac_btn");
	ac_btn._web = 'Button';
	$('#operators').append("<button id='ac_btn'></button>");
	ac_btn.text = 'AC';
	$('#ac_btn').html(ac_btn.text);
	$('#ac_btn').click(function () {
		view.text = '0';
		$('#view').val(view.text);
		mode = 0;
	});
	var parbeg_btn = new Button("parbeg_btn");
	parbeg_btn._web = 'Button';
	$('#operators').append("<button id='parbeg_btn'></button>");
	parbeg_btn.text = '(';
	$('#parbeg_btn').html(parbeg_btn.text);
	$('#parbeg_btn').click(function () {
		if (($('#view').val() == '0')) {
			view.text = '';
			$('#view').val(view.text);
		}
		view.text = ($('#view').val() + '(');
		$('#view').val(view.text);
	});
	var parend_btn = new Button("parend_btn");
	parend_btn._web = 'Button';
	$('#operators').append("<button id='parend_btn'></button>");
	parend_btn.text = ')';
	$('#parend_btn').html(parend_btn.text);
	$('#parend_btn').click(function () {
		if (($('#view').val() == '0')) {
			view.text = '';
			$('#view').val(view.text);
		}
		view.text = ($('#view').val() + ')');
		$('#view').val(view.text);
	});
	var ce_btn = new Button("ce_btn");
	ce_btn._web = 'Button';
	$('#operators').append("<button id='ce_btn'></button>");
	ce_btn.text = 'CE';
	$('#ce_btn').html(ce_btn.text);
	$('#ce_btn').click(function () {
		view.text = strdel($('#view').val(),(strlen$($('#view').val()) -  1), 1);
		$('#view').val(view.text);
	});
	var point_btn = new Button("point_btn");
	point_btn._web = 'Button';
	$('#operators').append("<button id='point_btn'></button>");
	point_btn.text = '.';
	$('#point_btn').html(point_btn.text);
	$('#point_btn').click(function () {
		view.text = ($('#view').val() + '.');
		$('#view').val(view.text);
	});
	function numbtn (name) {
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
		me.num = 0;
		me.id = me.__name;
		
		me._click = function () {
			me.click(me);
		};
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
	numbtn.prototype.click = function (self) {
		if (($('#view').val() == '0')) {
			view.text = '';
			$('#view').val(view.text);
		}
		view.text = ($('#view').val() + String((self.num)));
		$('#view').val(view.text);
		mode = 1;
		plus_btn.disabled = false;
		$('#plus_btn').prop('disabled', plus_btn.disabled);
		product_btn.disabled = false;
		$('#product_btn').prop('disabled', product_btn.disabled);
		mi_btn.disabled = false;
		$('#mi_btn').prop('disabled', mi_btn.disabled);
		divid_btn.disabled = false;
		$('#divid_btn').prop('disabled', divid_btn.disabled);
		self.__update();
	};
	numbtn.prototype.set_num = function (num) {
		this.num = num;
		this.text = String(num);
		this.__update();
	};
	
	var button9 = new numbtn("button9");
	button9._web = 'Button';
	$('#num1').append("<button id='button9'></button>");
	$('#button9').click(button9._click);
	button9.set_num(9);
	var button8 = new numbtn("button8");
	button8._web = 'Button';
	$('#num1').append("<button id='button8'></button>");
	$('#button8').click(button8._click);
	button8.set_num(8);
	var button7 = new numbtn("button7");
	button7._web = 'Button';
	$('#num1').append("<button id='button7'></button>");
	$('#button7').click(button7._click);
	button7.set_num(7);
	var button6 = new numbtn("button6");
	button6._web = 'Button';
	$('#num2').append("<button id='button6'></button>");
	$('#button6').click(button6._click);
	button6.set_num(6);
	var button5 = new numbtn("button5");
	button5._web = 'Button';
	$('#num2').append("<button id='button5'></button>");
	$('#button5').click(button5._click);
	button5.set_num(5);
	var button4 = new numbtn("button4");
	button4._web = 'Button';
	$('#num2').append("<button id='button4'></button>");
	$('#button4').click(button4._click);
	button4.set_num(4);
	var button3 = new numbtn("button3");
	button3._web = 'Button';
	$('#num3').append("<button id='button3'></button>");
	$('#button3').click(button3._click);
	button3.set_num(3);
	var button2 = new numbtn("button2");
	button2._web = 'Button';
	$('#num3').append("<button id='button2'></button>");
	$('#button2').click(button2._click);
	button2.set_num(2);
	var button1 = new numbtn("button1");
	button1._web = 'Button';
	$('#num3').append("<button id='button1'></button>");
	$('#button1').click(button1._click);
	button1.set_num(1);
	var button0 = new numbtn("button0");
	button0._web = 'Button';
	$('#num3').append("<button id='button0'></button>");
	$('#button0').click(button0._click);
	button0.set_num(0);
	$('#plus_btn').click(function () {
		if ((mode == 1)) {
			if (limatchstr(lOperators,strat($('#view').val(),(strlen$($('#view').val()) -  1)))) {
				view.text = strdel($('#view').val(),-1,1);
				$('#view').val(view.text);
			}
			view.text = ($('#view').val() + '+');
			$('#view').val(view.text);
			using_operation = '+';
		}
	});
	$('#product_btn').click(function () {
		if (limatchstr(lOperators,strat($('#view').val(),(strlen$($('#view').val()) -  1)))) {
			view.text = strdel($('#view').val(),-1,1);
			$('#view').val(view.text);
		}
		if ((mode == 1)) {
			view.text = ($('#view').val() + '*');
			$('#view').val(view.text);
			using_operation = '*';
		}
	});
	$('#mi_btn').click(function () {
		var prev_char = '';
		prev_char = strat($('#view').val(),(strlen$($('#view').val()) -  1));
		if (limatchstr(lOperators,prev_char)) {
			if (!(((prev_char == '*') ||  (prev_char == '/')))) {
				view.text = strdel($('#view').val(),-1,1);
				$('#view').val(view.text);
			}
		}
		if (($('#view').val() == '0')) {
			view.text = '';
			$('#view').val(view.text);
		}
		view.text = ($('#view').val() + '-');
		$('#view').val(view.text);
		using_operation = '-';
	});
	$('#divid_btn').click(function () {
		if (limatchstr(lOperators,strat($('#view').val(),(strlen$($('#view').val()) -  1)))) {
			view.text = strdel($('#view').val(),-1,1);
			$('#view').val(view.text);
		}
		if ((mode == 1)) {
			view.text = ($('#view').val() + '/');
			$('#view').val(view.text);
			using_operation = '/';
		}
	});
	var eq_btn = new Button("eq_btn");
	eq_btn._web = 'Button';
	$('#operators').append("<button id='eq_btn'></button>");
	eq_btn.text = '=';
	$('#eq_btn').html(eq_btn.text);
	$('#eq_btn').click(function () {
		if ((mode == 1)) {
			var ans = '';
			ans = parse(makelist($('#view').val()));
			view.text = ($('#view').val() + ' = ' + ans);
			$('#view').val(view.text);
		}
	});
	return;
});
