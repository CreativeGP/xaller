#!/usr/bin/python3
# -*- coding: utf-8 -*-
""" Xaller (v9.1) """
import sys
import os
import atexit
import re


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
import Global
import genfunc

Global.vtypes = [ValueClass.Type('int', 'Integer'),
                 ValueClass.Type('string', 'String'),
                 ValueClass.Type('bool', 'Boolean')]

atexit.register(genfunc.report)

def deal_with_cmdargs():
    """ Deals with command line arguments. """

    args = sys.argv
    if '-h' in args:
        genfunc.dbgprint("-----CGP Xaller Interpreter (v1.0)-----")
        genfunc.dbgprint("cxi -ioh")
        genfunc.dbgprint("Usage")
        genfunc.dbgprint("-h /to show help.")
        genfunc.dbgprint("-i  ilename /to tell cxi  iles to interpret.")
        genfunc.dbgprint("-o name /to tell cxi a name to name output  iles.")
        sys.exit(0)

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

def out_html():
    """ Output the HTML file which just loads JS file. """

    html = open('%s.html' % Global.input[:Global.input.rfind(".")], 'w')
    html.write("""
    <html>
    <head>
    <meta charset="UTF-8">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
    </head>
    <body>

    <script src="%s.js">
    </script>
    </body>
    </html>
    """ % Global.input[:Global.input.rfind(".")])
    html.close()

def deal_with_import():
    """ Deals with xaller import statement. """

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
            with open(filename, 'r') as fil:
                tmp = data.count('\n')
                data = re.sub('<.*>', fil.read() + "\n", data)
                header += data.count('\n') - tmp

    with open(Global.input+".m", 'w') as myfile:
        myfile.write(data)

    Global.tokens = TokenClass.Token.tokenize(Global.input+".m", header)
    Global.blocks = TokenClass.Block.parse(Global.tokens)
    Global.lines = TokenClass.Line.parse(Global.tokens, header)

def prepare_js():
    """ Prepares JS file, running xaller programs. """

    # 前出力
    genfunc.out("$(function() {")

    # RUN!!!!!
    # 静的な翻訳
    Global.exel = 0
    while True:
        runline = Global.lines[Global.exel]
        if not genfunc.translate(runline.tokens):
            break
        element_block = Global.blocks[genfunc.translate.element_stack[-1]]
        if (len(genfunc.translate.element_stack) > 0 and
                element_block.body[-1].line <= Global.exel):
            genfunc.translate.element_stack.pop()
        Global.exel += 1

    genfunc.out("});")

    # インデントを出力、基本は閉じ括弧開き括弧でインデント数を操作しているが、
    # 単独閉じ括弧の場合に小細工を加えている(See L131)
    indent = 0
    idx = 0
    tmps = Global.outjs
    for i, char in enumerate(tmps):
        if char == '{':
            indent += 1
        if i < len(tmps)-1 and char == '\n' and not tmps[i+1] == '}':
            tab_string = '\t'*indent
            Global.outjs = genfunc.insert(Global.outjs, idx+1, tab_string)
            idx += indent
        elif i < len(tmps)-1 and tmps[i+1] == '}':
            indent -= 1
            tab_string = '\t'*indent
            Global.outjs = genfunc.insert(Global.outjs, idx+1, tab_string)
            idx += indent
            indent += 1
        elif char == '}':
            indent -= 1
        idx += 1

# while True:
#     if not genfunc.RUN(Global.lines[Global.exel-1].tokens): break
#     element_stack = Global.blocks[genfunc.RUN.element_stack[-1]]
#     if (len(genfunc.RUN.element_stack) > 0
#         and element_blocks.body[-1].line <= Global.exel):
#         genfunc.RUN.element_stack.pop()
#     if Global.exel-1 >= len(Global.lines)-1:
#         break
#     Global.exel += 1

# os.remove(Global.input)

def out_js():
    """ Outputs JS file. """

    js_file = open(Global.input[:Global.input.rfind(".")]+".js", 'w')
    js_file.write(Global.outjs)
    js_file.close()
