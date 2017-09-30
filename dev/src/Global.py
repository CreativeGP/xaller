# Global Variables
exel = 1  # Line to excute next.
retl = [] # Lineto return from func.
fs = [-1] # Running function index (default -1).
tfs = [None] # Translating function index (default -1).
brace_requests = [1] # Remember request of brace.
outjs = '' # JS File to output
bDbg = False # Flag output for debug.
jsbuf = ''
lock = False

indent = 0

blocks = []
Vars = []
Funcs = []
vtypes = []
tokens = []
lines = []
wobs = []

html_rules = None

import_paths = [
    "./",
    "../test/",
    ]

buildin_func_names = [
'+', '-', '*', '/',
'%', 'neg', 'and', 'or',
'xor', 'not', 'eq', '>',
'<', '>=', '<=', 'concat',
'strlen', 'substr', 'strtrimr', 'strtriml',
'strtrim', 'strmatch', 'stridx', 'strridx',
'strrep',
]

jstypes = {'Integer':'Number', 'String':'String', 'Boolean':'Boolean'}
sep_type = {
    ',':',', '+':'+', '-':'-', '*':'*',
    '/':'/', '%':'%', 'neg':'-', 'or':'||',
    'and':'&&', 'not':'!', 'xor':'^', 'eq':'==',
    '<':'<', '>':'>', '<=':'<=', '>=':'>=',
    'concat':'+', 'strlen':',', 'substr':',', 'strtrimr':',',
    'strtriml':',', 'strtrim':',', 'strmatch':',', 'stridx':',',
    'strridx':',', 'strrep':',',
}

output = ''
input = ''

