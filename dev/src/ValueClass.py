# -*- coding: utf-8 -*-

"""Xaller alpha
programmer: CreativeGP
"""
import copy
import Global
import FunctionClass
import ValueClass
import WebClass
import genfunc

class Type(object):
    """This class represents a type.

    Type is a own and convenient operation which Xaller serves.
    It is a good way to use something like struct in c to represent a type.

    Attributes:
        name: The name of this type.
        race: A string indicating the kind of types.
        variables: A list of variables that required to instance on creation of this type.
        functions: A list of functions that required to instance on creation of this type.
    """

    def __init__(self, name, race):
        self.name = name
        self.race = race
        self.variables = []
        self.functions = []
        self.blocks_for_init = []


class Value(object):
    """This class represents a value.

    Attributes:
        string: A string data of this value.
        type: A object of Type of this value.
    """

    def __init__(self, data, vt):
        self.string = data
        self.type = vt

    def __str__(self):
        res = ''
        if self.type.race == 'String':
            res += '"'
        res += self.string
        return res

class Variable(object):
    """This class represents a variable.

    Attributes:
        name: A string name of this variable.
        value: A object of Value of this variable.
        external: A bool flag indicating whether the variable is
            external variable.
    """

    def __init__(self, _name, _value):
        self.name = _name
        self.value = _value
        self.external = False

    def subst(self, new, js_out=True):
        """Substitute the value for this variable."""
        # NOTE: JS出力用バッファを使うときは関数の処理のときに限る
        if js_out: genfunc.outnoln(genfunc.expname(self.name) + " = ")
        if ((str(type(new)) == "<class 'list'>"
             or str(type(new)) == "<type 'list'>")):
            # TODO: 静的な変数だった場合は内容を更新するようにする
            genfunc.out_expression(new)
        elif str(type(new)) == "<class 'ValueClass.Variable'>":
#            genfunc.outnoln(genfunc.expname(new.name))
            new.refer()

        if js_out:
            genfunc.solvebuf()
            genfunc.out(";")

            member_name = genfunc.expid(self.name[self.name.find(".")+1:])
            parent_name = genfunc.expid(self.name[:self.name.find(".")])

            wob = WebClass.WebObject.find_by_name(parent_name)
            if wob is None: return
            wob.change(member_name, genfunc.expname(self.name))


    # NOTE: JS出力はバッファに行います
    def refer(self, js_out=True):
        """Refer the variable.

        Note that this bunction use buffer to output to the JS file.
        The outputting wouldn't be settled without calling genfunc.solvebuf().
        NOTE: Do not use this method.

        Args:
            js (=True): You can turn off this argument to cancel outputting.
        """

        if js_out:
            # if genfunc.is_var_web(self):
            #     name = self.name[self.name.rfind(".")+1:]
            #     uniquename = self.name[:self.name.rfind(".")]
            #     if name == "text":
            #         Global.jsbuf += "$(%s).html()" % genfunc.S("#" + genfunc.expid(uniquename))
            #     elif name == "name":
            #         Global.jsbuf += "$(%s).attr('id')" % genfunc.S("#" + genfunc.expid(uniquename))
            #     else:
            #         Global.jsbuf += genfunc.expname(self.name)
            # else:
            if '.' in self.name and not self.name[0] == '.':
                parent_name = self.name[:self.name.find('.')]
                member_name = self.name[self.name.find('.')+1:]
                wob = WebClass.WebObject.find_by_name(parent_name)
                if wob:
                    tmp = wob.refer(genfunc.expname(member_name))
                    if tmp == '':
                        tmp = genfunc.expname(self.name)
                    Global.jsbuf += tmp
                    return
            else:
                Global.jsbuf += genfunc.expname(self.name)
        return self.value


    # 変数の作成を型どおりにやる
    @staticmethod
    def create(var, variables=None, external=False, pos='at end', jsout=True):
        """Create a variable.

        Append a new variable to a list and create Dirty members.
        Instance a type by recursive processing.

        Args:
            var: A variable to create.
            variables (=Global.Vars): A list to append new variable.
            external (=False): Turn on to create external variable.
            pos (='at end'): The string indicater where to put a web part. (external only)
        """

        if variables is None:
            variables = Global.Vars

        # 実際に変数を作る
        if var.value.type.race == 'Dirty':
            var.value.string = var.name
        value_type = genfunc.get_value_type(var.value.type.name)
        if jsout:
            print(var.name)
            genfunc.out("var %s = %s;"
                        % (var.name.replace('.', '$'),
                           genfunc.expvalue(genfunc.get_default_value(value_type, var.name))))
        if Global.fs[-1] != -1:
            Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])].vars[-1].append(var)
        else:
            variables.append(var)
            if external:
                variables[-1].external = True

        # 型にメンバがある場合はそれも実際に作成
        for member in var.value.type.variables:
            # NOTE(cgp) Don't output member variable definition.
            ValueClass.Variable.create(
                ValueClass.Variable(var.name + "." + member.name,
                                    genfunc.get_default_value(member.value.type)),
                variables, external, jsout=False)

        for func in var.value.type.functions:
            if func.name == '__init':
                # NOTE(cgp) __init関数は呼ばないで直接書かなければならない。
                # なぜなら、その中で行われる_web変数の変更をXallerが動的に読み込まなければ
                # DOM出力ができないから。
                # genfunc.out(var.name + '.' + func.name + '();')
                tmp = []
                func.name = var.name + "." + func.name
                Global.tfs.append(func)
                for init_block in var.value.type.blocks_for_init:
                    for tkn in init_block.body[1:-1]:
                        tmp.append(tkn)
                        if tkn.ttype.Return:
                            genfunc.log_ts("tmp", tmp)
                            if jsout: genfunc.translate(tmp)
                            del tmp[:]
                Global.tfs.pop()
                break

        if external:
            variables[-1].external = True
            Global.wobs.append(WebClass.WebObject(var.name, pos))
            Global.wobs[-1].create()

        # TODO: コンストラクタを呼び出す
        # NOTE: コンストラクタの静的な呼び出しは上のコードで終わっている
        # if FunctionClass.Function.n2i(var.name+".__init") == -1:
        #     return

        # constructor = Global.Funcs[FunctionClass.Function.n2i(var.name+".__init")]
        # constructor.run([])
        return
