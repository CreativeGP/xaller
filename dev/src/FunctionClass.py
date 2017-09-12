import copy

import TokenClass
import ValueClass
import Global
import genfunc

class Function:
    _static_id = 0
    
    def __init__(self, block_ind, buildin = False):
        b = Global.blocks[block_ind]
        if not TokenClass.Token.find_keyword(b.body, "return"):
#            err("There is no 'return' in function '"+b.root[2].string+"'")
            pass
        arg_count = int((len(b.root) - 4) / 4)
        # 引数リストを作成
        arglist = []
        for i in range(arg_count):
            arglist.append(ValueClass.Variable(b.root[i*4+4].string,
                                    ValueClass.Value('', genfunc.get_value_type(b.root[i*4+6].string))))
        self._name = b.root[2].string
        self._block_ind = block_ind
        self._args = [arglist]
        self._vars = [[]]
        self._return = None
        self._buildin = buildin
        self._id = Function._static_id

    @staticmethod
    def n2i(name):
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
        if name == 'concat': return -25
        if name == 'strlen': return -26
        if name == 'substr': return -27
        if name == 'strtrimr': return -28
        if name == 'strtriml': return -29
        if name == 'strtrim': return -30
        if name == 'strmatch': return -31
        if name == 'stridx': return -32
        if name == 'strridx': return -33
        if name == 'strrep': return -34
        if '.' in name and Global.fs[-1] != -1:
            runf = Global.Funcs[Function.id2i(Global.fs[-1])]
            try:
                hoge = runf._name[runf._name.rindex('.')+1:]
                piyo = runf._name.replace(hoge, '', 1)
                name = name.replace('.', piyo, 1)
            except ValueError:
                pass
        for idx, f in enumerate(Global.Funcs):
            if f._name == name:
                return idx
        return -1

    @staticmethod
    def id2i(id):
        for i, f in enumerate(Global.Funcs):
            if f._id == id:
                return i
        return -1

    # グローバル関数Global.Funcsに追加
    def add(self):
        Function._static_id += 1
        # すでに同名の関数がある場合は古い方を上書き
        idx = Function.n2i(self._name)
        if idx < -1:
            err("Function '%s' is build-in function name." % self._name)
        elif idx != -1:
            idx = Function.n2i(self._name)
            Global.Funcs[idx] = self
            # JS Output
            # $name = (function $name(arg1, arg2 ...) {});
            try:
                genfunc.outnoln("%s = function %s (" % (genfunc.expname(self._name), genfunc.expname(self._name)))
                for v in self._args[-1][:-1]:
                    genfunc.outnoln("%s, " % v._name)
                genfunc.outnoln("%s" % self._args[-1][-1]._name)
            except IndexError:
                pass
            genfunc.out(") {")
            genfunc.out("});")
        # そうでない場合は新規作成する
        else:
            Global.Funcs.append(self)
            # JS Output
            # function $name (arg1, arg2 ...)
            try:
                genfunc.outnoln("function %s(" % genfunc.expname(self._name))
                for v in self._args[-1][:-1]:
                    genfunc.outnoln("%s, " % v._name)
                genfunc.outnoln("%s" % self._args[-1][-1]._name)
            except IndexError:
                pass
            genfunc.outnoln(") {")

    def exam(self):
        while True:
            if not genfunc.RUN(Global.lines[Global.exel-1].tokens) : break
            if Global.exel-1 >= len(Global.lines)-1: break
            Global.exel += 1
            
    
    # 関数の処理の実行、戻り値はこの関数の戻り値としてValue型で返される
    def run(self, args):
        genfunc.dbgprint("RUNNING FUNCTION: LEN(ARGS)=%d" % len(self._args))
        
        Global.retl.append(Global.exel)
        Global.exel = Global.tokens[Global.blocks[self._block_ind].token_ind].line-1
        Global.fs.append(self._id)

        self._return = None

        # 関数呼び出し用の変数リストを作る
        self._args.append(copy.deepcopy(self._args[0]))
        self._vars.append(copy.deepcopy(self._vars[0]))

        # 関数に渡された引数の処理
        for i in range(len(args)):
            self._args[-1][i].subst(args[i], False)
            genfunc.dbgprint("ArGlobal.Variable changed("+self._args[-1][i]._name+" -> "+args[i]._string+")")

        while True:
            if not genfunc.RUN(Global.lines[Global.exel-1].tokens) : break
            if Global.exel-1 >= len(Global.lines)-1: break
            Global.exel += 1
        return self._return

    def rtrn():
        f = Global.Funcs[Function.id2i(Global.fs[-1])]
        del f._args[-1]
        del f._vars[-1]
        Global.exel = Global.retl.pop()
        Global.fs.pop()
