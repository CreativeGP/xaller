#!/usr/bin/python3
# -*- coding: utf-8 -*-
import sys
import os
import atexit
import copy
import re

from enum import Enum
from pprint import pprint


# TODO(future)
# Dirty型の比較（これから）
# 変数の初期化
# TODO

# 再帰的な処理がきちんとできるかどうか（関数のヒープが正しく動いているかどうか）
# DBG
# ビルドイン関数neg, or, and, not, xor, eq
# 条件分岐文が関数内で実行できるか


import TokenClass
import ValueClass
import FunctionClass
import Global
import genfunc
import buildinfunc

Global.vtypes = [ValueClass.Type('int', 'Integer'),
                 ValueClass.Type('string', 'String'),
                 ValueClass.Type('bool', 'Boolean')]

atexit.register(genfunc.report)

# コマンドラインの処理
args = sys.argv
if '-h' in args:
    genfunc.dbgprint("-----CGP Xaller Interpreter (v1.0)-----")
    genfunc.dbgprint("cxi -ioh")
    genfunc.dbgprint("Usage")
    genfunc.dbgprint("-h /to show help.")
    genfunc.dbgprint("-i  ilename /to tell cxi  iles to interpret.")
    genfunc.dbgprint("-o name /to tell cxi a name to name output  iles.")
    sys.exit(0);

# Argument
if '-o' in args and args.index('-o')+1 < len(args):
    Global.output = args[args.index('-o')+1]
if '-i' in args and args.index('-i')+1 < len(args):
    Global.input = args[args.index('-i')+1]
if Global.output == '':
    Global.output = Global.input
if '-d' in args:
    Global.bDbg = True
genfunc.dbgprint('Input file name: ' + Global.input)

html = open('%s.html' % Global.input[:Global.input.rfind(".")], 'w')
html.write("""
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
</head>
<body>

<script src="%s.js">
</script>
</body>
</html>
""" % Global.input[:Global.input.rfind(".")])
html.close()

# Mean tokens(basic)

# TODO: インポート時のエラー行調整
header = 0
# TODO: このままだとコメントが反映されないので一回トークン解析してからもとのファイルに戻す
with open(Global.input, 'r') as myfile:
    data = myfile.read()
    offset = 0
    while data.find('<', offset) != -1:
        # NOTE: オフセットは二重検索を回避するためにインクリメントしておく
        offset = data.find('<', offset) + 1
        filename = data[offset : data.find('>', offset)]
        for path in Global.import_paths:
            if os.path.exists(path + filename):
                filename = path + filename
                break
        with open(filename, 'r') as f:
            tmp = data.count('\n')
            data = re.sub('<.*>', f.read() + "\n", data)
            header += data.count('\n') - tmp

with open(Global.input+".m", 'w') as myfile:
    myfile.write(data)

Global.tokens = TokenClass.Token.tokenize(Global.input+".m", header)
Global.blocks = TokenClass.Block.parse(Global.tokens)
Global.lines = TokenClass.Line.parse(Global.tokens, header)

# 前出力
genfunc.out("$(function() {")
Global.indent += 1

# RUN!!!!!
# 静的な翻訳
Global.exel = 0
while True:
    l = Global.lines[Global.exel]
    if not genfunc.translate(l.tokens):
        break
    if len(genfunc.translate.element_stack) > 0 and Global.blocks[genfunc.translate.element_stack[-1]].body[-1].line <= Global.exel:
        genfunc.translate.element_stack.pop()
    Global.exel += 1

Global.indent -= 1
genfunc.out("});")

# while True:
#     if not genfunc.RUN(Global.lines[Global.exel-1].tokens): break
#     if len(genfunc.RUN.element_stack) > 0 and Global.blocks[genfunc.RUN.element_stack[-1]].body[-1].line <= Global.exel:
#         genfunc.RUN.element_stack.pop()
#     if Global.exel-1 >= len(Global.lines)-1:
#         break
#     Global.exel += 1

# os.remove(Global.input)

js = open(Global.input[:Global.input.rfind(".")]+".js", 'w')
js.write(Global.outjs)
js.close()
