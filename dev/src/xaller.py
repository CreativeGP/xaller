#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""Xaller alpha 
programmer: CreativeGP
"""
import atexit
import sys


# TODO(future)
# Dirty型の比較（これから）
# 変数の初期化

# DBG


import Global

import TokenClass

import ValueClass

import genfunc

Global.vtypes = [ValueClass.Type('int', 'Integer'),
                 ValueClass.Type('string', 'String'),
                 ValueClass.Type('bool', 'Boolean')]

atexit.register(genfunc.report)


def deal_with_cmdargs():
    """Deal with command line arguments."""
    # -hを発見した時点でヘルプ文字列を出力して終了する
    args = sys.argv
    if '-h' in args:
        genfunc.dbgprint("-----CGP Xaller Interpreter (v1.0)-----")
        genfunc.dbgprint("cxi -ioh")
        genfunc.dbgprint("Usage")
        genfunc.dbgprint("-h /to show help.")
        genfunc.dbgprint("-i  ilename /to tell cxi  iles to interpret.")
        genfunc.dbgprint("-o name /to tell cxi a name to name output  iles.")
        sys.exit(0)

    # -dを見つけた際にはデバッグモード
    if '-d' in args:
        Global.bDbg = True

    # その他のスイッチを見つけた場合はその次にある引数がデータになる
    if '-o' in args and args.index('-o')+1 < len(args):
        Global.output = args[args.index('-o')+1]
    if '-i' in args and args.index('-i')+1 < len(args):
        Global.input = args[args.index('-i')+1]

    # 出力名が指定されていなかったときは自動で決める
    if Global.output == '':
        Global.output = Global.input[:Global.input.rfind(".")]

    genfunc.dbgprint('Input file name: ' + Global.input)


def out_html():
    """Output the HTML file which just loads JS file."""
    html = open('%s.html' % Global.output, 'w')
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
   """ % Global.output)
    html.close()


def deal_with_import():
    """Deal with xaller import statement."""
    # TODO(cgp): インポート時のエラー行調整
    header = 0

    # このままだとコメントが反映されないので一回トークン解析してからもとのファイルに戻す
    raw_tokens = TokenClass.Token.tokenize(Global.input)
    inputd = Global.input[:Global.input.rfind('/')] + '/'

    print (header)

    for i in range(len(raw_tokens)):
        if ((genfunc.is_plain(raw_tokens[i-1]) and
             raw_tokens[i-1].string is '<' and
             genfunc.is_plain(raw_tokens[i]) and
             genfunc.is_plain(raw_tokens[i+1]) and
             raw_tokens[i+1].string is '>')):

            filename = raw_tokens[i].string
            try:
                # インポートファイル名は入力ファイルがあるディレクトリからの
                # 相対パスを想定しているので、インポートファイル名にディレクトリを指定する
                new_tokens = TokenClass.Token.tokenize(inputd + filename)

            except FileNotFoundError:
                try:
                    # 相対パスで記述していなかった場合、最後の手段として
                    # そのまま実行してみる
                    new_tokens = TokenClass.Token.tokenize(filename)
                except FileNotFoundError:
                    # ファイルが見つからないのでエラー出力
                    genfunc.err("File not found. '%s'" % filename)

            # 新しいファイルのトークンの行番号をずらす
            # TokenClass.Token.shift_line(new_tokens, i - 1)

            # 新しいファイル名もトークン化して、もとのトークンに埋め込む
            del raw_tokens[i-1]
            del raw_tokens[i]
            del raw_tokens[i+1]
            raw_tokens = genfunc.insert(raw_tokens, i - 1, new_tokens)

    Global.tokens = raw_tokens

    Global.blocks = TokenClass.Block.parse(Global.tokens)
    Global.lines = TokenClass.Line.parse(Global.tokens, header)


def prepare_js():
    """Prepare JS file, running xaller programs."""
    genfunc.out("$(function() {")

    # RUN!!!!!
    # 静的な翻訳
    Global.exel = 0
    while True:
        runline = Global.lines[Global.exel]
        if not genfunc.translate(runline.tokens):
            break
        if genfunc.translate.element_stack:
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
            tab_string = '\t' * indent
            Global.outjs = genfunc.insert(Global.outjs, idx + 1, tab_string)
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
    """Output JS file."""
    js_file = open(Global.output + ".js", 'w')
    js_file.write(Global.outjs)
    js_file.close()


def main():
    """Process entry point."""
    deal_with_cmdargs()
    out_html()
    deal_with_import()
    prepare_js()
    out_js()

if __name__ == '__main__':
    main()
