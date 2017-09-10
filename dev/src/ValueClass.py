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

    def subst(self, v):
        value = v
        # NOTE: JS出力用バッファを使うときは関数の処理のときに限る
        genfunc.outnoln(genfunc.expname(self._name) + " = ")
#        Global.jsbuf += genfunc.expname(self._name) + " = "
        if str(type(v)) == "<class 'list'>":
            value = v = genfunc.eval_tokens(v)
        elif str(type(v)) == "<class 'ValueClass.Variable'>":
            value = v.refer() # NOTE: JS output!!
        # else:
        #     genfunc.outbuf(genfunc.expvalue(v)) # NOTE: JS output!!
        # if genfunc.is_var_web (self):

        if genfunc.is_var_web (self):
            genfunc.solvebuf()
            genfunc.out(";")
            name = self._name[self._name.find('.')+1:]
            uniquename = self._name[:self._name.find('.')]
            if name == 'text':
                Global.jsbuf += "$(%s).html(" % genfunc.S("#" + genfunc.expid(uniquename))
                if str(type(v)) == "<class 'ValueClass.Variable'>":
                    value = v.refer()    # NOTE: JS出力のため再度呼び出し
                else :
                    Global.jsbuf += genfunc.expvalue(v) # NOTE: JS output!!
                Global.jsbuf += ")"



        if value is None:
            genfunc.err("Invalid value.")
        if self._value._type._race == value._type._race:
            genfunc.dbgprint("ValueClass.Variable changed("+self._name+" -> "+value._string+")")
            self._value = value
            # if self._external:
            #     genfunc.subst_external(self, value)
        else:
            genfunc.err("Incorrect substituting value which has different race.\n")

#         if self._value._type._name == value._type._name:
#             self._value = value
# #            if self._value._type._race == "Dirty":
# #                pass
#         else:
#             genfunc.err("Invalid substituting value which has different TYPE.")

    def refer(self, js = True):
        if js:
            if genfunc.is_var_web(self):
                typename = genfunc.get_var(self._name[:self._name.rfind(".")]+"._web")._value._string
                name = self._name[self._name.rfind(".")+1:]
                uniquename = self._name[:self._name.rfind(".")]
                if name == "text":
                    Global.jsbuf += "$(" + genfunc.S(genfunc.expid(uniquename)) + ").html()"
            else:
                Global.jsbuf +=  genfunc.expname(self._name)
                
        return self._value
    

    # 変数の作成を型どおりにやる
    def create(var, variables = None, external = False, pos = 'at end'):
        if variables is None:
            variables = Global.Vars

        # 作成予定関数を実際に作成
        for f in var._value._type._functions:
            new = copy.deepcopy(f)
            f = FunctionClass.Function(new._block_ind)
            f._name = var._name+"."+new._name
            FunctionClass.Function.add(f)
        # 型にメンバがある場合はそれも実際に作成
        for v in var._value._type._variables:
            ValueClass.Variable.create(
                ValueClass.Variable(var._name+"."+v._name,
                                    genfunc.get_default_value(v._value._type)), variables, external)
        
        # 実際に変数を作る
        if var._value._type._race == 'Dirty':
            var._value._string = var._name
        genfunc.out("var "+var._name.replace('.', '$')+";")
        if Global.fs[-1] != -1:
            Global.Funcs[FunctionClass.Function.id2i(Global.fs[-1])]._vars[-1].append(var)
        else:
            variables.append(var)
            if external:
                Global.Vars[-1]._external = True
                genfunc.create_external(var._name, var._value._type, pos)


        # コンストラクタを呼び出す
        if FunctionClass.Function.n2i(var._name+".__init") == -1:
            return

        Global.Funcs[FunctionClass.Function.n2i(var._name+".__init")].run([])
