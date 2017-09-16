import copy
import Global
import FunctionClass
import ValueClass
import genfunc

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

    def subst(self, v, js = True):
        value = v
        # NOTE: JS出力用バッファを使うときは関数の処理のときに限る
        if js: genfunc.outnoln(genfunc.expname(self._name) + " = ")
#        Global.jsbuf += genfunc.expname(self._name) + " = "
        if str(type(v)) == "<class 'list'>":
            # TODO: 静的な変数だった場合は内容を更新するようにする
            genfunc.out_expression(v)
#            value = v = genfunc.eval_tokens(v, False)
        elif str(type(v)) == "<class 'ValueClass.Variable'>":
            genfunc.outnoln(genfunc.expname(v._name))
            value = v.refer(False) # NOTE: JS output!!
        # else:
        #     genfunc.outbuf(genfunc.expvalue(v)) # NOTE: JS output!!
        # if genfunc.is_var_web (self):

            

        name = self._name[self._name.find('.')+1:]
        webnamelist = ['text', 'name']
        if genfunc.is_var_web (self) and name in webnamelist:
            uniquename = self._name[:self._name.find('.')]
            if js: genfunc.solvebuf()
            if js: genfunc.out(";")
            if name == 'text':
                if js: Global.jsbuf += "$(%s).html(" % genfunc.S("#" + genfunc.expid(uniquename))
            elif name == 'name':
                if js: Global.jsbuf += "$(%s).attr('id', " % genfunc.S("#" + genfunc.expid(uniquename))
            else:
                ret = True
            Global.jsbuf += genfunc.expname(self._name)
            # if str(type(v)) == "<class 'ValueClass.Variable'>":
            #     value = v.refer()    # NOTE: JS出力のため再度呼び出し
            # # TODO: できればなくしたい
            # elif str(type(v)) == "<class 'list'>":
            #     genfunc.out_expression(v)
            # else :
            #     if js: Global.jsbuf += genfunc.expvalue(v) # NOTE: JS output!!
            if js: Global.jsbuf += ")"


            
        # if value is None:
        #     genfunc.err("Invalid value.")
        # if self._value._type._race == value._type._race:
        #     genfunc.dbgprint("ValueClass.Variable changed("+self._name+" -> "+value._string+")")
        #     self._value = value
        #     # if self._external:
        #     #     genfunc.subst_external(self, value)
        # else:
        #     genfunc.err("Incorrect substituting value which has different race. \n(%s(%s) << %s)" % (self._name, self._value._type._race, value._type._race))

#         if self._value._type._name == value._type._name:
#             self._value = value
# #            if self._value._type._race == "Dirty":
# #                pass
#         else:
#             genfunc.err("Invalid substituting value which has different TYPE.")

    # NOTE: JS出力はバッファに行います
    def refer(self, js = True):
        if js:
            if genfunc.is_var_web(self):
                typename = genfunc.get_var(self._name[:self._name.rfind(".")]+"._web", False)._value._string
                name = self._name[self._name.rfind(".")+1:]
                uniquename = self._name[:self._name.rfind(".")]
                if name == "text":
                    Global.jsbuf += "$(" + genfunc.S("#" + genfunc.expid(uniquename)) + ").html()"
                elif name == "name":
                    Global.jsbuf += "$(" + genfunc.S("#" + genfunc.expid(uniquename)) + ").attr('id')"
                else:
                    Global.jsbuf +=  genfunc.expname(self._name)
            else:
                Global.jsbuf +=  genfunc.expname(self._name)
                
        return self._value
    

    # 変数の作成を型どおりにやる
    def create(var, variables = None, external = False, pos = 'at end'):
        if variables is None:
            variables = Global.Vars


        # 実際に変数を作る
        if var._value._type._race == 'Dirty':
            var._value._string = var._name
        genfunc.out("var "+var._name.replace('.', '$')+" = %s;" % genfunc.expvalue(genfunc.get_default_value(genfunc.get_value_type(var._value._type._name))))
        if Global.fs[-1] != -1:
            Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]._vars[-1].append(var)
        else:
            variables.append(var)
            if external:
                Global.Vars[-1]._external = True

        # 型にメンバがある場合はそれも実際に作成
        for v in var._value._type._variables:
            ValueClass.Variable.create(
                ValueClass.Variable(var._name+"."+v._name,
                                    genfunc.get_default_value(v._value._type)), variables, external)

        # 作成予定関数を実際に作成
        for f in var._value._type._functions:
            new = copy.deepcopy(f)
            f = FunctionClass.Function(new._block_ind)
            f._name = var._name+"."+new._name
            f.add()
            exel = Global.blocks[f._block_ind].body[0].line
            genfunc.out("")
            # 関数内容を出力
            while True:
                res = genfunc.translate(Global.lines[exel].tokens)
                if exel == Global.blocks[f._block_ind].body[-1].line - 2:
                    if f._name[f._name.rfind('.'):] != '.__init':
                        if Global.tfs[-1]._event:
                            genfunc.out("});")
                        else:
                            genfunc.out("}")
                        Global.tfs.pop()
                    else:
                        if external:
                            Global.Vars[-1]._external = True
                            genfunc.create_external(var._name, pos)
                    break
                exel += 1
            
        

        # TODO: コンストラクタを呼び出す
        # NOTE: コンストラクタの静的な呼び出しは上のコードで終わっている
        # if FunctionClass.Function.n2i(var._name+".__init") == -1:
        #     return

        # constructor = Global.Funcs[FunctionClass.Function.n2i(var._name+".__init")]
        # constructor.run([])
        return
