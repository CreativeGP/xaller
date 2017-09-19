# -*- coding: utf-8 -*-

"""Xaller alpha
programmer: CreativeGP
"""
import copy

import TokenClass
import ValueClass
import Global
import genfunc

class Function(object):
    """This class represents a function.

    Attributes:
        _name: A string indicating the name of the function.
        _block_ind: The integer index of Global.blocks that the
        _args: A double list of variables.
        _vars: A double list of variables.
        String: Indicates the token is in string.
    """

    _static_id = 0

    def __init__(self, block_ind, buildin=False):
        block = Global.blocks[block_ind]
        if not TokenClass.Token.find_keyword(block.body, "return"):
#            err("There is no 'return' in function '"+block.root[2].string+"'")
            pass
        arg_count = int((len(block.root) - 4) / 4)
        # 引数リストを作成
        arglist = []
        for i in range(arg_count):
            arglist.append(ValueClass.Variable(
                block.root[i*4+4].string,
                ValueClass.Value('', genfunc.get_value_type(block.root[i*4+6].string))))
        self.name = block.root[2].string
        self.block_ind = block_ind
        self.args = [arglist]
        self.vars = [[]]
        self.has_returned = None
        self.buildin = buildin
        self.fid = Function._static_id
        self.event = False

    @staticmethod
    def n2i(name):
        """Acquire an index of Global.Funcs that matches the name."""
        ret_value = 0
        for i, bfname in enumerate(Global.buildin_func_names):
            if name == bfname:
                ret_value = -10 - i
                break
        if ret_value is not 0:
            return ret_value
        if '.' in name and Global.fs[-1] != -1:
            runf = Global.Funcs[Function.id2i(Global.fs[-1])]
            try:
                hoge = runf.name[runf.name.rindex('.')+1:]
                piyo = runf.name.replace(hoge, '', 1)
                name = name.replace('.', piyo, 1)
            except ValueError:
                pass
        for idx, func in enumerate(Global.Funcs):
            if func.name == name:
                return idx
        return -1

    @staticmethod
    def id2i(fid):
        """Acquire a contistent function id that matches the index of Global.Funcs."""
        for i, func in enumerate(Global.Funcs):
            if func.fid == fid:
                return i
        return -1

    # functionsに追加
    def add(self):
        """Add a function TO GLOBAL.FUNCS."""
        genfunc.dbgprint("Creating function " + self.name)
        Function._static_id += 1
        # すでに同名の関数がある場合は古い方を上書き
        idx = Function.n2i(self.name)
        if idx < -1:
            genfunc. err("Function '%s' is build-in function name." % self.name)
        # elif idx != -1:
        #     idx = Function.n2i(self.name)
        #     Global.Funcs[idx] = self
        #     # JS Output
        #     # $name = (function $name(arg1, arg2 ...) {});
        #     try:
        #         genfunc.outnoln(
        #                        "%s = function %s ("
        #                         % (genfunc.expname(self.name), genfunc.expname(self.name)))
        #         for v in self.args[-1][:-1]:
        #             genfunc.outnoln("%s, " % v.name)
        #         genfunc.outnoln("%s" % self.args[-1][-1].name)
        #     except IndexError:
        #         pass
        #     genfunc.out(") {")
        #     genfunc.out("});")
        # # そうでない場合は新規作成する
        else:
            var = genfunc.get_var(self.name[:self.name.rfind('.')])
            Global.Funcs.append(self)
            Global.tfs.append(self)
            if genfunc.is_var_web(var):
                eventlist = ['.blur', '.click', '.change', '.ctxmenu',
                             '.dbclick', '.error', '.focus', '.focusin',
                             '.focusout', '.hover', '.load', '.ready',
                             '.scroll', '.resize', '.select', '.submit',
                             '.unload']
                if self.name[self.name.rfind('.'):] in eventlist:
                    self.event = True
                    idx = eventlist.index(self.name[self.name.rfind('.'):])
                    genfunc.outnoln("$('#%s')%s" % (genfunc.expid(var.name), eventlist[idx])
                                    + "(function () {")
                    return
        # コンストラクタは内容は出力するが、関数は出力しない
#            elif ((not self.name[self.name.rfind('.'):] == "._init"
#                  and not self.name == "__init")):
            # JS Output
            # function $name (arg1, arg2 ...)
            if not self.name[self.name.rfind('.'):] == "._init" and not self.name == "__init":
                try:
                    genfunc.outnoln("function %s(" % genfunc.expname(self.name))
                    for arg_var in self.args[-1][:-1]:
                        genfunc.outnoln("%s, " % arg_var.name)
                    genfunc.outnoln("%s" % self.args[-1][-1].name)
                except IndexError:
                    pass
                genfunc.outnoln(") {")

    @staticmethod
    def exam():
        """Static translation of the function."""
        while True:
            if not genfunc.RUN(Global.lines[Global.exel-1].tokens): break
            if Global.exel-1 >= len(Global.lines)-1: break
            Global.exel += 1

    # 関数の処理の実行、戻り値はこの関数の戻り値としてValue型で返される
    def run(self, args):
        """Call the function(Dynamic)."""
        genfunc.dbgprint("RUNNING FUNCTION: LEN(ARGS)=%d" % len(self.args))

        Global.retl.append(Global.exel)
        Global.exel = Global.tokens[Global.blocks[self.block_ind].token_ind].line-1
        Global.fs.append(self.fid)

        self.has_returned = None

        # 関数呼び出し用の変数リストを作る
        self.args.append(copy.deepcopy(self.args[0]))
        self.vars.append(copy.deepcopy(self.vars[0]))

        # 関数に渡された引数の処理
        for i, arg_var in enumerate(args):
            self.args[-1][i].subst(arg_var, False)
            genfunc.dbgprint("ArGlobal.Variable changed(%s -> %s)"
                             % (self.args[-1][i].name, arg_var.string))

        while True:
            if not genfunc.RUN(Global.lines[Global.exel-1].tokens): break
            if Global.exel-1 >= len(Global.lines)-1: break
            Global.exel += 1
        return self.has_returned

    @staticmethod
    def rtrn():
        """Let a function that called THE MOST RECENTLY return."""
        func = Global.Funcs[Function.id2i(Global.fs[-1])]
        del func.args[-1]
        del func.vars[-1]
        Global.exel = Global.retl.pop()
        Global.fs.pop()
