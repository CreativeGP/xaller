# -*- coding: utf-8 -*-
# from Global import *

"""Xaller alpha
programmer: CreativeGP
"""
from __future__ import print_function
import copy
import sys
reload(sys)  
sys.setdefaultencoding('utf8')

from terminaltables import AsciiTable

import TokenClass
import ValueClass
import WebClass
import FunctionClass
import Global
import buildinfunc

def insert(dst, pos, src):
    """Insert an element to the list."""
    return dst[:pos] + src + dst[pos:]

# TODO: 条件分岐文の中のメンバ表記のJS出力がバグる

def is_plain(tkn):
    """Returns true if the token is not in comment or string."""
    return not tkn.ttype.Comment and not tkn.ttype.String


def is_number(tkn):
    """Returns true if the token is number."""
    return tkn.string.isdigit() and not tkn.ttype.String


def is_value(tkn):
    """Returns true if the token could be a value."""
    return is_number(tkn) or tkn.ttype.String or tkn.str == "\'"


def is_string(tkn):
    """Returns true if the token is in string."""
    return tkn.ttype.String


def is_bool(tkn):
    """Returns true if the token bould be a boolean value. """
    return is_plain(tkn) and (tkn.string == 'true' or tkn.string == 'false')


def is_var_web(var):
    """Check if the variable is for web.

    Get the value of '.web' variable to deal with inherited variables.
    The dynamic substitution to '.web' variable is required to work well.
    """
    # None時の処理
    if var is None: return False

    return (var.external
            and get_var(var.name[:var.name.rfind(".")]+"._web") != -1
            and get_var(var.name[:var.name.rfind(".")]+"._web") is not var)


def dbgprint(string):
    """Print newline to console for debug."""
    if Global.bDbg: print(string)


def dbgprintnoln(string):
    """Print to console for debug."""
    if Global.bDbg: sys.stdout.write(string)


def get_error_info(linum):
    sumlilen = 0
    for name, lilen in Global.imported:
        if linum > sumlilen:
            return (name, linum - sumlilen)
        sumlilen += lilen
    return None

def err(string):
    """Throw an error.

    Print an error message and a file name and a column number the error
    occured automatically. This mothod uses Global.exel to print the
    column number.
    """
    # 便利なように自動的に実行行を見つけるようにする
    for tkn in Global.tokens:
        if Global.exel == tkn.line:
            errinfo = get_error_info(tkn.real_line)
            print("%s:%d: %s"
                  % (errinfo[0], tkn.real_line+1, string))
            sys.exit(1)
    # もし実行業がみつからなかったときには、適当に出力しておく
    print(Global.input+":"+"0: "+string)
    sys.exit(1)


def out(string):
    """Print newline to the JS file."""
    if not Global.lock:
        Global.outjs += string + "\n"
        dbgprint("JS >>> %s" % string + "\n")


def outnoln(string):
    """Print to the JS file."""
    if not Global.lock:
        Global.outjs += string
        dbgprint("JS >>> %s" % string)


def crfind(srcs, finds, count):
    """Get index that found the string for nth."""
    ans = -1
    for _ in xrange(count):
        ans = srcs.rfind(finds, 0, ans)
    return ans


def outlock():
    """Pause printing to the JS file."""
    Global.lock = True


def outunlock():
    """Unpause printing to the JS file."""
    Global.lock = False


def solvebuf():
    """Export the accumulated buffer to JS file."""
    if not Global.lock:
        outnoln(Global.jsbuf)
        Global.jsbuf = ''


def outbuf(string):
    """Add a text behind Global.jsbuf."""
    Global.jsbuf += string


def expid(string):
    """Convert a xaller string into an valid string for HTML."""
    return string.replace('.', '-')


def expvar(var):
    """Convert a xaller variable name into an valid string for JS."""
    class_name = "this"
    res = var.name
    if is_adding_type():
        if 'type:evfunc' in Global.translate_seq[-1]:
            class_name = "self"
        # NOTE(cgp) ドットが２個続けて出力されることがあったのでそのようなことがないように
        # こっちで調整する
        if var.is_member:
            res = class_name + ('' if var.name[0] == '.' else '.') + var.name
    return res


# TODO: できるだけexpvarを使う
def expname(string):
    """Convert a xaller variable name into an valid string for JS."""
    string = string.replace('.', '.')
    class_name = "this"
    if is_adding_type():
        if 'type:evfunc' in Global.translate_seq[-1]:
            class_name = "self"
        # NOTE(cgp) ドットが２個続けて出力されることがあったのでそのようなことがないように
        # こっちで調整する
        string = class_name + ('' if string[0] == '.' else '.') + string
    return string


def expvalue(val):
    """Convert a xaller value into an valid string for JS."""
    return (S(val.string)
            if val.type.race == 'String' else
            val.string)


def create_external(name, pos):
    """Output a JS code creating a DOM variable."""
    # HACK: ここのコードだけ継承されても型を識別できるように特別な変数だけ動的に参照するようにしている
    typename = ''
    # if is_var_exists(name + ".web"):
    #     typename = get_var(name + ".web").string
    for var in Global.Vars:
        if var.name == name + "._web":
            typename = var.value.string

    selector = ""
    func = ""
    if "at " in pos:
        func = "after"
    elif "before " in pos:
        func = "before"
    elif "in " in pos:
        func = "append"

    if " end" in pos:
        selector = 'body'
        func = 'append'
    elif " begnn" in pos:
        selector = 'body'
        func = 'prepend'
    else:
        selector = "#" + pos[pos.find(" ")+1:]

    # selector = 'body'
    # func = 'append'
    if typename == 'HTML':
        out('$(%s).%s("<ran id=%s></ran>");'
            % (S(selector), func, S(expid(name))))
    if typename == 'Label':
        out('$(%s).%s("<p id=%s></p>");'
            % (S(selector), func, S(expid(name))))
    elif typename == 'Button':
        out('$(%s).%s("<button type=%s id=%s></button>");'
            % (S(selector), func, S('button'), S(expid(name))))
    elif typename == 'Textbox':
        out('$(%s).%s("<textarea id=%s name=%s></textarea>");'
            % (S(selector), func, S(expid(name)), S(expid(name))))
    elif typename == 'Div':
        out('$(%s).%s("<div id=%s></div>");'
            % (S(selector), func, S(expid(name))))
    elif typename == 'Image':
        out('$(%s).%s("<img id=%s>");'
            % (S(selector), func, S(expid(name))))


def subst_external(var, token_list):
    """Output a JS code substitution for DOM variable.

    Silly things may happen if the variable to be substituted is not external.
    NOTE(cgp) Do not use this method! Use Value.subst() insteadly.
    """
    vname = var.name

    if get_var(vname[:vname.rfind(".")]+"._web") is not None:
        web_type_name = get_var(vname[:vname.rfind(".")]+"._web").value.string
        member_name = expid(vname[:vname.find(".")])

        textbox_attrs = [
            'autocapitalize', 'autocomplete', 'autofocus', 'cols',
            'disabled', 'form', 'maxlength', 'minlength',
            'placeholder','readonly', 'required', 'rows',
            'selectionDirection', 'selectionEnd', 'selectionStart',
            'spellcheck', 'wrap']
        if web_type_name == "Textbox" and member_name != "_web":
            attr = vname[vname.rfind(".")+1:]
            out('$("#%s").attr(%s, %s);'
                % (member_name,
                   S(attr),
                   expname(vname)))
        elif (web_type_name == "Label" and ".text" in vname):
            out('$("#%s").html(%s");'
                % (expid(vname[:vname.find(".text")]),
                   expname(vname)))
        elif (web_type_name == "Button" and ".text" in vname):
            out('$("#%s").html(%s);'
                % (expid(vname[:vname.find(".text")]),
                   expname(vname)))


def S(string):
    """Bundle the string with single quote."""
    return "'" + string + "'"


def log_ts(string, tknlst):
    """Print a list of tokens to the debug screen."""
    dbgprintnoln("\n")
    dbgprintnoln(string + ":")
    for tkn in tknlst:
        dbgprintnoln(tkn.string + " ")
    dbgprintnoln("\n")


def get_end(ilist):
    if len(ilist) > 0:
        return ilist[-1]
    return None


def get_block_idx(line):
    """Retrieve an index of block that matches the line."""
    for i, block in enumerate(Global.blocks):
        if block.root[0].line == line:
            return i

    return -1


def get_var(string, care=True):
    """Retrieve a variable that matches the string."""
    if ((care
         and len(Global.tfs) > 0
         and Global.tfs[-1] is not None
         and is_adding_type())):
         # and len(Global.translate_seq) > 0
         # and 'add_type' in Global.translate_seq[-1])):
        # NOTE(cpg) 型定義の時で関数翻訳時にドットをthis.に変える。
        defining_type_name = Global.translate_seq[-1].replace("add_type:", '')
        for var in get_value_type(get_adding_type_name()).variables:
            if string[1:] == var.name:
                return var
    elif ((care
           and len(Global.tfs) > 0
           and Global.tfs[-1] is not None
           and len(string) > 0)):
        # NOTE(cgp) __init関数の出力の際に必要
        runf = Global.tfs[-1]
        tmp = ''
        if string[0] == '.': tmp = runf.name[:runf.name.rfind(".")]
        string = tmp + string
        for var in runf.args[-1]:
            if string == var.name:
                return var
        for var in runf.vars[-1]:
            if string == var.name:
                return var

    elif Global.fs[-1] != -1:
        runf = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
        if string[0] == '.':
            tmp = runf.name.replace(
                Global.blocks[runf.block_ind].root[2].string, '', 1)
            string = string.replace('.', tmp, 1)
        dirty_in_runf = [(v for v in runf.args[-1]
                          if v.value.type.race == 'Dirty')]
        for var in dirty_in_runf:
            try:
                if string.index(var.name+".") == 0:
                    string = string.replace(var.name, var.value.string, 1)
                    dbgprint(string)
            except ValueError:
                pass
        for var in runf.args[-1]:
            if string == var.name:
                return var
        for var in runf.vars[-1]:
            if string == var.name:
                return var

    for var in Global.Vars:
        if string == var.name:
            return var
    return None


def is_adding_type():
    if len(Global.translate_seq) == 0:
        return False
    if 'add_type' in ''.join(Global.translate_seq):
        return True
    return False


def get_adding_type_name():
    if is_adding_type():
        for seq in Global.translate_seq[::-1]:
            if 'add_type' in seq:
                return seq.replace("add_type:", "")
    return ''


def is_var_exists(string):
    """Returns true if the variable that matches a string exists."""
    return get_var(string) is not None


def is_func_exists(string):
    """Returns true if the function that matches a string exists."""
    for func in Global.Funcs:
        if func.name == string:
            return True
    if is_adding_type():
        for func in get_value_type(get_adding_type_name()).functions:
            # NOTE(cgp) .が邪魔なのでそれを取り除いてもじれつを比較
            if func.name == string[1:]:
                return True
    return False


def get_func(string):
    """Returns true if the function that matches a string exists."""
    for func in Global.Funcs:
        if func.name == string:
            return func
    if is_adding_type():
        for func in get_value_type(get_adding_type_name()).functions:
            # NOTE(cgp) .が邪魔なのでそれを取り除いてもじれつを比較
            if func.name == string[1:]:
                return func
    return None


# 親の名前からそのスコープから見える変数すべてのそのメンバを返す(ValueClass.Variable[])
def get_members(parent_name):
    """Retrieve the list of members of the parent."""
    res = []
    if Global.fs[-1] != -1:
        running_func = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
        for var in running_func.args[-1]:
            if parent_name + '.' in var.name:
                res.append(var)
        for var in running_func.vars[-1]:
            if parent_name + '.' in var.name:
                res.append(var)

    for var in Global.Vars:
        if parent_name + '.' in var.name:
            res.append(var)
    return res


def get_default_value(value_type, if_dirty_name=''):
    """Retrieve the default value of the type."""
    value_race = value_type.race
    if value_race == 'Integer': return ValueClass.Value('0', value_type)
    if value_race == 'String': return ValueClass.Value('', value_type)
    if value_race == 'Boolean': return ValueClass.Value('false', value_type)
    if value_race == 'Dirty': return ValueClass.Value(
            'new ' + value_type.name + '("' + if_dirty_name + '")', value_type)
    return ValueClass.Value('', value_type)


def get_value_type(string):
    """Retrieve the value matches the string.

    Search the value type matches the string through Global.vtyhpe.
    If not found, returns None.
    """
    for vtype in Global.vtypes:
        if vtype.name == string:
            return vtype
    return None


def determine_value_race(token_list):
    """Determine a value race from a list of tokens."""
    if len(token_list) == 1:
        # 単項の場合
        if is_number(token_list[0]):
            return 'Integer'
        elif is_string(token_list[0]):
            return 'String'
        elif is_bool(token_list[0]):
            return 'Boolean'
        else:
            return None
    else:
        # 複数項ある場合
        pass


def determine_value_type(token_list):
    """Determine a value type from a list of tokens."""
    vrace = determine_value_race(token_list)
    if vrace == 'Integer':
        return get_value_type('int')
    elif vrace == 'String':
        return get_value_type('string')
    elif vrace == 'Boolean':
        return get_value_type('bool')
    return None


def buildin_casting(value, nextvt):
    """Convert a value type using buildin casting."""
    oldvr = value.type.race
    nextvr = nextvt.race
    res = value

    if oldvr == 'Integer' and nextvr == 'String':
        res = ValueClass.Value(value.string, nextvt)
    if oldvr == 'Integer' and nextvr == 'Boolean':
        res = (ValueClass.Value('false', nextvt)
               if value.string == '0' else
               ValueClass.Value('true', nextvt))

    if oldvr == 'String' and nextvr == 'Integer':
        res = ValueClass.Value(value.string, nextvt)
    if oldvr == 'String' and nextvr == 'Boolean':
        tmp = value.string.upper()
        if 'TRUE' in tmp:
            res = ValueClass.Value('true', nextvt)
        else:
            res = ValueClass.Value('false', nextvt)

    if oldvr == 'Boolean' and nextvr == 'Integer':
        res = res = (ValueClass.Value('1', nextvt)
                     if value.string == 'true' else
                     ValueClass.Value('0', nextvt))
    if oldvr == 'Boolean' and nextvr == 'String':
        res = ValueClass.Value(value.string, nextvt)
    return res


def cast_value(value, nextvt):
    """Conver a value type."""
    res = value
    cast_func_name = '__%s_%s' % (value.type.name, nextvt.name)
    user_cast_func_idx = FunctionClass.Function.n2i(
        '__%s_%s' % (value.type.name, nextvt.name))
    if ((Global.fs[-1] == user_cast_func_idx
         and user_cast_func_idx != -1)):
        # キャスト関数が定義されていてかつキャスト関数実行中の場合（ビルドイン変換）
        res = buildin_casting(value, nextvt)
    elif user_cast_func_idx != -1:
        # キャスト関数が定義されていて実行はされていない場合（キャスト関数実行）
        res = Global.Funcs[user_cast_func_idx].run([value])
        if res.type != nextvt:
            # TODO: Error キャスト関数を実行してみたのに結果が求められた型変換の型と違う
            pass
    else:
        # キャスト関数も定義されていない場合（ビルドイン変換）
        res = buildin_casting(value, nextvt)

    return res


def get_func_idx(string):
    """Get a function ihdex."""
    ans = -1
    for func in Global.Funcs:
        if func.name == string:
            ans = func.func_ind
    return ans


def out_arg_value(tkn, next_tkn, sep):
    res = 0
# if ((tkn.string == '-'
#      and  is_number(next_tkn))):
#     tkn.string += next_tkn.string
#     res = 1

    js_formatted_string = ("'" + tkn.string + "'"
                           if tkn.ttype.String
                           else tkn.string)

    if get_var(tkn.string) is not None:
        var = get_var(tkn.string)
        var.refer()
    else:
        Global.jsbuf += js_formatted_string

    if next_tkn.string != ")":
        sep = Global.sep_type[sep]
        Global.jsbuf += ("%s"
                         % (','
                            if sep == ',' else
                            ' ' + sep + ' '))
    return res


# TODO(cgp) 不等号関数の複数引数指定時の処理
def out_expression(token_list, get_string=False):
    """Output to JS file an expression."""
    if get_string: backup = Global.jsbuf

    lvl = 0
    con = -1
    buildin = [',']
    begof = []

    if len(token_list) == 1:
        if is_var_exists(token_list[0].string):
            get_var(token_list[0].string).refer()
        else:
            outnoln((S(token_list[0].string)
                     if token_list[0].ttype.String else
                     token_list[0].string))
        return

    # NOTE(cgp) 関数ではない呼び出し
    if (((len(token_list) == 3 or len(token_list) == 4)
         and token_list[0].string == '('
         and token_list[2].string == ')'
         and not is_func_exists(token_list[1].string))):
        # TODO(cgp) is_var_exists関数とかぶっているので、下を消す方向で
        if FunctionClass.Function.n2i(token_list[1].string) == -1:
            cast = ''
            if len(token_list) == 4:
                cast = get_value_type(token_list[3].string).race

            outnoln((Global.jstypes[get_var(token_list[1].string).value.type.race]
                     if cast == '' else
                     Global.jstypes[cast]) + "(")

            if is_var_exists(token_list[1].string):
                get_var(token_list[1].string).refer()
                solvebuf()
            else:
                outnoln((S(token_list[1].string)
                         if token_list[1].ttype.String else
                         token_list[1].string))
            outnoln(")")    
            return

    for i, tkn in enumerate(token_list):
        if i == con: continue
        try:
            if tkn.string == '(':
                # 関数の始まりの場合:
                # 関数の始まりの場合は次の関数名を飛ばす
                # 関数ではない場合があるのでその場合は値か変数
                lvl += 1
                con = i+1
                func_name = token_list[i+1].string
                if ((is_string(token_list[i+1])
                     or is_number(token_list[i+1])
                     or get_var(func_name))):
                    # 関数ではない場合:
                    con = 0
                    buildin.append(' ')
                    begof.append(len(Global.jsbuf))
                    Global.jsbuf += "("
                elif FunctionClass.Function.n2i(func_name) < -1:
                    # ビルドイン関数の場合:
                    # ビルドイン記号と関数の開始位置を更新して開始用カッコをつける
                    buildin.append(func_name)
                    begof.append(len(Global.jsbuf))

                    # NOTE(cgp) 関数がビルドインだけど単純な演算子で表現で
                    # きない場合に専用の処理をする
                    if Global.sep_type[func_name] == ",":
                        Global.jsbuf += func_name + "$"

                    # 特別な演算子たちの出力
                    if func_name == "not":
                        Global.jsbuf += "!("
                    elif func_name == "neg":
                        Global.jsbuf += "-("
                    else:
                        Global.jsbuf += "("
                else:
                    # 普通関数の場合:
                    # コンマと関数の開始位置を更新して関数名と開始用カッコをつける
                    buildin.append(',')
                    begof.append(len(Global.jsbuf))
                    Global.jsbuf += expname(func_name) + "("
            elif tkn.string == ')':
                # 関数終了の場合:
                # 原則として終了用途じカッコをつける処理が主
                # 確かめることは
                # ・型キャストの有無
                # ・それが引数として扱われているかどうか

                Global.jsbuf += ')'

                lvl -= 1
                is_arg = token_list[i+1].string != ")"
                # NOTE(cgp): 文字列を表すトークンが間違って読み込まれていたので
                # 修正。is_plain()をかませただけ。
                cast_vt = (get_value_type(token_list[i+1].string)
                           if is_plain(token_list[i+1]) else
                           None)
                if cast_vt is not None:
                    # キャストがあった場合:
                    # ある場合は関数の開始位置に型変換関数名追加して式全体を括弧で括る
                    # Output casting.
                    con = i + 1

                    jstype = Global.jstypes[cast_vt.race]
                    tmp = begof[-1]
                    Global.jsbuf = ("%s(%s)"
                                    % (Global.jsbuf[:tmp] + jstype,
                                       Global.jsbuf[tmp:]))
                    is_arg = token_list[i+2].string != ")"

                del buildin[-1]
                del begof[-1]

                if is_arg:
                    # 引数だった場合
                    # NOTE(cgp) 区切り文字を加える、注意する点は”buildin[-1]は消した後である"
                    # からこのコードは正常に動くのであること
                    sep = Global.sep_type[buildin[-1]]
                    Global.jsbuf += ("%s "
                                     % (','
                                        if buildin[-1] == ',' else
                                        ' ' + sep + ' '))
            else:
                # その他の場合:
                # 基本的に引数が回ってくるはずなので区切り文字で区切って出力する
                # NOTE: 評価した値ではなく、そのまま、書かれたままを出力する
                # NOTE: Web変数は展開して出力
                # TODO: これだけでは値が定義されていなかった場合の処理が適切ではないので改善する
                # eval_tokens([t])
                con = i + out_arg_value(tkn, token_list[i+1], buildin[-1])
        except IndexError:
            pass

    if get_string:
        diff = Global.jsbuf - tmp
        Global.jsbuf = tmp
        return diff
    else:
        solvebuf()


# NOTE: jsがFalseだったときにはJS出力はしない
def eval_tokens(token_list, js_out=True):
    """Eval a list of tokens dynamicly."""
    if len(token_list) == 1:
        # 単項の場合
        # 変数の参照処理
        if is_bool(token_list[0]):
            return (ValueClass.Value('true', get_value_type('bool'))
                    if token_list[0].string == 'true' else
                    ValueClass.Value('false', get_value_type('bool')))
        if token_list[0].string == ',': return None
        if get_var(token_list[0].string) is not None:
            var = get_var(token_list[0].string)
            return var.refer(js_out)
        if not is_number(token_list[0]) and not is_string(token_list[0]):
            err("Undefined variable '%s'" % token_list[0].string)
        # 変数ではない場合
        var = ValueClass.Value(token_list[0].string,
                               determine_value_type(token_list))
        if js_out:
            Global.jsbuf += expvalue(var)
        return var
    else:
        # 複数項ある場合（関数呼び出し）
        # 関数呼び出しなので、token_listに括弧がなくなったときにreturnする
        # 最初から)を探して、それから遡って最初の(までを再帰的に_Global.tokensに渡していく
        log_ts("func_list", token_list)
        arg_values = []
        # NOTE: インデントはリストの最初のカッコを加味して初期値-1
        indent = -1
        arg_tokens = []
        last_index = 0
        for i in xrange(len(token_list)-1):
            if token_list[i].string == '(': indent += 1
            if token_list[i].string == ')': indent -= 1
            if i >= 2 and indent != -1: arg_tokens.append(token_list[i])
            # キャストだった場合の処理
            if ((len(token_list) >= i+1
                 and get_value_type(token_list[i+1].string) is not None)):
                continue
            # 引数トークンを見分けて実際に計算
            if i >= 2 and indent == 0:
                last_index = i
                log_ts("arg_tokens", arg_tokens)
                value = eval_tokens(arg_tokens, False)
                arg_values.append(value)
                del arg_tokens[:]
                continue

        # 関数処理
        dbgprint("Func call: '"+token_list[1].string+"'")
        func_ind = FunctionClass.Function.n2i(token_list[1].string)
        if func_ind == -1:
            err(("FunctionClass.Function '%s' is not defined.")
                % token_list[1].string)
        elif func_ind < -1:
            # ビルドイン関数の実行
            # ビルドイン関数のJS出力は各関数内で
            if token_list[1].string == '+':
                result_value = buildinfunc.xaller_plus(arg_values)
            if token_list[1].string == '-':
                result_value = buildinfunc.xaller_sub(arg_values)
            if token_list[1].string == '*':
                result_value = buildinfunc.xaller_product(arg_values)
            if token_list[1].string == '/':
                result_value = buildinfunc.xaller_divide(arg_values)
            if token_list[1].string == '%':
                result_value = buildinfunc.xaller_remain(arg_values)
            if token_list[1].string == 'neg':
                result_value = buildinfunc.xaller_neg(arg_values)
            if token_list[1].string == 'or':
                result_value = buildinfunc.xaller_or(arg_values)
            if token_list[1].string == 'and':
                result_value = buildinfunc.xaller_and(arg_values)
            if token_list[1].string == 'not':
                result_value = buildinfunc.xaller_not(arg_values)
            if token_list[1].string == 'xor':
                result_value = buildinfunc.xaller_xor(arg_values)
            if token_list[1].string == 'eq':
                result_value = buildinfunc.xaller_eq(arg_values)
            if token_list[1].string == '<':
                result_value = buildinfunc.xaller_less(arg_values)
            if token_list[1].string == '>':
                result_value = buildinfunc.xaller_greater(arg_values)
            if token_list[1].string == '<=':
                result_value = buildinfunc.xaller_lesseq(arg_values)
            if token_list[1].string == '>=':
                result_value = buildinfunc.xaller_greatereq(arg_values)
            if token_list[1].string == 'concat':
                result_value = buildinfunc.xaller_concat(arg_values)
            if token_list[1].string == 'strlen':
                result_value = buildinfunc.xaller_strlen(arg_values)
            if token_list[1].string == 'substr':
                result_value = buildinfunc.xaller_substr(arg_values)
                #                if token_list[1].string == 'strtrimr':
                #result_value = buildinfunc.xaller_strtrimr(arg_value)
 #                if token_list[1].string == 'strtriml':
 #result_value = buildinfunc.xaller_strtriml(arg_values)
 #                if token_list[1].string == 'strtrim':
# result_value = buildinfunc.xaller_strtrim(arg_values)
 #                if token_list[1].string == 'strmatch':
 # result_value = buildinfunc.xaller_strmatch(arg_values)
            if token_list[1].string == 'stridx':
                result_value = buildinfunc.xaller_stridx(arg_values)
            if token_list[1].string == 'strridx':
                result_value = buildinfunc.xaller_strridx(arg_values)
                #                if token_list[1].string == 'strrep':
# result_value = buildinfunc.xaller_strrep(arg_values)
        else:

            result_value = Global.Funcs[func_ind].run(arg_values)

        # 値のキャスト
        if last_index <= len(token_list)-1 and token_list[-1].string != ')':
            vtype = get_value_type(token_list[-1].string)
            result_value = cast_value(result_value, vtype)
            return result_value
        return result_value
    return None


#入れ子には対応しないプリプロセッサ
def prepro(string):
    """Deal with preprocessor."""
    tmps = ''
    tmpi = 0
    flag = False
    if not '$' in string:
        return string
    for i, char in enumerate(string):
        if char == '$':
            flag = not flag
            if flag:
                # 計測開始
                tmpi = i
            else:
                # 計測停止
                ans = eval_tokens([TokenClass.Token(0, tmps[1:])]).string
                string = string.replace(string[tmpi:i+1], '', 1)
                string = string[:tmpi] + ans + string[tmpi:]
                return prepro(string)
        if flag:
            # 計測中
            tmps += char


def add_type(block_ind):
    """Create new type."""
    inh_count = int((len(Global.blocks[block_ind].root) - 4) / 2)
    new_type = ValueClass.Type(Global.blocks[block_ind].root[2].string, 'Dirty')
    # NOTE(cgp) この関数内でドットを変更するので、先に追加しておく
    Global.vtypes.append(new_type)

    dbgprint("SEQENCE >>> add_type")
    Global.translate_seq.append('add_type:' + new_type.name)

    if new_type.race != 'Dirty':
        err("Pure type couldn't have members.")
    dbgprintnoln(("New type '%s' inheritanced by type"
                  % Global.blocks[block_ind].root[2].string))
    for i in xrange(inh_count):
        tmp = get_value_type(Global.blocks[block_ind].root[5+i*2].string)
        if tmp is None:
            err("Undefined type '%s'" % tmp.name)
        if tmp.race != 'Dirty':
            # ピュアな型をコピーできる条件は、メンバがないことと、コピーする型が一つであること
            if inh_count != 1:
                err("There are plural inheritance despite trying"
                    "to inherite pure type.")
            new_type.race = tmp.race
            break
        dbgprintnoln(Global.blocks[block_ind].root[5].string+"', ")
        # コピー指定されている型の変数と関数をすべて雑にコピー
        # 同じ名前があれば古い方を削除
        for var in tmp.variables:
            for new_type_member in new_type.variables:
                if new_type_member.name == var.name:
                    del new_type_member
        new_type.variables.extend(tmp.variables)

        for func in tmp.functions:
            for new_type_member_func in new_type.functions:
                if new_type_member_func.name == func.name:
                    del new_type_member_func
        new_type.functions.extend(tmp.functions)

    out("function %s (name) {" % new_type.name)
    out("var me = this;")
    out("me.__name = name;")
    
    token_list = []
    out_varcreation = lambda name, type: (
        out("me.%s = %s;"
            % (name, expvalue(get_default_value(type, name)))))

    for token in Global.blocks[block_ind].body:
        token_list.append(token)
        if token.ttype.Return:
            if len(token_list) >= 4 and \
                 is_plain(token_list[0]) and token_list[0].string == '(' and \
                 is_plain(token_list[1]) and \
                 is_plain(token_list[2]) and token_list[2].string == ')' and \
                 is_plain(token_list[3]):
                value_type = get_value_type(token_list[3].string)
                if value_type is None:
                    err("Undefined type '%s'." % token_list[3].string)
                new_type.variables.append(ValueClass.Variable(
                    token_list[1].string,
                    get_default_value(value_type), is_member=True))

            elif len(token_list) >= 5 and \
                 is_plain(token_list[0]) and token_list[0].string == '+' and \
                 is_plain(token_list[1]) and token_list[1].string == '(' and \
                 is_plain(token_list[2]) and \
                 is_plain(token_list[3]) and token_list[3].string == ')' and \
                 is_plain(token_list[4]):
                value_type = get_value_type(token_list[4].string)
                if value_type is None:
                    err("Undefined type '%s'." % token_list[4].string)
                new_type.variables.append(ValueClass.Variable(
                    token_list[2].string,
                    get_default_value(value_type), is_member=True))
            del token_list[:]

    for var in new_type.variables:
        # NOTE(cgp): We can't call ValueClass.Variable.create() to ouput
        # JS code creating variable. Instead, call out_varcreation(), the local
        # function defined in this function.
        out_varcreation(var.name, var.value.type)
        if var.name == '_web':
            out('me.__element = $("#"+me.__name);')

    for var in new_type.variables:
        if var.name == '_web':
            out('me.id = me.__name;')

    for token in Global.blocks[block_ind].body:
        token_list.append(token)
        if token.ttype.Return:
            # 関数作成 ^ @ ( name arg )
            if len(token_list) >= 4 and \
               is_plain(token_list[0]) and token_list[0].string == "@" and \
               is_plain(token_list[1]) and token_list[1].string == "(" and \
               is_plain(token_list[-1]) and token_list[-1].string == ")":
                for i, block in enumerate(Global.blocks):
                    if block.root[0].line == token.line:
                        func = FunctionClass.Function(i)
                        # NOTE(cgp) 型の関数リストに入れておく
                        new_type.functions.append(func)
            del token_list[:]

    normal_funcs = []
    init_funcs = []
    event_funcs = []
    for func in new_type.functions:
        if "__init" in func.name:
            init_funcs.append(func)
            new_type.blocks_for_init.append(Global.blocks[func.block_ind])
        elif "." + func.name in Global.eventlist:
            eventname = Global.eventlist[Global.eventlist.index("." + func.name)][1:]
            out("""
me._%s = function () {
me.%s(me);
};""" % (eventname, eventname))
            event_funcs.append(func)
        else:
            normal_funcs.append(func)

    # NOTE(cgp) 継承元のコンストラクタはまとめて一つの関数として出力
    if len(init_funcs) > 0:
        outnoln("me.__init = ")
        init_funcs[0].name = "__init"
        # HACK(cgp) Global.Varsに無名関数を追加することになるコード
        tmp_funcs = copy.deepcopy(init_funcs[0])
        tmp_funcs.name = ''
        tmp_funcs.add()
        out("")
        for func in init_funcs:
            Global.tfs.append(func)
            exel = Global.blocks[func.block_ind].body[0].line
            # 関数内容を出力
            while True:
                translate(Global.lines[exel].tokens)
                # NOTE(cgp) 最後の閉じ括弧まで読み込まないようにする
                if exel == Global.blocks[func.block_ind].body[-1].line - 2:
                    Global.tfs.pop()
                    break
                exel += 1
            # new_func = FunctionClass.Function(i)
            # # NOTE(cgp) For js output.
            # new_type.functions.append(new_func)
            Global.exel = Global.blocks[func.block_ind].body[-1].line
        # NOTE(cgp) 初期化関数もＨＴＭＬ属性を変更する可能性があるので
        # しっかり更新しておく。
        out("this.__update();")
        out("};")

    for var in new_type.variables:
        if var.name == '_web':
            out(WebClass.WebObject.get_applying_js(var.value.string))

    # NOTE(cgp) Output of type definition is processed in this function.
    # Here is the end of output of type definition.
    out("}")

    for func in event_funcs:
        # NOTE(cpg) 翻訳モードを[type:evfunc]にする
        # これは本来はthisを出力するところをselfとしたりするexpname()の
        # 処理変更に必要になってくる
        Global.translate_seq.append("type:evfunc:" + func.name)
        outnoln(new_type.name + ".prototype.%s = " % func.name)
        # HACK(cgp) Global.Varsに無名関数を追加することになるコード
        tmp_func = copy.deepcopy(func)
        tmp_func.name = ''
        tmp_func.add()
        out("")
        exel = Global.blocks[func.block_ind].body[0].line
        # 関数内容を出力
        while True:
            translate(Global.lines[exel].tokens)
            # NOTE(cgp) 最後の閉じ括弧まで読み込まないようにする
            if exel == Global.blocks[func.block_ind].body[-1].line - 2:
                break
            exel += 1
        Global.exel = Global.blocks[func.block_ind].body[-1].line
        Global.translate_seq.pop()
        out("self.__update();")
        out("};")
        
    for func in normal_funcs:
        outnoln(new_type.name + ".prototype.%s = " % func.name)
        # HACK(cgp) Global.Varsに無名関数を追加することになるコード
        tmp_func = copy.deepcopy(func)
        tmp_func.name = ''
        tmp_func.add()
        out("")
        exel = Global.blocks[func.block_ind].body[0].line
        # 関数内容を出力
        while True:
            translate(Global.lines[exel].tokens)
            # NOTE(cgp) 最後の閉じ括弧まで読み込まないようにする
            if exel == Global.blocks[func.block_ind].body[-1].line - 2:
                break
            exel += 1
        # new_func = FunctionClass.Function(i)
        # # NOTE(cgp) For js output.
        # new_type.functions.append(new_func)
        Global.exel = Global.blocks[func.block_ind].body[-1].line

        # NOTE(cgp) 普通関数もＨＴＭＬ属性を変更する可能性があるので
        # しっかり更新しておく。
        out("this.__update();")
        out("};")
        
    out("")

    Global.translate_seq.pop()
    dbgprint("SEQENCE <<<")


def get_js_indent_level():
    """Get the indent level, which is incremented if the brace opened and decremented
    if it closes, of Global.outjs.
    """
    level = 0
    for char in Global.outjs:
        if char == '{': level += 1
        if char == '}': level -= 1
    return level


def translate(token_list, static_default=None):
    """Examine a statement staticly."""
    # NOTE: 疑似関数内static変数の準備
    if static_default is None:
        static_default = []
    if not hasattr(translate, 'element_stack'):
        translate.element_stack = static_default
    run_tokens = copy.deepcopy(token_list)

    log_ts("token_list", token_list)
    # コメント業の場合処理を飛ばす
    # NOTE: ここでreturnしているのはJSにセミコロンを出力させないためでもある
    if len(token_list) > 0 and token_list[0].ttype.Comment:
        return True

    for tkn in run_tokens:
        if '$' in tkn.string and not tkn.ttype.Comment:
            tkn.string = prepro(tkn.string)
            dbgprint(tkn.string)

    if len(run_tokens) == 1 and run_tokens[0].string == "{":
        Global.brace_requests.append(get_js_indent_level())
        return True
    elif len(run_tokens) == 1 and run_tokens[0].string == "}":
        if ((len(Global.brace_requests) > 0
             and Global.brace_requests[-1] == get_js_indent_level())):
            out('}')
            Global.brace_requests.pop()
            return 1
        if Global.tfs[-1].event:
            out("});")
        else:
            out("}")
        Global.tfs.pop()
        return 1

    # NOTE: この先具体的な構文処理：returnしているところはJSへのセミコロン出力を防ぐため
    if ((len(run_tokens) > 0
         and is_plain(run_tokens[0])
         and run_tokens[0].string == 'return')):
        try:
            outnoln("return ")
            out_expression(run_tokens[1:])
            solvebuf()
        except IndexError:
            pass

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'loop':
        # loopブロックの中のJS出力はこの時点でやってしまう
        out("while (true) {")
        return True

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'escape':
        out("break;")
        idx = -1
        line_idx = -1
        for line in Global.lines[Global.exel::-1]:
            if len(line.tokens) == 1:
                if line.tokens[0].string == 'loop':
                    line_idx = line.num
                    break
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1:
            err("It is impossible to use 'escape' outside of Global.blocks.")
        return True

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'continue':
        out("continue;")
        idx = -1
        line_idx = -1
        for line in Global.lines[Global.exel::-1]:
            if len(Global.tokens) == 1:
                if Global.tokens[0].string == 'loop':
                    line_idx = line.num
                    break
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1:
            # TODO(cgp) 上と同じなのになぜかエラー
            pass
            # err("It is impossible to use 'continue' outside of Global.blocks.")
        return True

    elif Global.fs[-1] == -1 and len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'stop':
        out("throw new Error('This is not an error. This is just to abort javascript');")
        return True

    if ((len(run_tokens) > 0
         and is_plain(run_tokens[0])
         and run_tokens[0].string == '__log')):
        try:
            outnoln("console.log(")
            out_expression(run_tokens[1:])
            solvebuf()
            outnoln(");")
        except IndexError:
            pass

    elif Global.fs[-1] == -1 and len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'end':
        out("return;")
        return False

    # Detect FunctionClass.Functions
    # 関数作成 ^ @ ( name arg )
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == "@" and \
       is_plain(run_tokens[1]) and run_tokens[1].string == "(" and \
       is_plain(run_tokens[-1]) and run_tokens[-1].string == ")":
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == run_tokens[0].line:
                new_func = FunctionClass.Function(i)
                new_func.add()
#                new_func.outjs()
                Global.exel += 1
                break
        out("")
        return True

    # 条件分岐文 (.. ?$) (^else ... ?$)
    elif len(run_tokens) >= 1 and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == '?':
        if run_tokens[0].string == 'branch':
            outnoln("else ")
        outnoln("if (")

        if run_tokens[0].string == 'cond' or run_tokens[0].string == 'branch':
            out_expression(run_tokens[1:-1])
        else:
            out_expression(run_tokens[:-1])
        out(") {")
        log_ts("run_tokens", run_tokens)
        return True
            # for i, b in enumerate(Global.blocks):
            #     if b.root[0].line == Global.exel:
            #         idx = i
            #         break
            # for b in Global.blocks[idx-1::-1]:
            # if ((run_tokens[0].string == 'cond'
            #      or run_tokens[0].string == 'branch')):
            #     out_expression(run_tokens[1:-1])
            # else:
            #     out_expression(run_tokens[:-1])
            #     cond_value = cast_value(cond_value, get_value_type('bool'))
            #     cond_value = xaller_not([cond_value])
            #     if cond_value.string == 'false':
            #         Global.exel = Global.blocks[idx].body[-1].line
            #         break
            #     # cond指定があるブロックがあったらそこで終了
            #     if b.root[0].string == 'cond':
            #         break

    # 型定義 ^-(type):type
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == '-' and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
       is_plain(run_tokens[2]) and \
       is_plain(run_tokens[3]) and run_tokens[3].string == ')':
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == Global.exel + 1:
                add_type(i)
                Global.exel = block.body[-1].line - 1
                break
        return True

    # 変数に代入 ^known-name = value
    # and get_var(run_tokens[0].string) is not None and
    elif len(run_tokens) >= 3 and \
       is_plain(run_tokens[0]) and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '=':
        # outnoln(run_tokens[0].string + " = ")
        # out_expression(run_tokens[2:])
        # その変数自体に代入
        # HACK: _web変数だけ動的に代入
        var = get_var(run_tokens[0].string)
        if var is None:
            err("Undefined variable '%s'" % run_tokens[0].string)
        if run_tokens[0].string[run_tokens[0].string.rfind('.')+1:] == '_web':
            get_var(run_tokens[0].string).value.string = run_tokens[2].string
        string = run_tokens[2].string
        # if len(run_tokens) == 3 and is_var_exists(string):
        #     var.subst(get_var(string))
        # else:
        #     log_ts("run_tokens[2:]", run_tokens[2:])
        var.subst(copy.deepcopy(run_tokens[2:]))

        if ((len(run_tokens) == 3
             and len(var.value.type.variables) > 0
             and get_var(run_tokens[2].string) is not None)):
            varsrc = get_var(run_tokens[2].string)
            if var.value.type != varsrc.value.type:
                err("Incorrect substituting value which has different member.")
            memdst = get_members(run_tokens[0].string)
            memsrc = get_members(run_tokens[2].string)
            for i in xrange(len(memdst)):
                # NOTE: 宣言順が同じであるという条件のもとの代入（計算量削減）
                memdst[i].subst(memsrc[i])
                out(";")
                memdst[i].value = memsrc[i].value
        return True

    # プログラム変数作成 ^( name ) race
    elif len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
       is_plain(run_tokens[1]) and \
       is_plain(run_tokens[2]) and run_tokens[2].string == ')' and \
       is_plain(run_tokens[3]):
        # ドットが変数名に入っているときにはエラー
        name = run_tokens[1].string[:]
        # if '$' in name: name = prepro(name)
        if '.' in name:
            err("ValueClass.Variable name couldn't contain '.'")
        value_type = get_value_type(run_tokens[3].string)
        if value_type is None:
            err("Undefined type '%s'" % run_tokens[3].string)

        variables = None
        if Global.fs[-1] != -1:
            runf = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
            variables = runf.vars[-1]
        ValueClass.Variable.create(ValueClass.Variable(
            name, get_default_value(value_type)), variables)
        return True

    # 外部変数作成 ^+( name ) race
    # NOTE: 普通の変数作成とほとんど一緒、中心の処理はVariable.create関数なので
    # 第四引数にTrueを渡しているかどうかで決まる。
    elif (len(run_tokens) >= 5 or len(run_tokens) >= 7) and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '+' and \
         is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
         is_plain(run_tokens[2]) and \
         is_plain(run_tokens[3]) and run_tokens[3].string == ')' and \
         is_plain(run_tokens[4]):
        name = run_tokens[2].string[:]
        pos = "at end"
        if len(run_tokens) == 7:
            pos = run_tokens[5].string + " " + run_tokens[6].string

        # 内包要素関係
        if len(translate.element_stack) > 0:
            # 内包される要素があった場合
            included_block = Global.blocks[translate.element_stack[-1]]
            pos = "in " + included_block.root[2].string
        if get_block_idx(Global.exel + 1) != -1:
            out("{")
            translate.element_stack.append(get_block_idx(Global.exel + 1))

        # ドットが変数名に入っているときにはエラー
        if '.' in name:
            err("ValueClass.Variable name couldn't contain '.'")
        value_type = get_value_type(run_tokens[4].string)
        if value_type is None:
            err("Undefined type '%s'" % run_tokens[4].string)
        ValueClass.Variable.create(ValueClass.Variable(
            name, get_default_value(value_type)), None, True, pos)
        return True

    # 関数呼び出し（一行） ^( func args )
    elif len(run_tokens) >= 3 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == ')':
        out_expression(run_tokens)

    solvebuf()
    out(";")


    return True


def RUN(token_list, static_default=None, funcexam=False):
    """Examine a statement dinamically."""
    # NOTE: 疑似関数内static変数の準備
    if static_default is None:
        static_default = []
    if not hasattr(RUN, 'element_stack'):
        RUN.element_stack = static_default
    run_tokens = copy.deepcopy(token_list)

    log_ts("token_list", token_list)
    # コメント業の場合処理を飛ばす
    # NOTE: ここでreturnしているのはJSにセミコロンを出力させないためでもある
    if len(token_list) > 0 and token_list[0].ttype.Comment:
        return True

    for tkn in run_tokens:
        if '$' in tkn.string and not tkn.ttype.Comment:
            tkn.string = prepro(tkn.string)
            dbgprint(tkn.string)

    # NOTE: この先具体的な構文処理：returnしているところはJSへのセミコロン出力を防ぐため
    if len(token_list) == 1 and token_list[0].string == "{":
        return True

    running_func = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]

    running_func_block = Global.blocks[running_func.block_ind]
    if ((Global.fs[-1] != -1
         and ((is_plain(run_tokens[0]) and run_tokens[0].string is 'return')
              or Global.exel == running_func_block.body[-1].line))):
        dbgprint("Return from func.")
        try:
            running_func.rtrn()
            if funcexam: outnoln("return ", True)
            running_func.bhas_returned = eval_tokens(run_tokens[1:], funcexam)
            if funcexam: solvebuf()
        except IndexError:
            pass
        if funcexam: out(";")
        return False

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'loop':
        # loopブロックの中のJS出力はこの時点でやってしまう
        tmp_exel = Global.exel + 1
        block = Global.blocks[get_block_idx(Global.exel)]
        out("while (true) {")
        while True:
            Global.exel += 1
            RUN(Global.lines[Global.exel-1].tokens)
            if block.body[-1].line >= Global.exel:
                Global.exel = tmp_exel
                break
        out("}")

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'escape':
        idx = -1
        line_idx = -1
        for line in Global.lines[Global.exel::-1]:
            if len(line.tokens) == 1:
                if line.tokens[0].string == 'loop':
                    line_idx = line.num
                    break
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1:
            err("It is impossible to use 'escape' outside of Global.blocks.")
        Global.exel = Global.blocks[idx].body[-1].line
        return False

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'continue':
        idx = -1
        line_idx = -1
        for line in Global.lines[Global.exel::-1]:
            if len(Global.tokens) == 1:
                if Global.tokens[0].string == 'loop':
                    line_idx = line.num
                    break
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1:
            err("It is impossible to use 'continue' outside of Global.blocks.")
        Global.exel = Global.blocks[idx].body[0].line

    elif Global.fs[-1] == -1 and len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'end':
        return False

    # Detect FunctionClass.Functions
    # 関数作成 ^ @ ( name arg )
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == "@" and \
       is_plain(run_tokens[1]) and run_tokens[1].string == "(" and \
       is_plain(run_tokens[-1]) and run_tokens[-1].string == ")":
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == Global.exel:
                FunctionClass.Function(i).add()
                Global.exel = block.body[-1].line
                break
        out("")
        return True

    # 条件分岐文 (.. ?$) (^else ... ?$)
    elif len(run_tokens) >= 1 and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == '?':
        if run_tokens[0].string == 'cond' or run_tokens[0].string == 'branch':
            value = eval_tokens(run_tokens[1:-1])
        else:
            value = eval_tokens(run_tokens[:-1])
        value = cast_value(value, get_value_type('bool'))
        if value.string == 'true':
            # branch指定があった場合、cond指定があるブロックまで遡って、notしてandしていく
            if run_tokens[0].string == 'branch':
                for i, block in enumerate(Global.blocks):
                    if block.root[0].line == Global.exel:
                        idx = i
                        break
                for candidate_block in Global.blocks[idx-1::-1]:
                    if ((run_tokens[0].string == 'cond'
                         or run_tokens[0].string == 'branch')):
                        cond_value = eval_tokens(run_tokens[1:-1])
                    else:
                        cond_value = eval_tokens(run_tokens[:-1])
                    cond_value = cast_value(cond_value, get_value_type('bool'))
                    cond_value = buildinfunc.xaller_not([cond_value])
                    if cond_value.string == 'false':
                        Global.exel = Global.blocks[idx].body[-1].line
                        break
                    # cond指定があるブロックがあったらそこで終了
                    if candidate_block.root[0].string == 'cond':
                        break
        else:
            # 値がfalseだったときはブロックを飛ばす
            for block in Global.blocks:
                if block.root[0].line == Global.exel:
                    Global.exel = block.body[-1].line
                    break

    # 型定義 ^-(type):type
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == '-' and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
       is_plain(run_tokens[2]) and \
       is_plain(run_tokens[3]) and run_tokens[3].string == ')':
        for i, block in enumerate(Global.blocks):
            if block.root[0].line == Global.exel:
                add_type(i)
                Global.exel = block.body[-1].line
                break
        return True

    # 変数に代入 ^known-name = value
    # and get_var(run_tokens[0].string) is not None and
    elif len(run_tokens) >= 3 and \
       is_plain(run_tokens[0]) and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '=':
        # その変数自体に代入
        var = get_var(run_tokens[0].string)
        if var is None:
            err("Undefined variable '%s'" % run_tokens[0].string)
        string = run_tokens[2].string
        if len(run_tokens) == 3 and is_var_exists(string):
            var.subst(get_var(string))
        else:
            log_ts("run_tokens[2:]", run_tokens[2:])
            var.subst(copy.deepcopy(run_tokens[2:]))

        if ((len(run_tokens) == 3
             and len(var.value.type.variables) > 0
             and get_var(run_tokens[2].string) is not None)):
            varsrc = get_var(run_tokens[2].string)
            if var.value.type != varsrc.value.type:
                err("Incorrect substituting value which has different member.")
            memdst = get_members(run_tokens[0].string)
            memsrc = get_members(run_tokens[2].string)
            for i in xrange(len(memdst)):
                # NOTE: 宣言順が同じであるという条件のもとの代入（計算量削減）
                memdst[i].subst(memsrc[i])
                out(";")
#                 memdst[i].value = memsrc[i].value

    # プログラム変数作成 ^( name ) race
    elif ((len(run_tokens) >= 4
           and is_plain(run_tokens[0]) and run_tokens[0].string == '('
           and is_plain(run_tokens[1])
           and is_plain(run_tokens[2]) and run_tokens[2].string == ')'
           and is_plain(run_tokens[3]))):
        # ドットが変数名に入っているときにはエラー
        name = run_tokens[1].string[:]
        # if '$' in name: name = prepro(name)
        if '.' in name:
            err("ValueClass.Variable name couldn't contain '.'")
        vtype = get_value_type(run_tokens[3].string)
        if vtype is None:
            err("Undefined type '%s'" % run_tokens[3].string)

        variables = None
        if Global.fs[-1] != -1:
            variables = running_func.vars[-1]
        ValueClass.Variable.create(
            ValueClass.Variable(name, get_default_value(vtype)), variables)
        return True

    # 外部変数作成 ^+( name ) race
    # NOTE: 普通の変数作成と違うのは部分埋め込みがサポートされている点と、Web用変数しか作成できない点
    elif (len(run_tokens) >= 5 or len(run_tokens) >= 7) and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '+' and \
         is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
         is_plain(run_tokens[2]) and \
         is_plain(run_tokens[3]) and run_tokens[3].string == ')' and \
         is_plain(run_tokens[4]):
        name = run_tokens[2].string[:]
        pos = "at end"
        if len(run_tokens) == 7:
            pos = run_tokens[5].string + " " + run_tokens[6].string
        if len(RUN.element_stack) > 0:
            # 内包される要素があった場合
            pos = "in " + Global.blocks[RUN.element_stack[-1]].root[2].string
        if get_block_idx(Global.exel) != -1:
            RUN.element_stack.append(get_block_idx(Global.exel))

        # ドットが変数名に入っているときにはエラー
        if '.' in name:
            err("ValueClass.Variable name couldn't contain '.'")
        vtype = get_value_type(run_tokens[4].string)
        if vtype is None:
            err("Undefined type '%s'" % run_tokens[4].string)
        ValueClass.Variable.create(ValueClass.Variable(
            name, get_default_value(vtype)), None, True, pos)
        return True

    # 関数呼び出し（一行） ^( func args )
    elif len(run_tokens) >= 3 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == ')':
        eval_tokens(run_tokens)

    solvebuf()
    out(";")


    return True
    # 値 value



def report():
    """Reports trajectory of processing."""
    dbgprint("\n\n\n\nPROGRAM REPORT...")

    # Display all detected Global.tokens
    dbgprint("Detected Global.tokens:")
    table_data = [
        ["name", "Comment", "Str", "Return", "NL", "Line(R)",]
    ]
    for tkn in Global.tokens:
        table_data.append(
            [tkn.string,
             "#" if tkn.ttype.Comment else "",
             "\"" if tkn.ttype.String else "Ins" if tkn.ttype.StringIns else "",
             "R" if tkn.ttype.Return else "",
             "NL" if tkn.ttype.NL else "",
             "%s(%s)" % (tkn.line, tkn.real_line),
            ])
    table = AsciiTable(table_data)
    dbgprint(table.table)

    dbgprint("\nLINES "+str(len(Global.lines)))
    for line in Global.lines:
        for tkn in line.tokens:
            dbgprintnoln(tkn.string + " ")
        dbgprintnoln("\n")

    dbgprint("\nBLOCKS "+str(len(Global.blocks)))
    for block in Global.blocks:
        dbgprintnoln(("BLOCK%d This block is dominated by block "
                      % block.num))
        for dom in block.doms:
            dbgprintnoln(str(dom))
        dbgprint("")
        log_ts("root", block.root)
        log_ts("body", block.body)
        dbgprint("")
        dbgprint("")

    # Display all variables
    dbgprint("VARIABLES "+str(len(Global.Vars)))
    for var in Global.Vars:
        dbgprint("%s:%s %s=%s"
                 % (str(var.value.type.race),
                    str(var.value.type.name),
                    var.name,
                    str(var.value.string)))

    # Display all variables
    dbgprint("\nFUNCTIONS "+str(len(Global.Funcs)))
    for func in Global.Funcs:
        dbgprint("%s BLKIDX:%d ID:%d" % (func.name, func.block_ind, func.fid))

    # Display all types
    dbgprint("\nVALUE TYPES: "+str(len(Global.vtypes)))
    for vtype in Global.vtypes:
        dbgprint(vtype.race + ":" + vtype.name)
        dbgprint("variables >")
        for var in vtype.variables:
            dbgprint(var.name)
        dbgprint("func >")
        for func in vtype.functions:
            dbgprint(func.name)
        
