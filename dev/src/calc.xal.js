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
    /*
      -(Letter) {
          (member)int
	  @ (foo) {
	      (log 'called foo()!')
	  }
	  @ (click) {
	      .text = 'clicked!'
	  }
      }
     */
    var Letter = function (__name) {
	this.__web = true;
	this.__name = __name;
	this.member = 0;
	this.foo = function () {
	    console.log("called foo()!");
	};
	this.click = function () {
	    $("#" + this.__name).html('clicked!');
	};
	$(this.__name).click(this.click);
	$(body).append("<span id=" + this.__name + "></span>");
    }
    let1 = new Letter('let1');
    return;
});
