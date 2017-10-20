# -*- coding: utf-8 -*-
import os
# Global Variables
exel = 1  # Line to excute next.
retl = [] # Lineto return from func.
fs = [-1] # Running function index (default -1).
# HACK(cgp) Why does both lists need dammy element?
tfs = [] # Translating function index (default -1).
brace_requests = [1] # Remember request of brace.
outjs = '' # JS File to output
bDbg = False # Flag output for debug.
bTime = False
bPreCompile = False
jsbuf = ''
lock = False

translate_seq = []

indent = 0

blocks = []
Vars = []
Funcs = []
vtypes = []
tokens = []
lines = []
wobs = []

html_rules = None
html_rule_file_path = os.path.dirname(os.path.abspath(__file__)) + '/html_rules.json'

# ファイルのインポートは相対パスで記述できるようになったのでとりまカット
# import_paths = [
#     "./",
#     "../test/",
#     ]

eventlist = ['.blur', '.click', '.change', '.ctxmenu',
             '.dbclick', '.error', '.focus', '.focusin',
             '.focusout', '.hover', '.load', '.ready',
             '.scroll', '.resize', '.select', '.submit',
             '.unload']


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
imported = []
imported_line = 0

