# -*- coding: utf-8 -*-
# from Global import *

"""Xaller alpha
programmer: CreativeGP
"""
from __future__ import print_function
from terminaltables import AsciiTable
import copy
import sys

import TokenClass
import ValueClass
import FunctionClass
import Global
import buildinfunc

def insert(dst, pos, src):
    return dst[:pos] + src + dst[pos:]

# TODO: エンコードの設定をしておく


def is_plain(t):
    return not t.ttype.Comment and not t.ttype.String


def is_number(t):
    return t.string.isdigit() and not t.ttype.String


def is_value(t):
    return is_number(t) or t.ttype.String or t.str == "\'"


def is_string(t):
    return t.ttype.String


def is_bool(t):
    return is_plain(t) and (t.string == 'true' or t.string == 'false')


def is_var_web(v):
    # None時の処理
    if v is None: return False

    return (v.external
            and get_var(v.name[:v.name.rfind(".")]+".web") != -1
            and get_var(v.name[:v.name.rfind(".")]+".web") is not v)


def dbgprint(s):
    if Global.bDbg: print(s)


def dbgprintnoln(s):
    if Global.bDbg: sys.stdout.write(s)


def err(string):
    # 便利なように自動的に実行行を見つけるようにする
    for t in Global.tokens:
        if Global.exel == t.line:
                dbgprint(Global.input+":"+str(t.real_line)+": "+string)
                sys.exit(1)
    # もし実行業がみつからなかったときには、適当に出力しておく
    dbgprint(Global.input+":"+"0: "+string)
    sys.exit(1)

def out(s):
    if not Global.lock:
        Global.outjs += s + "\n"
        print("JS >>> %s" % s + "\n")

def outnoln(s):
    if not Global.lock:
        Global.outjs += s
        print("JS >>> %s" % s)

def crfind(srcs, finds, count):
    ans = -1
    for _ in range(count):
        ans = srcs.rfind(finds, 0, ans)
    return ans

def outlock():
    Global.lock = True

def outunlock():
    Global.lock = False

# Export the accumulated buffer to JS file.
def solvebuf():
    if not Global.lock:
        outnoln(Global.jsbuf)
        Global.jsbuf = ''

# Add a text behind Global.jsbuf.
def outbuf(s):
    Global.jsbuf += s

def expid(s):
    return s.replace('.', '-')

def expname(s):
    return s.replace('.', '$')

def expvalue(v):
    return (S(v.string)
            if v.type.race == 'String' or v.type.race == 'Dirty' else
            v.string)

def create_external(Name, pos):
    # HACK: ここのコードだけ継承されても型を識別できるように特別な変数だけ動的に参照するようにしている
    typename = ''
    # if is_var_exists(Name + ".web"):
    #     typename = get_var(Name + ".web").string
    for v in Global.Vars:
        if v.name == Name + ".web":
            typename = v.value.string

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
            % (S(selector), func, S(expid(Name))))
    if typename == 'Label':
        out('$(%s).%s("<p id=%s></p>");'
            % (S(selector), func, S(expid(Name))))
    elif typename == 'Button':
        out('$(%s).%s("<button type=%s id=%s></button>");'
            % (S(selector), func, S('button'), S(expid(Name))))
    elif typename == 'Textbox':
        out('$(%s).%s("<textarea id=%s name=%s></textarea>");'
            % (S(selector), func, S(expid(Name)), S(expid(Name))))

# 代入される側がexternalな場合
def subst_external(Var, Val):
    vname = Var.name
    if not get_var(vname[:vname.rfind(".")]+".web") is None:
        if get_var(vname[:vname.rfind(".")]+".web").value.string == "Textbox":
            attr = vname[vname.rfind(".")+1:]
            out('$("#%s").attr(%s, %s);' % (
                expid(vname[:vname.find(".")]),
                S(attr),
                S(Var.value.string)))
        elif ((get_var(vname[:vname.rfind(".")]+".web").value.string == "Label"
               and ".text" in vname)):
            out('$("#%s").html("%s");'
                % (expid(vname[:vname.find(".text")]), Val.string))
        elif ((get_var(vname[:vname.rfind(".")]+".web").value.string == "Button"
               and ".text" in vname)):
            out('$("#%s").html("%s");'
                % (expid(vname[:vname.find(".text")]), Val.string))

def S(s):
    return "'" + s + "'"

def log_ts(s, ts):
    dbgprintnoln("\n")
    dbgprintnoln(s+":")
    for t in ts:
        dbgprintnoln(t.string + " ")
    dbgprintnoln("\n")

def get_block_idx(line):
    for i, b in enumerate(Global.blocks):
        if b.root[0].line == line:
            return i

    return -1

def get_var(s, care=True):
    # This is CARE.
    
    if care and Global.tfs[-1] is not None:
        runf = Global.tfs[-1]
        tmp = ''
        if s[0] == '.': tmp = runf.name[:runf.name.rfind(".")]
        s = tmp + s
        for v in runf.args[-1]:
            if s == v.name:
                return v
        for v in runf.vars[-1]:
            if s == v.name:
                return v
    elif Global.fs[-1] != -1:
        runf = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
        if s[0] == '.':
            tmp = runf.name.replace(
                Global.blocks[runf.block_ind].root[2].string, '', 1)
            s = s.replace('.', tmp, 1)
        dirty_in_runf = [(v for v in runf.args[-1]
                          if v.value.type.race == 'Dirty')]
        for v in dirty_in_runf:
            try:
                if s.index(v.name+".") == 0:
                    s = s.replace(v.name, v.value.string, 1)
                    dbgprint(s)
            except ValueError:
                pass
        for v in runf.args[-1]:
            if s == v.name:
                return v
        for v in runf.vars[-1]:
            if s == v.name:
                return v

    for v in Global.Vars:
        if s == v.name:
            return v
    return None

def is_var_exists(s):
    return get_var(s) is not None


# 親の名前からそのスコープから見える変数すべてのそのメンバを返す(ValueClass.Variable[])
def get_members(parent_name):
    res = []
    if Global.fs[-1] != -1:
        running_func = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
        for v in running_func.args[-1]:
            if parent_name + '.' in v.name:
                res.append(v)
        for v in running_func.vars[-1]:
            if parent_name + '.' in v.name:
                res.append(v)

    for v in Global.Vars:
        if parent_name + '.' in v.name:
            res.append(v)
    return res

def get_default_value(vt):
    vr = vt.race
    if vr == 'Integer': return ValueClass.Value('0', vt)
    if vr == 'String': return ValueClass.Value('', vt)
    if vr == 'Boolean': return ValueClass.Value('false', vt)
    return ValueClass.Value('', vt)

def get_value_type(s):
    """ グローバル変数Global.vtypesから変数型を探してくる。なかった場合はNoneを返す。 """
    for vt in Global.vtypes:
        if vt.name == s:
            return vt
    return None

def determine_value_race(token_list):
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
    vr = determine_value_race(token_list)
    if vr == 'Integer':
        return get_value_type('int')
    elif vr == 'String':
        return get_value_type('string')
    elif vr == 'Boolean':
        return get_value_type('bool')
    return None

def buildin_casting(value, nextvt):
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
    res = value
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
    ans = -1
    for f in Global.Funcs:
        if f.name == string:
            ans = f.func_ind
    return ans

def out_expression(token_list):
    lvl = 0
    con = -1
    buildin = [',']
    begof = []
    jstype = {'Integer':'Number', 'String':'String', 'Boolean':'Boolean'}
    sep_type = {
        ',':',', '+':'+', '-':'-', '*':'*',
        '/':'/', '%':'%', 'neg':'-', 'or':'||',
        'and':'&&', 'not':'!', 'xor':'^', 'eq':'==',
        '<':'<', '>':'>', '<=':'<=', '>=':'>=',
        'concat':'+', 'strlen':'', 'substr':'', 'strtrimr':'',
        'strtriml':'', 'strtrim':'', 'strmatch':'', 'stridx':'',
        'strridx':'', 'strrep':'',
    }

    if len(token_list) == 1:
        outnoln("'" + (token_list[0].string + "'"
                       if token_list[0].ttype.String else
                       token_list[0].string))
        return

    if len(token_list) == 3 or len(token_list) == 4:
        if is_var_exists(token_list[1].string):
            outnoln("%s(%s)"
                    % (jstype[get_var(token_list[1].string).value.type.race],
                       token_list[1].string + ")"))
            return

    for i, t in enumerate(token_list):
        if i == con: continue
        try:
            if t.string == '(':
                # 関数の始まりの場合:
                # 関数の始まりの場合は次の関数名を飛ばす
                # 関数ではない場合があるのでその場合は値か変数
                lvl += 1
                con = i+1
                if ((is_string(token_list[i+1])
                     or is_number(token_list[i+1])
                     or get_var(token_list[i+1].string))):
                    # 関数ではない場合:
                    con = 0
                    buildin.append(' ')
                    begof.append(len(Global.jsbuf))
                    Global.jsbuf += "("
                elif FunctionClass.Function.n2i(token_list[i+1].string) < -1:
                    # ビルドイン関数の場合:
                    # ビルドイン記号と関数の開始位置を更新して開始用カッコをつける
                    buildin.append(token_list[i+1].string)
                    begof.append(len(Global.jsbuf))
                    Global.jsbuf += "("
                else:
                    # 普通関数の場合:
                    # コンマと関数の開始位置を更新して関数名と開始用カッコをつける
                    buildin.append(',')
                    begof.append(len(Global.jsbuf))
                    Global.jsbuf += token_list[i+1].string + "("
            elif t.string == ')':
                # 関数終了の場合:
                # 原則として終了用途じカッコをつける処理が主
                # 確かめることは
                # ・型キャストの有無
                # ・それが引数として扱われているかどうか

                Global.jsbuf += ')'

                lvl -= 1
                is_arg = token_list[i+1].string != ")"
                if get_value_type(token_list[i+1].string) is not None:
                    # キャストがあった場合:
                    # ある場合は関数の開始位置に型変換関数名追加して式全体を括弧で括る
                    # Output casting.
                    con = i + 1

                    ts = jstype[get_value_type(token_list[i+1].string).race]
                    tmp = begof[-1]
                    Global.jsbuf = ("%s(%s)"
                                    % (Global.jsbuf[:tmp] + ts,
                                       Global.jsbuf[tmp:]))
                    is_arg = token_list[i+2].string != ")"

                if is_arg:
                    # 引数だった場合
                    # 区切り文字を加える (cp L414 415)
                    sep = sep_type[buildin[-1]]
                    Global.jsbuf += ("%s "
                                     % (','
                                        if buildin[-1] == ',' else
                                        ' ' + sep + ' '))

                del buildin[-1]
                del begof[-1]
            else:
                # その他の場合:
                # 基本的に引数が回ってくるはずなので区切り文字で区切って出力する
                # NOTE: 評価した値ではなく、そのまま、書かれたままを出力する
                # NOTE: Web変数は展開して出力
                # TODO: これだけでは値が定義されていなかった場合の処理が適切ではないので改善する
                # eval_tokens([t])
                js_formatted_string = "'" + t.string + ("'"
                                                        if t.ttype.String
                                                        else t.string)
                if get_var(t.string) is not None:
                    v = get_var(t.string)
                    if is_var_web(v):
                        v.refer()
                    else:
                        Global.jsbuf += js_formatted_string
                else:
                    Global.jsbuf += js_formatted_string

                if token_list[i+1].string != ")":
                    sep = sep_type[buildin[-1]]
                    Global.jsbuf += ("%s "
                                     % (','
                                        if buildin[-1] == ',' else
                                        ' ' + sep + ' '))
        except IndexError:
            pass
    solvebuf()


# NOTE: jsがFalseだったときにはJS出力はしない
def eval_tokens(token_list, js=True):
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
            return var.refer(js)
        if not is_number(token_list[0]) and not is_string(token_list[0]):
            err("Undefined variable '%s'" % token_list[0].string)
        # 変数ではない場合
        v = ValueClass.Value(token_list[0].string,
                             determine_value_type(token_list))
        if js:
            Global.jsbuf += expvalue(v)
        return v
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
        for i in range(len(token_list)-1):
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
            vt = get_value_type(token_list[-1].string)
            result_value = cast_value(result_value, vt)
            return result_value
        return result_value
    return None

#入れ子には対応しないプリプロセッサ
def prepro(s):
    tmps = ''
    tmpi = 0
    flag = False
    if not '$' in s:
        return s
    for i, c in enumerate(s):
        if c == '$':
            flag = not flag
            if flag == True:
                # 計測開始
                tmpi = i
            else:
                # 計測停止
                ans = eval_tokens([TokenClass.Token(0, tmps[1:])]).string
                s = s.replace(s[tmpi:i+1], '', 1)
                s = s[:tmpi] + ans + s[tmpi:]
                return prepro(s)
        if flag:
            # 計測中
            tmps += c


def add_type(block_ind):
    inh_count = int((len(Global.blocks[block_ind].root) - 4) / 2)
    t = ValueClass.Type(Global.blocks[block_ind].root[2].string, 'Dirty')
    dbgprintnoln(("New type '%s' inheritanced by type"
                  % Global.blocks[block_ind].root[2].string))
    for i in range(inh_count):
        tmp = get_value_type(Global.blocks[block_ind].root[5+i*2].string)
        if tmp is None:
            err("Undefined type '%s'" % tmp.name)
        if tmp.race != 'Dirty':
            # ピュアな型をコピーできる条件は、メンバがないことと、コピーする型が一つであること
            if inh_count != 1:
                err("There are plural inheritance despite trying"
                    "to inherite pure type.")
            t.race = tmp.race
            break
        dbgprintnoln(Global.blocks[block_ind].root[5].string+"', ")
        # コピー指定されている型の変数と関数をすべて雑にコピー
        # 同じ名前があれば古い方を削除
        for v in tmp.variables:
            for vs in t.variables:
                if vs.name == v.name:
                    del vs
        t.variables.extend(tmp.variables)
        for f in tmp.functions:
            for fs in t.functions:
                if fs.name == f.name:
                    del fs
        t.functions.extend(tmp.functions)
    dbgprint("")

    token_list = []
    for token in Global.blocks[block_ind].body:
        token_list.append(token)
        if token.ttype.Return:
            # 関数作成 ^ @ ( name arg )
            if len(token_list) >= 4 and \
               is_plain(token_list[0]) and token_list[0].string == "@" and \
               is_plain(token_list[1]) and token_list[1].string == "(" and \
               is_plain(token_list[-1]) and token_list[-1].string == ")":
                if t.race != 'Dirty': err("Pure type couldn't have members.")
                for i, b in enumerate(Global.blocks):
                    if b.root[0].line == token.line:
                        t.functions.append(FunctionClass.Function(i))
                        Global.exel = b.body[-1].line
                        break

            elif len(token_list) >= 4 and \
                 is_plain(token_list[0]) and token_list[0].string == '(' and \
                 is_plain(token_list[1]) and \
                 is_plain(token_list[2]) and token_list[2].string == ')' and \
                 is_plain(token_list[3]):
                if t.race != 'Dirty': err("Pure type couldn't have members.")
                vt = get_value_type(token_list[3].string)
                if vt is None:
                    err("Undefined type '"+token_list[3].string+"'.")
                t.variables.append(ValueClass.Variable(
                    token_list[1].string, get_default_value(vt)))
            del token_list[:]
    Global.vtypes.append(t)

def translate(rt, sd=None):
    # NOTE: 疑似関数内static変数の準備
    if sd is None:
        sd = []
    if not hasattr(translate, 'element_stack'):
        translate.element_stack = sd
    run_tokens = copy.deepcopy(rt)

    log_ts("rt", rt)
    # コメント業の場合処理を飛ばす
    # NOTE: ここでreturnしているのはJSにセミコロンを出力させないためでもある
    if len(rt) > 0 and rt[0].ttype.Comment:
        return True

    for t in run_tokens:
        if '$' in t.string and not t.ttype.Comment:
            t.string = prepro(t.string)
            dbgprint(t.string)

    if len(run_tokens) == 1 and run_tokens[0].string == "{":
        Global.tfs.append(None)
        return True
    elif len(run_tokens) == 1 and run_tokens[0].string == "}":
        Global.tfs.pop()
        if Global.tfs[-1] is None:
            out("}")
        elif Global.tfs[-1].event:
            out("});")
        else:
            out("}")
        return 1
    # NOTE: この先具体的な構文処理：returnしているところはJSへのセミコロン出力を防ぐため
    if ((len(run_tokens) > 0
         and is_plain(run_tokens[0])
         and run_tokens[0].string == 'return')):
        try:
            outnoln("return ", True)
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
        for l in Global.lines[Global.exel::-1]:
            if len(l.tokens) == 1:
                if l.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == line_idx+1:
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
        for l in Global.lines[Global.exel::-1]:
            if len(Global.tokens) == 1:
                if Global.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1:
            err("It is impossible to use 'continue' outside of Global.blocks.")
        return True

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
        for i, b in enumerate(Global.blocks):
            print(b.root[0].line)
            if b.root[0].line == run_tokens[0].line:
                FunctionClass.Function(i).add()
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
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == Global.exel + 1:
                add_type(i)
                Global.exel = b.body[-1].line -1
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
        if run_tokens[0].string[run_tokens[0].string.rfind('.')+1:] == '_web':
            get_var(run_tokens[0].string).value.string = run_tokens[2].string
        var = get_var(run_tokens[0].string)
        if var is None:
            err("Undefined variable '%s'" % run_tokens[0].string)
        s = run_tokens[2].string
        if len(run_tokens) == 3 and is_var_exists(s):
            var.subst(get_var(s))
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
            for i in range(len(memdst)):
                # NOTE: 宣言順が同じであるという条件のもとの代入（計算量削減）
                memdst[i].subst(memsrc[i])
                out(";")
                memdst[i].value = memsrc[i].value

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
        vt = get_value_type(run_tokens[3].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[3].string)

        variables = None
        if Global.fs[-1] != -1:
            runf = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
            variables = runf.vars[-1]
        ValueClass.Variable.create(ValueClass.Variable(
            name, get_default_value(vt)), variables)
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
        if len(translate.element_stack) > 0:
            # 内包される要素があった場合
            included_block = Global.blocks[translate.element_stack[-1]]
            pos = "in " + included_block.root[2].string
        if get_block_idx(Global.exel) != -1:
            translate.element_stack.append(get_block_idx(Global.exel))

        # ドットが変数名に入っているときにはエラー
        if '.' in name:
            err("ValueClass.Variable name couldn't contain '.'")
        vt = get_value_type(run_tokens[4].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[4].string)
        ValueClass.Variable.create(ValueClass.Variable(
            name, get_default_value(vt)), None, True, pos)
        return True

    # 関数呼び出し（一行） ^( func args )
    elif len(run_tokens) >= 3 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == ')':
        out_expression(run_tokens)

    solvebuf()
    out(";")


    return True


def RUN(rt, sd=None, funcexam=False):
    # NOTE: 疑似関数内static変数の準備
    if sd is None:
        sd = []
    if not hasattr(RUN, 'element_stack'):
        RUN.element_stack = sd
    run_tokens = copy.deepcopy(rt)

    log_ts("rt", rt)
    # コメント業の場合処理を飛ばす
    # NOTE: ここでreturnしているのはJSにセミコロンを出力させないためでもある
    if len(rt) > 0 and rt[0].ttype.Comment:
        return True

    for t in run_tokens:
        if '$' in t.string and not t.ttype.Comment:
            t.string = prepro(t.string)
            dbgprint(t.string)

    # NOTE: この先具体的な構文処理：returnしているところはJSへのセミコロン出力を防ぐため
    if len(rt) == 1 and rt[0].string == "{":
        return True

    running_func_idx = FunctionClass.Function.id2i(Global.fs[-1])
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
        b = Global.blocks[get_block_idx(Global.exel)]
        out("while (true) {")
        while True:
            Global.exel += 1
            RUN(Global.lines[Global.exel-1].tokens)
            if b.body[-1].line >= Global.exel:
                Global.exel = tmp_exel
                break
        out("}")

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'escape':
        idx = -1
        line_idx = -1
        for l in Global.lines[Global.exel::-1]:
            if len(l.tokens) == 1:
                if l.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == line_idx+1:
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
        for l in Global.lines[Global.exel::-1]:
            if len(Global.tokens) == 1:
                if Global.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == line_idx+1:
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
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == Global.exel:
                FunctionClass.Function(i).add()
                Global.exel = b.body[-1].line
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
                for i, b in enumerate(Global.blocks):
                    if b.root[0].line == Global.exel:
                        idx = i
                        break
                for b in Global.blocks[idx-1::-1]:
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
                    if b.root[0].string == 'cond':
                        break
        else:
            # 値がfalseだったときはブロックを飛ばす
            for b in Global.blocks:
                if b.root[0].line == Global.exel:
                    Global.exel = b.body[-1].line
                    break

    # 型定義 ^-(type):type
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == '-' and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
       is_plain(run_tokens[2]) and \
       is_plain(run_tokens[3]) and run_tokens[3].string == ')':
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == Global.exel:
                add_type(i)
                Global.exel = b.body[-1].line
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
        s = run_tokens[2].string
        if len(run_tokens) == 3 and is_var_exists(s):
            var.subst(get_var(s))
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
            for i in range(len(memdst)):
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
        vt = get_value_type(run_tokens[3].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[3].string)

        variables = None
        if Global.fs[-1] != -1:
            variables = running_func.vars[-1]
        ValueClass.Variable.create(
            ValueClass.Variable(name, get_default_value(vt)), variables)
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
        vt = get_value_type(run_tokens[4].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[4].string)
        ValueClass.Variable.create(ValueClass.Variable(
            name, get_default_value(vt)), None, True, pos)
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
    """ Reports trajectory of processing. """

    dbgprint("\n\n\n\nPROGRAM REPORT...")

    # Display all detected Global.tokens
    dbgprint("Detected Global.tokens:")
    table_data = [
        ["name", "Comment", "Str", "Return", "NL", "Line(R)",]
    ]
    for t in Global.tokens:
        table_data.append(
            [t.string,
             "#" if t.ttype.Comment else "",
             "\"" if t.ttype.String else "Ins" if t.ttype.StringIns else "",
             "R" if t.ttype.Return else "",
             "NL" if t.ttype.NL else "",
             "%s(%s)" % (t.line, t.real_line),
            ])
    table = AsciiTable(table_data)
    dbgprint(table.table)

    dbgprint("\nLINES "+str(len(Global.lines)))
    for l in Global.lines:
        for t in l.tokens:
            dbgprintnoln(t.string + " ")
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
    for v in Global.Vars:
        dbgprint("%s:%s %s=%s"
                 % (str(v.value.type.race),
                    str(v.value.type.name),
                    v.name,
                    str(v.value.string)))

    # Display all variables
    dbgprint("\nFUNCTIONS "+str(len(Global.Funcs)))
    for f in Global.Funcs:
        dbgprint("%s BLKIDX:%d ID:%d" % (f.name, f.block_ind, f.id))

    # Display all types
    dbgprint("\nVALUE TYPES: "+str(len(Global.vtypes)))
    for vt in Global.vtypes:
        dbgprint(vt.race + ":" + vt.name)
