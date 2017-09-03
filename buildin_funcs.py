import sys

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
    for i in range(1, len(arg)):
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
    return Value(ans, get_value_type('int'))
    
# (substr string start [length]) 
def xaller_substr(arg):
    ans = ""
    if len(arg) == 2 or len(arg) == 3:
        length = None
        if arg[0]._type._race == 'String': string = arg[0]._string
        else: err("Function 'substr' > Wrong arguments. (substr string start [length])")
        if arg[1]._type._race == 'Integer': start = arg[1]._string
        else: err("Function 'substr' > Wrong arguments. (substr string start [length])")
        if len(arg) == 3:
            if arg[2]._type._race == 'Integer': length = arg[2]._string
            else: err("Function 'substr' > Wrong arguments. (substr string start [length])")
        if length is None:
            if start < len(string): ans = string[start:]
            else: err("Function 'substr' > Out of range.")

        else:
            if start+length < len(string): ans = string[start:start+length]
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

# (strindex cmpstr string)
def xaller_strindex(arg):
    ans = -1
    if len(arg) == 2:
        if arg[0]._type._race == 'String':
            cmpstr = arg[0]._string
        else: err("Functino 'strindex' > Wrong arguments. (strindex cmpstr string)")
        if arg[1]._type._race == 'String':
            string = arg[1]._string
        else: err("Functino 'strindex' > Wrong arguments. (strindex cmpstr string)")

        for i in range(len(string)):
            dststr = string[:i]
            if cmpstr in dststr:
                ans = i-len(cmpstr)
                break
    else: err("Functino 'strindex' > Wrong arguments. (strindex cmpstr string)")
    return Value(ans, get_value_type('int'))
    
# (strrindex cmpstr string)
def xaller_strrindex(arg):
    ans = -1
    if len(arg) == 2:
        if arg[0]._type._race == 'String':
            cmpstr = arg[0]._string
        else: err("Functino 'strrindex' > Wrong arguments. (strrindex cmpstr string)")
        if arg[1]._type._race == 'String':
            string = arg[1]._string
        else: err("Functino 'strrindex' > Wrong arguments. (strrindex cmpstr string)")

        for i in range(len(string))[::-1]:
            dststr = string[i:]
            if cmpstr in dststr:
                ans = i
                break
    else: err("Functino 'strrindex' > Wrong arguments. (strrindex cmpstr string)")
    return Value(ans, get_value_type('int'))
    
def xaller_strrep(arg):
    pass # Coming soon.


