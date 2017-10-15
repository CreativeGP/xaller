#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""Xaller alpha 
programmer: CreativeGP
"""
import atexit
import json
import os
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
    if len(args) < 3:
        if '-h' in args:
            print("-----CGP Xaller Interpreter (v1.0)-----")
            print("cxi -ioh")
            print("Usage")
            print("-h /to show help.")
            print("-i  ilename /to tell cxi  iles to interpret.")
            print("-o name /to tell cxi a name to name output  iles.\n")
            sys.exit(0)
        print("Missing operations.\n")
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
        Global.output = os.path.basename(Global.input)

    # NOTE(cgp) Make the paths of input and output file absolute.
    # TODO(cgp) Support user and environment variables.
    # TODO(cgp) May suupport expanding symbolic link?
    Global.input = os.path.abspath(Global.input)
    Global.output = os.path.abspath(Global.output)

    # NOTE(cgp) Change the current directory into the input file directory.
    # For os.path.abspath().
    os.chdir(os.path.dirname(Global.input))

    genfunc.dbgprint('Input file name: ' + Global.input)


def out_html():
    """Output the HTML file which just loads JS file."""
    # TODO(cgp) calc.xal -> (calc.xal.html => calc.html)
    html = open('%s.html' % Global.output, 'w')
    html.write("""
    <html>
    <head>
    <meta charset="UTF-8">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
    </head>
    <body>

    <script src="%s">
    </script>
    </body>
    </html>
   """
               # TODO(cgp) calc.xal -> (calc.xal.html => calc.html)
               # NOTE(cgp) Use relative path to behave well online.
               % os.path.relpath(Global.output + ".js"))
    html.close()


def deal_with_import(filename):
    """Deal with xaller import statement."""

    # このままだとコメントが反映されないので一回トークン解析してからもとのファイルに戻す
    raw_tokens = TokenClass.Token.tokenize(filename)
    with open(filename) as raw_file:
        raw = raw_file.read().splitlines()
        for i in range(len(raw_tokens)):
            if ((genfunc.is_plain(raw_tokens[i-1]) and
                 raw_tokens[i-1].string is '<')):
                # NOTE(cgp) If there is a plain angle bracket, get a file name
                # to import from raw file to contain spaces.
                # TODO(cgp) Support user and environment variables.
                raw_line = raw[raw_tokens[i].real_line - 1]
                filename = raw_line[raw_line.find('<')+1:raw_line.find('>')]

                if os.path.isabs(filename):
                    # NOTE(cgp) If the path is absolute, import the file as it is.
                    pass
                else:
                    # NOTE(cgp) Change relative path into absolute.
                    # Here note that the working directory has already been
                    # changed into the source file directory.
                    filename = os.path.abspath(filename)

                try:
                    # TODO(cgp) May suupport expanding symbolic link?
                    new_tokens = deal_with_import(filename)
#                    new_tokens = TokenClass.Token.tokenize(filename)
                except Exception:
                    genfunc.err("File not found. '%s'" % filename)

                # 新しいファイルのトークンの行番号をずらす
                # TokenClass.Token.shift_line(new_tokens, i - 1)

                # 新しいファイル名もトークン化して、もとのトークンに埋め込む
                # i-1 ~ i+2 <...>
                del raw_tokens[i-1:i+2]
                raw_tokens = genfunc.insert(raw_tokens, i - 1, new_tokens)
    return raw_tokens


def prepare_js():
    """Prepare JS file, running xaller programs."""
    json_file = open((os.path.dirname(os.path.abspath(__file__))
                     + "/html_rule.json"), 'r')
    Global.html_rules = json.load(json_file)

    # 'strtrimr':'',
    # 'strtriml'
    # 'strridx':',', 'strrep':'',
    genfunc.out("""function strlen$(str) { return str.length; }""")
    genfunc.out("""function substr$(str, start, length=-1) { if (length == -1) { length = str.length - start;} return str.substr(start, length); }""")
    genfunc.out("""
function strtrim$(str, char) {
    res = ''
    for (var i = 0; i < str.length; i++) {
        if (str[i] != char) { res += str[i]; }
    }
    return res;
}
""")
    genfunc.out("""
function strtriml$(str, char) {
    res = ''
    if (str[0] != char) { return str; }
    for (var i = 0; i < str.length; i++) {
        if (str[i] != char) { res = str.substr(i); break; }
    }
    return res;
}
""")
    genfunc.out("""
function strtrimr$(str, char) {
    res = ''
    if (str[str.length-1] != char) { return str; }
    for (var i = str.length-1; i >= 0; i--) {
        if (str[i] != char) { res = str.substr(0, i+1); break; }
    }
    return res;
}
""")
    genfunc.out("""function stridx$(cmpstr, string, start=0) { return cmpstr.indexOf(string, start); }""")
    genfunc.out("""function strridx$(cmpstr, string, start=0) { return cmpstr.lastIndexOf(string, start); }""")
    genfunc.out("""function strrep$(src, pattern, replacement) {
var regExp = new RegExp(pattern, "g");
return src.replace(regExp, replacement); }""")
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
    # TODO(cgp) calc.xal -> (calc.xal.js => calc.js)
    js_file = open(Global.output + ".js", 'w')
    js_file.write(Global.outjs)
    js_file.close()


def main():
    """Process entry point."""
    deal_with_cmdargs()
    out_html()

    Global.tokens = deal_with_import(Global.input)
    Global.blocks = TokenClass.Block.parse(Global.tokens)
    # TODO(cgp): インポート時のエラー行調整
    Global.lines = TokenClass.Line.parse(Global.tokens, 0)

    prepare_js()
    out_js()

if __name__ == '__main__':
    main()
