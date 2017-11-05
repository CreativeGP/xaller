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


    def is_pure(self):
        purelist = ['int', 'string', 'bool']
        return self.name in purelist

    def is_dirty(self):
        return ((not self.is_pure()
                 and ((len(self.variables) > 0) or (len(self.functions) > 0))))


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

    def __init__(self, _name, _value, is_member=False):
        self.name = _name
        self.value = _value
        self.external = False
        self.is_member = is_member

    def subst(self, new, js_out=True):
        """Substitute the value for this variable."""
        # NOTE: JS出力用バッファを使うときは関数の処理のときに限る
        if js_out: genfunc.outnoln(genfunc.expvar(self) + " = ")
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

        if js_out:
            member_name = genfunc.expid(self.name[self.name.find(".")+1:])
            parent_name = genfunc.expid(self.name[:self.name.find(".")])
            parent = genfunc.get_var(parent_name)
            parent_type = (genfunc.get_var(parent_name).value.type
                           if parent is not None else
                           None)
            if parent_type is None and genfunc.is_adding_type():
                parent_type = genfunc.get_value_type(genfunc.get_adding_type_name())
            if parent_type is not None:
                for var in parent_type.variables:
                    if var.name == '_web':
                        webtype = var.value.string

                        wob = WebClass.WebObject.find_by_name(parent_name)
                        if wob is None and genfunc.is_adding_type():
                            WebClass.WebObject.static_change(
                                member_name, genfunc.expvar(self), webtype)
                        else:
                            wob.change(member_name, genfunc.expvar(self))
                        return


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
            if self.name == 'val':
                Global.jsbuf += '$("#" + this.id).val()'
                return

            if self.name == '__element':
                Global.jsbuf += '$("#" + this.id)'
                return

            if '.' in self.name and not self.name[0] == '.':
                parent_name = self.name[:self.name.find('.')]
                member_name = self.name[self.name.find('.')+1:]
                wob = WebClass.WebObject.find_by_name(parent_name)
                if wob:
                    tmp = wob.refer(member_name)
                    if tmp == '':
                        tmp = genfunc.expvar(self)
                    Global.jsbuf += tmp
                    return

            staticr = WebClass.WebObject.static_refer(self.name)
            if staticr == '':
                Global.jsbuf += genfunc.expvar(self)
            else:
                Global.jsbuf += staticr
                    
            #     # NOTE(2017:11:03)@cgp
            #     # 型の実体化の際にはまだwobが作られていないのでそのまま出力するようにする
            #     # つまり、.textや.varなどの属性変数は正しく展開されない
            #     elif genfunc.is_materializing_type():
            #         if self.name[self.name.find('.')+1:] == "__element":
            #             Global.jsbuf += ('$("#" + ' + self.name[:self.name.find('.')] + ".id" + ')')
            #             return
            #         Global.jsbuf += genfunc.expvar(self)
            # else:
            #     if genfunc.is_adding_type():
            #         webtype = ''
            #         for var in genfunc.get_value_type(genfunc.get_adding_type_name()).variables:
            #             if var.name == "_web":
            #                 webtype = var.value.string
            #                 if WebClass.WebObject.check_attr_name_from_webtype(self.name, webtype) != 'no':
            #                     # NOTE(2017:11:05)@cgp
            #                     # ここでjSを編集するのはなんだか気持ち悪いけどwobの実体がないので仕方ないかな？
            #                     Global.jsbuf += (
            #                         '$("#" + '
            #                         + genfunc.expname('id')
            #                         + ').attr(\'%s\')' % self.name)
            #                     return
            #                 if self.name == "text":
            #                     Global.jsbuf += ('$("#" + ' + genfunc.expname('id') + ').html()')
            #                     return
            #                 # if self.name[self.name.find('.')+1:] == "__element":
            #                 #     Global.jsbuf += ('$("#" + ' + genfunc.expname('id') + ')')
            #                 #     return
#                Global.jsbuf += genfunc.expvar(self)

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

        have_to_pop = False
        if var.value.type.is_dirty():
            have_to_pop = True
            Global.translate_seq.append('materialize ' + var.value.type.name)
            genfunc.dbgprint(('materialize ' + var.value.type.name))

        if variables is None:
            variables = Global.Vars

        # 実際に変数を作る
        if var.value.type.race == 'Dirty':
            var.value.string = var.name
        value_type = genfunc.get_value_type(var.value.type.name)
        if jsout:
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

        if external:
            # NOTE(cgp/2017:11:03)
            # メンバの変数も実際に作っている（かつその際externalはTrueな）ので
            # メンバ変数でWOBを作らないように_webメンバの存在を確認している。
            # これだとこの変数が何かの型のメンバにあった場合にも対応できるはず。
            # NOTE(cgp/2017:11:05)
            # 上記のことを型の変数を検索して判定するようにする
            # なぜなら__init関数の前にWOBを出力するようにしたので、この時まだ
            # _web変数ができていないから。
            for mem in var.value.type.variables:
                if mem.name == "_web":
                    variables[-1].external = True
                    Global.wobs.append(WebClass.WebObject(var.name, pos))
                    Global.wobs[-1].create(genfunc.get_web_type_name(var))

        for func in var.value.type.functions:
            instance_func = copy.deepcopy(func)
            instance_func.name = var.name + "." + instance_func.name
            Global.Funcs.append(instance_func)
            if "." + func.name in Global.eventlist:
                # イベント関数の場合
                eventname = Global.eventlist[Global.eventlist.index("." + func.name)][1:]
                genfunc.out("$('#%s').%s(%s._%s);" % (
                    var.name, eventname, var.name, eventname))

        for func in var.value.type.functions:
            if func.name == '__init':
                # NOTE(cgp) __init関数は呼ばないで直接書かなければならない。
                # なぜなら、その中で行われる_web変数の変更をXallerが動的に読み込まなければ
                # DOM出力ができないから。
                # genfunc.out(var.name + '.' + func.name + '();')
                tmp = []

                # NOTE(cgp): ここで変更している名前はホントの型定義の関数なので
                # ここで一時保存しておいてあとで復元する
                tmpname = func.name
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
                func.name = tmpname
                break

        # TODO: コンストラクタを呼び出す
        # NOTE: コンストラクタの静的な呼び出しは上のコードで終わっている
        # if FunctionClass.Function.n2i(var.name+".__init") == -1:
        #     return

        # constructor = Global.Funcs[FunctionClass.Function.n2i(var.name+".__init")]
       # constructor.run([])

        if have_to_pop: Global.translate_seq.pop()

        return
