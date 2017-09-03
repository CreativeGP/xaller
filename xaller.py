#!/usr/bin/python3
# -*- coding: utf-8 -*-
import sys
import os
import atexit
import re
from terminaltables import AsciiTable
from enum import Enum
import copy
from pprint import pprint


# TODO(future)
# Dirty型の比較（これから）
# 変数の初期化

# TODO

# 再帰的な処理がきちんとできるかどうか（関数のヒープが正しく動いているかどうか）
# DBG
# ビルドイン関数neg, or, and, not, xor, eq
# 条件分岐文が関数内で実行できるか

# Global Variables
g_exel = 1  # Line to excute next.
g_retl = [] # Lineto return from func.
g_fs = [-1] # Running function index (default -1).
g_outjs = '' # JS File to output
g_bDbg = False # Flag output for debug.

def dbgprint(s):
    global g_bDbg
    if g_bDbg: print(s)

def dbgprintnoln(s):
    global g_bDbg
    if g_bDbg: sys.stdout.write(s)

def err(string):
    global input
    global g_exel
    global tokens
    # 便利なように自動的に実行行を見つけるようにする
    for t in tokens:
        if g_exel == t.line:
                dbgprint(input+":"+str(t.real_line)+": "+string)
                sys.exit(1)
    # もし実行業がみつからなかったときには、適当に出力しておく
    dbgprint(input+":"+"???"+string)
    sys.exit(1)

def out(s):
    global g_outjs
    g_outjs += s + "\n"

def expid(s):
    return s.replace('.', '-')

def create_external(Name, vtype, pos):
    global g_outjs
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
    elif " beg" in pos:
        selector = 'body'
        func = 'prepend'
    else:
        selector = "#" + pos[pos.find(" ")+1:]

    # selector = 'body'
    # func = 'append'
    print(vtype._name)
    if vtype._name == 'HTML':
        out('$(%s).%s("<ran id=%s></ran>");' % (S(selector), func, S(expid(Name))))
    if vtype._name == 'Label':
        out('$(%s).%s("<p id=%s></p>");' % (S(selector), func, S(expid(Name))))
    elif vtype._name == 'Button':
        out('$(%s).%s("<button type=%s id=%s></button>");' % (S(selector), func, S('button'), S(expid(Name))))
    elif vtype._name == 'Textbox':
        out('$(%s).%s("<textarea id=%s name=%s></textarea>");' % (S(selector), func, S(expid(Name)), S(expid(Name))))

# 代入される側がexternalな場合
def subst_external(Var, Val):
    global g_outjs
    tname = Var._value._type._name
    vname = Var._name
    if not get_var(vname[:vname.rfind(".")]+"._web") is None:
        if get_var(vname[:vname.rfind(".")]+"._web")._value._string == "Textbox":
            attr = vname[vname.rfind(".")+1:]
            out('$("#%s").attr(%s, %s);' % (
                expid(vname[:vname.find(".")]),
                S(attr),
                S(Var._value._string)))
        elif get_var(vname[:vname.rfind(".")]+"._web")._value._string == "Label" and ".text" in vname:
            out('$("#%s").html("%s");' % (expid(vname[:vname.find(".text")]), Val._string))
        elif get_var(vname[:vname.rfind(".")]+"._web")._value._string == "Button" and ".text" in vname:
            out('$("#%s").html("%s");' % (expid(vname[:vname.find(".text")]), Val._string))

class TokenType:
    def __init__(self):
        self.Comment = False
        self.Return = False
        self.NL = False
        self.String = False
        self.StringIns = False
        self.ListBegin = False
        self.ListEnd = False
        self.List = False
        self.Atom = False
        self.EqualToSubst = False

class Token:
    def __init__(self, line, string = ''):
        self.ttype = TokenType()
        self.string = string
        self.line = line
        self.real_line = 0 # 実際のファイルでの行番号

    def find_keyword(tokens, keyword):
        ''' トークンの中にキーワードがあるかどうかを識別する '''
        for t in tokens:
            if is_plain(t) and t.string == keyword:
                return True
        return False

class Line:
    def __init__(self, num):
        self.tokens = []
        self.num = num
        self.token_ind = 0

class Block:
    def __init__(self):
        self.root = []
        self.body = []
        self.doms = []
        self.token_ind = 0
        self.indent = 0
        self.num = 0

class Type:
    def __init__(self, name, race):
        self._name = name
        self._race = race
        self._variables = []
        self._functions = []
    
class Value:
    def __init__(self, data, vt):
        self._string = data
        self._type = vt

    def __str__(self):
        res = ''
        if self._type._race == 'String':
            res += '"'
        res += self._string
        if self._type._race == 'String':
            res += '"'
        return res

class Variable:
    def __init__(self, _name, _value):
        self._name = _name
        self._value = _value
        self._external = False

    def subst(self, value):
        if self._value._type._name == value._type._name:
            self._value = value
#            if self._value._type._race == "Dirty":
#                pass
        else:
            err("Invalid substituting value which has different TYPE.")

    # 変数の作成を型どおりにやる
    def create(var, variables = None, external = False, pos = 'at end'):
        global Vars
        global Funcs
        global blocks
        global g_fs

        if variables is None:
            variables = Vars

        # 作成予定関数を実際に作成
        for f in var._value._type._functions:
            new = copy.deepcopy(f)
            f = Function(new._block_ind)
            f._name = var._name+"."+new._name
            Function.add(f)
        # 型にメンバがある場合はそれも実際に作成
        for v in var._value._type._variables:
            Variable.create(Variable(var._name+"."+v._name, get_default_value(v._value._type)), variables, external)
        
        # 実際に変数を作る
        if var._value._type._race == 'Dirty':
            var._value._string = var._name
        if g_fs[-1] != -1:
            Funcs[Function.id2i(g_fs[-1])]._vars[-1].append(var)
        else:
            variables.append(var)
            if external:
                Vars[-1]._external = True
                create_external(var._name, var._value._type, pos)


        # コンストラクタを呼び出す
        if Function.n2i(var._name+".__init") == -1:
            return

        Funcs[Function.n2i(var._name+".__init")].run([])

class Function:
    _static_id = 0
    
    def __init__(self, block_ind, buildin = False):
        global blocks
        b = blocks[block_ind]
        if not Token.find_keyword(b.body, "return"):
#            err("There is no 'return' in function '"+b.root[2].string+"'")
            pass
        arg_count = int((len(b.root) - 4) / 4)
        # 引数リストを作成
        arglist = []
        for i in range(arg_count):
            arglist.append(Variable(b.root[i*4+4].string,
                                    Value('', get_value_type(b.root[i*4+6].string))))
        self._name = b.root[2].string
        self._block_ind = block_ind
        self._args = [arglist]
        self._vars = [[]]
        self._return = None
        self._buildin = buildin
        self._id = Function._static_id

    @staticmethod
    def n2i(name):
        global Funcs
        global blocks
        global g_fs

        if name == '+': return -10
        if name == '-': return -11
        if name == '*': return -12
        if name == '/': return -13
        if name == '%': return -14
        if name == 'neg': return -15
        if name == 'and': return -16
        if name == 'or': return -17
        if name == 'xor': return -18
        if name == 'not': return -19
        if name == 'eq': return -20
        if name == '>': return -21
        if name == '<': return -22
        if name == '>=': return -23
        if name == '<=': return -24
        if name == 'strcat': return -25
        if name == 'strlen': return -26
        if name == 'substr': return -27
        if name == 'strtrimr': return -28
        if name == 'strtriml': return -29
        if name == 'strtrim': return -30
        if name == 'strmatch': return -31
        if name == 'stridx': return -32
        if name == 'strridx': return -33
        if name == 'strrep': return -34
        if '.' in name and g_fs[-1] != -1:
            runf = Funcs[Function.id2i(g_fs[-1])]
            try:
                hoge = runf._name[runf._name.rindex('.')+1:]
                piyo = runf._name.replace(hoge, '', 1)
                name = name.replace('.', piyo, 1)
            except ValueError:
                pass
        for idx, f in enumerate(Funcs):
            if f._name == name:
                return idx
        return -1

    @staticmethod
    def id2i(id):
        global Funcs
        for i, f in enumerate(Funcs):
            if f._id == id:
                return i
        return -1

    # グローバル関数Funcsに追加
    def add(self):
        global Funcs
        Function._static_id += 1
        # すでに同名の関数がある場合は古い方を上書き
        idx = Function.n2i(self._name)
        if idx < -1:
            err("Function '%s' is build-in function name." % self._name)
        elif idx != -1:
            idx = Function.n2i(self._name)
            Funcs[idx] = self
        # そうでない場合は新規作成する
        else:
            Funcs.append(self)
    
    # 関数の処理の実行、戻り値はこの関数の戻り値としてValue型で返される
    def run(self, args):
        global g_retl
        global g_exel
        global g_fs
        global tokens
        global lines

        dbgprint("RUNNING FUNCTION: LEN(ARGS)=%d" % len(self._args))
        
        g_retl.append(g_exel)
        g_exel = tokens[blocks[self._block_ind].token_ind].line-1
        g_fs.append(self._id)

        self._return = None

        # 関数呼び出し用の変数リストを作る
        self._args.append(copy.deepcopy(self._args[0]))
        self._vars.append(copy.deepcopy(self._vars[0]))

        # 関数に渡された引数の処理
        for i in range(len(args)):
            self._args[-1][i].subst(args[i])
            dbgprint("Arg_Variable changed("+self._args[-1][i]._name+" -> "+args[i]._string+")")

        while True:
            if not RUN(lines[g_exel-1].tokens) : break
            if g_exel-1 >= len(lines)-1: break
            g_exel += 1

        return self._return

    def rtrn():
        global g_retl
        global g_exel
        global g_fs

        f = Funcs[Function.id2i(g_fs[-1])]
        del f._args[-1]
        del f._vars[-1]
        g_exel = g_retl.pop()
        g_fs.pop()

class JSExternal:
    def __init__(self, variable):
        self.var = variable
    
    def refer(self):
        return self.var._value
    
    # 外部変数に代入するときの関数。引数は外部変数の場合は
    def subst(self, v):
        pass


def xaller_plus(arg):
    ans  = 0
    for i in range(len(arg)):
        if arg[i]._type._race == 'Integer':
            ans += int(arg[i]._string)
        else:
            err("Function '+' could receive only 'Integer' race arguments.")

    return Value(str(ans), get_value_type('int'))

def xaller_product(arg):
    ans  = int(arg[0]._string)
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            ans *= int(arg[i]._string)
        else:
            err("Function '*' could receive only 'Integer' race arguments.")
    return Value(str(ans), get_value_type('int'))

def xaller_sub(arg):
    ans  = int(arg[0]._string)
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            ans -= int(arg[i]._string)
        else:
            err("Function '-' could receive only 'Integer' race arguments.")
    return Value(str(ans), get_value_type('int'))

def xaller_divide(arg):
    ans  = int(arg[0]._string)
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            if int(arg[i]._string) == 0:
                err("Couldn't divide by 0.")
            ans /= int(arg[i]._string)
        else:
            err("Function '/' could receive only 'Integer' race arguments.")
    return Value(str(ans), get_value_type('int'))

def xaller_remain(arg):
    ans = 0
    if len(arg) != 2:
        err("Function '%' could receive only two arguments.")
    for i in range(len(arg)):
        if arg[i]._type._race == 'Integer':
            ans += int(arg[i]._string)
        else:
            err("Function '+' could receive only 'Integer' race arguments.")
    return Value(str(ans), get_value_type('int'))

def xaller_neg(arg):
    ans = 0
    if len(arg) != 1:
        err("Function 'neg' could receive only one arguments.")
    if arg[0]._type._race == 'Integer':
        ans -= int(arg[0]._string)
    else:
        err("Function 'neg' could receive only 'Integer' race arguments.")
    return Value(str(ans), get_value_type('int'))

def xaller_and(arg):
    ans = True
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function 'and'.")
    for i in range(len(arg)):
        if arg[i]._type._race == 'Boolean':
            ans &= True if arg[i]._string == 'true' else False
        else:
            err("Function 'and' could receive only 'Boolean' race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_or(arg):
    ans = False
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function 'or'.")
    for i in range(len(arg)):
        if arg[i]._type._race == 'Boolean':
            ans |= True if arg[i]._string == 'true' else False
        else:
            err("Function 'or' could receive only 'Boolean' race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_not(arg):
    ans = True
    if len(arg) != 1:
        err("Function 'not' could receive only one argument.")
    if arg[0]._type._race == 'Boolean':
        ans = False if arg[0]._string == 'true' else True
    else:
        err("Function 'not' could receive only 'Boolean' race argument.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_xor(arg):
    ans = True
    if len(arg) != 2:
        err("Function 'xor' could receive only two arguments.")
    if arg[0]._type._race == 'Boolean':
        ans = False if arg[0]._string == 'false' else True
        ans ^= False if arg[1]._string == 'false' else True
    else:
        err("Function 'xor' could receive only 'Boolean' race argument.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_eq(arg):
    ans = True
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function 'eq'.")
    for i in range(len(arg)):
        if arg[0]._type._race == arg[i]._type._race:
            if arg[0]._string != arg[i]._string:
                ans = False
        else:
            err("It is impossible to pass function 'eq' the different race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_less(arg):
    ans = True
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function '<'.")
    if arg[0]._type._race != 'Integer':
        err("It is impossible to pass function '<' the different race arguments.")
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            if not (int(arg[i-1]._string) < int(arg[i]._string)):
                ans = False
        else:
            err("It is impossible to pass function '<' the different race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_greater(arg):
    ans = True
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function '>'.")
    if arg[0]._type._race != 'Integer':
        err("It is impossible to pass function '>' the different race arguments.")
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            if not (int(arg[i-1]._string) > int(arg[i]._string)):
                ans = False
        else:
            err("It is impossible to pass function '>' the different race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_lesseq(arg):
    ans = True
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function '<='.")
    if arg[0]._type._race != 'Integer':
        err("It is impossible to pass function '<=' the different race arguments.")
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            if not (int(arg[i-1]._string) <= int(arg[i]._string)):
                ans = False
        else:
            err("It is impossible to pass function '<=' the different race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_greatereq(arg):
    ans = True
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function '>='.")
    if arg[0]._type._race != 'Integer':
        err("It is impossible to pass function '>=' the different race arguments.")
    for i in range(1, len(arg)):
        if arg[i]._type._race == 'Integer':
            if not (int(arg[i-1]._string) >= int(arg[i]._string)):
                ans = False
        else:
            err("It is impossible to pass function '>=' the different race arguments.")
    return Value(str(ans).lower(), get_value_type('bool'))

def xaller_strcat(arg):
    ans = ''
    if len(arg) < 2:
        err("It is necessary to pass at least two arguments to run function 'strcat'.")
    for i in range(len(arg)):
        if arg[i]._type._race == 'String':
            ans += arg[i]._string
        else:
            err("It is impossible to pass function 'strcon' the different race arguments.")
    return Value(ans, get_value_type('string'))
    
def xaller_strlen(arg):
    ans = 0
    if len(arg) != 1:
        err("Functin 'strlen' could receive only one arugument.")
    if arg[0]._type._race == 'String':
        ans += len(arg[0]._string)
    else:
        err("It is impossible to pass function 'strlen' the different race arguments.")
    return Value(str(ans), get_value_type('int'))
    
# (substr string start [length]) 
def xaller_substr(arg):
    ans = ""
    if len(arg) == 2 or len(arg) == 3:
        length = None
        if arg[0]._type._race == 'String': string = arg[0]._string
        else: err("Function 'substr' > Wrong arguments. (substr string start [length])")
        if arg[1]._type._race == 'Integer': start = int(arg[1]._string)
        else: err("Function 'substr' > Wrong arguments. (substr string start [length])")
        if len(arg) == 3:
            if arg[2]._type._race == 'Integer': length = int(arg[2]._string)
            else: err("Function 'substr' > Wrong arguments. (substr string start [length])")
        if length is None:
            if start < len(string) and start >= 0: ans = string[start:]
            else: err("Function 'substr' > Out of range.")

        else:
            if start+length < len(string) and start+length >= 0: ans = string[start:start+length]
            else: err("Function 'substr' > Out of range.")
    else:
        err("Function 'substr' > Wrong arguments. (substr string start [length])")
    return Value(ans, get_value_type('string'))
    
def xaller_strtrimr(arg):
    pass # Coming soon.
    
def xaller_strtriml(arg):
    pass # Coming soon.
    
def xaller_strtrim(arg):
    pass # Coming soon.
    
def xaller_strmatch(arg):
    pass # Coming soon.

# (stridx cmpstr string)
def xaller_stridx(arg):
    ans = -1
    if len(arg) == 2:
        if arg[0]._type._race == 'String':
            cmpstr = arg[0]._string
        else: err("Functino 'stridx' > Wrong arguments. (stridx cmpstr string)")
        if arg[1]._type._race == 'String':
            string = arg[1]._string
        else: err("Functino 'stridx' > Wrong arguments. (stridx cmpstr string)")

        for i in range(len(string)+1):
            dststr = string[:i]
            if cmpstr in dststr:
                ans = i-len(cmpstr)
                break
    else: err("Functino 'stridx' > Wrong arguments. (stridx cmpstr string)")
    return Value(str(ans), get_value_type('int'))
    
# (strridx cmpstr string)
def xaller_strridx(arg):
    ans = -1
    if len(arg) == 2:
        if arg[0]._type._race == 'String':
            cmpstr = arg[0]._string
        else: err("Functino 'strridx' > Wrong arguments. (strridx cmpstr string)")
        if arg[1]._type._race == 'String':
            string = arg[1]._string
        else: err("Functino 'strridx' > Wrong arguments. (strridx cmpstr string)")

        for i in range(len(string))[::-1]:
            dststr = string[i:]
            dbgprint(dststr)
            if cmpstr in dststr:
                ans = i
                break
    else: err("Functino 'strridx' > Wrong arguments. (strridx cmpstr string)")
    return Value(str(ans), get_value_type('int'))
    
def xaller_strrep(arg):
    pass # Coming soon.

def S(s):
    return "'" + s + "'"

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

def log_ts(s, ts):
    dbgprintnoln("\n")
    dbgprintnoln(s+":")
    for t in ts:
        dbgprintnoln(t.string + " ")
    dbgprintnoln("\n")

def get_block_idx(line):
    global blocks
    for i, b in enumerate(blocks):
        if b.root[0].line == line:
            return i

    return -1

def get_var(s):
    global g_fs
    global Funcs
    global Vars
    if g_fs[-1] != -1:
        runf = Funcs[Function.id2i(g_fs[-1])]
        if s[0] == '.':
            tmp = runf._name.replace(blocks[runf._block_ind].root[2].string, '', 1)
            s = s.replace('.', tmp, 1)
        dirty_in_runf = [v for v in runf._args[-1] if v._value._type._race == 'Dirty']
        for v in dirty_in_runf:
            try:
                if s.index(v._name+".") == 0:
                    s = s.replace(v._name, v._value._string, 1)
                    dbgprint(s)
            except ValueError:
                pass
        for v in runf._args[-1]:
            if s == v._name:
                return v
        for v in runf._vars[-1]:
            if s == v._name:
                return v
        
    for v in Vars:
        if s == v._name:
            return v
    return None

# 親の名前からそのスコープから見える変数すべてのそのメンバを返す(Variable[])
def get_members(parent_name):
    global g_fs
    global Funcs
    global Vars
    res = []
    if g_fs[-1] != -1:
        for v in Funcs[Function.id2i(g_fs[-1])]._args[-1]:
            if (parent_name+'.') in v._name:
                res.append(v)
        for v in Funcs[Function.id2i(g_fs[-1])]._vars[-1]:
            if (parent_name+'.') in v._name:
                res.append(v)
        
    for v in Vars:
        if (parent_name+'.') in v._name:
            res.append(v)
    return res

def get_default_value(vt):
    vr = vt._race
    if vr == 'Integer': return Value('0', vt)
    if vr == 'String': return Value('', vt)
    if vr == 'Boolean': return Value('false', vt)
    return Value('', vt)

def get_value_race(s):
    pass

def get_value_type(s):
    """ グローバル変数vtypesから変数型を探してくる。なかった場合はNoneを返す。 """
    global vtypes
    for vt in vtypes:
        if vt._name == s:
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
    oldvr = value._type._race
    nextvr = nextvt._race
    res = value
    
    if oldvr == 'Integer' and nextvr == 'String':
        res = Value(value._string, nextvt)
    if oldvr == 'Integer' and nextvr == 'Boolean':
        res = Value('false', nextvt) if value._string == '0' else Value('true', nextvt)

    if oldvr == 'String' and nextvr == 'Integer':
        res = Value(value._string, nextvt)
    if oldvr == 'String' and nextvr == 'Boolean':
        tmp = value._string.upper()
        if 'TRUE' in tmp:
            res = Value('true', nextvt)
        else:
            res = Value('false', nextvt)

    if oldvr == 'Boolean' and nextvr == 'Integer':
        res = res = Value('1', nextvt) if value._string == 'true' else Value('0', nextvt)
    if oldvr == 'Boolean' and nextvr == 'String':
        res = Value(value._string, nextvt)
    return res

def cast_value(value, nextvt):
    global Funcs
    global g_fs
    oldvr = value._type._race
    nextvr = nextvt._race
    res = value
    if g_fs[-1] == Function.n2i('__'+value._type._name+'_'+nextvt._name) and \
       Function.n2i('__'+value._type._name+'_'+nextvt._name) != -1:
        # キャスト関数が定義されていてかつキャスト関数実行中の場合（ビルドイン変換）
        res = buildin_casting(value, nextvt)
    elif Function.n2i('__'+value._type._name+'_'+nextvt._name) != -1:
        # キャスト関数が定義されていて実行はされていない場合（キャスト関数実行）
        res = Funcs[Function.n2i('__'+value._type._name+'_'+nextvt._name)].run([value])
        if res._type != nextvt:
            # TODO: Error キャスト関数を実行してみたのに結果が求められた型変換の型と違う
            pass
    else:
        # キャスト関数も定義されていない場合（ビルドイン変換）
        res = buildin_casting(value, nextvt)

    return res

def eval_tokens(token_list):
    if len(token_list) == 1:
        # 単項の場合
        # 変数の参照処理
        if is_bool(token_list[0]): return Value('true', get_value_type('bool')) if token_list[0].string == 'true' else Value('false', get_value_type('bool'))
        if token_list[0].string == ',': return None
        if get_var(token_list[0].string) is not None:
            var = get_var(token_list[0].string)
            if var._external:
                return JSExternal(var).refer()
            else:
                return var._value
        if not is_number(token_list[0]) and not is_string(token_list[0]):
            err("Undefined variable '%s'" % token_list[0].string)
        # 変数ではない場合 
        return Value(token_list[0].string, determine_value_type(token_list))
    else:
        # 複数項ある場合（関数呼び出し）
        # 関数呼び出しなので、token_listに括弧がなくなったときにreturnする
        # 最初から)を探して、それから遡って最初の(までを再帰的に_tokensに渡していく
        log_ts("func_list", token_list)
        
        # 引数の値を計算 ^@ ( name arg ... )
        # 変数だったときは変数の値を取得
        if token_list[2].string == '=':
            del token_list[2]
            token_list[1].string += '='
        if get_var(token_list[1].string) is not None:
            result_value = get_var(token_list[1].string)._value
            last_index = 2
        # そうでなかった場合は関数呼び出しなので引数の処理をする
        else:
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
                if len(token_list) >= i+1 and get_value_type(token_list[i+1].string) is not None:
                    continue
                # 引数トークンを見分けて実際に計算
                if i >= 2 and indent == 0:
                    last_index = i
                    log_ts("arg_tokens", arg_tokens)
                    value = eval_tokens(arg_tokens)
                    arg_values.append(value)
                    arg_tokens.clear()
                    continue
            
            # 関数処理
            dbgprint("Func call: '"+token_list[1].string+"'")
            func_ind = Function.n2i(token_list[1].string)
            if func_ind == -1:
                err("Function '"+token_list[1].string+"' is not defined.")
            elif func_ind < -1:
                # ビルドイン関数の実行
                if token_list[1].string == '+': result_value = xaller_plus(arg_values)
                if token_list[1].string == '-': result_value = xaller_sub(arg_values)
                if token_list[1].string == '*': result_value = xaller_product(arg_values)
                if token_list[1].string == '/': result_value = xaller_divide(arg_values)
                if token_list[1].string == '%': result_value = xaller_remain(arg_values)
                if token_list[1].string == 'neg': result_value = xaller_neg(arg_values)
                if token_list[1].string == 'or': result_value = xaller_or(arg_values)
                if token_list[1].string == 'and': result_value = xaller_and(arg_values)
                if token_list[1].string == 'not': result_value = xaller_not(arg_values)
                if token_list[1].string == 'xor': result_value = xaller_xor(arg_values)
                if token_list[1].string == 'eq': result_value = xaller_eq(arg_values)
                if token_list[1].string == '<': result_value = xaller_less(arg_values)
                if token_list[1].string == '>': result_value = xaller_greater(arg_values)
                if token_list[1].string == '<=': result_value = xaller_lesseq(arg_values)
                if token_list[1].string == '>=': result_value = xaller_greatereq(arg_values)
                if token_list[1].string == 'strcat': result_value = xaller_strcat(arg_values)
                if token_list[1].string == 'strlen': result_value = xaller_strlen(arg_values)
                if token_list[1].string == 'substr': result_value = xaller_substr(arg_values)
#                if token_list[1].string == 'strtrimr': result_value = xaller_strtrimr(arg_value)
#                if token_list[1].string == 'strtriml': result_value = xaller_strtriml(arg_values)
#                if token_list[1].string == 'strtrim': result_value = xaller_strtrim(arg_values)
#                if token_list[1].string == 'strmatch': result_value = xaller_strmatch(arg_values)
                if token_list[1].string == 'stridx': result_value = xaller_stridx(arg_values)
                if token_list[1].string == 'strridx': result_value = xaller_strridx(arg_values)
#                if token_list[1].string == 'strrep': result_value = xaller_strrep(arg_values)     
            else:
                result_value = Funcs[func_ind].run(arg_values)

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
                ans = eval_tokens([Token(0, tmps[1:])])._string
                s = s.replace(s[tmpi:i+1], '', 1)
                s = s[:tmpi] + ans + s[tmpi:]
                return prepro(s)
                
        if flag:
            # 計測中
            tmps += c


def add_type(block_ind):
    global vtypes
    global blocks
    global g_exel
    inh_count = int((len(blocks[block_ind].root) - 4) / 2)
    t = Type(blocks[block_ind].root[2].string, 'Dirty')
    dbgprintnoln("New type '"+blocks[block_ind].root[2].string+"' inheritanced by type")
    for i in range(inh_count):
        tmp = get_value_type(blocks[block_ind].root[5+i*2].string)
        if tmp is None:
            err("Undefined type '%s'" % tmp._name)
        if tmp._race != 'Dirty':
            # ピュアな型をコピーできる条件は、メンバがないことと、コピーする型が一つであること
            if inh_count != 1: err("There are plural inheritance despite trying to inherite pure type.")
            t._race = tmp._race
            break
        dbgprintnoln(blocks[block_ind].root[5].string+"', ")
        # コピー指定されている型の変数と関数をすべて雑にコピー
        # 同じ名前があれば古い方を削除
        for v in tmp._variables:
            for vs in t._variables:
                if vs._name == v._name:
                    del vs
        t._variables.extend(tmp._variables)
        for f in tmp._functions:
            for fs in t._functions:
                if fs._name == f._name:
                    del fs
        t._functions.extend(tmp._functions)
    dbgprint("")
    
    token_list = []
    for token in blocks[block_ind].body:
        token_list.append(token)
        if token.ttype.Return:
            # 関数作成 ^ @ ( name arg )
            if len(token_list) >= 4 and \
               is_plain(token_list[0]) and token_list[0].string == "@" and \
               is_plain(token_list[1]) and token_list[1].string == "(" and \
               is_plain(token_list[-1]) and token_list[-1].string == ")":
                if t._race != 'Dirty': err("Pure type couldn't have members.")
                for i, b in enumerate(blocks):
                    if b.root[0].line == token.line:
                        t._functions.append(Function(i))
                        g_exel = b.body[-1].line
                        break

            elif len(token_list) >= 4 and \
                 is_plain(token_list[0]) and token_list[0].string == '(' and \
                 is_plain(token_list[1]) and \
                 is_plain(token_list[2]) and token_list[2].string == ')' and \
                 is_plain(token_list[3]) :
                if t._race != 'Dirty': err("Pure type couldn't have members.")
                vt = get_value_type(token_list[3].string)
                if vt is None:
                    err("Undefined type '"+token_list[3].string+"'.")
                t._variables.append(Variable(token_list[1].string, get_default_value(vt)))
            token_list.clear()
    vtypes.append(t)

Vars = []
Funcs = []
vtypes = [Type('int', 'Integer'), Type('string', 'String'), Type('bool', 'Boolean')]
def RUN(rt, sd = []):
    global blocks
    global lines
    global g_exel
    global g_fs

    if not hasattr(RUN, 'element_stack'):
        RUN.element_stack = sd

    run_tokens = copy.deepcopy(rt)

    for t in run_tokens:
        if '$' in t.string and not t.ttype.Comment:
            t.string = prepro(t.string)
            dbgprint(t.string)
        

    if g_fs[-1] != -1 and \
       ((is_plain(run_tokens[0]) and run_tokens[0].string == 'return') or \
       g_exel == blocks[Funcs[Function.id2i(g_fs[-1])]._block_ind].body[-1].line):
        if len(run_tokens) != 1:
            Funcs[Function.id2i(g_fs[-1])]._return = eval_tokens(run_tokens[1:])
        dbgprint("Return from func.")
        Function.rtrn()
        return False

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'loop':
        out("while (true) {")

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'escape':
        idx = -1
        line_idx = -1
        for l in lines[g_exel::-1]:
            if len(l.tokens) == 1:
                if l.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(blocks):
            if b.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1: err("It is impossible to use 'escape' outside of blocks.")
        g_exel = blocks[idx].body[-1].line
        out("}")

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'continue':
        idx = -1
        line_idx = -1
        for l in lines[g_exel::-1]:
            if len(l.tokens) == 1:
                if l.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(blocks):
            if b.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1: err("It is impossible to use 'continue' outside of blocks.")
        g_exel = blocks[idx].body[0].line
                            
        

    elif g_fs[-1] == -1 and len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'end':
        return False

    # Detect Functions
    # 関数作成 ^ @ ( name arg )
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == "@" and \
       is_plain(run_tokens[1]) and run_tokens[1].string == "(" and \
       is_plain(run_tokens[-1]) and run_tokens[-1].string == ")":
        for i, b in enumerate(blocks):
            if b.root[0].line == g_exel:
                Function(i).add()
                g_exel = b.body[-1].line
                break

    # 条件分岐文 (.. ?$) (^else ... ?$)
    elif len(run_tokens) >= 1 and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == '?':
        value = eval_tokens(run_tokens[1 if run_tokens[0].string == 'cond' or run_tokens[0].string == 'branch' else 0:-1])
        value = cast_value(value, get_value_type('bool'))
        if value._string == 'true':
            # branch指定があった場合、cond指定があるブロックまで遡って、notしてandしていく
            if run_tokens[0].string == 'branch':
                for i, b in enumerate(blocks):
                    if b.root[0].line == g_exel:
                        idx = i
                        break
                for b in blocks[idx-1::-1]:
                    cond_value = eval_tokens(b.root[1 if b.root[0].string == 'cond' or b.root[0].string == 'branch' else 0:-1])
                    cond_value = cast_value(cond_value, get_value_type('bool'))
                    cond_value = xaller_not([cond_value])
                    if cond_value._string == 'false':
                        g_exel = blocks[idx].body[-1].line
                        break
                    # cond指定があるブロックがあったらそこで終了
                    if b.root[0].string == 'cond':
                        break
                        
        else:
            # 値がfalseだったときはブロックを飛ばす
            for b in blocks:
                if b.root[0].line == g_exel:
                    g_exel = b.body[-1].line
                    break

    # 型定義 ^-(type):type
    if len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == '-' and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
       is_plain(run_tokens[2]) and \
       is_plain(run_tokens[3]) and run_tokens[3].string == ')':
        for i, b in enumerate(blocks):
            if b.root[0].line == g_exel:
                add_type(i)
                g_exel = b.body[-1].line
                break

    # 変数に代入 ^known-name = value
    # and get_var(run_tokens[0].string) is not None and
    elif len(run_tokens) >= 3 and \
       is_plain(run_tokens[0]) and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '=' :
        # その変数自体に代入
        var = get_var(run_tokens[0].string)
        if var is None:
            err("Undefined variable '%s'" % run_tokens[0].string)
        value = eval_tokens(run_tokens[2:])
        # その変数がメンバを持っている場合、メンバもすべて代入
        if len(run_tokens) == 3 and len(var._value._type._variables) > 0 and get_var(run_tokens[2].string) is not None:
            varsrc = get_var(run_tokens[2].string)
            if var._value._type != varsrc._value._type:
                err("Incorrect substituting value which has different member.")
            memdst = get_members(run_tokens[0].string)
            memsrc = get_members(run_tokens[2].string)
            for i in range(len(memdst)):
                # NOTE: 宣言順が同じであるという条件のもとの代入（計算量削減）
                memdst[i]._value = memsrc[i]._value
                
        if value is None:
            err("Invalid value.")
        if var._value._type._race == value._type._race:
            dbgprint("Variable changed("+var._name+" -> "+value._string+")")
            var._value = value
            if var._external:
                subst_external(var, value)
        else:
            err("Incorrect substituting value which has different race.\n")
#        return Value(run_tokens[1].string, ValueRace.Variable)
    
    # プログラム変数作成 ^( name ) race
    elif len(run_tokens) >= 4 and \
       is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
       is_plain(run_tokens[1]) and \
       is_plain(run_tokens[2]) and run_tokens[2].string == ')' and \
       is_plain(run_tokens[3]) :
        # ドットが変数名に入っているときにはエラー
        name = run_tokens[1].string[:]
        # if '$' in name: name = prepro(name)
        if '.' in name:
            err("Variable name couldn't contain '.'")
        vt = get_value_type(run_tokens[3].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[3].string)

        variables = None
        if g_fs[-1] != -1:
            runf = Funcs[Function.id2i(g_fs[-1])]
            variables = runf._vars[-1]
        Variable.create(Variable(name, get_default_value(vt)), variables)
        out("var " + name + ";")

    # 外部変数作成 ^+( name ) race
    elif (len(run_tokens) >= 5 or len(run_tokens) >= 7) and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '+' and \
         is_plain(run_tokens[1]) and run_tokens[1].string == '(' and \
         is_plain(run_tokens[2]) and \
         is_plain(run_tokens[3]) and run_tokens[3].string == ')' and \
         is_plain(run_tokens[4]) :
        name = run_tokens[2].string[:]
        pos = "at end"
        if len(run_tokens) == 7:
            pos = run_tokens[5].string + " " + run_tokens[6].string
        if len(RUN.element_stack) > 0:
            # 内包される要素があった場合
            pos = "in " + blocks[RUN.element_stack[-1]].root[2].string
        if get_block_idx(g_exel) != -1:
            RUN.element_stack.append(get_block_idx(g_exel))

        # ドットが変数名に入っているときにはエラー
        if '.' in name:
            err("Variable name couldn't contain '.'")
        vt = get_value_type(run_tokens[4].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[4].string)

        Variable.create(Variable(name, get_default_value(vt)), None, True, pos)

    # 関数呼び出し（一行） ^( func args )
    elif len(run_tokens) >= 3 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == ')':
        eval_tokens(run_tokens)


    return True
    # 値 value


def report():
    global Vars
    global tokens
    global lines
    global vtypes
    global Funcs

    dbgprint("\n\n\n\nPROGRAM REPORT...")
    
    # Display all detected tokens
    dbgprint("Detected tokens:")
    table_data = [
        ["name", "Comment", "Str", "Return", "NL" ]
    ]
    for t in tokens:
        table_data.append([t.string,
                           "#" if t.ttype.Comment else "",
                           "\"" if t.ttype.String else "Ins" if t.ttype.StringIns else "",
                           "R" if t.ttype.Return else "",
                           "NL" if t.ttype.NL else ""
        ])
    table = AsciiTable(table_data)
    dbgprint(table.table)

    dbgprint("\nLINES "+str(len(lines)))
    for l in lines:
        for t in l.tokens:
            dbgprintnoln(t.string + " ")
        dbgprintnoln("\n")

    # Display all variables
    dbgprint("VARIABLES "+str(len(Vars)))
    for v in Vars:
        dbgprint(str(v._value._type._race)+":"+str(v._value._type._name)+" "
              +v._name
              +" = "
              +str(v._value._string))

    # Display all variables
    dbgprint("\nFUNCTIONS "+str(len(Funcs)))
    for f in Funcs:
        dbgprint("%s BLKIDX:%d ID:%d" % (f._name, f._block_ind, f._id))
        
    # Display all types
    dbgprint("\nVALUE TYPES: "+str(len(vtypes)))
    for vt in vtypes:
        dbgprint(vt._race + ":" + vt._name)



output = ''
input = ''

atexit.register(report)

# コマンドラインの処理
args = sys.argv
if '-h' in args:
    dbgprint("-----CGP Xaller Interpreter (v1.0)-----")
    dbgprint("cxi -ioh")
    dbgprint("Usage")
    dbgprint("-h /to show help.")
    dbgprint("-i  ilename /to tell cxi  iles to interpret.")
    dbgprint("-o name /to tell cxi a name to name output  iles.")
    sys.exit(0);

# Argument
if '-o' in args and args.index('-o')+1 < len(args):
    output = args[args.index('-o')+1]
if '-i' in args and args.index('-i')+1 < len(args):
    input = args[args.index('-i')+1]
if output == '':
    output = input
if '-d' in args:
    g_bDbg = True
dbgprint('Input file name: ' + input)

html = open('%s.html' % input[:input.rindex(".")], 'w')
html.write("""
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
</head>
<body>

<script src="%s.js">
</script>
</body>
</html>
""" % input[:input.rindex(".")])
html.close()

# Mean tokens(basic)
comment = False
string = False

bufferstr = ''
tokens = []
lines = []
lc = 0
# TODO: このままだとコメントが反映されないので一回トークン解析してからもとのファイルに戻す
with open(input, 'r') as myfile:
    data = myfile.read()
    offset = 0
    while data.find('<', offset) != -1:
        # NOTE: オフセットは二重検索を回避するためにインクリメントしておく
        offset = data.find('<', offset) + 1
        filename = data[offset : data.find('>', offset)]
        with open(filename, 'r') as f:
            data = re.sub('<.*>', f.read() + "\n", data)

with open(input+".m", 'w') as myfile:
    myfile.write(data)
    input = input+".m"

for line in open(input, 'r'):
    nl = False
    # TODO
    lc += 1
    for i in range(len(line)):
        # String
        if not comment and string and line[i] == '\'':
            t = Token(lc, bufferstr)
            t.ttype.String = True
            t.real_line = lc
            tokens.append(t)
            string = False
            bufferstr = ''
            continue
        if not comment and string:
            bufferstr += '\\n' if line[i] == '\n' else line[i]
        if not comment and not string and line[i] == '\'':
            string = True

        # Comment
        if not string and comment and line[i] == '\n':
            t = Token(lc, bufferstr)
            t.ttype.Comment = True
            t.real_line = lc
            tokens.append(t)
            comment = False
            bufferstr = ''
        if not string and comment:
            bufferstr += line[i]
        if not string and not comment and line[i] == '#':
            
            comment = True

        if not string and not comment:
            if re.match("[!-/:-@[-`{-~]", line[i]) and line[i] != '_' and line[i] != '$' and line[i] != '.':
                if bufferstr != '':
                    t = Token(lc, bufferstr)
                    t.real_line = lc
                    tokens.append(t)
                    bufferstr = ''
                t = Token(lc, line[i])
                t.real_line = lc
                tokens.append(t)
            elif re.match("\s", line[i]):
                if bufferstr != '':
                    t = Token(lc, bufferstr)
                    t.real_line = lc
                    tokens.append(t)
                    bufferstr = ''
            else:
                bufferstr += line[i]

            if nl:
                
                tokens[-1].ttype.NL = True;
                nl = False

            if line[i] == "\n":
                tokens[-1].ttype.Return = True;
                nl = True

tokens[0].ttype.NL = True
for idx, t in enumerate(tokens):
    if t.ttype.Return:
        if idx+1 <= len(tokens)-1: tokens[idx+1].ttype.NL = True


# Parse Blocks
blocks = []
dbgprint("\n///////////////////////// Block Information /////////////////////////\n")

indent_size = 0
for i in range(len(tokens)):
    if tokens[i].string == '{':
        if len(tokens) != 1: tokens[i-1].ttype.Return = True
        tokens[i].ttype.NL = True
        tokens[i].ttype.Return = True
        if i+1 <= len(tokens)-1: tokens[i+1].ttype.NL = True
        
        indent_size += 1

        bl = Block()
        for b in blocks:
            if b.indent != 0 and b.indent <= indent_size:
                bl.doms.append(b.num)
        for j in range(i)[::-1]:
            bl.root.append(tokens[j])
            if tokens[j].ttype.NL: break
        bl.root = bl.root[::-1]
        bl.indent = indent_size
        bl.num = len(blocks)+1
        bl.token_ind = i+1
        blocks.append(bl)

    # NOTE: indent_sizeをデクリメントする前に置く！
    for b in blocks:
        if b.indent != 0 and b.indent <= indent_size:
            b.body.append(tokens[i])
        else:
            b.indent = 0
    # for b in blocks:
    #     if b.indent != 0 and b.indent <= indent_size:
    #         dbgprint(str(b.num) + ":" + tokens[i].string)
    #         b.body.append(tokens[i])
    #     else:
    #         b.indent = 0
            
    if tokens[i].string == '}':
        if len(tokens) != 1: tokens[i-1].ttype.Return = True
        tokens[i].ttype.NL = True
        tokens[i].ttype.Return = True
        if len(tokens) <= i+1 and i+1 < len(tokens): tokens[i+1].ttype.NL = True
        indent_size -= 1

for idx, b in enumerate(blocks):
    dbgprintnoln("Block" + str(idx) +" Root:\n")
    for t in b.root:
        dbgprintnoln(t.string + " ")

    dbgprintnoln("\nBody:\n")
    for t in b.body:
        dbgprintnoln(t.string + " ")

    dbgprintnoln("\nDominations:\n")
    for d in b.doms:
        dbgprintnoln("Block" + str(blocks[d].num) + " is dominating this block.\n")

    dbgprintnoln("\n\n")
dbgprintnoln("///////////////////////// Block Information End /////////////////////////\n\n")

# Mean tokens(second)

# Detect Lines
lc = 1
lines.append(Line(lc))
lines[0].token_ind = 0
for idx, t in enumerate(tokens):
    t.line = lc
    lines[lc-1].tokens.append(t)
    if t.ttype.Return:
        lines.append(Line(lc))
        lines[lc].token_ind = idx
        lc += 1        

# RUN!!!!!
while True:
    if not RUN(lines[g_exel-1].tokens): break
    if len(RUN.element_stack) > 0 and blocks[RUN.element_stack[-1]].body[-1].line <= g_exel:
        RUN.element_stack.pop()
    if g_exel-1 >= len(lines)-1:
        break
    g_exel += 1

os.remove(input)


js = open(input[:input.rindex(".")]+".js", 'w')
js.write(g_outjs)
js.close()
