# -*- coding: utf-8 -*-

"""Xaller alpha
programmer: CreativeGP
"""
import copy
import Global
import FunctionClass
import ValueClass
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
        if self.type.race == 'String':
            res += '"'
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
#        value = v
        # NOTE: JS出力用バッファを使うときは関数の処理のときに限る
        if js_out: genfunc.outnoln(genfunc.expname(self.name) + " = ")
#        Global.jsbuf += genfunc.expname(self.name) + " = "
        if str(type(new)) == "<class 'list'>":
            # TODO: 静的な変数だった場合は内容を更新するようにする
            genfunc.out_expression(new)
#            value = v = genfunc.eval_tokens(v, False)
        elif str(type(new)) == "<class 'ValueClass.Variable'>":
            genfunc.outnoln(genfunc.expname(new.name))
            value = new.refer(False) # NOTE: JS output!!
        # else:
        #     genfunc.outbuf(genfunc.expvalue(v)) # NOTE: JS output!!
        # if genfunc.is_var_web (self):

        name = self.name[self.name.find('.')+1:]
        webnamelist = ['text', 'name']
        if genfunc.is_var_web(self) and name in webnamelist:
            uniquename = self.name[:self.name.find('.')]
            if js_out: genfunc.solvebuf()
            if js_out: genfunc.out(";")
            if name == 'text' and js_out:
                Global.jsbuf += "$(%s).html(" % genfunc.S("#" + genfunc.expid(uniquename))
            elif name == 'name' and js_out:
                Global.jsbuf += "$(%s).attr('id', " % genfunc.S("#" + genfunc.expid(uniquename))
            else:
                ret = True
            Global.jsbuf += genfunc.expname(self.name)
            # if str(type(v)) == "<class 'ValueClass.Variable'>":
            #     value = v.refer()    # NOTE: JS出力のため再度呼び出し
            # # TODO: できればなくしたい
            # elif str(type(v)) == "<class 'list'>":
            #     genfunc.out_expression(v)
            # else :
            #     if js: Global.jsbuf += genfunc.expvalue(v) # NOTE: JS output!!
            if js_out: Global.jsbuf += ")"

        # if value is None:
        #     genfunc.err("Invalid value.")
        # if self.value.type.race == value.type.race:
        #     genfunc.dbgprint("ValueClass.Variable changed("+self.name+" -> "+value.string+")")
        #     self.value = value
        #     # if self.external:
        #     #     genfunc.subst_external(self, value)
        # else:
        #     genfunc.err("Incorrect substituting value which has different race. \n(%s(%s) << %s)"
        #                 % (self.name, self.value.type.race, value.type.race))

#         if self.value.type.name == value.type.name:
#             self.value = value
# #            if self.value.type.race == "Dirty":
# #                pass
#         else:
#             genfunc.err("Invalid substituting value which has different TYPE.")

    # NOTE: JS出力はバッファに行います
    def refer(self, js_out=True):
        """Refer the variable.

        Note that this bunction use buffer to output to the JS file.
        The outputting wouldn't be settled without calling genfunc.solvebuf().

        Args:
            js (=True): You can turn off this argument to cancel outputting.
        """

        if js_out:
            if genfunc.is_var_web(self):
                name = self.name[self.name.rfind(".")+1:]
                uniquename = self.name[:self.name.rfind(".")]
                if name == "text":
                    Global.jsbuf += "$(%s).html()" % genfunc.S("#" + genfunc.expid(uniquename))
                elif name == "name":
                    Global.jsbuf += "$(%s).attr('id')" % genfunc.S("#" + genfunc.expid(uniquename))
                else:
                    Global.jsbuf += genfunc.expname(self.name)
            else:
                Global.jsbuf += genfunc.expname(self.name)
        return self.value


    # 変数の作成を型どおりにやる
    @staticmethod
    def create(var, variables=None, external=False, pos='at end'):
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
        genfunc.out("var %s = %s;"
                    % (var.name.replace('.', '$'),
                       genfunc.expvalue(genfunc.get_default_value(value_type))))
        if Global.fs[-1] != -1:
            Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])].vars[-1].append(var)
        else:
            variables.append(var)
            if external:
                Global.Vars[-1].external = True

        # 型にメンバがある場合はそれも実際に作成
        for member in var.value.type.variables:
            ValueClass.Variable.create(
                ValueClass.Variable(var.name + "." + member.name,
                                    genfunc.get_default_value(member.value.type)), variables, external)

        # 作成予定関数を実際に作成
        for func in var.value.type.functions:
            new = copy.deepcopy(func)
            func = FunctionClass.Function(new.block_ind)
            func.name = var.name+"."+new.name
            func.add()
            exel = Global.blocks[func.block_ind].body[0].line
            genfunc.out("")
            # 関数内容を出力
            while True:
                genfunc.translate(Global.lines[exel].tokens)
                if exel == Global.blocks[func.block_ind].body[-1].line - 2:
                    if func.name[func.name.rfind('.'):] != '._init':
                        if Global.tfs[-1].event:
                            genfunc.out("});")
                        else:
                            genfunc.out("}")
                        Global.tfs.pop()
                    else:
                        if external:
                            Global.Vars[-1].external = True
                            genfunc.create_external(var.name, pos)
                    break
                exel += 1

        # TODO: コンストラクタを呼び出す
        # NOTE: コンストラクタの静的な呼び出しは上のコードで終わっている
        # if FunctionClass.Function.n2i(var.name+"._init") == -1:
        #     return

        # constructor = Global.Funcs[FunctionClass.Function.n2i(var.name+"._init")]
        # constructor.run([])
        return
