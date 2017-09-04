from terminaltables import AsciiTable
import copy
import sys

import TokenClass
import ValueClass
import FunctionClass
import Global

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

def dbgprint(s):
    if Global.bDbg: print(s)

def dbgprintnoln(s):
    if Global.bDbg: sys.stdout.write(s)

def err(string):
    # 便利なように自動的に実行行を見つけるようにする
    for t in Global.tokens:
        if Global.exel == t.line:
                dbgprint(input+":"+str(t.real_line)+": "+string)
                sys.exit(1)
    # もし実行業がみつからなかったときには、適当に出力しておく
    dbgprint(input+":"+"???"+string)
    sys.exit(1)

def out(s):
    Global.outjs += s + "\n"

def expid(s):
    return s.replace('.', '-')

def create_external(Name, vtype, pos):
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

def get_var(s):
    if Global.fs[-1] != -1:
        runf = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
        if s[0] == '.':
            tmp = runf._name.replace(Global.blocks[runf._block_ind].root[2].string, '', 1)
            s = s.replace('.', tmp, 1)
        dirty_in_runf = [v for v in runf._args[-1] if v._value._type._race == 'Dirty']
        for v in dirty_in_runf:
            try:
                if s.index(v._name+".") == 0:
                    s = s.replace(v._name, v._value._string, 1)
                    dbgprint(s)
            except ValueClass.ValueError:
                pass
        for v in runf._args[-1]:
            if s == v._name:
                return v
        for v in runf._vars[-1]:
            if s == v._name:
                return v
        
    for v in Global.Vars:
        if s == v._name:
            return v
    return None

# 親の名前からそのスコープから見える変数すべてのそのメンバを返す(ValueClass.Variable[])
def get_members(parent_name):
    res = []
    if Global.fs[-1] != -1:
        for v in Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]._args[-1]:
            if (parent_name+'.') in v._name:
                res.append(v)
        for v in Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]._vars[-1]:
            if (parent_name+'.') in v._name:
                res.append(v)
        
    for v in Global.Vars:
        if (parent_name+'.') in v._name:
            res.append(v)
    return res

def get_default_value(vt):
    vr = vt._race
    if vr == 'Integer': return ValueClass.Value('0', vt)
    if vr == 'String': return ValueClass.Value('', vt)
    if vr == 'Boolean': return ValueClass.Value('false', vt)
    return ValueClass.Value('', vt)

def get_value_race(s):
    pass

def get_value_type(s):
    """ グローバル変数Global.vtypesから変数型を探してくる。なかった場合はNoneを返す。 """
    for vt in Global.vtypes:
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
        res = ValueClass.Value(value._string, nextvt)
    if oldvr == 'Integer' and nextvr == 'Boolean':
        res = ValueClass.Value('false', nextvt) if value._string == '0' else ValueClass.Value('true', nextvt)

    if oldvr == 'String' and nextvr == 'Integer':
        res = ValueClass.Value(value._string, nextvt)
    if oldvr == 'String' and nextvr == 'Boolean':
        tmp = value._string.upper()
        if 'TRUE' in tmp:
            res = ValueClass.Value('true', nextvt)
        else:
            res = ValueClass.Value('false', nextvt)

    if oldvr == 'Boolean' and nextvr == 'Integer':
        res = res = ValueClass.Value('1', nextvt) if value._string == 'true' else ValueClass.Value('0', nextvt)
    if oldvr == 'Boolean' and nextvr == 'String':
        res = ValueClass.Value(value._string, nextvt)
    return res

def cast_value(value, nextvt):
    
    
    oldvr = value._type._race
    nextvr = nextvt._race
    res = value
    if Global.fs[-1] == FunctionClass.Function.n2i('__'+value._type._name+'_'+nextvt._name) and \
       FunctionClass.Function.n2i('__'+value._type._name+'_'+nextvt._name) != -1:
        # キャスト関数が定義されていてかつキャスト関数実行中の場合（ビルドイン変換）
        res = buildin_casting(value, nextvt)
    elif FunctionClass.Function.n2i('__'+value._type._name+'_'+nextvt._name) != -1:
        # キャスト関数が定義されていて実行はされていない場合（キャスト関数実行）
        res = Global.Funcs[FunctionClass.Function.n2i('__'+value._type._name+'_'+nextvt._name)].run([value])
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
        if is_bool(token_list[0]): return ValueClass.Value('true', get_value_type('bool')) if token_list[0].string == 'true' else ValueClass.Value('false', get_value_type('bool'))
        if token_list[0].string == ',': return None
        if get_var(token_list[0].string) is not None:
            var = get_var(token_list[0].string)
            return var._value
        if not is_number(token_list[0]) and not is_string(token_list[0]):
            err("Undefined variable '%s'" % token_list[0].string)
        # 変数ではない場合 
        return ValueClass.Value(token_list[0].string, determine_value_type(token_list))
    else:
        # 複数項ある場合（関数呼び出し）
        # 関数呼び出しなので、token_listに括弧がなくなったときにreturnする
        # 最初から)を探して、それから遡って最初の(までを再帰的に_Global.tokensに渡していく
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
            arg_Global.tokens = []
            last_index = 0
            for i in range(len(token_list)-1):
                if token_list[i].string == '(': indent += 1
                if token_list[i].string == ')': indent -= 1
                if i >= 2 and indent != -1: arg_Global.tokens.append(token_list[i])
                # キャストだった場合の処理
                if len(token_list) >= i+1 and get_value_type(token_list[i+1].string) is not None:
                    continue
                # 引数トークンを見分けて実際に計算
                if i >= 2 and indent == 0:
                    last_index = i
                    log_ts("arg_Global.tokens", arg_Global.tokens)
                    value = eval_tokens(arg_Global.tokens)
                    arg_values.append(value)
                    arg_Global.tokens.clear()
                    continue
            
            # 関数処理
            dbgprint("Func call: '"+token_list[1].string+"'")
            func_ind = FunctionClass.Function.n2i(token_list[1].string)
            if func_ind == -1:
                err("FunctionClass.Function '"+token_list[1].string+"' is not defined.")
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
                ans = eval_tokens([TokenClass.Token(0, tmps[1:])])._string
                s = s.replace(s[tmpi:i+1], '', 1)
                s = s[:tmpi] + ans + s[tmpi:]
                return prepro(s)
                
        if flag:
            # 計測中
            tmps += c


def add_type(block_ind):
    inh_count = int((len(Global.blocks[block_ind].root) - 4) / 2)
    t = ValueClass.Type(Global.blocks[block_ind].root[2].string, 'Dirty')
    dbgprintnoln("New type '"+Global.blocks[block_ind].root[2].string+"' inheritanced by type")
    for i in range(inh_count):
        tmp = get_value_type(Global.blocks[block_ind].root[5+i*2].string)
        if tmp is None:
            err("Undefined type '%s'" % tmp._name)
        if tmp._race != 'Dirty':
            # ピュアな型をコピーできる条件は、メンバがないことと、コピーする型が一つであること
            if inh_count != 1: err("There are plural inheritance despite trying to inherite pure type.")
            t._race = tmp._race
            break
        dbgprintnoln(Global.blocks[block_ind].root[5].string+"', ")
        # コピー指定されている型の変数と関数をすべて雑にコピー
        # 同じ名前があれば古い方を削除
        for v in tmp._variables:
            for vs in t._variables:
                if vs._name == v._name:
                    del vs
        t._variables.extend(tmp._variables)
        for f in tmp._functions:
            for Global.fs in t._functions:
                if Global.fs._name == f._name:
                    del Global.fs
        t._functions.extend(tmp._functions)
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
                if t._race != 'Dirty': err("Pure type couldn't have members.")
                for i, b in enumerate(Global.blocks):
                    if b.root[0].line == token.line:
                        t._functions.append(FunctionClass.Function(i))
                        Global.exel = b.body[-1].line
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
                t._variables.append(ValueClass.Variable(token_list[1].string, get_default_value(vt)))
            token_list.clear()
    Global.vtypes.append(t)

def RUN(rt, sd = []):
    if not hasattr(RUN, 'element_stack'):
        RUN.element_stack = sd

    run_tokens = copy.deepcopy(rt)

    for t in run_tokens:
        if '$' in t.string and not t.ttype.Comment:
            t.string = prepro(t.string)
            dbgprint(t.string)
        

    if Global.fs[-1] != -1 and \
       ((is_plain(run_tokens[0]) and run_tokens[0].string == 'return') or \
       Global.exel == Global.blocks[Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]._block_ind].body[-1].line):
        if len(run_tokens) != 1:
            Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]._return = eval_tokens(run_tokens[1:])
        dbgprint("Return from func.")
        FunctionClass.Function.rtrn()
        return False

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'loop':
        out("while (true) {")

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'escape':
        idx = -1
        line_idx = -1
        for l in lines[Global.exel::-1]:
            if len(l.Global.tokens) == 1:
                if l.Global.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1: err("It is impossible to use 'escape' outside of Global.blocks.")
        Global.exel = Global.blocks[idx].body[-1].line
        out("}")

    elif len(run_tokens) == 1 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == 'continue':
        idx = -1
        line_idx = -1
        for l in lines[Global.exel::-1]:
            if len(l.Global.tokens) == 1:
                if l.Global.tokens[0].string == 'loop':
                    line_idx = l.num
                    break
        for i, b in enumerate(Global.blocks):
            if b.root[0].line == line_idx+1:
                idx = i
                break
        if idx == -1: err("It is impossible to use 'continue' outside of Global.blocks.")
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

    # 条件分岐文 (.. ?$) (^else ... ?$)
    elif len(run_tokens) >= 1 and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == '?':
        value = eval_tokens(run_tokens[1 if run_tokens[0].string == 'cond' or run_tokens[0].string == 'branch' else 0:-1])
        value = cast_value(value, get_value_type('bool'))
        if value._string == 'true':
            # branch指定があった場合、cond指定があるブロックまで遡って、notしてandしていく
            if run_tokens[0].string == 'branch':
                for i, b in enumerate(Global.blocks):
                    if b.root[0].line == Global.exel:
                        idx = i
                        break
                for b in Global.blocks[idx-1::-1]:
                    cond_value = eval_tokens(b.root[1 if b.root[0].string == 'cond' or b.root[0].string == 'branch' else 0:-1])
                    cond_value = cast_value(cond_value, get_value_type('bool'))
                    cond_value = xaller_not([cond_value])
                    if cond_value._string == 'false':
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

    # 変数に代入 ^known-name = value
    # and get_var(run_tokens[0].string) is not None and
    elif len(run_tokens) >= 3 and \
       is_plain(run_tokens[0]) and \
       is_plain(run_tokens[1]) and run_tokens[1].string == '=' :
        # その変数自体に代入
        var = get_var(run_tokens[0].string)
        if var is None:
            err("Undefined variable '%s'" % run_tokens[0].string)
        value = eval_tokens(run_tokens[2:])        # その変数がメンバを持っている場合、メンバもすべて代入
        var.subst(value)
        if len(run_tokens) == 3 and len(var._value._type._variables) > 0 and get_var(run_tokens[2].string) is not None:
            varsrc = get_var(run_tokens[2].string)
            if var._value._type != varsrc._value._type:
                err("Incorrect substituting value which has different member.")
            memdst = get_members(run_tokens[0].string)
            memsrc = get_members(run_tokens[2].string)
            for i in range(len(memdst)):
                # NOTE: 宣言順が同じであるという条件のもとの代入（計算量削減）
                memdst[i].subst(memsrc[i])
#                 memdst[i]._value = memsrc[i]._value
    
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
            err("ValueClass.Variable name couldn't contain '.'")
        vt = get_value_type(run_tokens[3].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[3].string)

        variables = None
        if Global.fs[-1] != -1:
            runf = Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]
            variables = runf._vars[-1]
        ValueClass.Variable.create(ValueClass.Variable(name, get_default_value(vt)), variables)

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
            pos = "in " + Global.blocks[RUN.element_stack[-1]].root[2].string
        if get_block_idx(Global.exel) != -1:
            RUN.element_stack.append(get_block_idx(Global.exel))

        # ドットが変数名に入っているときにはエラー
        if '.' in name:
            err("ValueClass.Variable name couldn't contain '.'")
        vt = get_value_type(run_tokens[4].string)
        if vt is None:
            err("Undefined type '%s'" % run_tokens[4].string)
        ValueClass.Variable.create(ValueClass.Variable(name, get_default_value(vt)), None, True, pos)

    # 関数呼び出し（一行） ^( func args )
    elif len(run_tokens) >= 3 and \
         is_plain(run_tokens[0]) and run_tokens[0].string == '(' and \
         is_plain(run_tokens[-1]) and run_tokens[-1].string == ')':
        eval_tokens(run_tokens)


    return True
    # 値 value


def report():
    dbgprint("\n\n\n\nPROGRAM REPORT...")
    
    # Display all detected Global.tokens
    dbgprint("Detected Global.tokens:")
    table_data = [
        ["name", "Comment", "Str", "Return", "NL" ]
    ]
    for t in Global.tokens:
        table_data.append([t.string,
                           "#" if t.ttype.Comment else "",
                           "\"" if t.ttype.String else "Ins" if t.ttype.StringIns else "",
                           "R" if t.ttype.Return else "",
                           "NL" if t.ttype.NL else ""
        ])
    table = AsciiTable(table_data)
    dbgprint(table.table)

    dbgprint("\nLINES "+str(len(Global.lines)))
    for l in Global.lines:
        for t in l.tokens:
            dbgprintnoln(t.string + " ")
        dbgprintnoln("\n")

    # Display all variables
    dbgprint("VARIABLES "+str(len(Global.Vars)))
    for v in Global.Vars:
        dbgprint(str(v._value._type._race)+":"+str(v._value._type._name)+" "
              +v._name
              +" = "
              +str(v._value._string))

    # Display all variables
    dbgprint("\nFUNCTIONS "+str(len(Global.Funcs)))
    for f in Global.Funcs:
        dbgprint("%s BLKIDX:%d ID:%d" % (f._name, f._block_ind, f._id))
        
    # Display all types
    dbgprint("\nVALUE TYPES: "+str(len(Global.vtypes)))
    for vt in Global.vtypes:
        dbgprint(vt._race + ":" + vt._name)


